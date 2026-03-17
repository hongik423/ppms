import { StarLGuide } from '@/components/practical/StarLGuide';
import Link from 'next/link';

const MODEL_ANSWERS = [
  {
    topic: '계약 방법 선택',
    scenario: '수의계약 선택 기준',
    answer: `[상황] A 시에서 노후 상수도관 교체 공사가 필요하며, 예정가격 2억 원으로 긴급한 상황입니다.

[과제] 조달담당자로서 적절한 계약 방식을 선정하고 절차를 수립하는 것이 과제입니다.

[행동] 긴급성과 경제성을 고려하여 다음과 같이 조치했습니다:
1) 공공조달법 제40조(수의계약)를 검토했습니다
2) 긴급 상황이 수의계약 요건에 해당하는지 확인했습니다
3) 3개 업체로 제한적 경쟁입찰을 실시했습니다

[결과] 신속한 계약 체결로 공기를 단축하고, 예산 효율성을 달성했습니다. 3주 내 공사를 시작할 수 있었습니다.

[법적근거]
- 공공조달법 제40조 제1항 (수의계약)
- 같은 법 시행령 제48조 (긴급 상황에서의 수의계약)`,
    grade: 'A'
  },
  {
    topic: '계약금 및 기성금 관리',
    scenario: '기성금 청구 절차',
    answer: `[상황] 건설회사 D에서 공공 주택 신축 공사를 시공 중이며, 현재 공사 진행도가 35%입니다.

[과제] 조달담당자로서 적절한 기성금 청구 절차를 관리하는 것이 과제입니다.

[행동] 다음과 같은 절차를 따랐습니다:
1) 공사 진행도가 20% 이상이므로 기성금 청구 적격성을 확인했습니다
2) 시공자로부터 필수 서류(기성내역서, 시공사진, 품질검사성적서)를 받았습니다
3) 감리자 검사를 통해 품질을 확인했습니다
4) 원천징수 5% 처리 후 지급했습니다

[결과] 신속한 기성금 지급으로 시공자의 자금 흐름을 안정화했으며, 공사 진행을 촉진했습니다.

[법적근거]
- 건설기술진흥법 제35조 (기성금 지급)
- 공공주택관리규칙 제67조 (기성금 검사)`,
    grade: 'A'
  }
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/practical" className="text-blue-800 font-medium hover:underline mb-4 inline-block">
            ← 실무 코칭으로 돌아가기
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">STAR-L 학습 자료</h1>
          <p className="text-gray-600">모범 답안을 통해 올바른 작성 방법을 배우세요</p>
        </div>

        {/* STAR-L Guide */}
        <div className="mb-12">
          <StarLGuide isOpen={true} />
        </div>

        {/* Model Answers */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">모범 답안 분석</h2>

        <div className="space-y-8">
          {MODEL_ANSWERS.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-600">{item.topic}</p>
                    <h3 className="text-lg font-bold text-gray-900">{item.scenario}</h3>
                  </div>
                  <div className={`px-3 py-1 rounded font-bold text-lg ${
                    item.grade === 'A'
                      ? 'bg-blue-100 text-blue-700'
                      : item.grade === 'B'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.grade}
                  </div>
                </div>
              </div>

              {/* Answer */}
              <div className="p-6">
                <div className="space-y-4">
                  {item.answer.split('\n\n').map((section, sidx) => (
                    <div key={sidx}>
                      {section.split('\n').map((line, lidx) => (
                        <p key={lidx} className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {line}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Key Points */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="font-semibold text-gray-900 mb-3">핵심 포인트</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      상황은 객관적 사실만 포함 (주관적 의견 제외)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      행동에서 단계적 조치 과정을 상세히 설명
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      법적근거는 법명과 조항을 정확하게 인용
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      결과는 구체적 성과 또는 수치로 제시
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* General Tips */}
        <div className="mt-12 bg-amber-50 rounded-xl border border-amber-200 p-6">
          <h3 className="font-bold text-gray-900 mb-3">✏️ 작성 시 주의사항</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">1.</span>
              각 섹션(S/T/A/R/L)은 명확하게 구분하여 작성
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">2.</span>
              전문 용어와 법적 개념을 정확하게 사용
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">3.</span>
              실제 경험 기반의 구체적 사례로 설명
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">4.</span>
              일반적인 절차를 순차적으로 설명
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-amber-600">5.</span>
              마지막에 반드시 관련 법령 인용
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
