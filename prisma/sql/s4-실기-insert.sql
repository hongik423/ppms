-- ============================================================
-- 공공조달관리사 PPMS - S4 실기(공공조달 관리실무) 데이터 삽입
-- Supabase SQL Editor 실행용
-- 실행일: 2026-03-18
-- 출제기준 기반: 8 주요항목, 25 세부항목, 91 세세항목
-- ============================================================

-- ★ 주의: 기존 S4 데이터가 있으면 먼저 삭제 후 실행하세요
-- 삭제가 필요한 경우 아래 주석을 해제하세요:
-- DELETE FROM "DetailItem" WHERE "subTopicId" IN (
--   SELECT id FROM "SubTopic" WHERE "mainTopicId" IN (
--     SELECT id FROM "MainTopic" WHERE "subjectId" IN (
--       SELECT id FROM "Subject" WHERE name LIKE '%실기%'
--     )
--   )
-- );
-- DELETE FROM "SubTopic" WHERE "mainTopicId" IN (
--   SELECT id FROM "MainTopic" WHERE "subjectId" IN (
--     SELECT id FROM "Subject" WHERE name LIKE '%실기%'
--   )
-- );
-- DELETE FROM "MainTopic" WHERE "subjectId" IN (
--   SELECT id FROM "Subject" WHERE name LIKE '%실기%'
-- );
-- DELETE FROM "Subject" WHERE name LIKE '%실기%';

BEGIN;

