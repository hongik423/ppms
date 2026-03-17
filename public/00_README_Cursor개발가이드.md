# 공공조달관리사 필승 합격 시스템 — Cursor 개발 가이드
## PPMS (Public Procurement Manager Study System)

---

## 프로젝트 개요

2026년 최초 시행되는 공공조달관리사 국가기술자격 시험의 **필기(객관식 80문항) + 실기(필답형)** 시험 대비 AI 기반 적응형 웹 학습 시스템입니다.

---

## 문서 구조

| 번호 | 파일명 | 내용 | Cursor 활용 |
|---|---|---|---|
| 00 | **본 문서 (README)** | 프로젝트 셋업, 개발 순서, 규칙 | 프로젝트 초기 설정 시 참조 |
| 01 | [01_PRD](./01_PRD_공공조달관리사_필승합격시스템.md) | 제품 요구사항, 기능 명세, 데이터 모델, 기술 스택 | 기능 구현 시 참조 |
| 02 | [02_IA](./02_IA_정보아키텍처.md) | 사이트맵, 네비게이션, 페이지 와이어프레임, 라우팅 | 페이지/컴포넌트 생성 시 참조 |
| 03 | [03_UseCase](./03_UseCase_유스케이스.md) | 28개 유스케이스 상세, API 엔드포인트 | 비즈니스 로직 구현 시 참조 |
| 04 | [04_DesignGuide](./04_DesignGuide_디자인가이드.md) | 컬러, 타이포, 컴포넌트 디자인, 반응형, 다크모드 | UI 구현 시 참조 |

---

## 빠른 시작 (Cursor에서)

### 1단계: 프로젝트 초기화

```bash
npx create-next-app@latest ppms --typescript --tailwind --eslint --app --src-dir
cd ppms
```

### 2단계: 핵심 패키지 설치

```bash
# UI
npm install @radix-ui/react-* class-variance-authority clsx tailwind-merge
npx shadcn@latest init

# 상태관리 & 데이터
npm install zustand @tanstack/react-query prisma @prisma/client
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# 차트 & 애니메이션
npm install recharts framer-motion lucide-react

# AI
npm install openai
```

### 3단계: Shadcn 컴포넌트 추가

```bash
npx shadcn@latest add button card badge tabs dialog sheet
npx shadcn@latest add dropdown-menu select input textarea
npx shadcn@latest add progress tooltip radio-group checkbox switch
```

### 4단계: 환경변수 설정

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
```

---

## 개발 순서 (Phase별)

### Phase 1: MVP (Week 1~4)

```
Week 1: 프로젝트 셋업
├── Next.js + Tailwind + Shadcn 초기화
├── Supabase 프로젝트 생성 + Prisma 스키마 작성
├── 인증 시스템 (UC-01, UC-02)
└── 기본 레이아웃 (Header, Sidebar, BottomNav)

Week 2: 데이터 구축
├── 출제기준 ~170개 세세항목 DB 시딩
├── 과목/주요항목/세부항목/세세항목 계층 구조
└── 출제확률 가중치 초기 데이터

Week 3: 개념카드 모듈
├── 개념카드 학습 (UC-04, UC-05)
├── 에빙하우스 반복 로직
├── 비교표/숫자/법조문 카드 (UC-06, UC-07, UC-08)
└── 카드 플립 애니메이션

Week 4: 기본 문제풀이 + 대시보드
├── 빠른 문제풀이 (UC-10)
├── 대시보드 홈 (UC-24)
├── D-Day 카운터, 진도 바
└── 과목별 100문항 시드 데이터
```

### Phase 2: 적응형 학습 (Week 5~8)

```
├── AI 맞춤 문제 (UC-11)
├── 난이도 자동 조절 알고리즘
├── 오답노트/북마크 (UC-12, UC-14)
├── 취약점 분석 (UC-25)
├── 학습 계획 (UC-26)
└── 과목별 300문항+ 확장
```

### Phase 3: 실전 모의고사 (Week 9~12)

```
├── 실전 모의고사 (UC-15, UC-16)
├── 과목별 미니테스트 (UC-17)
├── 모의고사 이력/추이 (UC-18)
├── 합격 예측 (UC-19)
├── 출제확률 히트맵 (UC-09)
└── 게이미피케이션 (UC-27)
```

### Phase 4: 실기 코칭 + 최적화 (Week 13~16)

```
├── 실기 시나리오 (UC-20)
├── AI 채점 (UC-21, OpenAI 연동)
├── STAR-L 가이드 (UC-22)
├── PWA 오프라인 (NF-01)
├── 다크 모드 (NF-02)
└── 성능 최적화 + 최종 테스트
```

---

## Cursor AI 프롬프트 가이드

Cursor에서 코드 생성 시 아래 프롬프트를 활용하면 문서와 일관된 코드를 빠르게 생성할 수 있습니다.

### 프로젝트 컨텍스트 프롬프트 (.cursorrules)

```
이 프로젝트는 공공조달관리사 국가자격시험 대비 학습 웹앱입니다.

