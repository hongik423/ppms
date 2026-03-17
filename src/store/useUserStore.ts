'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, StudyPhaseNumber } from '@/types/user.types';
import { calculateDday, getStudyPhase } from '@/lib/utils';

interface UserStore {
  // State
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;

  // Computed
  daysUntilExam: number;
  currentPhase: StudyPhaseNumber;

  // Actions
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      // Computed properties
      get daysUntilExam() {
        const user = get().user;
        return user ? calculateDday(user.targetExamDate) : 0;
      },

      get currentPhase() {
        const daysUntilExam = get().daysUntilExam;
        return getStudyPhase(daysUntilExam);
      },

      // Actions
      setUser: (user) => {
        set({
          user,
          isLoggedIn: user !== null,
          error: null,
        });
      },

      updateUser: (updates) => {
        set((state) => {
          if (!state.user) return state;
          return {
            user: { ...state.user, ...updates },
          };
        });
      },

      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
          error: null,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error });
      },
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
