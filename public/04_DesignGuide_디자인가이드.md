# Design Guide: 공공조달관리사 필승 합격 시스템
## Design System & Style Guide v1.0

---

## 1. 디자인 원칙

### 1.1 핵심 원칙
| 원칙 | 설명 | 적용 기준 |
|---|---|---|
| **집중(Focus)** | 학습에 방해되지 않는 깔끔한 UI | 불필요한 장식 배제, 콘텐츠 중심 레이아웃 |
| **명료(Clarity)** | 정보 계층이 명확한 시각 구조 | 제목-본문-보조정보 3단계 타이포그래피 |
| **격려(Encouragement)** | 학습 동기를 유지시키는 긍정적 피드백 | 진도 시각화, 뱃지, 컬러 피드백 |
| **효율(Efficiency)** | 최소 탭으로 원하는 기능 접근 | 주요 기능 2탭 이내 도달 |

### 1.2 디자인 키워드
**신뢰감 있는 공공 이미지** + **현대적 학습 앱 UX** + **집중력을 돕는 차분한 톤**

---

## 2. 컬러 시스템

### 2.1 Primary Colors

```
Primary (메인 브랜드 컬러)
┌────────────────────────────────────────────────┐
│  #1E40AF  (Blue-800)  — Primary Default        │
│  #1D4ED8  (Blue-700)  — Primary Hover          │
│  #2563EB  (Blue-600)  — Primary Active          │
│  #3B82F6  (Blue-500)  — Primary Light           │
│  #DBEAFE  (Blue-100)  — Primary Background      │
│  #EFF6FF  (Blue-50)   — Primary Subtle          │
└────────────────────────────────────────────────┘
```

**선택 근거:** 공공기관 신뢰감(Blue) + 학습 집중도 향상 + 가독성 확보

### 2.2 Semantic Colors

```
Success (정답/합격/완료)
│  #059669  (Emerald-600)  — Default
│  #D1FAE5  (Emerald-100)  — Background

Danger (오답/불합격/경고)
│  #DC2626  (Red-600)  — Default
│  #FEE2E2  (Red-100)  — Background

Warning (주의/보강필요)
│  #D97706  (Amber-600)  — Default
│  #FEF3C7  (Amber-100)  — Background

Info (정보/안내)
│  #2563EB  (Blue-600)  — Default
│  #DBEAFE  (Blue-100)  — Background
```

### 2.3 과목별 컬러

```
1과목 (공공조달과 법제도 이해)
│  #7C3AED  (Violet-600)  — 법률/제도 이미지

2과목 (공공조달계획 수립 및 분석)
│  #2563EB  (Blue-600)  — 분석/계획 이미지

3과목 (공공계약관리)
│  #059669  (Emerald-600)  — 관리/실행 이미지

실기 (공공조달 관리실무)
│  #D97706  (Amber-600)  — 실무/실전 이미지
```

### 2.4 Neutral Colors

```
Gray Scale
│  #111827  (Gray-900)  — Heading Text
│  #374151  (Gray-700)  — Body Text
│  #6B7280  (Gray-500)  — Secondary Text
│  #9CA3AF  (Gray-400)  — Placeholder
│  #D1D5DB  (Gray-300)  — Border
│  #E5E7EB  (Gray-200)  — Divider
│  #F3F4F6  (Gray-100)  — Background
│  #F9FAFB  (Gray-50)   — Page Background
│  #FFFFFF  (White)      — Card/Surface
```

### 2.5 다크 모드 색상

```
Dark Mode
│  #0F172A  (Slate-900)  — Page Background
│  #1E293B  (Slate-800)  — Card/Surface
│  #334155  (Slate-700)  — Elevated Surface
│  #475569  (Slate-600)  — Border
│  #94A3B8  (Slate-400)  — Secondary Text
│  #CBD5E1  (Slate-300)  — Body Text
│  #F1F5F9  (Slate-100)  — Heading Text
```

---

## 3. 타이포그래피

### 3.1 폰트 패밀리

