import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables – running in offline/mock mode');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient>);

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
  if (!supabase) return { user: null, error: new Error('Supabase not configured') };
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

/**
 * Sign in with email and password
 */
export async function signInWithEmail(email: string, password: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

/**
 * Sign up with email and password
 */
export async function signUpWithEmail(email: string, password: string) {
  if (!supabase) return { data: null, error: new Error('Supabase not configured') };
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

/**
 * Sign out the current user
 */
export async function signOut() {
  if (!supabase) return { error: new Error('Supabase not configured') };
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Get the current session
 */
export async function getSession() {
  if (!supabase) return { session: null, error: new Error('Supabase not configured') };
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (user: any) => void) {
  if (!supabase) {
    return { data: { subscription: { unsubscribe: () => {} } } };
  }
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null);
  });
}
