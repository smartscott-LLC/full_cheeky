#!/bin/bash
# Postgres Upgrade Grant Restoration Script
# Run this AFTER upgrading PostgreSQL in Supabase dashboard

set -e

# Connection string (will use non-pooler after upgrade)
DB_URL="postgres://postgres.ioqeddpgdilyyajsygmz:!Carryacross1128@aws-0-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require"

echo "🔧 Restoring Supabase grants after Postgres upgrade..."
echo ""

# Apply grants
echo "Applying grants from supabase_regrant.sql..."
psql "$DB_URL" -f /home/server/cheeky/supabase_regrant.sql

echo ""
echo "✅ Grants restored!"
echo ""
echo "Verifying..."

# Verify function grants
echo "Function grants:"
psql "$DB_URL" -c "SELECT grantee, count(*) as func_count FROM information_schema.routine_privileges WHERE routine_schema IN ('public', 'realtime', 'graphql_public') AND grantee IN ('anon', 'authenticated', 'service_role') GROUP BY grantee ORDER BY grantee;" 2>/dev/null

# Verify table grants
TABLE_COUNT=$(psql "$DB_URL" -t -c "SELECT count(*) FROM pg_tables WHERE schemaname = 'public';" 2>/dev/null | tr -d ' ')
echo ""
echo "Tables in public schema: $TABLE_COUNT"

echo ""
echo "🎉 Done! Your PostgREST endpoints should be working."
