/*
  Supabase Advisors: rls_disabled_in_public 해소

  각 프로젝트(PPMS hwexgpgkhfilnuciewcp, PlusPMS sqhrsvgwbxfbktyqsdjn)에서
  Dashboard → SQL Editor → 아래 전체 실행.

  전제:
  - Prisma 스키마와 동일한 public 테이블명(PascalCase, 따옴표) 사용
  - API/Prisma는 DB postgres(또는 service_role) 연결로 RLS 우회 — 앱 동작 유지
  - 프론트 Realtime은 Supabase Auth 로그인 사용자(authenticated)만
    본인 User / UserProgress 행 SELECT 가능

  실행 후: Advisors에서 해당 경고가 사라지는지 확인.
*/

-- ---------------------------------------------------------------------------
-- 1) 애플리케이션 테이블에 RLS 활성화
-- ---------------------------------------------------------------------------
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Subject" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MainTopic" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SubTopic" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DetailItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ConceptCard" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Question" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "MockExam" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PracticalAnswer" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Bookmark" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StudyPlan" ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- 2) Realtime용: 로그인 사용자만 본인 프로필 조회 (useRealtimeUser)
--    auth.users.id ↔ "User"."authUserId"
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "app_user_select_own" ON "User";
CREATE POLICY "app_user_select_own" ON "User"
  FOR SELECT
  TO authenticated
  USING (
    "authUserId" IS NOT NULL
    AND "authUserId" = (SELECT auth.uid())::text
  );

-- ---------------------------------------------------------------------------
-- 3) Realtime용: 로그인 사용자만 본인 학습 진행 조회 (useRealtimeProgress)
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "app_userprogress_select_own" ON "UserProgress";
CREATE POLICY "app_userprogress_select_own" ON "UserProgress"
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM "User" u
      WHERE u.id = "UserProgress"."userId"
        AND u."authUserId" IS NOT NULL
        AND u."authUserId" = (SELECT auth.uid())::text
    )
  );

-- anon 역할: 위 정책 없음 → PostgREST(anon 키)로는 행 접근 불가
-- 나머지 테이블: 정책 없음 → 클라이언트 직접 조회 불가, 서버(Prisma)는 우회
