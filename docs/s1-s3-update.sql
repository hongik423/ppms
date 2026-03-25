-- ============================================================
-- 공공조달관리사 PPMS - S1~S3 기존 과목 데이터 업데이트
-- Supabase SQL Editor 실행용
-- 실행일: 2026-03-18
-- subjects.json v3.0.0 / keywords.json v3.0.0 기준 동기화
-- ============================================================
-- ★ 이 SQL은 기존 S1~S3 Subject의 weightPercent를 수정합니다.
-- ★ 필기 3과목 비중: S1(37.5%) + S2(25%) + S3(37.5%)
-- ============================================================

BEGIN;

-- 1. Subject weightPercent 업데이트 (기존 30/20/30 → 37.5/25/37.5)
UPDATE "Subject"
SET "weightPercent" = 37.5
WHERE name LIKE '%1과목%' OR name LIKE '%공공조달과 법제도%';

UPDATE "Subject"
SET "weightPercent" = 25.0
WHERE name LIKE '%2과목%' OR name LIKE '%조달계획%';

UPDATE "Subject"
SET "weightPercent" = 37.5
WHERE name LIKE '%3과목%' OR name LIKE '%공공계약관리%';

-- 2. 전체 과목 현황 확인
SELECT
  s.id,
  s.name AS "과목명",
  s."questionCount" AS "문항수",
  s."weightPercent" AS "비중(%)",
  s."textbookVolume" AS "교재권수",
  s."order" AS "순서",
  COUNT(DISTINCT mt.id) AS "주요항목",
  COUNT(DISTINCT st.id) AS "세부항목",
  COUNT(DISTINCT di.id) AS "세세항목"
FROM "Subject" s
LEFT JOIN "MainTopic" mt ON mt."subjectId" = s.id
LEFT JOIN "SubTopic" st ON st."mainTopicId" = mt.id
LEFT JOIN "DetailItem" di ON di."subTopicId" = st.id
GROUP BY s.id, s.name, s."questionCount", s."weightPercent", s."textbookVolume", s."order"
ORDER BY s."order";

COMMIT;
