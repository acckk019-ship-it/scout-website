// =====================================================
// Supabase Configuration
// =====================================================
// SETUP: Replace with your Supabase project credentials
// Get these from: https://supabase.com → Your Project → Settings → API
// =====================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ✅ Live Supabase credentials (scout-website project)
const SUPABASE_URL = 'https://yxakskkqnebqynyrrolc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4YWtza2txbmVicXlueXJyb2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwOTU1MzcsImV4cCI6MjA4NjY3MTUzN30.Cd3rrnsWz0Nt_edtUBjAXg_eZR9iQD2MdZRQezgXQZQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper: Check if user is logged in
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
}

// Helper: Check session
export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) return null;
    return session;
}

// Helper: Sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign out error:', error);
    window.location.href = '/scout-website/login.html';
}

// Helper: Require auth (redirect if not logged in)
export async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = '/scout-website/login.html';
        return null;
    }
    return user;
}
