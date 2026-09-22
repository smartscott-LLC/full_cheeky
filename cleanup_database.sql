-- ============================================================================
-- CLEANUP SCRIPT - Remove dead weight from database
-- ============================================================================

BEGIN;

-- ============================================================================
-- STEP 1: DROP TEST/TEMP TABLES
-- ============================================================================
DROP TABLE IF EXISTS test_foo;
DROP TYPE IF EXISTS test_foo_status;

-- ============================================================================
-- STEP 2: DROP EMPTY/UNUSED TABLES
-- ============================================================================
DROP TABLE IF EXISTS club_announcements;
DROP TABLE IF EXISTS rate_limits;

-- ============================================================================
-- STEP 3: VACUUM ALL TABLES
-- ============================================================================
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
        EXECUTE format('VACUUM ANALYZE public.%I', r.tablename);
    END LOOP;
END $$;

-- ============================================================================
-- STEP 4: VERIFICATION
-- ============================================================================
SELECT '=== CLEANUP COMPLETE ===' as status;

SELECT 'Tables removed:' as info;
SELECT 'test_foo' as table_name, 'DROPPED' as status
UNION ALL SELECT 'club_announcements', 'DROPPED'
UNION ALL SELECT 'rate_limits', 'DROPPED';

SELECT '' as info;
SELECT 'Remaining tables: ' || count(*) as info FROM pg_tables WHERE schemaname = 'public';

SELECT '' as info;
SELECT 'Tables with data (top 20):' as info;
SELECT relname as tablename, n_live_tup as rows 
FROM pg_stat_user_tables 
WHERE schemaname = 'public' AND n_live_tup > 0
ORDER BY n_live_tup DESC
LIMIT 20;

COMMIT;