```css
/* Primary Font — 한글 본문 + UI */
font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
             'Segoe UI', Roboto, sans-serif;

/* Mono Font — 코드, 숫자 데이터 */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

**Pretendard 선택 근거:** 가독성 우수, 웹폰트 최적화, 한영 혼합 자연스러움

### 3.2 타입 스케일

| 용도 | Tailwind Class | 크기 | 굵기 | 행간 |
|---|---|---|---|---|
| **Display** (D-Day 카운터) | text-4xl md:text-5xl | 36/48px | font-bold (700) | 1.1 |
| **H1** (페이지 제목) | text-2xl md:text-3xl | 24/30px | font-bold (700) | 1.2 |
| **H2** (섹션 제목) | text-xl md:text-2xl | 20/24px | font-semibold (600) | 1.3 |
| **H3** (카드 제목) | text-lg | 18px | font-semibold (600) | 1.4 |
| **Body** (본문) | text-base | 16px | font-normal (400) | 1.6 |
| **Body Small** (보조 텍스트) | text-sm | 14px | font-normal (400) | 1.5 |
| **Caption** (라벨, 뱃지) | text-xs | 12px | font-medium (500) | 1.4 |

### 3.3 문제/해설 텍스트

```
문제 본문:   text-base font-medium leading-relaxed text-gray-900
선택지:      text-base font-normal text-gray-700
해설 제목:   text-sm font-semibold text-blue-800
해설 본문:   text-sm font-normal leading-relaxed text-gray-600
법조문 인용: text-sm font-normal italic text-gray-500 border-l-2 pl-3
```

---

## 4. 간격 시스템 (Spacing)

### 4.1 기본 단위

```
4px 기반 스케일 (Tailwind 기본)
│  p-1  (4px)   — 아이콘 내부 패딩
│  p-2  (8px)   — 뱃지 패딩, 밀집 UI
│  p-3  (12px)  — 버튼 세로 패딩
│  p-4  (16px)  — 카드 내부 기본 패딩
│  p-5  (20px)  — 섹션 내부 패딩
│  p-6  (24px)  — 카드 넓은 패딩
│  p-8  (32px)  — 섹션 간 간격
```

### 4.2 레이아웃 간격

```
Page Container:  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
Section Gap:     space-y-8  (32px)
Card Gap:        gap-4 md:gap-6  (16/24px)
Card Padding:    p-4 md:p-6  (16/24px)
Form Field Gap:  space-y-4  (16px)
```

---

## 5. 컴포넌트 디자인 명세

### 5.1 카드 (Card)

```
기본 카드
┌─────────────────────────────┐
│ bg-white rounded-xl          │
│ border border-gray-200       │
│ shadow-sm                    │
│ p-4 md:p-6                  │
│ hover:shadow-md transition   │
└─────────────────────────────┘

다크 모드:
│ dark:bg-slate-800            │
│ dark:border-slate-700        │

과목별 카드 (좌측 보더 강조):
│ border-l-4 border-l-violet-600  (1과목)
│ border-l-4 border-l-blue-600    (2과목)
│ border-l-4 border-l-emerald-600 (3과목)
```

### 5.2 버튼 (Button)

```
Primary Button:
  bg-blue-800 text-white rounded-lg px-6 py-3
  hover:bg-blue-700 active:bg-blue-600
  font-semibold text-sm
  transition-colors duration-200
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2

Secondary Button:
  bg-white text-blue-800 border border-blue-800 rounded-lg px-6 py-3
  hover:bg-blue-50

Danger Button:
  bg-red-600 text-white rounded-lg px-6 py-3
  hover:bg-red-500

Ghost Button:
  text-gray-600 hover:bg-gray-100 rounded-lg px-4 py-2

Button Sizes:
  sm: px-3 py-1.5 text-xs
  md: px-6 py-3 text-sm (기본)
  lg: px-8 py-4 text-base
```

### 5.3 개념카드 (ConceptCard)

```
카드 컨테이너:
┌─────────────────────────────────┐
│  w-full max-w-lg mx-auto        │
│  aspect-[3/4]                    │
│  perspective-1000               │
│  cursor-pointer                 │
│                                 │
│  [앞면]                         │
│  bg-white rounded-2xl shadow-lg │
│  flex items-center justify-center│
│  p-8                            │
│  backface-hidden                │
│  text-center text-xl font-bold  │
│                                 │
│  [뒷면]                         │
│  bg-blue-50 rounded-2xl shadow-lg│
│  p-6 overflow-y-auto            │
│  backface-hidden rotate-y-180   │
│  text-left text-sm leading-relaxed│
│                                 │
│  Flip Animation:                │
│  transition: transform 0.6s     │
│  transform-style: preserve-3d   │
└─────────────────────────────────┘

