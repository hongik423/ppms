'use client';

/**
 * @fileoverview Supabase Realtime subscription for User changes (streak, lastStudyDate)
 * @encoding UTF-8
 */

import { useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export type UserPayload = {
  id: string;
  streakDays: number;
  lastStudyDate: string | null;
  currentPhase: number;
};

/**
 * Subscribe to User changes for real-time streak/study date updates
 * Requires: Supabase Dashboard > Database > Replication > Enable "User" table
 */
export function useRealtimeUser(
  userId: string | undefined,
  onUserChange: (payload: UserPayload) => void
) {
  const handleChange = useCallback(
    (payload: { new: Record<string, unknown> }) => {
      const row = payload.new as UserPayload;
      if (userId && row.id === userId) {
        onUserChange(row);
      }
    },
    [userId, onUserChange]
  );

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`user-${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'User',
          filter: `id=eq.${userId}`,
        },
        handleChange
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel as RealtimeChannel);
    };
  }, [userId, handleChange]);
}
