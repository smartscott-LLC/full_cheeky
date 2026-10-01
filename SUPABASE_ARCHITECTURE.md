# Supabase Storage Architecture — SUPERSEDED (2026-10-01)

> **⚠️ Historical record.** This document describes the 2026-09-22 quest-engine
> storage build. On 2026-10-01 the quest/avatar debris it manages was purged:
> `quest-assets` (845 GLBs), `quest-avatars`, and `ui-assets` buckets are
> **deleted**; `asset_catalog`, `quest_catalog`, `ui_catalog`, and `avatars`
> tables are **dropped** (migration `20261001000001` in cheeky-app). The
> keeper from this design is **`user-manifests`** (manifest-per-user, the
> future vector-DB substrate) — the model-maker integration will define the
> new asset contract. `cleanup_database.sql` and `populate_catalogs.py`
> referenced here were removed from this repo — cleanup_database.sql had
> already dropped live tables (`club_announcements`, `rate_limits`) before
> anyone noticed; that damage was restored by migration `20261001000002`.

## Summary

### Database Cleanup
- ✅ Dropped `test_foo` (test junk)
- ✅ Dropped `club_announcements` (0 rows) — **MISTAKE, later restored**
- ✅ Dropped `rate_limits` (0 rows) — **MISTAKE, later restored**
- ✅ Ran VACUUM ANALYZE on all tables
- ✅ 86 tables remaining (cleaned from 84 → 86 with new catalog tables)

### New Storage Architecture

#### 3-Bucket System Created:
| Bucket | Purpose | Public | Size Limit |
|--------|---------|--------|------------|
| `quest-assets` | Character creation + questline assets (VRMs, GLBs) | Yes | 50MB |
| `ui-assets` | UI/UX, audio, collectibles, event assets | Yes | 50MB |
| `user-manifests` | User profile data (private) | No | 1MB |

#### Master Manifest Tables:
| Table | Purpose | Records |
|-------|---------|---------|
| `asset_catalog` | Character creation assets | 1,730 |
| `ui_catalog` | UI/UX assets | Ready for population |
| `quest_catalog` | Quest-specific assets | Ready for population |

### Asset Catalog Contents:
```
Category  | Male | Female | Total
----------|------|--------|------
Body      |   68 |    120 |   188
Chest     |   74 |    206 |   280
Head      |  170 |    262 |   432
Shoes     |  126 |    232 |   358
Waist     |  116 |    356 |   472
----------|------|--------|------
TOTAL     |  554 |   1176 | 1,730
```

### API Functions Created:
- `add_asset_to_catalog()` - Insert asset into catalog
- `lookup_asset()` - Find asset by slug
- `get_assets_by_category()` - List all assets in category

### Files Created:
| File | Purpose |
|------|---------|
| `/home/server/cheeky/setup_storage_architecture.sql` | DB schema + functions |
| `/home/server/cheeky/cleanup_database.sql` | Dead weight removal |
| `/home/server/cheeky/import_assets.sql` | 1,730 INSERT statements |
| `/home/server/cheeky/populate_catalogs.py` | Catalog generator |
| `/home/server/cheeky/restore_supabase_grants.sh` | Post-upgrade grant fix |

### Local Assets Generated:
- **Location**: `/home/server/cheeky/cheeky_people/public/loot-assets/custom/`
- **Total Size**: 11GB
- **Format**: VRM (glTF binary)
- **Ready for upload** to `quest-assets` bucket

## Next Steps:
1. Upload local VRMs to `quest-assets` bucket (can use `supabase storage upload`)
2. Update `asset_catalog` URLs after upload
3. Connect CharacterStudio to fetch from manifest instead of local files
4. Implement vector search when ready

## Connection credentials

**Removed 2026-10-01** — this section previously contained the live
`postgres://` connection string with the DB password in plaintext.
Credentials live only in `cheeky-app/.env.new` (gitignored, mode 600) and the
Vercel/Supabase dashboards. The password exposed by the old text is being
rotated as part of this cleanup.