자기평가 버튼 (하단):
  ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 😰 어려움 │ │ 🤔 보통  │ │ 😊 쉬움  │
  │ bg-red-50 │ │bg-amber-50│ │bg-green-50│
  │ border-red│ │border-amber││border-green│
  └──────────┘ └──────────┘ └──────────┘
```

### 5.4 문제 카드 (QuestionCard)

```
문제 영역:
┌─────────────────────────────────────┐
│  bg-white rounded-xl p-6 shadow-sm  │
│                                     │
│  [과목 뱃지]  text-xs px-2 py-0.5   │
│  bg-violet-100 text-violet-800      │
│  rounded-full                       │
│                                     │
│  [문제 번호] text-sm text-gray-500   │
│  Q.5 / 20                           │
│                                     │
│  [문제 본문]                         │
│  text-base font-medium text-gray-900│
│  leading-relaxed mb-6               │
│                                     │
│  [선택지] 클릭 영역                   │
│  ┌───────────────────────────────┐  │
│  │ ① 선택지 텍스트               │  │
│  │ border border-gray-200         │  │
│  │ rounded-lg p-4 mb-3           │  │
│  │ hover:border-blue-400          │  │
│  │ hover:bg-blue-50               │  │
│  └───────────────────────────────┘  │
│                                     │
│  [선택 후 상태]                      │
│  정답 선택: border-green-500 bg-green-50 ✅ │
│  오답 선택: border-red-500 bg-red-50 ❌     │
│  정답 표시: border-green-500 bg-green-50     │
└─────────────────────────────────────┘

해설 패널 (정답 확인 후 펼쳐짐):
┌─────────────────────────────────────┐
│  bg-gray-50 rounded-lg p-4 mt-4    │
│  border border-gray-200             │
│                                     │
│  📗 정답 해설                       │
│  text-sm text-gray-700              │
│                                     │
│  ❌ 오답 해설 (각 선지별)            │
│  text-sm text-gray-500              │
│                                     │
│  📜 관련 법조문                      │
│  text-sm italic text-gray-500       │
│  border-l-2 border-blue-300 pl-3    │
└─────────────────────────────────────┘
```

### 5.5 D-Day 카운터

```
┌────────────────────────────────────┐
│  bg-gradient-to-r from-blue-800    │
│  to-blue-600 rounded-2xl p-6      │
│  text-white text-center            │
│                                    │
│  "필기시험까지"                     │
│  text-sm font-normal opacity-80    │
│                                    │
│  "D-200"                           │
│  text-5xl font-bold                │
│  tabular-nums                      │
│                                    │
│  "2026.10.03"                      │
│  text-sm font-normal opacity-60    │
└────────────────────────────────────┘
```

### 5.6 진도 바 (ProgressBar)

```
과목별 진도 바:
┌────────────────────────────────────┐
│  [과목 라벨]  [퍼센트]              │
│  1과목 공공조달과 법제도      75%   │
│  ┌────────────────────────────┐   │
│  │ ████████████████░░░░░░    │   │
│  │ bg-gray-200 rounded-full   │   │
│  │ h-2.5                      │   │
│  │ [inner] bg-violet-600      │   │
│  │ rounded-full transition    │   │
│  └────────────────────────────┘   │
└────────────────────────────────────┘
```

### 5.7 모의고사 타이머

```
┌────────────────────────┐
│  bg-white rounded-lg    │
│  shadow-sm border        │
│  px-4 py-2 flex items-center │
│                          │
│  ⏱️ 01:42:30            │
│  text-lg font-mono       │
│  tabular-nums            │
│                          │
│  30분↓ → text-amber-600  │
│  10분↓ → text-red-600    │
│         + animate-pulse  │
└────────────────────────┘
```

### 5.8 뱃지 (Badge)

```
난이도 뱃지:
  기초: bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full
  응용: bg-amber-100 text-amber-800
  실전: bg-red-100 text-red-800