-- ============================================================
-- 1. Subject (과목) 삽입
-- ============================================================
INSERT INTO "Subject" (id, name, "questionCount", "weightPercent", "textbookVolume", "order")
VALUES (
  's4-practical',
  '실기: 공공조달 관리실무',
  0,
  100.0,
  4,
  4
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "questionCount" = EXCLUDED."questionCount",
  "weightPercent" = EXCLUDED."weightPercent",
  "textbookVolume" = EXCLUDED."textbookVolume",
  "order" = EXCLUDED."order";

-- ============================================================
-- 2. MainTopic (주요항목) 8개 삽입
-- ============================================================
INSERT INTO "MainTopic" (id, "subjectId", name, "order", "estimatedWeight") VALUES
  ('s4-mt1', 's4-practical', '공공조달 입찰 참가 준비', 1, 10),
  ('s4-mt2', 's4-practical', '공공조달 입찰계획 수립', 2, 15),
  ('s4-mt3', 's4-practical', '입찰실행 관리', 3, 15),
  ('s4-mt4', 's4-practical', '계약일반관리', 4, 20),
  ('s4-mt5', 's4-practical', '공급대상물 유형별 계약관리', 5, 15),
  ('s4-mt6', 's4-practical', '공공조달 리스크 관리', 6, 10),
  ('s4-mt7', 's4-practical', '공공조달 법제도 활용', 7, 10),
  ('s4-mt8', 's4-practical', '전자조달시스템 활용', 8, 5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "order" = EXCLUDED."order",
  "estimatedWeight" = EXCLUDED."estimatedWeight";

-- ============================================================
-- 3. SubTopic (세부항목) 25개 삽입
-- ============================================================
INSERT INTO "SubTopic" (id, "mainTopicId", name, "order") VALUES
  -- MT1: 공공조달 입찰 참가 준비 (3 ST)
  ('s4-mt1-st1', 's4-mt1', '공공조달 참여 준비하기', 1),
  ('s4-mt1-st2', 's4-mt1', '입찰자격 정보관리하기', 2),
  ('s4-mt1-st3', 's4-mt1', '경쟁입찰 참가자격 신청하기', 3),

  -- MT2: 공공조달 입찰계획 수립 (3 ST)
  ('s4-mt2-st1', 's4-mt2', '환경분석하기', 1),
  ('s4-mt2-st2', 's4-mt2', '조달 수요정보 수집하기', 2),
  ('s4-mt2-st3', 's4-mt2', '공급계획 수립하기', 3),

  -- MT3: 입찰실행 관리 (3 ST)
  ('s4-mt3-st1', 's4-mt3', '입찰서류 작성하기', 1),
  ('s4-mt3-st2', 's4-mt3', '입찰평가 기준 검증하기', 2),
  ('s4-mt3-st3', 's4-mt3', '협상 관리하기', 3),

  -- MT4: 계약일반관리 (4 ST)
  ('s4-mt4-st1', 's4-mt4', '계약 체결 관리하기', 1),
  ('s4-mt4-st2', 's4-mt4', '계약 이행 관리하기', 2),
  ('s4-mt4-st3', 's4-mt4', '계약 변경 관리하기', 3),
  ('s4-mt4-st4', 's4-mt4', '계약 종결 관리하기', 4),

  -- MT5: 공급대상물 유형별 계약관리 (3 ST)
  ('s4-mt5-st1', 's4-mt5', '공사 계약 관리하기', 1),
  ('s4-mt5-st2', 's4-mt5', '물품 계약 관리하기', 2),
  ('s4-mt5-st3', 's4-mt5', '용역 계약 관리하기', 3),

  -- MT6: 공공조달 리스크 관리 (4 ST)
  ('s4-mt6-st1', 's4-mt6', '공급리스크 식별하기', 1),
  ('s4-mt6-st2', 's4-mt6', '위험도 평가하기', 2),
  ('s4-mt6-st3', 's4-mt6', '리스크 대응계획 수립하기', 3),
  ('s4-mt6-st4', 's4-mt6', '리스크 발생 모니터링하기', 4),

  -- MT7: 공공조달 법제도 활용 (3 ST)
  ('s4-mt7-st1', 's4-mt7', '법령 활용하기', 1),
  ('s4-mt7-st2', 's4-mt7', '분쟁 대응하기', 2),
  ('s4-mt7-st3', 's4-mt7', '우대제도 활용하기', 3),

  -- MT8: 전자조달시스템 활용 (2 ST)
  ('s4-mt8-st1', 's4-mt8', '전자조달시스템 이용하기', 1),
  ('s4-mt8-st2', 's4-mt8', '조달데이터 활용하기', 2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "order" = EXCLUDED."order";

-- ============================================================
-- 4. DetailItem (세세항목) 91개 삽입
-- ============================================================

-- ---- MT1-ST1: 공공조달 참여 준비하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt1-st1-d1', 's4-mt1-st1', '공공조달 참가를 위한 관련 고유 법령과 일반제도 확인', 3, '{}', '{}'),
  ('s4-mt1-st1-d2', 's4-mt1-st1', '관련 규정에 따라 경쟁입찰참가자격 요건 검토', 4, '{"S1-MT5-ST2-D1"}', '{}'),
  ('s4-mt1-st1-d3', 's4-mt1-st1', '관련 규정에 따라 직접생산확인기준 검토', 3, '{"S1-MT4-ST1-D3"}', '{}'),
  ('s4-mt1-st1-d4', 's4-mt1-st1', '관련 규정에 따라 적합한 업종 검토', 3, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT1-ST2: 입찰자격 정보관리하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt1-st2-d1', 's4-mt1-st2', '공급대상물 유형별 품명/세부품명 신규 등록', 3, '{}', '{}'),
  ('s4-mt1-st2-d2', 's4-mt1-st2', '변동사항 발생 시 경쟁입찰참가자격 등록증 정보 갱신', 3, '{}', '{}'),
  ('s4-mt1-st2-d3', 's4-mt1-st2', '공급 물품에 대한 목록화 작업 수행', 3, '{"S1-MT3-ST3-D1"}', '{}'),
  ('s4-mt1-st2-d4', 's4-mt1-st2', '입찰 참여를 위한 필요 제출서류 요건별 준비', 3, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT1-ST3: 경쟁입찰 참가자격 신청하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt1-st3-d1', 's4-mt1-st3', '경쟁입찰참가자격등록 문서 작성', 3, '{}', '{}'),
  ('s4-mt1-st3-d2', 's4-mt1-st3', '경쟁입찰참가자격등록증에 세부품명 등록', 2, '{}', '{}'),
  ('s4-mt1-st3-d3', 's4-mt1-st3', '경쟁입찰참가자격등록증에 입찰대리인 등록', 2, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT2-ST1: 환경분석하기 (6개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt2-st1-d1', 's4-mt2-st1', '입찰계획 수립을 위한 공공조달 동향 관련 자료 수집', 3, '{}', '{}'),
  ('s4-mt2-st1-d2', 's4-mt2-st1', '수집된 자료를 기반으로 공공조달 동향 분석', 4, '{}', '{}'),
  ('s4-mt2-st1-d3', 's4-mt2-st1', '분석결과를 기반으로 수요기관의 조달계획 정보 식별', 4, '{"S2-MT1-ST1-D1"}', '{}'),
  ('s4-mt2-st1-d4', 's4-mt2-st1', '분석결과를 기반으로 정책·제도·법률 확인', 4, '{"S1-MT4-ST1-D1"}', '{}'),
  ('s4-mt2-st1-d5', 's4-mt2-st1', '입찰계획 보고서 기반 입찰정보 분석 및 입찰 적정성 확인', 4, '{"S2-MT1-ST2-D1"}', '{}'),
  ('s4-mt2-st1-d6', 's4-mt2-st1', '입찰 적정성 결과에 따라 수요정보 예측', 3, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT2-ST2: 조달 수요정보 수집하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt2-st2-d1', 's4-mt2-st2', '수요기관의 발주계획 정보 수집(공급 가능 수요기관·조달대상물 선정)', 4, '{"S2-MT1-ST1-D2"}', '{}'),
  ('s4-mt2-st2-d2', 's4-mt2-st2', '전자조달시스템 활용 공급정보·공급계획 수립에 필요한 정보 수집', 3, '{"S1-MT3-ST1-D1"}', '{}'),
  ('s4-mt2-st2-d3', 's4-mt2-st2', '수요정보 체계적 분류 및 문서화', 3, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT2-ST3: 공급계획 수립하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt2-st3-d1', 's4-mt2-st3', '분석결과에 따라 유형별 공급대상물의 경제성 분석', 4, '{"S2-MT1-ST3-D1"}', '{}'),
  ('s4-mt2-st3-d2', 's4-mt2-st3', '품명별 기술적 요구사항에 따른 기술 적합도 검증', 3, '{}', '{}'),
  ('s4-mt2-st3-d3', 's4-mt2-st3', '환경분석을 바탕으로 공급계획 수립', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT3-ST1: 입찰서류 작성하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt3-st1-d1', 's4-mt3-st1', '공공조달입찰에서 예정가격기준에 따라 견적서 작성', 5, '{"S1-MT5-ST2-D2"}', '{}'),
  ('s4-mt3-st1-d2', 's4-mt3-st1', '발주기관의 제안요청서에 따라 평가요소를 고려한 기술제안서 작성', 5, '{"S2-MT2-ST2-D1"}', '{}'),
  ('s4-mt3-st1-d3', 's4-mt3-st1', '발주기관의 제안서 평가기준에 부합되게 제출한 제안서 내용 설명', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT3-ST2: 입찰평가 기준 검증하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt3-st2-d1', 's4-mt3-st2', '낙찰방법에 따라 가격평가와 기술평가를 평가기준으로 점수 산정', 5, '{"S2-MT3-ST4-D1"}', '{}'),
  ('s4-mt3-st2-d2', 's4-mt3-st2', '낙찰자 선정방법별 평가점수 기준과 절차에 따라 예상 평가점수 산정', 5, '{"S2-MT3-ST4-D2"}', '{}'),
  ('s4-mt3-st2-d3', 's4-mt3-st2', '각종 심사 과정의 관련 규정과 절차에 따라 이해상충 문제점 식별', 4, '{"S2-MT3-ST2-D2"}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT3-ST3: 협상 관리하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt3-st3-d1', 's4-mt3-st3', '입찰공고의 요구 내용을 기준으로 추가·삭제·변경 여부 협상', 4, '{"S2-MT3-ST3-D1"}', '{}'),
  ('s4-mt3-st3-d2', 's4-mt3-st3', '과업내용과 관련한 기술협상 과정에서 과업 조정', 4, '{"S2-MT3-ST3-D2"}', '{}'),
  ('s4-mt3-st3-d3', 's4-mt3-st3', '조정결과를 기반으로 과업에 대한 가격 증감 조정', 4, '{"S2-MT3-ST3-D3"}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT4-ST1: 계약 체결 관리하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt4-st1-d1', 's4-mt4-st1', '입찰 및 관련 법령에 근거한 공공조달 계약서 작성에 필요한 서류 준비', 5, '{"S3-MT1-ST1-D1"}', '{}'),
  ('s4-mt4-st1-d2', 's4-mt4-st1', '발주처에서 계약의 이행보증을 요구할 경우 필요한 서류 준비', 4, '{"S3-MT1-ST4-D4"}', '{}'),
  ('s4-mt4-st1-d3', 's4-mt4-st1', '관련 계약법에 따라 계약서 작성', 5, '{"S1-MT5-ST1-D1"}', '{}'),
  ('s4-mt4-st1-d4', 's4-mt4-st1', '계약서를 근거로 계약의 목적·계약금액·이행기간·계약보증금·지체상금 등 설명', 5, '{"S3-MT1-ST4-D3","S3-MT1-ST4-D4"}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT4-ST2: 계약 이행 관리하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt4-st2-d1', 's4-mt4-st2', '계약 및 발주자의 요구 등을 검토하여 계약 내용 파악', 5, '{"S3-MT1-ST3-D1"}', '{}'),
  ('s4-mt4-st2-d2', 's4-mt4-st2', '계약 이행을 위한 수행절차 및 방법 등에 대한 계획 수립', 4, '{"S3-MT1-ST3-D2"}', '{}'),
  ('s4-mt4-st2-d3', 's4-mt4-st2', '계약 이행에 필요한 선급금을 산정하여 신청', 4, '{}', '{}'),
  ('s4-mt4-st2-d4', 's4-mt4-st2', '수립된 계획에 따른 수행절차 및 방법에 따라 수행', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT4-ST3: 계약 변경 관리하기 (5개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt4-st3-d1', 's4-mt4-st3', '계약법령에서 규정한 계약의 조정요건 판단', 5, '{"S3-MT1-ST2-D1"}', '{}'),
  ('s4-mt4-st3-d2', 's4-mt4-st3', '계약의 조정요건별 처리방법 판단', 5, '{"S3-MT1-ST2-D2"}', '{}'),
  ('s4-mt4-st3-d3', 's4-mt4-st3', '계약 변경과 관련된 서류 준비', 4, '{}', '{}'),
  ('s4-mt4-st3-d4', 's4-mt4-st3', '물가변동·설계변경 등에 따라 변경된 내용을 포함한 계약서 작성', 5, '{"S3-MT1-ST2-D2","S3-MT1-ST2-D3"}', '{}'),
  ('s4-mt4-st3-d5', 's4-mt4-st3', '변경된 계약서의 내용을 당사자에게 설명', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT4-ST4: 계약 종결 관리하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt4-st4-d1', 's4-mt4-st4', '계약서·설계서 등 관계서류를 확인하여 계약 이행의 완료 판단', 5, '{"S3-MT1-ST4-D1"}', '{}'),
  ('s4-mt4-st4-d2', 's4-mt4-st4', '계약 이행 완료에 따라 검사·검수 및 대금 청구 등 계약 종결 서류 준비', 5, '{"S3-MT1-ST4-D1","S3-MT1-ST4-D2"}', '{}'),
  ('s4-mt4-st4-d3', 's4-mt4-st4', '계약 이행 완료와 관련된 서류 작성', 4, '{}', '{}'),
  ('s4-mt4-st4-d4', 's4-mt4-st4', '계약 이행 불가할 경우 계약 해제 또는 해지 절차 이해 및 관련 서류 작성', 5, '{"S1-MT5-ST1-D3","S3-MT1-ST4-D2"}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT5-ST1: 공사 계약 관리하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt5-st1-d1', 's4-mt5-st1', '공사에 특화된 계약조건에 따른 계약 체결', 5, '{"S3-MT4-ST1-D1"}', '{}'),
  ('s4-mt5-st1-d2', 's4-mt5-st1', '공사에 특화된 계약조건에 따른 계약이행 절차 관리', 5, '{"S3-MT4-ST2-D3"}', '{}'),
  ('s4-mt5-st1-d3', 's4-mt5-st1', '하도급법에 따른 원수급자와 하수급자인 협력업체 간 계약이행 절차 관리', 5, '{"S3-MT4-ST3-D2","S3-MT4-ST3-D3"}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT5-ST2: 물품 계약 관리하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt5-st2-d1', 's4-mt5-st2', '물품에 특화된 계약조건에 따른 계약 체결', 4, '{"S3-MT2-ST1-D1"}', '{}'),
  ('s4-mt5-st2-d2', 's4-mt5-st2', '물품에 특화된 계약조건에 따른 계약이행 절차 관리', 4, '{"S3-MT2-ST2-D1"}', '{}'),
  ('s4-mt5-st2-d3', 's4-mt5-st2', '다수공급자(MAS) 계약의 특성에 따른 계약이행 절차 관리', 5, '{"S3-MT3-ST2-D1","S3-MT3-ST2-D2"}', '{}'),
  ('s4-mt5-st2-d4', 's4-mt5-st2', '단가 계약의 특성에 따른 계약이행 절차 관리', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT5-ST3: 용역 계약 관리하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt5-st3-d1', 's4-mt5-st3', '용역에 특화된 계약조건에 따른 계약 체결', 4, '{"S3-MT3-ST1-D1"}', '{}'),
  ('s4-mt5-st3-d2', 's4-mt5-st3', '용역에 특화된 계약조건에 따른 계약이행 절차 관리', 4, '{"S3-MT3-ST1-D2"}', '{}'),
  ('s4-mt5-st3-d3', 's4-mt5-st3', '하도급법에 따른 원수급자와 하수급자인 협력업체 간 계약이행 절차 관리', 5, '{"S3-MT4-ST3-D2"}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT6-ST1: 공급리스크 식별하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt6-st1-d1', 's4-mt6-st1', '입찰계획에 따라 리스크 관리 계획 수립', 4, '{}', '{}'),
  ('s4-mt6-st1-d2', 's4-mt6-st1', '입찰계획에 따라 영향을 미치는 위험 식별', 4, '{}', '{}'),
  ('s4-mt6-st1-d3', 's4-mt6-st1', '입찰계획에 따라 리스크를 유형별로 분류', 3, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT6-ST2: 위험도 평가하기 (5개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt6-st2-d1', 's4-mt6-st2', '식별된 리스크의 위험도 평가계획 수립', 4, '{}', '{}'),
  ('s4-mt6-st2-d2', 's4-mt6-st2', '식별된 리스크의 발생 확률 추정', 4, '{}', '{}'),
  ('s4-mt6-st2-d3', 's4-mt6-st2', '식별된 리스크의 발생에 따른 영향 정도 추정', 4, '{}', '{}'),
  ('s4-mt6-st2-d4', 's4-mt6-st2', '식별된 리스크의 중요도 산정', 4, '{}', '{}'),
  ('s4-mt6-st2-d5', 's4-mt6-st2', '관리 우선순위가 높은 리스크 결정', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT6-ST3: 리스크 대응계획 수립하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt6-st3-d1', 's4-mt6-st3', '리스크 대응계획에 따라 주요 리스크에 대한 대응계획 수립', 4, '{}', '{}'),
  ('s4-mt6-st3-d2', 's4-mt6-st3', '리스크 대응계획에 따른 대응방안의 적정성 평가', 4, '{}', '{}'),
  ('s4-mt6-st3-d3', 's4-mt6-st3', '리스크 대응계획에 반영되지 않은 우발적 리스크에 대한 비상 대응계획 수립', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT6-ST4: 리스크 발생 모니터링하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt6-st4-d1', 's4-mt6-st4', '리스크 대응계획의 실행 여부 확인', 3, '{}', '{}'),
  ('s4-mt6-st4-d2', 's4-mt6-st4', '실행된 리스크 대응방안의 성과 확인', 3, '{}', '{}'),
  ('s4-mt6-st4-d3', 's4-mt6-st4', '리스크 대응계획에 반영되지 않은 새로운 리스크 식별', 4, '{}', '{}'),
  ('s4-mt6-st4-d4', 's4-mt6-st4', '리스크 모니터링 결과를 관련 이해관계자와 공유 및 필요한 조치 제안', 3, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT7-ST1: 법령 활용하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt7-st1-d1', 's4-mt7-st1', '공공조달 관련 법령의 구조와 적용범위를 이해하고 설명', 4, '{"S1-MT5-ST1-D1","S1-MT5-ST2-D1"}', '{}'),
  ('s4-mt7-st1-d2', 's4-mt7-st1', '공고 및 계약서의 법적 근거를 확인하고 불리한 조건에 대응', 5, '{"S1-MT6-ST2-D1"}', '{}'),
  ('s4-mt7-st1-d3', 's4-mt7-st1', '유권해석이나 판례를 근거로 쟁점을 정리하고 리스크 예방', 5, '{"S1-MT6-ST1-D1","S1-MT6-ST1-D2"}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT7-ST2: 분쟁 대응하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt7-st2-d1', 's4-mt7-st2', '주요 분쟁 원인을 파악하고 선제적 예방관리 방안 수립', 5, '{"S1-MT6-ST1-D3"}', '{}'),
  ('s4-mt7-st2-d2', 's4-mt7-st2', '분쟁 발생 시 대응 절차를 진행', 4, '{"S1-MT6-ST1-D1","S1-MT6-ST1-D2"}', '{}'),
  ('s4-mt7-st2-d3', 's4-mt7-st2', '법무 담당자나 전문가와 협력해 법적 문제에 대응', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT7-ST3: 우대제도 활용하기 (3개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt7-st3-d1', 's4-mt7-st3', '우대제도의 종류와 특징을 파악한 후 입찰에 적용', 4, '{"S1-MT4-ST1-D1","S1-MT4-ST4-D1"}', '{}'),
  ('s4-mt7-st3-d2', 's4-mt7-st3', '우대제도 자격을 확보하고 관련 서류 준비', 3, '{}', '{}'),
  ('s4-mt7-st3-d3', 's4-mt7-st3', '우대제도를 입찰 전략과 연계해 수주 기회를 증대', 4, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT8-ST1: 전자조달시스템 이용하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt8-st1-d1', 's4-mt8-st1', '전자조달시스템에 접속하여 입찰 공고·참가자격 등록·계약 현황 관련 정보 조회', 3, '{"S1-MT3-ST1-D1"}', '{}'),
  ('s4-mt8-st1-d2', 's4-mt8-st1', '전자조달시스템을 통해 입찰서 제출·계약 체결·대금 청구 절차 수행', 3, '{"S1-MT3-ST1-D2"}', '{}'),
  ('s4-mt8-st1-d3', 's4-mt8-st1', '전자조달시스템과 연계된 외부 시스템을 연계하여 조달 정보를 통합 활용', 3, '{}', '{}'),
  ('s4-mt8-st1-d4', 's4-mt8-st1', '전자조달시스템 사용 중 발생하는 오류나 문제에 대해 해결 방법 적용', 2, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ---- MT8-ST2: 조달데이터 활용하기 (4개) ----
INSERT INTO "DetailItem" (id, "subTopicId", name, "predictionScore", "crossSubjectLinks", "practicalLinks") VALUES
  ('s4-mt8-st2-d1', 's4-mt8-st2', '조달 관련 데이터를 목적에 따라 분류하고 필요한 정보를 정확하게 추출', 3, '{}', '{}'),
  ('s4-mt8-st2-d2', 's4-mt8-st2', '입찰 현황·계약 실적·경쟁사 분석 등 조달 데이터를 활용하여 합리적인 의사결정 지원', 3, '{}', '{}'),
  ('s4-mt8-st2-d3', 's4-mt8-st2', '전자조달시스템 및 통계자료 등에서 제공되는 데이터를 기준에 따라 분석하고 시각화', 3, '{}', '{}'),
  ('s4-mt8-st2-d4', 's4-mt8-st2', '활용한 데이터의 출처와 신뢰성을 검토하고 결과를 문서나 보고서 형태로 정리', 3, '{}', '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  "predictionScore" = EXCLUDED."predictionScore",
  "crossSubjectLinks" = EXCLUDED."crossSubjectLinks";

-- ============================================================
-- 5. 검증 쿼리 - 삽입 결과 확인
-- ============================================================
SELECT '=== S4 실기 데이터 삽입 완료 ===' AS status;

SELECT
  s.name AS "과목",
  COUNT(DISTINCT mt.id) AS "주요항목",
  COUNT(DISTINCT st.id) AS "세부항목",
  COUNT(DISTINCT di.id) AS "세세항목"
FROM "Subject" s
LEFT JOIN "MainTopic" mt ON mt."subjectId" = s.id
LEFT JOIN "SubTopic" st ON st."mainTopicId" = mt.id
LEFT JOIN "DetailItem" di ON di."subTopicId" = st.id
WHERE s.id = 's4-practical'
GROUP BY s.name;

-- 주요항목별 세세항목 수 확인
SELECT
  mt.name AS "주요항목",
  mt."order" AS "순서",
  mt."estimatedWeight" AS "예상비중(%)",
  COUNT(DISTINCT st.id) AS "세부항목수",
  COUNT(di.id) AS "세세항목수"
FROM "MainTopic" mt
LEFT JOIN "SubTopic" st ON st."mainTopicId" = mt.id
LEFT JOIN "DetailItem" di ON di."subTopicId" = st.id
WHERE mt."subjectId" = 's4-practical'
GROUP BY mt.id, mt.name, mt."order", mt."estimatedWeight"
ORDER BY mt."order";

COMMIT;
