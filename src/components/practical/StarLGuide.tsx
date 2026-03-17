'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface StarLGuideProps {
  isOpen?: boolean;
}

const GUIDE_SECTIONS = [
  {
    key: 'situation',
    label: 'S - 상황(Situation)',
    color: 'bg-blue-50 border-blue-300',
    description: '문제 상황을 객관적으로 서술합니다.',
    example: 'A 시에서 노후 상수도관 교체 공사가 필요하며, 예정가격 2억 원, 긴급 상황입니다.'
  },
  {
    key: 'task',
    label: 'T - 과제(Task)',
    color: 'bg-purple-50 border-purple-300',
    description: '자신이 담당해야 할 역할과 책임을 명확히 합니다.',
    example: '조달담당자로서 적절한 계약 방식을 선정하고 절차를 수립하는 것이 과제입니다.'
  },
  {
    key: 'action',
    label: 'A - 행동(Action)',
    color: 'bg-amber-50 border-amber-300',
    description: '구체적으로 취한 행동과 결정 근거를 설명합니다.',
    example: '긴급 상황을 고려하여 수의계약을 검토했으며, 법적 근거를 확인했습니다.'
  },
  {
    key: 'result',
    label: 'R - 결과(Result)',
    color: 'bg-green-50 border-green-300',
    description: '행동의 결과와 성과를 구체적인 수치/사례로 제시합니다.',
    example: '신속한 계약 체결로 공기 단축 및 예산 효율성을 달성했습니다.'
  },
  {
    key: 'legal',
    label: 'L - 법적근거(Legal)',
    color: 'bg-red-50 border-red-300',
    description: '관련 법령, 규정, 지침을 정확히 인용합니다.',
    example: '공공조달법 제40조(수의계약), 시행령 제48조를 준용하였습니다.'
  }
];

export function StarLGuide({ isOpen = false }: StarLGuideProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    isOpen ? new Set(GUIDE_SECTIONS.map(s => s.key)) : new Set()
  );

  const toggleSection = (key: string) => {
    const newOpen = new Set(openSections);
    if (newOpen.has(key)) {
      newOpen.delete(key);
    } else {
      newOpen.add(key);
    }
    setOpenSections(newOpen);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-blue-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">STAR-L 작성 가이드</h2>
        <p className="text-sm text-gray-600 mt-1">실무 사례를 체계적으로 작성하기 위한 프레임워크</p>
      </div>

      <div className="divide-y divide-gray-200">
        {GUIDE_SECTIONS.map((section) => (
          <div key={section.key} className="border-b border-gray-200 last:border-b-0">
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900">{section.label}</span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  openSections.has(section.key) ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.has(section.key) && (
              <div className={`px-6 pb-4 border-l-4 ${section.color}`}>
                <p className="text-sm text-gray-700 mb-3">{section.description}</p>
                <div className="bg-gray-50 rounded p-3 text-xs text-gray-600">
                  <p className="font-semibold text-gray-700 mb-1">예시:</p>
                  <p>{section.example}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