과목 뱃지:
  1과목: bg-violet-100 text-violet-800
  2과목: bg-blue-100 text-blue-800
  3과목: bg-emerald-100 text-emerald-800
  실기: bg-amber-100 text-amber-800

상태 뱃지:
  합격: bg-green-100 text-green-800
  불합격: bg-red-100 text-red-800
  미학습: bg-gray-100 text-gray-600
  학습중: bg-blue-100 text-blue-800
  마스터: bg-yellow-100 text-yellow-800
```

---

## 6. 레이아웃 시스템

### 6.1 데스크톱 레이아웃 (1200px+)

```
┌──────────────────────────────────────────────┐
│  Header (GNB)  h-16  bg-white shadow-sm      │
│  fixed top-0 w-full z-50                     │
├──────────────────────────────────────────────┤
│         │                                     │
│ Sidebar │        Main Content                 │
│ w-64    │        flex-1                       │
│ fixed   │        ml-64 pt-16                  │
│ left-0  │        max-w-5xl mx-auto            │
│ top-16  │        px-6 py-8                    │
│         │                                     │
│ 과목 트리│        [Page Content]               │
│ 진도 요약│                                     │
│ 빠른링크 │                                     │
│         │                                     │
└──────────────────────────────────────────────┘
```

### 6.2 태블릿 레이아웃 (768~1199px)

```
┌──────────────────────────────────────┐
│  Header (GNB)  h-16                  │
│  ☰ 햄버거 메뉴 (사이드바 토글)       │
├──────────────────────────────────────┤
│                                      │
│           Main Content               │
│           w-full                     │
│           px-4 py-6                  │
│                                      │
│           [Page Content]             │
│                                      │
└──────────────────────────────────────┘
│  Sidebar: 오버레이 (☰ 클릭 시 열림)  │
│  w-72 bg-white shadow-2xl z-40       │
```

### 6.3 모바일 레이아웃 (767px 이하)

```
┌──────────────────────────┐
│  Header h-14              │
│  로고 + 프로필             │
├──────────────────────────┤
│                           │
│      Main Content         │
│      px-4 py-4            │
│      pb-20 (탭바 여백)    │
│                           │
│      [Page Content]       │
│                           │
├──────────────────────────┤
│  Bottom Tab Bar           │
│  fixed bottom-0           │
│  h-16 bg-white            │
│  border-t shadow-lg       │
│  🏠  📚  📝  🎯  📊    │
│  홈  학습 문제 모의 분석   │
└──────────────────────────┘
```

### 6.4 그리드 시스템

```
대시보드 카드 그리드:
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6

과목 선택 그리드:
  grid grid-cols-1 sm:grid-cols-3 gap-4

문항 네비게이터 (모의고사):
  grid grid-cols-10 gap-1

설정 폼:
  max-w-2xl mx-auto space-y-6
```

---

## 7. 아이콘 시스템

### 7.1 아이콘 라이브러리
**Lucide React** (일관성 + 경량 + Tailwind 호환)

### 7.2 주요 아이콘 매핑

```
네비게이션:
  홈        → Home
  학습      → BookOpen
  문제풀이  → PenTool
  모의고사  → Target
  실기코칭  → Edit3
  학습분석  → BarChart3
  설정      → Settings

기능:
  D-Day     → Calendar
  타이머    → Clock
  정답      → CheckCircle2
  오답      → XCircle
  북마크    → Bookmark / BookmarkCheck
  알림      → Bell
  검색      → Search
  필터      → Filter
  뒤로가기  → ArrowLeft
  다크모드  → Moon / Sun

학습:
  개념카드  → CreditCard
  비교표    → Table2
  숫자암기  → Hash
  법조문    → Scale
  절차도    → GitBranch
  히트맵    → Grid3x3

상태:
  완료      → CheckCircle2 (text-green-600)
  진행중    → Loader2 (text-blue-600 animate-spin)
  미완료    → Circle (text-gray-400)
  위험      → AlertTriangle (text-red-600)
  경고      → AlertCircle (text-amber-600)
```

---

## 8. 인터랙션 & 애니메이션

### 8.1 전환 효과

```css
/* 기본 전환 */
transition-all duration-200 ease-in-out

/* 카드 호버 */
hover:shadow-md hover:-translate-y-0.5 transition-all duration-200

