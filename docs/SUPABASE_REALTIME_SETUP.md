# Supabase Realtime 설정 가이드

프론트엔드 ↔ 백엔드 ↔ DB 실시간 연결을 위해 Supabase Realtime을 사용합니다.

## 1. 데이터 흐름

```
[프론트엔드] ←→ [Next.js API] ←→ [Prisma] ←→ [Supabase PostgreSQL]
     ↑                                    ↓
     └──── Supabase Realtime (변경 이벤트) ──┘
```

- **쓰기**: API → Prisma → PostgreSQL
- **읽기(실시간)**: PostgreSQL WAL → Supabase Realtime → 프론트엔드

## 2. Supabase 대시보드 설정

1. [Supabase Dashboard](https://supabase.com/dashboard) → 프로젝트 선택
2. **Database** → **Replication** (또는 **Realtime**)
3. 다음 테이블에 대해 Realtime 활성화:
   - `UserProgress` – 학습 진도 변경
   - `User` – 스트릭/학습일 변경

## 3. PostgreSQL Replica Identity (선택)

Realtime이 `UPDATE`/`DELETE` 시 변경 내용 전체를 받으려면:

```sql
ALTER TABLE "UserProgress" REPLICA IDENTITY FULL;
ALTER TABLE "User" REPLICA IDENTITY FULL;
```

Supabase SQL Editor에서 실행합니다.

## 4. 연결 문자열

`Transaction Pooler`(포트 6543) 대신 **Direct Connection**(포트 5432)을 사용하세요.  
Realtime과 Transaction Pooler 조합 시 이벤트 누락이 발생할 수 있습니다.

`.env.local` 예시:

```
DATABASE_URL=postgresql://postgres:PASSWORD@db.xxx.supabase.co:5432/postgres
```

## 5. 사용 예시

### useRealtimeProgress

```tsx
import { useRealtimeProgress } from '@/hooks/useRealtimeProgress';

function MyComponent() {
  const userId = useUserStore((s) => s.user?.id);
  const refetch = useDashboardStore((s) => s.refetchProgress);

  useRealtimeProgress(userId ?? undefined, () => {
    refetch(); // 또는 로컬 상태 업데이트
  });
}
```

### useRealtimeUser

```tsx
import { useRealtimeUser } from '@/hooks/useRealtimeUser';

function StreakDisplay() {
  const userId = useUserStore((s) => s.user?.id);
  const updateUser = useUserStore((s) => s.updateUser);

  useRealtimeUser(userId ?? undefined, (payload) => {
    updateUser({
      streakDays: payload.streakDays,
      lastStudyDate: payload.lastStudyDate ? new Date(payload.lastStudyDate) : undefined,
    });
  });
}
```

## 6. API 라우트 요약

| 경로 | 메서드 | 역할 |
|------|--------|------|
| `/api/user/sync` | POST | Supabase Auth → Prisma User 동기화 |
| `/api/dashboard/progress` | GET | 대시보드 통계 (Prisma) |
| `/api/cards/today` | GET | 오늘 복습할 카드 (Prisma) |
| `/api/cards/[id]/review` | PUT | 카드 복습 저장 (Prisma) |
| `/api/exam/mock/create` | POST | 모의고사 생성 (Prisma) |
| `/api/exam/mock/[id]` | GET | 모의고사 문항 조회 |
| `/api/exam/mock/[id]/submit` | POST | 모의고사 제출 및 채점 (Prisma) |

## 7. 마이그레이션

스키마 변경 적용:

```bash
npx prisma db push
# 또는
npx prisma migrate dev --name add_auth_user_id
```

초기 데이터 시딩:

```bash
npm run db:seed
```
