// =====================================================
// Authentication Module
// =====================================================
// Handles login, signup, password reset, and session management
// =====================================================

import { supabase, getCurrentUser, signOut } from './supabase-config.js';

// === Sign In with Email & Password ===
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        throw new Error(translateError(error.message));
    }

    return data;
}

// === Sign Up (for admin use) ===
export async function signUp(email, password, metadata = {}) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: metadata // { full_name, role, group_name }
        }
    });

    if (error) {
        throw new Error(translateError(error.message));
    }

    return data;
}

// === Password Reset ===
export async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/scout-website/login.html?reset=true'
    });

    if (error) {
        throw new Error(translateError(error.message));
    }

    return data;
}

// === Update Password (after reset) ===
export async function updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        throw new Error(translateError(error.message));
    }

    return data;
}

// === Get Leader Profile from DB ===
export async function getLeaderProfile(userId) {
    const { data, error } = await supabase
        .from('leaders')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) return null;
    return data;
}

// === Auth State Listener ===
export function onAuthStateChange(callback) {
    supabase.auth.onAuthStateChange((event, session) => {
        callback(event, session);
    });
}

// === Translate Supabase errors to Arabic ===
function translateError(msg) {
    const errors = {
        'Invalid login credentials': 'بيانات الدخول غير صحيحة',
        'Email not confirmed': 'البريد الإلكتروني غير مؤكد',
        'User already registered': 'هذا البريد مسجل مسبقاً',
        'Password should be at least 6 characters': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
        'Email rate limit exceeded': 'تم تجاوز الحد المسموح، حاول لاحقاً',
        'For security purposes, you can only request this once every 60 seconds': 'لأسباب أمنية، يمكنك الطلب مرة واحدة كل 60 ثانية'
    };
    return errors[msg] || msg;
}

// Re-export for convenience
export { getCurrentUser, signOut };