/* 개념카드 플립 */
.card-flip {
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.card-flip.flipped {
  transform: rotateY(180deg);
}

/* 페이지 전환 (Framer Motion) */
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}

/* 정답/오답 피드백 */
정답: scale(1.02) + bg-green-50 (200ms ease-out)
오답: shake animation + bg-red-50
```

### 8.2 마이크로 인터랙션

```
선택지 선택:
  클릭 → 0.1s scale(0.98) → 0.2s 배경색 전환

진도 바 업데이트:
  transition: width 0.8s ease-out (학습 완료 시 부드러운 증가)

D-Day 카운터:
  매일 자정 → 숫자 카운트다운 애니메이션

뱃지 획득:
  confetti 효과 (framer-motion) + 뱃지 팝업 (0.5s)

북마크 토글:
  scale(1.2) → scale(1) bounce + 색상 전환

모의고사 타임아웃 경고:
  10분↓ 시 → 타이머 pulse 애니메이션 + 빨간색 전환
```

---

## 9. 반응형 디자인 규칙

### 9.1 브레이크포인트 (Tailwind 기본)

| 이름 | 최소 너비 | 대상 디바이스 |
|---|---|---|
| sm | 640px | 큰 모바일 |
| md | 768px | 태블릿 |
| lg | 1024px | 작은 데스크톱 |
| xl | 1280px | 데스크톱 |

### 9.2 반응형 컴포넌트 규칙

```
개념카드:
  모바일 → 전체 화면 (w-full h-[70vh])
  태블릿 → max-w-md mx-auto
  데스크톱 → max-w-lg mx-auto

문제풀이:
  모바일 → 단일 열, 세로 스크롤
  데스크톱 → 좌측 문제 + 우측 해설 split view

모의고사 네비게이터:
  모바일 → 하단 시트 (바텀 올리기)
  데스크톱 → 우측 사이드패널

대시보드 차트:
  모바일 → 가로 스크롤 또는 세로 Bar Chart
  데스크톱 → 풀 사이즈 차트

히트맵:
  모바일 → 가로 스크롤 + 핀치 줌
  데스크톱 → 전체 표시