기술 스택:
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS + Shadcn/UI
- Supabase (PostgreSQL + Auth)
- Prisma ORM
- Zustand (상태관리)
- Recharts (차트)
- Framer Motion (애니메이션)
- Lucide React (아이콘)

디자인 규칙:
- Primary: Blue-800 (#1E40AF)
- 과목 컬러: 1과목 Violet, 2과목 Blue, 3과목 Emerald, 실기 Amber
- 폰트: Pretendard
- 다크 모드 지원 (Tailwind dark: 클래스)
- 반응형: 모바일 우선 (sm → md → lg)
- 카드 스타일: rounded-xl shadow-sm border border-gray-200

코딩 규칙:
- 컴포넌트: PascalCase.tsx, 'use client' 명시
- 유틸: camelCase.ts
- 타입: interface 우선, Props suffix 사용
- Tailwind 클래스 정렬: 레이아웃 → 크기 → 간격 → 타이포 → 배경 → 효과
```

### 컴포넌트 생성 프롬프트 예시

```
// 개념카드 컴포넌트 생성
"ConceptCard 컴포넌트를 만들어줘.
- 04_DesignGuide 5.3 개념카드 명세 참고
- 앞면/뒷면 플립 애니메이션 (Framer Motion)
- 자기평가 3단계 (어려움/보통/쉬움) 버튼
- 에빙하우스 간격 반영 (useStudyProgress 훅 연동)
- 다크모드 대응"

// 문제풀이 페이지 생성
"practice/quick 페이지를 만들어줘.
- 02_IA 5번 URL 라우팅 참고
- 03_UseCase UC-10 빠른 문제풀이 흐름 참고
- 과목/난이도/문항수 선택 → 문제 출제 → 채점 → 해설
- QuestionCard, OptionButton, ExplanationPanel 컴포넌트 사용"
```

---

## Prisma 스키마 (시작점)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String   @id @default(cuid())
  email           String   @unique
  nickname        String?
  targetExamDate  DateTime @default("2026-10-03T00:00:00Z")
  currentPhase    Int      @default(1)
  studyStartDate  DateTime @default(now())
  streakDays      Int      @default(0)
  lastStudyDate   DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  progress        UserProgress[]
  mockExams       MockExam[]
  practicalAnswers PracticalAnswer[]
}

model Subject {
  id            String  @id @default(cuid())
  name          String
  questionCount Int
  weightPercent Float
  textbookVolume Int
  order         Int

  mainTopics    MainTopic[]
  questions     Question[]
}

model MainTopic {
  id               String  @id @default(cuid())
  subjectId        String
  name             String
  order            Int
  estimatedWeight  Float?

  subject          Subject    @relation(fields: [subjectId], references: [id])
  subTopics        SubTopic[]
}

model SubTopic {
  id           String  @id @default(cuid())
  mainTopicId  String
  name         String
  order        Int

  mainTopic    MainTopic    @relation(fields: [mainTopicId], references: [id])
  detailItems  DetailItem[]
}

model DetailItem {
  id                 String  @id @default(cuid())
  subTopicId         String
  name               String
  predictionScore    Int     @default(3)  // 1~5
  crossSubjectLinks  String[]
  practicalLinks     String[]

  subTopic           SubTopic      @relation(fields: [subTopicId], references: [id])
  conceptCards       ConceptCard[]
  questions          Question[]
  userProgress       UserProgress[]
}

model ConceptCard {
  id             String  @id @default(cuid())
  detailItemId   String
  frontText      String
  backText       String
  category       String  // concept, compare, number, law, procedure
  difficulty     String  // basic, applied, advanced
  order          Int     @default(0)

  detailItem     DetailItem @relation(fields: [detailItemId], references: [id])
}

model Question {
  id               String   @id @default(cuid())
  detailItemId     String
  subjectId        String
  questionText     String
  options          String[] // 4개 선지
  correctAnswer    Int      // 0~3
  difficulty       Int      // 1~3
  explanation      String
  wrongExplanations String[] // 오답 해설
  tags             String[]

  detailItem       DetailItem @relation(fields: [detailItemId], references: [id])
  subject          Subject    @relation(fields: [subjectId], references: [id])
}

model MockExam {
  id             String   @id @default(cuid())
  userId         String
  questionIds    String[]
  answers        Int[]
  scoreBySubject Json     // {"subject1": 23, "subject2": 14, "subject3": 19}
  totalScore     Int?
  timeSpent      Int?     // seconds
  status         String   @default("in_progress") // in_progress, completed
  createdAt      DateTime @default(now())
  completedAt    DateTime?

  user           User @relation(fields: [userId], references: [id])
}

model UserProgress {
  id                  String   @id @default(cuid())
  userId              String
  detailItemId        String
  conceptCardMastered Boolean  @default(false)
  questionCorrectRate Float    @default(0)
  questionAttempts    Int      @default(0)
  reviewCount         Int      @default(0)
  lastReviewedAt      DateTime?
  nextReviewAt        DateTime?
  currentInterval     Int      @default(1) // days

  user                User       @relation(fields: [userId], references: [id])
  detailItem          DetailItem @relation(fields: [detailItemId], references: [id])

  @@unique([userId, detailItemId])
}

model PracticalAnswer {
  id                String   @id @default(cuid())
  userId            String
  scenarioId        String
  topicId           String   // 8개 주요항목 중 하나
  answerText        String
  aiScore           Float?
  structureScore    Float?   // STAR-L 구조 점수
  legalScore        Float?   // 법적 근거 점수
  logicScore        Float?   // 논리 구조 점수
  keywordScore      Float?   // 키워드 포함 점수
  feedbackText      String?
  modelAnswerDiff   String?
  grade             String?  // A, B, C, D
  createdAt         DateTime @default(now())

  user              User @relation(fields: [userId], references: [id])
}
```

---

## 폴더 구조 (최종)

```
ppms/
├── .env.local
├── .cursorrules
├── prisma/
│   ├── schema.prisma
│   └── seed.ts              // 출제기준 시드 데이터
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx          // 대시보드
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── learn/            // 02_IA 참조
│   │   ├── practice/
│   │   ├── exam/
│   │   ├── practical/
│   │   ├── dashboard/
│   │   ├── settings/
│   │   └── api/              // 03_UseCase 6장 API 참조
│   ├── components/           // 02_IA 6장 컴포넌트 참조
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── learn/
│   │   ├── practice/
│   │   ├── exam/
│   │   ├── practical/
│   │   └── shared/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useStudyProgress.ts
│   │   ├── useEbbinghaus.ts
│   │   ├── useAdaptiveDifficulty.ts
│   │   └── useExamTimer.ts
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── prisma.ts
│   │   ├── utils.ts
│   │   └── openai.ts
│   ├── store/
│   │   ├── useUserStore.ts
│   │   ├── useStudyStore.ts
│   │   └── useExamStore.ts
│   └── types/
│       ├── question.types.ts
│       ├── card.types.ts
│       ├── exam.types.ts
│       └── user.types.ts
├── public/
│   └── manifest.json         // PWA
└── docs/                     // 본 문서 폴더 (cursor-dev)
```

---

## 핵심 참조 데이터

| 항목 | 수치 |
|---|---|
| 필기 과목 수 | 3과목 |
| 총 문항 수 | 80문항 (30+20+30) |
| 출제기준 세세항목 | ~170개 |
| 필기 합격 기준 | 과목별 40점↑ + 평균 60점↑ |
| 실기 주요항목 | 8개 |
| 문제은행 목표 | 과목별 300문항+ (총 1,000+) |
| 개념카드 목표 | 세세항목당 2~5장 (총 500+) |
| 에빙하우스 간격 | 1→3→7→14→30일 |
| 시험일 | 필기 2026.10.03 / 실기 2026.11.14 |

---

*문서버전: v1.0 | 작성일: 2026.03.17 | Cursor App 개발 통합 가이드*
