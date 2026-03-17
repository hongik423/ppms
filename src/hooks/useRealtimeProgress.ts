'use client';

/**
 * @fileoverview Supabase Realtime subscription for UserProgress changes
 * @encoding UTF-8
 */

import { useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export type ProgressPayload = {
  id: string;
  userId: string;
  detailItemId: string;
  conceptCardMastered: boolean;
  questionCorrectRate: number;
  questionAttempts: number;
  reviewCount: number;
  lastReviewedAt: string | null;
  nextReviewAt: string | null;
  currentInterval: number;
};

/**
 * Subscribe to UserProgress changes for a user (real-time updates)
 * Requires: Supabase Dashboard > Database > Replication > Enable "UserProgress" table
 */
export function useRealtimeProgress(
  userId: string | undefined,
  onProgressChange: (payload: ProgressPayload) => void
) {
  const handleChange = useCallback(
    (payload: { new: Record<string, unknown> }) => {
      const row = payload.new as ProgressPayload;
      if (userId && row.userId === userId) {
        onProgressChange(row);
      }
    },
    [userId, onProgressChange]
  );

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`user-progress-${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'UserProgress',
          filter: `userId=eq.${userId}`,
        },
        handleChange
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel as RealtimeChannel);
    };
  }, [userId, handleChange]);
}
