/**
 * @fileoverview API authentication - get current Prisma User from Supabase Auth
 * @encoding UTF-8
 */

import { createServerSupabaseClient } from '@/lib/supabase-server';
import prisma from '@/lib/prisma';
import type { User } from '@prisma/client';

/**
 * Get current Prisma User from request (via Supabase Auth).
 * Creates User in Prisma if first login (authUserId not yet linked).
 */
export async function getCurrentPrismaUser(): Promise<User | null> {
  const supabase = createServerSupabaseClient();
  const { data: { user: authUser }, error } = await supabase.auth.getUser();

  if (error || !authUser) {
    return null;
  }

  // Find existing Prisma User by authUserId
  let prismaUser = await prisma.user.findUnique({
    where: { authUserId: authUser.id },
  });

  // First login: create Prisma User linked to Supabase Auth
  if (!prismaUser) {
    prismaUser = await prisma.user.create({
      data: {
        authUserId: authUser.id,
        email: authUser.email ?? '',
        nickname: authUser.user_metadata?.nickname ?? authUser.email?.split('@')[0] ?? '사용자',
      },
    });
  }

  return prismaUser;
}
