export type CardCategory = 'concept' | 'compare' | 'number' | 'law' | 'procedure';

export interface ConceptCard {
  id: string;
  detailItemId: string;
  frontText: string;
  backText: string;
  category: CardCategory;
  difficulty: string; // 'basic' | 'applied' | 'advanced'
  order: number | null;
}

export type ReviewRating = 'hard' | 'normal' | 'easy';

export interface CardReviewResult {
  cardId: string;
  rating: ReviewRating;
  nextReviewAt: Date;
  newInterval: number;
  reviewedAt: Date;
}

export interface CardReviewSession {
  id: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  reviewResults: CardReviewResult[];
  totalCards: number;
  completedCards: number;
}
