-- ============================================================================
-- SUPABASE STORAGE ARCHITECTURE SETUP
-- 3-Bucket System with Master Manifests
-- ============================================================================

-- ============================================================================
-- STEP 1: CREATE MASTER MANIFEST TABLES
-- These track all assets in each bucket for fast lookup
-- ============================================================================

-- Assets manifest table (character creation + questline assets)
CREATE TABLE IF NOT EXISTS asset_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,          -- 'tops', 'bottoms', 'shoes', 'accessories', 'bodies', etc.
    gender TEXT NOT NULL,            -- 'male', 'female'
    slug TEXT NOT NULL,              -- '1062_ready'
    filename TEXT NOT NULL,          -- '1062_ready.vrm'
    url TEXT,                        -- Full storage URL (nullable until uploaded)
    mime_type TEXT NOT NULL,         -- 'model/vrm', 'image/png', etc.
    size_bytes BIGINT NOT NULL,      -- File size in bytes
    tags TEXT[],                     -- Searchable tags
    metadata JSONB DEFAULT '{}',     -- Additional info (dimensions, polygon count, etc.)
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(category, gender, slug)
);

-- UI/UX manifest table (images, audio, collectibles, event assets)
CREATE TABLE IF NOT EXISTS ui_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,          -- 'audio', 'collectibles', 'ui-elements', 'event-assets'
    subtype TEXT,                    -- 'sfx', 'music', 'badge', 'token', etc.
    slug TEXT NOT NULL,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(category, subtype, slug)
);

-- Questline manifest table (world constructs, quest assets)
CREATE TABLE IF NOT EXISTS quest_catalog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quest_id TEXT NOT NULL,          -- Associated quest
    category TEXT NOT NULL,          -- 'world-constructs', 'npcs', 'items', 'locations'
    slug TEXT NOT NULL,
    filename TEXT NOT NULL,
    url TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes BIGINT NOT NULL,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(quest_id, category, slug)
);

-- Create indexes for fast lookups
CREATE INDEX idx_asset_catalog_category_gender ON asset_catalog(category, gender);
CREATE INDEX idx_asset_catalog_slug ON asset_catalog(slug);
CREATE INDEX idx_asset_catalog_tags ON asset_catalog USING GIN(tags);
CREATE INDEX idx_ui_catalog_category ON ui_catalog(category, subtype);
CREATE INDEX idx_quest_catalog_quest_id ON quest_catalog(quest_id, category);

COMMENT ON TABLE asset_catalog IS 'Master manifest for character creation and questline assets';
COMMENT ON TABLE ui_catalog IS 'Master manifest for UI/UX, audio, collectibles, and event assets';
COMMENT ON TABLE quest_catalog IS 'Master manifest for quest-specific world constructs and assets';

-- ============================================================================
-- STEP 2: FUNCTION TO ADD ASSET TO CATALOG
-- ============================================================================

CREATE OR REPLACE FUNCTION add_asset_to_catalog(
    p_table TEXT,
    p_category TEXT,
    p_slug TEXT,
    p_filename TEXT,
    p_url TEXT,
    p_mime_type TEXT,
    p_size_bytes BIGINT,
    p_gender TEXT DEFAULT NULL,
    p_subtype TEXT DEFAULT NULL,
    p_quest_id TEXT DEFAULT NULL,
    p_tags TEXT[] DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
) RETURNS UUID AS $$
DECLARE
    v_id UUID;
BEGIN
    IF p_table = 'asset_catalog' THEN
        INSERT INTO asset_catalog (category, gender, slug, filename, url, mime_type, size_bytes, tags, metadata)
        VALUES (p_category, p_gender, p_slug, p_filename, p_url, p_mime_type, p_size_bytes, p_tags, p_metadata)
        RETURNING id INTO v_id;
    ELSIF p_table = 'ui_catalog' THEN
        INSERT INTO ui_catalog (category, subtype, slug, filename, url, mime_type, size_bytes, tags, metadata)
        VALUES (p_category, p_subtype, p_slug, p_filename, p_url, p_mime_type, p_size_bytes, p_tags, p_metadata)
        RETURNING id INTO v_id;
    ELSIF p_table = 'quest_catalog' THEN
        INSERT INTO quest_catalog (quest_id, category, slug, filename, url, mime_type, size_bytes, tags, metadata)
        VALUES (p_quest_id, p_category, p_slug, p_filename, p_url, p_mime_type, p_size_bytes, p_tags, p_metadata)
        RETURNING id INTO v_id;
    ELSE
        RAISE EXCEPTION 'Unknown catalog table: %', p_table;
    END IF;
    
    RETURN v_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 3: FUNCTION TO LOOKUP ASSET BY SLUG