```

---

## 10. 접근성 가이드라인

### 10.1 컬러 대비

```
WCAG AA 기준 (최소 4.5:1):
  본문 텍스트: gray-700 (#374151) on white → 8.5:1 ✅
  보조 텍스트: gray-500 (#6B7280) on white → 5.0:1 ✅
  버튼 텍스트: white on blue-800 (#1E40AF) → 8.6:1 ✅

색상만으로 정보 전달 금지:
  정답: 녹색 + ✅ 아이콘 + "정답" 텍스트
  오답: 빨간색 + ❌ 아이콘 + "오답" 텍스트
  합격: 녹색 + "합격" 텍스트
  불합격: 빨간색 + "불합격" 텍스트
```

### 10.2 키보드 네비게이션

```
Tab:          다음 포커스 요소 이동
Shift+Tab:    이전 포커스 요소
Enter/Space:  버튼 클릭, 선택지 선택
←→ 화살표:   문제 간 이동 (모의고사)
Escape:       모달/팝업 닫기

포커스 스타일:
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  focus-visible:outline-none
```

### 10.3 스크린 리더

```
이미지/아이콘: aria-label 필수
진도 바: role="progressbar" aria-valuenow aria-valuemin aria-valuemax
카드 플립: aria-live="polite" (뒷면 내용 읽어줌)
타이머: aria-live="assertive" (10분, 5분, 1분 알림)
문제 선택지: role="radiogroup" + role="radio"
```

---

## 11. 다크 모드 전환 규칙

### 11.1 토글 방식
- Tailwind `dark:` 클래스 (클래스 기반 전환)
- localStorage에 설정 저장
- 시스템 기본 설정 존중 (`prefers-color-scheme`)

### 11.2 전환 매핑

| Light Mode | Dark Mode |
|---|---|
| bg-white | dark:bg-slate-800 |
| bg-gray-50 | dark:bg-slate-900 |
| bg-gray-100 | dark:bg-slate-800 |
| text-gray-900 | dark:text-slate-100 |
| text-gray-700 | dark:text-slate-300 |
| text-gray-500 | dark:text-slate-400 |
| border-gray-200 | dark:border-slate-700 |
| shadow-sm | dark:shadow-slate-900/50 |

---

## 12. 데이터 시각화 가이드 (Recharts)

### 12.1 차트 컬러 팔레트

```
차트 색상 (6색 세트):
  #1E40AF  (Blue-800)    — 1차 데이터
  #7C3AED  (Violet-600)  — 2차 데이터
  #059669  (Emerald-600) — 3차 데이터
  #D97706  (Amber-600)   — 4차 데이터
  #DC2626  (Red-600)     — 5차 데이터/위험선
  #6B7280  (Gray-500)    — 보조 데이터
```

### 12.2 차트 유형별 적용

```
성적 추이 → LineChart
  X: 회차, Y: 점수
  과목별 3선 + 총점 1선 + 합격선(60점) 점선

과목별 정답률 → BarChart
  수평 Bar, 과목 컬러 적용

취약점 매트릭스 → ScatterChart
  X: 정답률, Y: 출제확률
  사분면 배경색 처리

학습 진도 → RadialBarChart
  과목별 도넛 게이지

출제확률 히트맵 → Custom (grid + 색상 매핑)
  셀 컬러: blue-100 ~ red-500 그라데이션
```

---

## 13. 파일 네이밍 & 코딩 규칙 (Cursor 개발용)

### 13.1 파일 네이밍

```
컴포넌트:  PascalCase.tsx       (예: ConceptCard.tsx)
페이지:    page.tsx              (Next.js App Router 규칙)
레이아웃:  layout.tsx
유틸:      camelCase.ts          (예: calculateScore.ts)
타입:      camelCase.types.ts    (예: question.types.ts)
훅:        useCamelCase.ts       (예: useStudyProgress.ts)
상수:      UPPER_SNAKE.ts        (예: EXAM_CONFIG.ts)
API:       route.ts              (Next.js API Routes)
```

### 13.2 컴포넌트 구조

```typescript
// components/learn/ConceptCard.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ConceptCardProps {
  front: string;
  back: string;
  category: 'concept' | 'compare' | 'number' | 'law' | 'procedure';
  difficulty: 'basic' | 'applied' | 'advanced';
  onReview: (rating: 'hard' | 'normal' | 'easy') => void;
}

export function ConceptCard({ front, back, category, difficulty, onReview }: ConceptCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className={cn(
        'w-full max-w-lg mx-auto cursor-pointer',
        'perspective-1000'
      )}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* 카드 내용 */}
    </motion.div>
  );
}
```

### 13.3 Tailwind 클래스 정렬 순서

```
1. 레이아웃 (flex, grid, position)
2. 크기 (w, h, max-w)
3. 간격 (m, p, gap)
4. 타이포그래피 (text, font)
5. 배경/보더 (bg, border, rounded)
6. 효과 (shadow, opacity)
7. 전환 (transition, duration)
8. 반응형 (sm:, md:, lg:)
9. 다크모드 (dark:)
10. 상태 (hover:, focus:, active:)
```

### 13.4 Shadcn/UI 기본 컴포넌트 활용

```
사용할 Shadcn 컴포넌트:
  Button, Card, Badge, Tabs, Dialog, Sheet,
  DropdownMenu, Select, Input, Textarea,
  Progress, Tooltip, Toast, Separator,
  RadioGroup, Checkbox, Switch, Slider
```

---

## 14. 주요 화면 디자인 토큰 요약

| 토큰 | Light | Dark |
|---|---|---|
| `--bg-page` | #F9FAFB | #0F172A |
| `--bg-card` | #FFFFFF | #1E293B |
| `--bg-elevated` | #F3F4F6 | #334155 |
| `--text-primary` | #111827 | #F1F5F9 |
| `--text-secondary` | #374151 | #CBD5E1 |
| `--text-muted` | #6B7280 | #94A3B8 |
| `--border` | #D1D5DB | #475569 |
| `--accent` | #1E40AF | #3B82F6 |
| `--success` | #059669 | #34D399 |
| `--danger` | #DC2626 | #F87171 |
| `--warning` | #D97706 | #FBBF24 |

---

*문서버전: v1.0 | 작성일: 2026.03.17 | Cursor App 개발용*
