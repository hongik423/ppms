/**
 * @fileoverview Supabase server-side client for API routes
 * @encoding UTF-8
 */

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

/**
 * Create Supabase client for API Route Handlers (with auth cookies)
 */
export function createServerSupabaseClient() {
  return createRouteHandlerClient({ cookies });
}
