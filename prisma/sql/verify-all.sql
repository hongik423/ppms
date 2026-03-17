-- ============================================================
-- 공공조달관리사 PPMS - 전체 데이터 검증 쿼리
-- Supabase SQL Editor에서 실행하여 데이터 무결성 확인
-- ============================================================

-- 1. 전체 과목별 현황 요약
SELECT
  s.name AS "과목명",
  s."weightPercent" AS "비중(%)",
  s."questionCount" AS "문항수",
  COUNT(DISTINCT mt.id) AS "주요항목",
  COUNT(DISTINCT st.id) AS "세부항목",
  COUNT(DISTINCT di.id) AS "세세항목"
FROM "Subject" s
LEFT JOIN "MainTopic" mt ON mt."subjectId" = s.id
LEFT JOIN "SubTopic" st ON st."mainTopicId" = mt.id
LEFT JOIN "DetailItem" di ON di."subTopicId" = st.id
GROUP BY s.id, s.name, s."weightPercent", s."questionCount"
ORDER BY s."order";

-- 2. 전체 세세항목 수 (목표: 312개)
SELECT COUNT(*) AS "전체 세세항목 수" FROM "DetailItem";

-- 3. 출제예측점수(predictionScore) 분포
SELECT
  s.name AS "과목",
  di."predictionScore" AS "예측점수",
  COUNT(*) AS "항목수"
FROM "DetailItem" di
JOIN "SubTopic" st ON st.id = di."subTopicId"
JOIN "MainTopic" mt ON mt.id = st."mainTopicId"
JOIN "Subject" s ON s.id = mt."subjectId"
GROUP BY s.name, di."predictionScore"
ORDER BY s.name, di."predictionScore" DESC;

-- 4. S4 실기 주요항목별 상세 현황
SELECT
  mt.name AS "주요항목",
  mt."estimatedWeight" AS "비중(%)",
  st.name AS "세부항목",
  COUNT(di.id) AS "세세항목수",
  ROUND(AVG(di."predictionScore"), 1) AS "평균예측점수"
FROM "MainTopic" mt
JOIN "SubTopic" st ON st."mainTopicId" = mt.id
LEFT JOIN "DetailItem" di ON di."subTopicId" = st.id
WHERE mt."subjectId" = 's4-practical'
GROUP BY mt.id, mt.name, mt."estimatedWeight", mt."order", st.id, st.name, st."order"
ORDER BY mt."order", st."order";

-- 5. 교차과목 연결(crossSubjectLinks) 확인 - S4 기준
SELECT
  di.id,
  di.name AS "세세항목",
  di."crossSubjectLinks" AS "연결된 필기항목"
FROM "DetailItem" di
JOIN "SubTopic" st ON st.id = di."subTopicId"
JOIN "MainTopic" mt ON mt.id = st."mainTopicId"
WHERE mt."subjectId" = 's4-practical'
  AND array_length(di."crossSubjectLinks", 1) > 0
ORDER BY di.id;

-- 6. 고출제확률 항목 (predictionScore >= 5) 목록
SELECT
  s.name AS "과목",
  mt.name AS "주요항목",
  di.name AS "세세항목",
  di."predictionScore" AS "예측점수"
FROM "DetailItem" di
JOIN "SubTopic" st ON st.id = di."subTopicId"
JOIN "MainTopic" mt ON mt.id = st."mainTopicId"
JOIN "Subject" s ON s.id = mt."subjectId"
WHERE di."predictionScore" >= 5
ORDER BY s."order", mt."order", di.id;

-- 7. ConceptCard 및 Question 수 (학습 콘텐츠 현황)
SELECT
  s.name AS "과목",
  COUNT(DISTINCT cc.id) AS "개념카드수",
  COUNT(DISTINCT q.id) AS "문제수"
FROM "Subject" s
LEFT JOIN "MainTopic" mt ON mt."subjectId" = s.id
LEFT JOIN "SubTopic" st ON st."mainTopicId" = mt.id
LEFT JOIN "DetailItem" di ON di."subTopicId" = st.id
LEFT JOIN "ConceptCard" cc ON cc."detailItemId" = di.id
LEFT JOIN "Question" q ON q."detailItemId" = di.id
GROUP BY s.id, s.name
ORDER BY s."order";
