# PPMS Project - TypeScript Infrastructure

Complete TypeScript type definitions, utility functions, custom hooks, and Zustand stores for the Public Procurement Management System (PPMS) project.

## Directory Structure

```
src/
├── types/              # Type definitions
│   ├── question.types.ts    # Question, Subject, Topic types
│   ├── card.types.ts        # Concept card and review types
│   ├── exam.types.ts        # Mock exam and results types
│   ├── user.types.ts        # User profile and progress types
│   ├── practical.types.ts   # Practical exam types
│   └── index.ts             # Re-exports
│
├── lib/                # Utilities and configuration
│   ├── utils.ts             # Helper functions
│   ├── constants.ts         # Configuration and constants
│   ├── supabase.ts          # Supabase client setup
│   ├── prisma.ts            # Prisma client singleton
│   └── index.ts             # Re-exports
│
├── hooks/              # Custom React hooks
│   ├── useEbbinghaus.ts     # Spaced repetition logic
│   ├── useExamTimer.ts      # Exam countdown timer
│   ├── useStudyProgress.ts  # Progress tracking
│   └── index.ts             # Re-exports
│
└── store/              # Zustand state management
    ├── useUserStore.ts      # User state
    ├── useStudyStore.ts     # Study session state
    ├── useExamStore.ts      # Exam state
    └── index.ts             # Re-exports
```

## Types Overview

### question.types.ts
- `Subject` - Exam subject information
- `MainTopic` - Main topics within subjects
- `SubTopic` - Sub-topics with detail items
- `DetailItem` - Individual learning items
- `Question` - Multiple choice questions with 4 options
- `Difficulty` / `QuestionDifficulty` - Difficulty levels (1-3)

### card.types.ts
- `ConceptCard` - Flashcard for spaced repetition
- `CardCategory` - Card types (concept, compare, number, law, procedure)
- `ReviewRating` - Review feedback (hard, normal, easy)
- `CardReviewResult` - Review history
- `CardReviewSession` - Review session tracking

### exam.types.ts
- `MockExam` - Mock exam instance
- `ExamResult` - Exam performance results
- `SubjectScore` - Per-subject performance
- `DetailItemResult` - Item-level performance
- `QuestionAnswer` - Individual answer tracking

### user.types.ts
- `User` - User profile
- `UserProgress` - Item-level progress tracking
- `StudyPhase` - Study phase configuration
- `DailyStudyPlan` - Daily study goals
- `UserStats` - Aggregate statistics
- `StudyPhaseNumber` - Type for phases 1-4

### practical.types.ts
- `PracticalScenario` - Practical exam scenario
- `PracticalAnswer` - Practical answer submission
- `StarLFramework` - STARL answer framework
- `PRACTICAL_TOPICS` - 8 practical exam topics
- `PracticalExamResult` - Practical exam results

## Utilities (src/lib/)

### utils.ts
- `cn()` - Combine classNames with Tailwind merge
- `formatDate()` - Format dates to Korean (YYYY년 M월 D일)
- `calculateDday()` - Calculate days until exam
- `formatTime()` - Format seconds to HH:MM:SS
- `calculatePassStatus()` - Determine pass/fail status
- `shuffleArray()` - Fisher-Yates shuffle
- `clamp()` - Clamp number between min/max
- `formatPercentage()` - Format as percentage
- `calculateCorrectRate()` - Calculate success rate
- `parseTimeToSeconds()` - Parse time string to seconds
- `getStudyPhase()` - Determine study phase from D-days

### constants.ts
- `EXAM_CONFIG` - Exam settings and subject configuration
- `EBBINGHAUS_INTERVALS` - Spaced repetition intervals [1, 3, 7, 14, 30]
- `STUDY_PHASES` - 4-phase study program with time allocation
- `CARD_CATEGORIES` - Concept card types
- `DIFFICULTY_LEVELS` - Difficulty definitions
- `REVIEW_RATINGS` - Review rating scale
- `PRACTICAL_GRADES` - Practical exam grading
- `DAILY_STUDY_TARGETS` - Per-phase daily targets
- `API_ENDPOINTS` - API route constants
- `STORAGE_KEYS` - Local storage keys

### supabase.ts
- `supabase` - Configured Supabase client
- `getCurrentUser()` - Get current authenticated user
- `signInWithEmail()` - Email/password login
- `signUpWithEmail()` - User registration
- `signOut()` - Logout
- `getSession()` - Get current session
- `onAuthStateChange()` - Listen to auth changes

### prisma.ts
- `prisma` - Singleton Prisma client with hot-reload protection

## Custom Hooks (src/hooks/)

### useEbbinghaus
Manages spaced repetition intervals based on review ratings.

```typescript
const { nextInterval, getNextReviewDate, calculateNextInterval, getReviewStatus } = useEbbinghaus(interval, reviewCount);
```

Features:
- Rating-based interval calculation (hard→1 day, normal→maintain, easy→double)
- Next review date calculation
- Review status tracking (due, not-due, overdue)

