/**
 * @fileoverview Supabase server-side client for API routes
 * @encoding UTF-8
 */

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Create Supabase client for API Route Handlers (with auth cookies)
 * Returns null if Supabase is not configured
 */
export function createServerSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createRouteHandlerClient({ cookies });
}
