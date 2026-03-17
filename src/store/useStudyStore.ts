'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ConceptCard, CardReviewResult, ReviewRating } from '@/types/card.types';
import { MainTopic } from '@/types/question.types';

interface StudyStore {
  // State
  currentSubject: string | null;
  currentMainTopic: MainTopic | null;
  cardQueue: ConceptCard[];
  currentCardIndex: number;
  reviewResults: CardReviewResult[];
  isReviewMode: boolean;

  // Computed
  currentCard: ConceptCard | null;
  reviewProgress: number; // 0-100
  remainingCards: number;

  // Actions
  setSubject: (subjectId: string) => void;
  setMainTopic: (topic: MainTopic) => void;
  initializeCardQueue: (cards: ConceptCard[]) => void;
  nextCard: () => void;
  prevCard: () => void;
  jumpToCard: (index: number) => void;
  submitReview: (rating: ReviewRating) => void;
  resetStudySession: () => void;
  setReviewMode: (enabled: boolean) => void;
}

export const useStudyStore = create<StudyStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSubject: null,
      currentMainTopic: null,
      cardQueue: [],
      currentCardIndex: 0,
      reviewResults: [],
      isReviewMode: false,

      // Computed properties
      get currentCard() {
        const { cardQueue, currentCardIndex } = get();
        return cardQueue[currentCardIndex] || null;
      },

      get reviewProgress() {
        const { cardQueue, reviewResults } = get();
        if (cardQueue.length === 0) return 0;
        return (reviewResults.length / cardQueue.length) * 100;
      },

      get remainingCards() {
        const { cardQueue, reviewResults } = get();
        return cardQueue.length - reviewResults.length;
      },

      // Actions
      setSubject: (subjectId) => {
        set({
          currentSubject: subjectId,
          currentMainTopic: null,
          cardQueue: [],
          currentCardIndex: 0,
          reviewResults: [],
        });
      },

      setMainTopic: (topic) => {
        set({
          currentMainTopic: topic,
          cardQueue: [],
          currentCardIndex: 0,
          reviewResults: [],
        });
      },

      initializeCardQueue: (cards) => {
        set({
          cardQueue: cards,
          currentCardIndex: 0,
          reviewResults: [],
        });
      },

      nextCard: () => {
        set((state) => {
          const nextIndex = Math.min(
            state.currentCardIndex + 1,
            state.cardQueue.length - 1
          );
          return { currentCardIndex: nextIndex };
        });
      },

      prevCard: () => {
        set((state) => {
          const prevIndex = Math.max(state.currentCardIndex - 1, 0);
          return { currentCardIndex: prevIndex };
        });
      },

      jumpToCard: (index) => {
        set((state) => {
          const validIndex = Math.max(
            0,
            Math.min(index, state.cardQueue.length - 1)
          );
          return { currentCardIndex: validIndex };
        });
      },

      submitReview: (rating) => {
        set((state) => {
          const currentCard = state.currentCard;
          if (!currentCard) return state;

          const result: CardReviewResult = {
            cardId: currentCard.id,
            rating,
            reviewedAt: new Date(),
            nextReviewAt: new Date(), // Will be calculated by server
            newInterval: 0, // Will be calculated by server
          };

          const updatedResults = [...state.reviewResults, result];
          const nextIndex = state.currentCardIndex + 1;

          return {
            reviewResults: updatedResults,
            currentCardIndex: Math.min(
              nextIndex,
              state.cardQueue.length - 1
            ),
          };
        });
      },

      resetStudySession: () => {
        set({
          currentSubject: null,
          currentMainTopic: null,
          cardQueue: [],
          currentCardIndex: 0,
          reviewResults: [],
          isReviewMode: false,
        });
      },

      setReviewMode: (enabled) => {
        set({ isReviewMode: enabled });
      },
    }),
    {
      name: 'study-store',
      partialize: (state) => ({
        currentSubject: state.currentSubject,
        currentMainTopic: state.currentMainTopic,
        isReviewMode: state.isReviewMode,
      }),
    }
  )
);
