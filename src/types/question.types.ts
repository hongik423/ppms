export interface Subject {
  id: string;
  name: string;
  questionCount: number;
  weightPercent: number;
  textbookVolume: number | null;
  order: number;
  mainTopics?: MainTopic[];
}

export interface MainTopic {
  id: string;
  subjectId: string;
  name: string;
  order: number;
  estimatedWeight: number | null;
  subTopics?: SubTopic[];
}

export interface SubTopic {
  id: string;
  mainTopicId: string;
  name: string;
  order: number;
  detailItems?: DetailItem[];
}

export interface DetailItem {
  id: string;
  subTopicId: string;
  name: string;
  predictionScore: number; // 1-5
  crossSubjectLinks: string[];
  practicalLinks: string[];
  conceptCards?: ConceptCard[];
  questions?: Question[];
}

export interface Question {
  id: string;
  detailItemId: string;
  subjectId: string;
  questionText: string;
  options: string[];
  correctAnswer: number; // 0-3
  difficulty: QuestionDifficulty;
  explanation: string | null;
  wrongExplanations: string[];
  tags: string[];
}

export type Difficulty = 'basic' | 'applied' | 'advanced';
export type QuestionDifficulty = 1 | 2 | 3;

// Import ConceptCard type for DetailItem reference
import type { ConceptCard } from './card.types';