### useExamTimer
Countdown timer for exam sessions.

```typescript
const { timeLeft, formattedTime, isRunning, isWarning, isCritical, progress, start, pause, resume, reset, addTime } = useExamTimer(totalMinutes, onTimeUp);
```

Features:
- Start/pause/resume functionality
- Warning at 30 minutes, critical at 10 minutes
- Time formatting and progress percentage
- Optional callback on time expiration

### useStudyProgress
Track and calculate overall study progress.

```typescript
const { overallProgress, subjectProgress, masteredCount, totalItems, weakItems, averageCorrectRate, isLoading, error, refetch } = useStudyProgress(userId);
```

Features:
- Fetch progress from API
- Calculate per-subject performance
- Identify weak learning items
- Pagination support

## State Stores (src/store/)

All stores use Zustand with persistence middleware.

### useUserStore
User authentication and profile state.

```typescript
const { user, isLoggedIn, daysUntilExam, currentPhase, setUser, updateUser, logout } = useUserStore();
```

**State:**
- `user` - Current user object
- `isLoggedIn` - Authentication status
- `isLoading`, `error` - Request state

**Computed:**
- `daysUntilExam` - Calculated from targetExamDate
- `currentPhase` - Derived from daysUntilExam

**Persistence:** user, isLoggedIn

### useStudyStore
Current study session state.

```typescript
const { currentSubject, currentMainTopic, cardQueue, currentCard, reviewProgress, remainingCards, setSubject, initializeCardQueue, nextCard, submitReview } = useStudyStore();
```

**State:**
- `currentSubject` - Active subject ID
- `currentMainTopic` - Active topic
- `cardQueue` - Cards to review
- `currentCardIndex` - Position in queue
- `reviewResults` - Review history
- `isReviewMode` - Mode toggle

**Computed:**
- `currentCard` - Card at current index
- `reviewProgress` - Percentage complete
- `remainingCards` - Cards left to review

**Persistence:** currentSubject, currentMainTopic, isReviewMode

### useExamStore
Mock exam state and answer tracking.

```typescript
const { currentQuestion, answered, notAnswered, progress, setAnswer, nextQuestion, submitExam, calculateScore } = useExamStore();
```

**State:**
- `currentExam` - Active MockExam
- `questions` - All exam questions
- `answers` - Selected answers Map
- `currentQuestionIndex` - Position
- `isSubmitted` - Completion status
- `examResult` - Results after submission

**Computed:**
- `currentQuestion` - Question at index
- `answered` - Count of answered questions
- `notAnswered` - Count remaining
- `progress` - Percentage complete

**Features:**
- Navigate between questions
- Submit exam to API
- Calculate automatic scoring
- Review answers

## Usage Examples

### Importing Types
```typescript
import type {
  Question,
  User,
  ConceptCard,
  MockExam,
} from '@/types';
```

### Using Utilities
```typescript
import { cn, formatDate, calculateDday, useExamTimer } from '@/lib';

const daysLeft = calculateDday('2026-10-03');
const formatted = formatDate(new Date());
```

### Using Hooks
```typescript
import { useEbbinghaus, useExamTimer } from '@/hooks';

function CardReview() {
  const { nextInterval, getNextReviewDate } = useEbbinghaus(7, 3);
  const { timeLeft, start } = useExamTimer(120, onExamTimeUp);
  
  return <div>{timeLeft}s remaining</div>;
}
```

### Using Stores
```typescript
import { useUserStore, useExamStore } from '@/store';

function ExamComponent() {
  const { daysUntilExam, currentPhase } = useUserStore();
  const { currentQuestion, setAnswer } = useExamStore();
  
  return <div>Phase {currentPhase} - {daysUntilExam} days left</div>;
}
```

## Configuration

### Exam Configuration (constants.ts)
- Written Exam Date: 2026-10-03
- Practical Exam Date: 2026-11-14
- Total Questions: 80
- Exam Duration: 120 minutes
- Pass Score (Subject): 40%
- Pass Score (Average): 60%
- 3 Subjects with 37.5%, 25%, 37.5% weights

### Study Phases
1. **기초 다지기** (D-180~D-120): 2h/day, 100% theory
2. **심화 학습** (D-120~D-60): 3h/day, 60% theory/40% practice
3. **실전 훈련** (D-60~D-14): 3.5h/day, 30% theory/70% practice
4. **최종 정리** (D-14~D-Day): 2h/day, 50%/50% split

## Dependencies

Required npm packages:
- `zustand` - State management
- `clsx` - Classname utility
- `tailwind-merge` - Tailwind CSS class merging
- `@supabase/supabase-js` - Supabase client
- `@prisma/client` - Prisma ORM

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
```

## Notes

- All stores use persistence middleware for localStorage
- Computed properties use getter syntax in Zustand
- Types are re-exported from index files for convenience
- All utility functions are pure and side-effect free
- Hooks follow React best practices with proper cleanup
- Constants are organized by feature/use-case
