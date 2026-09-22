-- ============================================================================
-- SUPABASE POSTGRES UPGRADE - REGRANT SCRIPT
-- Generated: 2026-09-22
-- Project: ioqeddpgdilyyajsygmz
-- Run this AFTER upgrading PostgreSQL to restore function grants
-- ============================================================================

BEGIN;

-- =========================================================================
-- SCHEMA USAGE GRANTS
-- =========================================================================
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;

GRANT USAGE ON SCHEMA graphql_public TO anon;
GRANT USAGE ON SCHEMA graphql_public TO authenticated;
GRANT USAGE ON SCHEMA graphql_public TO service_role;

-- =========================================================================
-- PUBLIC SCHEMA FUNCTIONS (92 total)
-- =========================================================================

-- anon role (28 functions) - Public REST endpoints
GRANT EXECUTE ON FUNCTION public.club_chat_heartbeat() TO anon;
GRANT EXECUTE ON FUNCTION public.club_chat_horn(text) TO anon;
GRANT EXECUTE ON FUNCTION public.club_chat_invite(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.club_chat_profanity(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.club_chat_respond_invite(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.club_chat_send(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.club_chat_whisper_get(text) TO anon;
GRANT EXECUTE ON FUNCTION public.club_chat_whisper_send(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.compatible(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.current_tier(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_challenge_leaderboard(text, integer) TO anon;
GRANT EXECUTE ON FUNCTION public.insert_challenge_leaderboard(text, text, text, text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_board_cards(text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_draft_candidates(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_flip(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_incoming(text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_pick_draft(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_respond_unlock(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_send_unlock(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_start_board(text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_start_draft(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.matchmaker_unpick_draft(text, text, text) TO anon;
GRANT EXECUTE ON FUNCTION public.on_subscription_activate(text) TO anon;
GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO anon;
GRANT EXECUTE ON FUNCTION public.set_updated_at() TO anon;
GRANT EXECUTE ON FUNCTION public.taskbar_state(text) TO anon;
GRANT EXECUTE ON FUNCTION public.tier_rank(text) TO anon;
GRANT EXECUTE ON FUNCTION public.use_icebreaker(text, text) TO anon;

-- authenticated role (64 functions) - Authenticated user endpoints
GRANT EXECUTE ON FUNCTION public.add_special_interest(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.advance_blind_date(text, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.auto_match_rooftop(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.award_badge(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.award_gem(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.bump_rate_limit(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.buy_gift(text, text, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.club_chat_ban(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.club_chat_bump_badges(text, text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_blind_date(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_l3_pick(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_like(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_streak(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.date_night_leaderboard(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.date_night_state(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.enforce_photo_limit(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_events() TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_floor_events() TO authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_speed_dating_events() TO authenticated;
GRANT EXECUTE ON FUNCTION public.finalize_events() TO authenticated;
GRANT EXECUTE ON FUNCTION public.flag_honeypot_catch(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.flag_honeypot_catch(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.flag_swag_request(text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.generate_swag_code(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_bot_guard(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_first_event_badge(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_first_match_moment(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_profile(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_test_member(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.join_blind_date(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.join_event(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.l3_trio(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.leave_blind_date(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.leave_event(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_conversation_read(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.mark_webhook_processed(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.matchmaker_award_gift(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.matchmaker_pick_draft(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.next_event_minutes(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.owner_grant(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.pick_on_floor(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_character_moment(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_checkin(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_common_moment(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.record_personal_moment(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.redeem_swag_code(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.resolve_song(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.resolve_speed_dating(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.respond_gift(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.select_blind_tally(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.select_speed_rank(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.send_event_message(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.send_gift(text, text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.send_guest_pass(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.send_message(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.send_speed_message(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.setup_speed_dating(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.start_date_night(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_blind_answer(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_blind_question(text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_rooftop_pick(text, text, text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.tap_date_night(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.tick_rooftop_events() TO authenticated;

-- service_role (92 functions) - Internal/admin access
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- =========================================================================
-- REALTIME SCHEMA FUNCTIONS (9 total)
-- =========================================================================
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA realtime TO anon;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA realtime TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA realtime TO service_role;

-- =========================================================================
-- GRAPHQL_PUBLIC SCHEMA (1 function)
-- =========================================================================
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA graphql_public TO anon;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA graphql_public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA graphql_public TO service_role;

-- =========================================================================
-- TABLE PRIVILEGES FOR POSTGREST
-- =========================================================================

-- Grant SELECT on all public tables to anon and authenticated
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
        EXECUTE format('GRANT SELECT ON TABLE public.%I TO anon', r.tablename);
        EXECUTE format('GRANT SELECT ON TABLE public.%I TO authenticated', r.tablename);
        EXECUTE format('GRANT SELECT ON TABLE public.%I TO service_role', r.tablename);
    END LOOP;
END $$;

-- Grant ALL on all public tables to service_role
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
        EXECUTE format('GRANT ALL ON TABLE public.%I TO service_role', r.tablename);
    END LOOP;
END $$;

COMMIT;

-- =========================================================================
-- VERIFICATION
-- =========================================================================
SELECT 'Function Grants:' as info;
SELECT grantee, count(*) as func_count 
FROM information_schema.routine_privileges 
WHERE routine_schema IN ('public', 'realtime', 'graphql_public') 
AND grantee IN ('anon', 'authenticated', 'service_role')
GROUP BY grantee 
ORDER BY grantee;

SELECT 'Schema Usage:' as info;
SELECT nspname, 
       has_schema_privilege('anon', nspname, 'USAGE') as anon_usage,
       has_schema_privilege('authenticated', nspname, 'USAGE') as auth_usage,
       has_schema_privilege('service_role', nspname, 'USAGE') as svc_usage
FROM pg_namespace 
WHERE nspname IN ('public', 'realtime', 'graphql_public')
ORDER BY nspname;

SELECT 'Table Counts:' as info;
SELECT count(*) as total_tables FROM pg_tables WHERE schemaname = 'public';