-- ============================================================================

CREATE OR REPLACE FUNCTION lookup_asset(
    p_table TEXT,
    p_slug TEXT,
    p_category TEXT DEFAULT NULL,
    p_gender TEXT DEFAULT NULL,
    p_quest_id TEXT DEFAULT NULL
) RETURNS TABLE (
    id UUID,
    slug TEXT,
    filename TEXT,
    url TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    metadata JSONB
) AS $$
BEGIN
    IF p_table = 'asset_catalog' THEN
        RETURN QUERY
        SELECT ac.id, ac.slug, ac.filename, ac.url, ac.mime_type, ac.size_bytes, ac.metadata
        FROM asset_catalog ac
        WHERE ac.slug = p_slug
          AND (p_category IS NULL OR ac.category = p_category)
          AND (p_gender IS NULL OR ac.gender = p_gender);
    ELSIF p_table = 'ui_catalog' THEN
        RETURN QUERY
        SELECT uc.id, uc.slug, uc.filename, uc.url, uc.mime_type, uc.size_bytes, uc.metadata
        FROM ui_catalog uc
        WHERE uc.slug = p_slug;
    ELSIF p_table = 'quest_catalog' THEN
        RETURN QUERY
        SELECT qc.id, qc.slug, qc.filename, qc.url, qc.mime_type, qc.size_bytes, qc.metadata
        FROM quest_catalog qc
        WHERE qc.slug = p_slug
          AND qc.quest_id = p_quest_id;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 4: FUNCTION TO GET ALL ASSETS BY CATEGORY
-- ============================================================================

CREATE OR REPLACE FUNCTION get_assets_by_category(
    p_table TEXT,
    p_category TEXT,
    p_gender TEXT DEFAULT NULL,
    p_quest_id TEXT DEFAULT NULL,
    p_limit INTEGER DEFAULT 100
) RETURNS TABLE (
    id UUID,
    slug TEXT,
    filename TEXT,
    url TEXT,
    mime_type TEXT,
    size_bytes BIGINT,
    metadata JSONB
) AS $$
BEGIN
    IF p_table = 'asset_catalog' THEN
        RETURN QUERY
        SELECT ac.id, ac.slug, ac.filename, ac.url, ac.mime_type, ac.size_bytes, ac.metadata
        FROM asset_catalog ac
        WHERE ac.category = p_category
          AND (p_gender IS NULL OR ac.gender = p_gender)
        ORDER BY ac.created_at
        LIMIT p_limit;
    ELSIF p_table = 'ui_catalog' THEN
        RETURN QUERY
        SELECT uc.id, uc.slug, uc.filename, uc.url, uc.mime_type, uc.size_bytes, uc.metadata
        FROM ui_catalog uc
        WHERE uc.category = p_category
        ORDER BY uc.created_at
        LIMIT p_limit;
    ELSIF p_table = 'quest_catalog' THEN
        RETURN QUERY
        SELECT qc.id, qc.slug, qc.filename, qc.url, qc.mime_type, qc.size_bytes, qc.metadata
        FROM quest_catalog qc
        WHERE qc.quest_id = p_quest_id
          AND qc.category = p_category
        ORDER BY qc.created_at
        LIMIT p_limit;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION add_asset_to_catalog(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, BIGINT, TEXT[], JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION lookup_asset(TEXT, TEXT, TEXT, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_assets_by_category(TEXT, TEXT, TEXT, TEXT, INTEGER) TO authenticated;

-- Grant table access
GRANT SELECT, INSERT, UPDATE ON asset_catalog TO authenticated;
GRANT SELECT, INSERT, UPDATE ON ui_catalog TO authenticated;
GRANT SELECT, INSERT, UPDATE ON quest_catalog TO authenticated;

COMMENT ON FUNCTION add_asset_to_catalog IS 'Add an asset to the appropriate catalog table';
COMMENT ON FUNCTION lookup_asset IS 'Lookup an asset by slug from any catalog';
COMMENT ON FUNCTION get_assets_by_category IS 'Get all assets in a category from any catalog';
