import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed database...');

  // Clear existing data
  await prisma.bookmark.deleteMany();
  await prisma.practicalAnswer.deleteMany();
  await prisma.mockExam.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.question.deleteMany();
  await prisma.conceptCard.deleteMany();
  await prisma.detailItem.deleteMany();
  await prisma.subTopic.deleteMany();
  await prisma.mainTopic.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.studyPlan.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing data');

  // ========== SUBJECTS ==========
  const subject1 = await prisma.subject.create({
    data: {
      name: '1과목: 공공조달과 법제도 이해',
      questionCount: 30,
      weightPercent: 30,
      textbookVolume: 1,
      order: 1,
    },
  });

  const subject2 = await prisma.subject.create({
    data: {
      name: '2과목: 공공조달계획 수립 및 분석',
      questionCount: 20,
      weightPercent: 20,
      textbookVolume: 2,
      order: 2,
    },
  });

  const subject3 = await prisma.subject.create({
    data: {
      name: '3과목: 공공계약관리',
      questionCount: 30,
      weightPercent: 30,
      textbookVolume: 3,
      order: 3,
    },
  });

  console.log('Created subjects');

  // ========== SUBJECT 1: 공공조달과 법제도 이해 ==========

  // 주요항목1: 공공조달 개요
  const s1_mt1 = await prisma.mainTopic.create({
    data: {
      subjectId: subject1.id,
      name: '주요항목1: 공공조달 개요',
      order: 1,
      estimatedWeight: 5,
    },
  });

  const s1_mt1_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt1.id,
      name: '세부1.1: 공공조달의 정의 및 목적',
      order: 1,
    },
  });

  const s1_mt1_st1_di1 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st1.id,
      name: '공공조달의 정의',
      predictionScore: 3,
    },
  });

  const s1_mt1_st1_di2 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st1.id,
      name: '공공조달의 목적',
      predictionScore: 3,
    },
  });

  const s1_mt1_st1_di3 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st1.id,
      name: '공공조달의 범위',
      predictionScore: 3,
    },
  });

  const s1_mt1_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt1.id,
      name: '세부1.2: 공공조달 참여자, 이해관계자',
      order: 2,
    },
  });

  const s1_mt1_st2_di1 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st2.id,
      name: '공공조달 수요자',
      predictionScore: 2,
    },
  });

  const s1_mt1_st2_di2 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st2.id,
      name: '공공조달 공급자',
      predictionScore: 2,
    },
  });

  const s1_mt1_st2_di3 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st2.id,
      name: '공공조달 이해관계자',
      predictionScore: 2,
    },
  });

  const s1_mt1_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt1.id,
      name: '세부1.3: 공공조달의 특성',
      order: 3,
    },
  });

  const s1_mt1_st3_di1 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st3.id,
      name: '상업적 구매행위 특성',
      predictionScore: 2,
    },
  });

  const s1_mt1_st3_di2 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st3.id,
      name: '공공조달의 조달행위 특성',
      predictionScore: 3,
    },
  });

  const s1_mt1_st4 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt1.id,
      name: '세부1.4: 공공조달의 구성체계',
      order: 4,
    },
  });

  const s1_mt1_st4_di1 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st4.id,
      name: '조직적 구성체계',
      predictionScore: 3,
    },
  });

  const s1_mt1_st4_di2 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt1_st4.id,
      name: '감독 및 기능적 책임',
      predictionScore: 3,
    },
  });

  // 주요항목2: 공공조달 원칙 및 방법
  const s1_mt2 = await prisma.mainTopic.create({
    data: {
      subjectId: subject1.id,
      name: '주요항목2: 공공조달 원칙 및 방법',
      order: 2,
      estimatedWeight: 8,
    },
  });

  const s1_mt2_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt2.id,
      name: '세부2.1: 공공조달 원칙',
      order: 1,
    },
  });

  const s1_mt2_st1_di1 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st1.id,
      name: '공공조달 기본 원칙',
      predictionScore: 4,
    },
  });

  const s1_mt2_st1_di2 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st1.id,
      name: '공공조달 실행 원칙',
      predictionScore: 4,
    },
  });

  const s1_mt2_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt2.id,
      name: '세부2.2: 공공조달 유형',
      order: 2,
    },
  });

  const s1_mt2_st2_di1 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st2.id,
      name: '중앙집중형 공공조달',
      predictionScore: 3,
    },
  });

  const s1_mt2_st2_di2 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st2.id,
      name: '분산형 공공조달',
      predictionScore: 3,
    },
  });

  const s1_mt2_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt2.id,
      name: '세부2.3: 경쟁적 공공조달 방법',
      order: 3,
    },
  });

  const s1_mt2_st3_di1 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st3.id,
      name: '일반경쟁',
      predictionScore: 5,
    },
  });

  const s1_mt2_st3_di2 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st3.id,
      name: '제한경쟁',
      predictionScore: 5,
    },
  });

  const s1_mt2_st3_di3 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st3.id,
      name: '지명경쟁',
      predictionScore: 5,
    },
  });

  const s1_mt2_st4 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt2.id,
      name: '세부2.4: 비경쟁적 공공조달 방법',
      order: 4,
    },
  });

  const s1_mt2_st4_di1 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st4.id,
      name: '수의계약',
      predictionScore: 5,
    },
  });

  const s1_mt2_st4_di2 = await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt2_st4.id,
      name: '소액구매',
      predictionScore: 4,
    },
  });

  // 주요항목3: 전자조달시스템
  const s1_mt3 = await prisma.mainTopic.create({
    data: {
      subjectId: subject1.id,
      name: '주요항목3: 전자조달시스템',
      order: 3,
      estimatedWeight: 8,
    },
  });

  const s1_mt3_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt3.id,
      name: '세부3.1: 전자조달시스템 개요',
      order: 1,
    },
  });

  const s1_mt3_st1_detailItems = [
    '전자조달시스템 개념',
    '전자조달시스템 유형',
    '전자조달시스템 운영환경',
    '전자조달시스템 구성요소',
    '전자조달시스템 기능',
    '전자조달시스템 도입 성과',
  ];

  for (let i = 0; i < s1_mt3_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt3_st1.id,
        name: s1_mt3_st1_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  const s1_mt3_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt3.id,
      name: '세부3.2: 나라장터 연계 계약 관리 지원시스템 개요',
      order: 2,
    },
  });

  const s1_mt3_st2_detailItems = [
    '종합쇼핑몰 이용절차',
    '혁신장터 활용 계약',
    '벤처나라 활용 계약',
    '디지털서비스몰 활용 계약',
    '이음장터 활용 계약',
  ];

  for (let i = 0; i < s1_mt3_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt3_st2.id,
        name: s1_mt3_st2_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  const s1_mt3_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt3.id,
      name: '세부3.3: 목록정보시스템 개요',
      order: 3,
    },
  });

  const s1_mt3_st3_detailItems = [
    '물품목록법령의 개요',
    '목록정보시스템 이용 일반절차',
    '목록정보시스템 활용 목록화 절차',
    '목록정보시스템 활용 분류·품명·품목 관리 절차',
    '목록정보시스템 활용 최신화 및 분류 정비',
    '목록정보시스템 활용 분류체계 국제 표준화',
  ];

  for (let i = 0; i < s1_mt3_st3_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt3_st3.id,
        name: s1_mt3_st3_detailItems[i],
        predictionScore: 2,
      },
    });
  }

  // 주요항목4: 전략적 공공조달
  const s1_mt4 = await prisma.mainTopic.create({
    data: {
      subjectId: subject1.id,
      name: '주요항목4: 전략적 공공조달',
      order: 4,
      estimatedWeight: 5,
    },
  });

  const s1_mt4_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt4.id,
      name: '세부4.1: 중소기업지원 조달',
      order: 1,
    },
  });

  const s1_mt4_st1_detailItems = [
    '중소기업과 공공구매제도 이해',
    '중소기업자간 경쟁제도 이해',
    '공사용자재 직접구매제도 이해',
  ];

  for (let i = 0; i < s1_mt4_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt4_st1.id,
        name: s1_mt4_st1_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s1_mt4_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt4.id,
      name: '세부4.2: 녹색조달',
      order: 2,
    },
  });

  const s1_mt4_st2_detailItems = [
    '공공조달의 환경적 지속가능성 개요',
    '녹색제품 우선구매제도 이해',
    '생애주기비용을 고려한 공공조달 제도 이해',
  ];

  for (let i = 0; i < s1_mt4_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt4_st2.id,
        name: s1_mt4_st2_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  const s1_mt4_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt4.id,
      name: '세부4.3: 혁신·기술개발 촉진조달',
      order: 3,
    },
  });

  const s1_mt4_st3_detailItems = [
    '중소기업 기술개발제품 우선구매제도 이해',
    '우수조달물품 지정제도의 이해',
    '혁신제품 지정제도의 이해',
  ];

  for (let i = 0; i < s1_mt4_st3_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt4_st3.id,
        name: s1_mt4_st3_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  const s1_mt4_st4 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt4.id,
      name: '세부4.4: 사회적가치 지원 조달',
      order: 4,
    },
  });

  const s1_mt4_st4_detailItems = [
    '장애인기업 우선구매제도 이해',
    '중증장애인생산품 우선구매제도 이해',
    '여성기업 우선구매제도 이해',
    '사회적기업제품 우선구매제도 이해',
    '공공조달과 사회적가치 및 이에스지(ESG)',
  ];

  for (let i = 0; i < s1_mt4_st4_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt4_st4.id,
        name: s1_mt4_st4_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  // 주요항목5: 공공조달법률 이해
  const s1_mt5 = await prisma.mainTopic.create({
    data: {
      subjectId: subject1.id,
      name: '주요항목5: 공공조달법률 이해',
      order: 5,
      estimatedWeight: 10,
    },
  });

  const s1_mt5_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt5.id,
      name: '세부5.1: 공공계약 관련 민법 규정의 이해',
      order: 1,
    },
  });

  const s1_mt5_st1_detailItems = [
    '계약의 성립 관련 규정',
    '계약의 효력 관련 규정',
    '계약의 해제·해지에 관한 규정',
    '도급·위임에 관한 규정',
    '화해에 관한 규정',
  ];

  for (let i = 0; i < s1_mt5_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt5_st1.id,
        name: s1_mt5_st1_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s1_mt5_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt5.id,
      name: '세부5.2: 공공계약(국가 및 지방) 법령의 이해',
      order: 2,
    },
  });

  const s1_mt5_st2_detailItems = [
    '추정가격 및 예정가격 결정',
    '계약의 방법에 관한 규정',
    '입찰 및 낙찰 절차 규정',
    '계약의 체결 및 이행 규정',
    '이의신청과 분쟁조정',
  ];

  for (let i = 0; i < s1_mt5_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt5_st2.id,
        name: s1_mt5_st2_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s1_mt5_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt5.id,
      name: '세부5.3: 조달사업법령의 이해',
      order: 3,
    },
  });

  const s1_mt5_st3_detailItems = [
    '공공조달의 정책기반',
    '계약체결의 요청 및 방법',
    '대금지급 규정',
    '조달사업의 공정성',
    '수요기관 및 조달사업의 지원',
  ];

  for (let i = 0; i < s1_mt5_st3_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt5_st3.id,
        name: s1_mt5_st3_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s1_mt5_st4 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt5.id,
      name: '세부5.4: 전자조달법령의 이해',
      order: 4,
    },
  });

  const s1_mt5_st4_detailItems = [
    '전자적 공고의 방법 및 시기',
    '전자적 형태의 입찰서 제출',
    '전자공개수의계약',
    '하도급 관리의 전자적 처리',
    '전자조달시스템 이용·활용 제한',
  ];

  for (let i = 0; i < s1_mt5_st4_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt5_st4.id,
        name: s1_mt5_st4_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s1_mt5_st5 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt5.id,
      name: '세부5.5: 공기업·준정부기관 계약사무규칙',
      order: 5,
    },
  });

  await prisma.detailItem.create({
    data: {
      subTopicId: s1_mt5_st5.id,
      name: '공기업·준정부기관 계약사무규칙',
      predictionScore: 4,
    },
  });

  // 주요항목6: 공정조달 관리
  const s1_mt6 = await prisma.mainTopic.create({
    data: {
      subjectId: subject1.id,
      name: '주요항목6: 공정조달 관리',
      order: 6,
      estimatedWeight: 8,
    },
  });

  const s1_mt6_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt6.id,
      name: '세부6.1: 공공조달 법규 분쟁 및 해석',
      order: 1,
    },
  });

  const s1_mt6_st1_detailItems = [
    '국제입찰 대상 공공조달계약 범위',
    '중소기업자간 경쟁제품 구매위탁 의무 예외',
    '수의계약 규정',
    '의견 청취 및 심의절차',
    '이의신청 규정',
    '공공조달 분쟁조정',
    '유권해석 및 감사사례',
    '계약보증금 쟁점',
    '부정당제재 처분 법리',
    '허위서류 관련 쟁점',
  ];

  for (let i = 0; i < s1_mt6_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt6_st1.id,
        name: s1_mt6_st1_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s1_mt6_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s1_mt6.id,
      name: '세부6.2: 법규 위반시 제재',
      order: 2,
    },
  });

  const s1_mt6_st2_detailItems = [
    '계약의 해제 및 해지',
    '부정당업자 제재',
    '불공정조달행위 제재',
    '부당이득금 환수',
  ];

  for (let i = 0; i < s1_mt6_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s1_mt6_st2.id,
        name: s1_mt6_st2_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  console.log('Created all 1과목 content');

  // ========== SUBJECT 2: 공공조달계획 수립 및 분석 ==========

  // 주요항목1: 공공조달계획
  const s2_mt1 = await prisma.mainTopic.create({
    data: {
      subjectId: subject2.id,
      name: '주요항목1: 공공조달계획',
      order: 1,
      estimatedWeight: 8,
    },
  });

  const s2_mt1_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt1.id,
      name: '세부1.1: 공공조달 수요 분석 및 계획',
      order: 1,
    },
  });

  const s2_mt1_st1_detailItems = [
    '공급 대상물 수요정보 식별',
    '수요정보 평가와 요구사항 분석',
    '공급계획 및 일정 수립',
    '비상 공급계획 수립',
  ];

  for (let i = 0; i < s2_mt1_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt1_st1.id,
        name: s2_mt1_st1_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s2_mt1_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt1.id,
      name: '세부1.2: 공공조달 적정성 분석',
      order: 2,
    },
  });

  const s2_mt1_st2_detailItems = [
    '공급방법 적정성 분석',
    '공급정보 적정성 분석',
    '공급 대상물 조달시장 분석',
    '공급역량분석',
  ];

  for (let i = 0; i < s2_mt1_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt1_st2.id,
        name: s2_mt1_st2_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s2_mt1_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt1.id,
      name: '세부1.3: 공공조달 비용 적정성 분석',
      order: 3,
    },
  });

  const s2_mt1_st3_detailItems = [
    '공급 의사결정을 위한 비용분석',
    '적정 공급비용 산정',
  ];

  for (let i = 0; i < s2_mt1_st3_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt1_st3.id,
        name: s2_mt1_st3_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s2_mt1_st4 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt1.id,
      name: '세부1.4: 기타 적정성 분석',
      order: 4,
    },
  });

  const s2_mt1_st4_detailItems = [
    '공공조달 동향 모니터링을 통한 수요예측',
    '다양한 공급방법의 장단점 분석',
    '공급관리 및 위험분석',
  ];

  for (let i = 0; i < s2_mt1_st4_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt1_st4.id,
        name: s2_mt1_st4_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  // 주요항목2: 조달요구 응대 및 제안
  const s2_mt2 = await prisma.mainTopic.create({
    data: {
      subjectId: subject2.id,
      name: '주요항목2: 조달요구 응대 및 제안',
      order: 2,
      estimatedWeight: 6,
    },
  });

  const s2_mt2_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt2.id,
      name: '세부2.1: 조달요구 대처 절차',
      order: 1,
    },
  });

  const s2_mt2_st1_detailItems = [
    '경쟁입찰참가자격 등록',
    '수요기관의 정보요청(규격, 과업 및 예산 등)에 대한 문서 작성 및 제출',
    '조달관련 입법·행정예고 검색 및 의견제시',
  ];

  for (let i = 0; i < s2_mt2_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt2_st1.id,
        name: s2_mt2_st1_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  const s2_mt2_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt2.id,
      name: '세부2.2: 사전규격공개 분석',
      order: 2,
    },
  });

  const s2_mt2_st2_detailItems = [
    '과업내용 적정성 검토',
    '사업예산 적정성 검토',
    '당해 규격공개 관련 법규 준수 및 부합여부 검토',
    '개선보완 필요사항에 대한 의견 제시 및 처리',
  ];

  for (let i = 0; i < s2_mt2_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt2_st2.id,
        name: s2_mt2_st2_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s2_mt2_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt2.id,
      name: '세부2.3: 입찰공고문 분석',
      order: 3,
    },
  });

  const s2_mt2_st3_detailItems = [
    '공고 내용 중 오류 및 법령 위반 사안으로 정정 필요성 검토',
    '입찰공고 내용 검토 및 분석',
    '입찰보증금 제출방법',
  ];

  for (let i = 0; i < s2_mt2_st3_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt2_st3.id,
        name: s2_mt2_st3_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s2_mt2_st4 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt2.id,
      name: '세부2.4: 입찰·제안요청 설명',
      order: 4,
    },
  });

  const s2_mt2_st4_detailItems = [
    '입찰설명회 참석',
    '입찰 및 제안준비에 필요한 정보 식별 및 요청',
  ];

  for (let i = 0; i < s2_mt2_st4_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt2_st4.id,
        name: s2_mt2_st4_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  const s2_mt2_st5 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt2.id,
      name: '세부2.5: 입찰서 제출 및 개찰',
      order: 5,
    },
  });

  const s2_mt2_st5_detailItems = [
    '입찰서 제출 방법',
    '무효입찰 사유',
    '개찰 및 낙찰 절차',
  ];

  for (let i = 0; i < s2_mt2_st5_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt2_st5.id,
        name: s2_mt2_st5_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  // 주요항목3: 입찰·제안평가 및 계약체결
  const s2_mt3 = await prisma.mainTopic.create({
    data: {
      subjectId: subject2.id,
      name: '주요항목3: 입찰·제안평가 및 계약체결',
      order: 3,
      estimatedWeight: 10,
    },
  });

  const s2_mt3_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt3.id,
      name: '세부3.1: 입찰·제안평가 절차',
      order: 1,
    },
  });

  const s2_mt3_st1_detailItems = [
    '일반·제한·지명 경쟁입찰 절차',
    '수의계약 절차',
  ];

  for (let i = 0; i < s2_mt3_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt3_st1.id,
        name: s2_mt3_st1_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s2_mt3_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt3.id,
      name: '세부3.2: 평가위원회 및 이해충돌',
      order: 2,
    },
  });

  const s2_mt3_st2_detailItems = [
    '입찰·낙찰 방법별 평가위원회 구성에 대한 이해',
    '이해상충 평가위원에 대한 회피',
    '평가위원 사전접촉 금지 등 공정한 평가를 위한 기준 지침',
  ];

  for (let i = 0; i < s2_mt3_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt3_st2.id,
        name: s2_mt3_st2_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s2_mt3_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt3.id,
      name: '세부3.3: 계약의 협상',
      order: 3,
    },
  });

  const s2_mt3_st3_detailItems = [
    '기술(규격) 적합자 및 우선협상대상자 이해',
    '기술협상',
    '가격협상',
  ];

  for (let i = 0; i < s2_mt3_st3_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt3_st3.id,
        name: s2_mt3_st3_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s2_mt3_st4 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt3.id,
      name: '세부3.4: 낙찰자 결정방법',
      order: 4,
    },
  });

  const s2_mt3_st4_detailItems = [
    '적격심사 절차 및 낙찰자 결정',
    '협상계약 절차 및 낙찰자 결정',
    '희망수량경쟁입찰 절차 및 낙찰자 결정',
    '종합심사낙찰제(시설공사 등) 절차 및 낙찰',
    '계약법령상 낙찰요건 부합여부',
  ];

  for (let i = 0; i < s2_mt3_st4_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt3_st4.id,
        name: s2_mt3_st4_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s2_mt3_st5 = await prisma.subTopic.create({
    data: {
      mainTopicId: s2_mt3.id,
      name: '세부3.5: 입찰결과 분석 및 이의제기',
      order: 5,
    },
  });

  const s2_mt3_st5_detailItems = [
    '입찰·낙찰 과정 오류 및 문제점 분석',
    '분석결과 문제점에 대한 이의제기',
  ];

  for (let i = 0; i < s2_mt3_st5_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s2_mt3_st5.id,
        name: s2_mt3_st5_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  console.log('Created all 2과목 content');

  // ========== SUBJECT 3: 공공계약관리 ==========

  // 주요항목1: 계약관리 일반 절차
  const s3_mt1 = await prisma.mainTopic.create({
    data: {
      subjectId: subject3.id,
      name: '주요항목1: 계약관리 일반 절차',
      order: 1,
      estimatedWeight: 10,
    },
  });

  const s3_mt1_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt1.id,
      name: '세부1.1: 계약관리 계획',
      order: 1,
    },
  });

  const s3_mt1_st1_detailItems = [
    '계약관리 원칙',
    '계약관리 계획',
    '계약체결 후 발주처와 착수협의',
    '착수시점/보고(점검)일정/납품대상/투입인력 등 계약이행 소요자원 투입(생산)계획',
    '하도급계약 승인 및 변경 계획',
  ];

  for (let i = 0; i < s3_mt1_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt1_st1.id,
        name: s3_mt1_st1_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s3_mt1_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt1.id,
      name: '세부1.2: 계약변경 관리',
      order: 2,
    },
  });

  const s3_mt1_st2_detailItems = [
    '변경계약 관리 일반절차',
    '변경계약 절차 실행',
    '계약해제·해지 절차 및 사후조치',
    '손해배상 절차 및 사후조치',
    '분쟁해결 절차',
  ];

  for (let i = 0; i < s3_mt1_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt1_st2.id,
        name: s3_mt1_st2_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s3_mt1_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt1.id,
      name: '세부1.3: 계약이행 관리',
      order: 3,
    },
  });

  const s3_mt1_st3_detailItems = [
    '계약 대상물 공급(납품, 과업이행 및 시공 등) 일반절차',
    '공급 계약조건 이행점검',
    '계약이행 및 조건 미이행/오류 및 지연 관리',
    '계약성과관리',
    '계약상 위험 관리',
  ];

  for (let i = 0; i < s3_mt1_st3_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt1_st3.id,
        name: s3_mt1_st3_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s3_mt1_st4 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt1.id,
      name: '세부1.4: 계약종결 관리',
      order: 4,
    },
  });

  const s3_mt1_st4_detailItems = [
    '납품검사·검수 절차',
    '대금지급 절차',
    '계약종결 절차',
    '하자보증 및 사후관리 이행',
    '입찰보증금/계약보증금/선급금보증금/하자보수보증금/매입채권 및 보험 관리',
    '지체상금 부과',
  ];

  for (let i = 0; i < s3_mt1_st4_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt1_st4.id,
        name: s3_mt1_st4_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  // 주요항목2: 물품 계약관리
  const s3_mt2 = await prisma.mainTopic.create({
    data: {
      subjectId: subject3.id,
      name: '주요항목2: 물품 계약관리',
      order: 2,
      estimatedWeight: 6,
    },
  });

  const s3_mt2_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt2.id,
      name: '세부2.1: 물품계약 일반절차 관리',
      order: 1,
    },
  });

  const s3_mt2_st1_detailItems = [
    '물품(제조·공급) 입찰참가자격 등록',
    '물품구매 입찰 공고서 작성 및 검토',
    '물품구매 낙찰자결정 방법',
    '소액수의계약 절차',
    '외자구매계약 절차',
  ];

  for (let i = 0; i < s3_mt2_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt2_st1.id,
        name: s3_mt2_st1_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s3_mt2_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt2.id,
      name: '세부2.2: 물품계약 이행관리',
      order: 2,
    },
  });

  const s3_mt2_st2_detailItems = [
    '공정/품질 및 안전관리',
    '설계변경 및 계약금액 조정',
  ];

  for (let i = 0; i < s3_mt2_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt2_st2.id,
        name: s3_mt2_st2_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  // 주요항목3: 용역·다수공급자 계약 관리
  const s3_mt3 = await prisma.mainTopic.create({
    data: {
      subjectId: subject3.id,
      name: '주요항목3: 용역·다수공급자 계약 관리',
      order: 3,
      estimatedWeight: 8,
    },
  });

  const s3_mt3_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt3.id,
      name: '세부3.1: 용역계약 절차 및 이행관리',
      order: 1,
    },
  });

  const s3_mt3_st1_detailItems = [
    '용역 입찰공고문 검토',
    '제안서 작성',
    '낙찰자 결정방법',
    '제안서 평가 및 제안발표',
    '협상계약 및 경쟁적대화 계약',
    '용역적격심사',
    'e-발주시스템 활용',
  ];

  for (let i = 0; i < s3_mt3_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt3_st1.id,
        name: s3_mt3_st1_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  const s3_mt3_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt3.id,
      name: '세부3.2: 다수공급자계약(MAS) 절차 및 이행관리',
      order: 2,
    },
  });

  const s3_mt3_st2_detailItems = [
    '국가종합전자조달시스템(나라장터) 종합쇼핑몰 활용',
    '다수공급자계약 일반절차 이해',
    '다수공급자계약 적격성 평가 및 사전심사',
    '다수공급자계약 2단계경쟁',
    '다수공급자계약 계약이행실적 평가',
    '카탈로그계약 및 디지털서비스계약 절차',
  ];

  for (let i = 0; i < s3_mt3_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt3_st2.id,
        name: s3_mt3_st2_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  // 주요항목4: 공사계약관리
  const s3_mt4 = await prisma.mainTopic.create({
    data: {
      subjectId: subject3.id,
      name: '주요항목4: 공사계약관리',
      order: 4,
      estimatedWeight: 10,
    },
  });

  const s3_mt4_st1 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt4.id,
      name: '세부4.1: 공사계약 일반개요',
      order: 1,
    },
  });

  const s3_mt4_st1_detailItems = [
    '건설산업기본법 이해',
    '건설기술진흥법 이해',
    '건설공사 발주 세부기준 이해',
  ];

  for (let i = 0; i < s3_mt4_st1_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt4_st1.id,
        name: s3_mt4_st1_detailItems[i],
        predictionScore: 3,
      },
    });
  }

  const s3_mt4_st2 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt4.id,
      name: '세부4.2: 공사계약 일반절차 및 이행관리',
      order: 2,
    },
  });

  const s3_mt4_st2_detailItems = [
    '공사 입찰 공고문 검토',
    '공사 낙찰자 결정방법',
    '입찰참가자격 사전심사(PQ)',
    '공사 적격심사',
    '공사 설계변경 및 계약금액 조정',
  ];

  for (let i = 0; i < s3_mt4_st2_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt4_st2.id,
        name: s3_mt4_st2_detailItems[i],
        predictionScore: 5,
      },
    });
  }

  const s3_mt4_st3 = await prisma.subTopic.create({
    data: {
      mainTopicId: s3_mt4.id,
      name: '세부4.3: 공사계약 특화 절차 및 이행관리',
      order: 3,
    },
  });

  const s3_mt4_st3_detailItems = [
    '공사 종합심사낙찰제 절차',
    '일괄/대안 및 기술제안입찰 절차',
    '공사 시공관리 절차',
    '기술용역 계약 절차',
    '하도급관리',
    '하도급대금 전자적 처리를 위한 지급시스템(하도급지킴이)',
  ];

  for (let i = 0; i < s3_mt4_st3_detailItems.length; i++) {
    await prisma.detailItem.create({
      data: {
        subTopicId: s3_mt4_st3.id,
        name: s3_mt4_st3_detailItems[i],
        predictionScore: 4,
      },
    });
  }

  console.log('Created all 3과목 content');

  // ========== CREATE CONCEPT CARDS ==========
  const detailItems = await prisma.detailItem.findMany({ take: 20 });

  const conceptCardData = [
    {
      detailItemId: detailItems[0]?.id || '',
      frontText: '공공조달의 정의는 무엇인가?',
      backText: '국가, 지방자치단체, 공공기관이 필요한 물품, 용역, 공사를 시장에서 구매하는 행위',
      category: 'concept',
      difficulty: 'basic',
    },
    {
      detailItemId: detailItems[1]?.id || '',
      frontText: '공공조달과 민간조달의 차이점',
      backText: '공공조달은 투명성, 공정성, 효율성을 강조하며 법적 규제가 엄격함',
      category: 'compare',
      difficulty: 'applied',
    },
    {
      detailItemId: detailItems[2]?.id || '',
      frontText: '공공조달의 3대 원칙',
      backText: '투명성(Transparency), 공정성(Fairness), 효율성(Efficiency)',
      category: 'concept',
      difficulty: 'basic',
    },
    {
      detailItemId: detailItems[3]?.id || '',
      frontText: '일반경쟁의 특징',
      backText: '자격을 갖춘 모든 자가 참여 가능하며 가장 광범위한 경쟁입찰 방식',
      category: 'concept',
      difficulty: 'applied',
    },
    {
      detailItemId: detailItems[4]?.id || '',
      frontText: '제한경쟁과 지명경쟁의 차이',
      backText: '제한경쟁: 특정 자격 조건에 맞는 자가 입찰 / 지명경쟁: 발주처가 특정 자를 지명',
      category: 'compare',
      difficulty: 'applied',
    },
    {
      detailItemId: detailItems[5]?.id || '',
      frontText: '수의계약이 가능한 경우',
      backText: '재해복구, 긴급상황, 기술독점, 특수용도 등 경쟁입찰이 불가능할 때',
      category: 'law',
      difficulty: 'advanced',
    },
    {
      detailItemId: detailItems[6]?.id || '',
      frontText: '나라장터의 주요 기능',
      backText: '국가 중앙집중형 전자조달시스템으로 공고, 입찰, 계약관리 등을 통합 관리',
      category: 'concept',
      difficulty: 'basic',
    },
    {
      detailItemId: detailItems[7]?.id || '',
      frontText: '종합쇼핑몰 vs 혁신장터',
      backText: '종합쇼핑몰: 목록화된 물품 구매 / 혁신장터: 신기술·혁신제품 우선구매',
      category: 'compare',
      difficulty: 'applied',
    },
    {
      detailItemId: detailItems[8]?.id || '',
      frontText: '녹색제품 우선구매제도의 목적',
      backText: '환경보전과 자원절약을 통해 지속가능한 공공조달 실현',
      category: 'concept',
      difficulty: 'applied',
    },
    {
      detailItemId: detailItems[9]?.id || '',
      frontText: '중소기업자간 경쟁제도',
      backText: '일정 규모 이상의 공공조달에서 중소기업만 참여하도록 제한하는 제도',
      category: 'law',
      difficulty: 'advanced',
    },
    {
      detailItemId: detailItems[10]?.id || '',
      frontText: '계약의 성립 요건',
      backText: '청약(offer)과 승낙(acceptance)의 합치로 이루어짐',
      category: 'concept',
      difficulty: 'basic',
    },
    {
      detailItemId: detailItems[11]?.id || '',
      frontText: '도급계약과 위임계약의 차이',
      backText: '도급: 일정한 결과를 약정 / 위임: 사무처리를 위임',
      category: 'compare',
      difficulty: 'applied',
    },
    {
      detailItemId: detailItems[12]?.id || '',
      frontText: '추정가격 결정의 의미',
      backText: '발주처가 정한 예상 계약금액으로 낙찰가 판정의 기준이 되는 가격',
      category: 'law',
      difficulty: 'advanced',
    },
    {
      detailItemId: detailItems[13]?.id || '',
      frontText: '무효입찰의 주요 사유',
      backText: '입찰금액 기재 오류, 입찰기간 초과, 서명날인 누락 등',
      category: 'law',
      difficulty: 'advanced',
    },
    {
      detailItemId: detailItems[14]?.id || '',
      frontText: '적격심사란?',
      backText: '낙찰자로 예정된 자가 계약이행 능력이 있는지 심사하는 절차',
      category: 'procedure',
      difficulty: 'applied',
    },
    {
      detailItemId: detailItems[15]?.id || '',
      frontText: '이의신청의 제출기한',
      backText: '공고문이 게시된 날로부터 7일 이내에 제출',
      category: 'law',
      difficulty: 'advanced',
    },
    {
      detailItemId: detailItems[16]?.id || '',
      frontText: '계약해제와 계약해지의 차이',
      backText: '계약해제: 계약 성립 전 상태로 복귀 / 계약해지: 이행 불능으로 계약 종료',
      category: 'compare',
      difficulty: 'advanced',
    },
    {
      detailItemId: detailItems[17]?.id || '',
      frontText: '하자보증의 목적',
      backText: '공급 후 발견된 결함에 대한 책임과 비용 부담을 명확히 하는 것',
      category: 'concept',
      difficulty: 'applied',
    },
    {
      detailItemId: detailItems[18]?.id || '',
      frontText: '부정당업자 제재의 종류',
      backText: '입찰참가 제한, 중징계, 고발 등',
      category: 'law',
      difficulty: 'advanced',
    },
    {
      detailItemId: detailItems[19]?.id || '',
      frontText: '지체상금 부과의 조건',
      backText: '계약금액과 지연 일수를 곱하여 산정하며 사전통지가 필요',
      category: 'procedure',
      difficulty: 'advanced',
    },
  ];

  for (const card of conceptCardData) {
    if (card.detailItemId) {
      await prisma.conceptCard.create({ data: card });
    }
  }

  console.log('Created concept cards');

  // ========== CREATE SAMPLE QUESTIONS ==========
  const subject1Questions = [
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '공공조달의 정의' } }))?.id || '',
      subjectId: subject1.id,
      questionText: '다음 중 공공조달의 정의로 가장 적절한 것은?',
      options: [
        '민간기업이 필요한 물품을 구매하는 행위',
        '국가, 지방자치단체, 공공기관이 필요한 물품, 용역, 공사를 시장에서 구매하는 행위',
        '개인이 생활에 필요한 물품을 구매하는 행위',
        '수출업체가 해외에서 물품을 구매하는 행위',
      ],
      correctAnswer: 1,
      difficulty: 1,
      explanation: '공공조달은 정부와 공공기관이 공공목적을 위해 필요한 물품, 용역, 공사를 시장에서 구매하는 것입니다.',
      wrongExplanations: [
        '민간기업의 구매는 민간조달입니다',
        '개인의 구매는 일반적인 소비 행위입니다',
        '수출업체의 해외 구매는 국제거래입니다',
      ],
      tags: ['정의', '기본', '1과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '일반경쟁' } }))?.id || '',
      subjectId: subject1.id,
      questionText: '일반경쟁입찰의 특징은?',
      options: [
        '발주처가 특정인을 지정하여 입찰',
        '자격을 갖춘 모든 자가 참여 가능한 경쟁입찰',
        '특정 자격을 갖춘 자만 입찰 참여 가능',
        '경쟁 없이 발주처가 직접 선정',
      ],
      correctAnswer: 1,
      difficulty: 1,
      explanation: '일반경쟁입찰은 자격을 갖춘 모든 자가 참여할 수 있는 가장 광범위한 경쟁입찰 방식입니다.',
      wrongExplanations: [
        '이는 지명경쟁입찰입니다',
        '이는 제한경쟁입찰입니다',
        '이는 수의계약입니다',
      ],
      tags: ['경쟁입찰', '방법', '1과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '수의계약' } }))?.id || '',
      subjectId: subject1.id,
      questionText: '수의계약이 가능한 경우가 아닌 것은?',
      options: [
        '긴급상황에서의 구매',
        '모든 일반적인 물품 구매',
        '기술독점 제품 구매',
        '재해복구 관련 구매',
      ],
      correctAnswer: 1,
      difficulty: 2,
      explanation: '일반적인 물품 구매는 경쟁입찰을 통해 진행되며, 수의계약은 예외적인 경우에만 사용됩니다.',
      wrongExplanations: [
        '긴급상황은 수의계약이 가능합니다',
        '기술독점 제품은 수의계약이 가능합니다',
        '재해복구는 수의계약이 가능합니다',
      ],
      tags: ['수의계약', '조달방법', '1과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '나라장터 활용 계약' } }))?.id || '',
      subjectId: subject1.id,
      questionText: '국가종합전자조달시스템(나라장터)의 주요 역할은?',
      options: [
        '민간기업의 수출을 지원하는 시스템',
        '공공조달 공고, 입찰, 계약관리를 통합 관리하는 시스템',
        '개인의 온라인 쇼핑을 지원하는 시스템',
        '중고물품 거래를 중개하는 시스템',
      ],
      correctAnswer: 1,
      difficulty: 1,
      explanation: '나라장터는 중앙집중형 전자조달시스템으로 공공조달의 공고, 입찰, 계약관리 등 모든 과정을 통합 관리합니다.',
      wrongExplanations: [
        '이는 수출지원 시스템이 아닙니다',
        '이는 일반 이커머스 플랫폼이 아닙니다',
        '이는 중고거래 플랫폼이 아닙니다',
      ],
      tags: ['전자조달', '나라장터', '1과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '계약의 성립 관련 규정' } }))?.id || '',
      subjectId: subject1.id,
      questionText: '민법상 계약의 성립요건은?',
      options: [
        '발주처의 일방적 의사표시',
        '청약과 승낙의 합치',
        '계약서 서명만으로 성립',
        '대가금 지급',
      ],
      correctAnswer: 1,
      difficulty: 2,
      explanation: '민법상 계약은 청약(offer)과 승낙(acceptance)이 합치하여 성립합니다.',
      wrongExplanations: [
        '양방 합의가 필요합니다',
        '서명만으로는 부족합니다',
        '대가금 지급은 계약 성립 후입니다',
      ],
      tags: ['민법', '계약', '1과목'],
    },
  ];

  for (const question of subject1Questions) {
    if (question.detailItemId) {
      await prisma.question.create({ data: question });
    }
  }

  // Sample questions for Subject 2
  const subject2Questions = [
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '공급 대상물 수요정보 식별' } }))?.id || '',
      subjectId: subject2.id,
      questionText: '공공조달 수요 분석 단계에서 가장 먼저 해야 할 일은?',
      options: [
        '예산 책정',
        '공급 대상물 수요정보 식별',
        '입찰공고',
        '낙찰자 선정',
      ],
      correctAnswer: 1,
      difficulty: 1,
      explanation: '수요 분석의 첫 단계는 실제 필요한 물품, 용역, 공사가 무엇인지 정확히 파악하는 것입니다.',
      wrongExplanations: [
        '예산 책정은 2단계입니다',
        '입찰공고는 4단계입니다',
        '낙찰자 선정은 5단계 이후입니다',
      ],
      tags: ['계획', '분석', '2과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '일반·제한·지명 경쟁입찰 절차' } }))?.id || '',
      subjectId: subject2.id,
      questionText: '입찰·제안평가 절차에서 가장 높은 수준의 경쟁이 기대되는 방법은?',
      options: [
        '지명경쟁입찰',
        '일반경쟁입찰',
        '수의계약',
        '협상계약',
      ],
      correctAnswer: 1,
      difficulty: 2,
      explanation: '일반경쟁입찰은 자격을 갖춘 모든 자가 참여 가능하므로 가장 높은 경쟁이 기대됩니다.',
      wrongExplanations: [
        '지명경쟁은 참여자가 제한됩니다',
        '수의계약은 경쟁이 없습니다',
        '협상계약은 협상을 통해 진행됩니다',
      ],
      tags: ['평가', '절차', '2과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '적격심사 절차 및 낙찰자 결정' } }))?.id || '',
      subjectId: subject2.id,
      questionText: '적격심사의 목적은?',
      options: [
        '가장 저가의 입찰자를 찾기 위해',
        '낙찰자로 예정된 자의 계약이행 능력을 심사',
        '입찰자의 자본금을 확인하기 위해',
        '입찰자의 신원을 확인하기 위해',
      ],
      correctAnswer: 1,
      difficulty: 2,
      explanation: '적격심사는 낙찰자로 예정된 자가 실제로 계약을 이행할 능력이 있는지를 확인하는 절차입니다.',
      wrongExplanations: [
        '저가 선정은 낙찰 방식입니다',
        '자본금 확인은 기초적 요건 확인입니다',
        '신원 확인은 입찰 참여 조건입니다',
      ],
      tags: ['평가', '낙찰', '2과목'],
    },
  ];

  for (const question of subject2Questions) {
    if (question.detailItemId) {
      await prisma.question.create({ data: question });
    }
  }

  // Sample questions for Subject 3
  const subject3Questions = [
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '계약관리 원칙' } }))?.id || '',
      subjectId: subject3.id,
      questionText: '계약관리의 기본 원칙은?',
      options: [
        '비용 절감만 고려',
        '일정 준수만 고려',
        '투명성, 공정성, 효율성의 균형',
        '품질 향상만 고려',
      ],
      correctAnswer: 2,
      difficulty: 1,
      explanation: '계약관리는 투명성, 공정성, 효율성을 균형있게 추구해야 합니다.',
      wrongExplanations: [
        '비용만 고려하면 품질이 저하됩니다',
        '일정만 고려하면 품질이 낮아집니다',
        '품질만 고려하면 비용이 증가합니다',
      ],
      tags: ['관리', '원칙', '3과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '납품검사·검수 절차' } }))?.id || '',
      subjectId: subject3.id,
      questionText: '납품검사의 목적은?',
      options: [
        '계약조건과 일치하는지 확인',
        '계약금액이 적정한지 확인',
        '입찰자의 신용도 확인',
        '시장 가격 조사',
      ],
      correctAnswer: 0,
      difficulty: 1,
      explanation: '납품검사는 공급된 물품, 용역, 공사가 계약 조건과 일치하는지 확인하는 절차입니다.',
      wrongExplanations: [
        '금액 확인은 사전에 진행됩니다',
        '신용도는 입찰 전에 확인합니다',
        '가격 조사는 조달 계획 단계입니다',
      ],
      tags: ['검사', '검수', '3과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '변경계약 관리 일반절차' } }))?.id || '',
      subjectId: subject3.id,
      questionText: '계약 변경이 필요한 경우는?',
      options: [
        '발주처가 임의로 결정할 수 있음',
        '계약 금액이 10% 이상 변경될 경우',
        '설계 변경, 수량 증감 등 정당한 사유가 있을 경우',
        '계약자가 요청하면 반드시 승인해야 함',
      ],
      correctAnswer: 2,
      difficulty: 2,
      explanation: '계약 변경은 설계 변경, 수량 증감, 기술 개선 등 정당한 사유가 있을 때 진행되며, 법적 절차를 준수해야 합니다.',
      wrongExplanations: [
        '임의로 변경할 수 없습니다',
        '정해진 비율이 있는 것이 아닙니다',
        '정당한 사유 없이 승인할 수 없습니다',
      ],
      tags: ['변경', '관리', '3과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '하도급관리' } }))?.id || '',
      subjectId: subject3.id,
      questionText: '하도급관리에서 주의해야 할 사항은?',
      options: [
        '하도급 금액 제한이 없음',
        '하도급자 선정 및 계약 관리의 투명성과 공정성',
        '하도급자의 신용 정보 확인 불필요',
        '하도급 계약서 작성이 불필요',
      ],
      correctAnswer: 1,
      difficulty: 2,
      explanation: '하도급 관리는 하도급자 선정부터 계약, 이행, 대금 지급까지 투명하고 공정하게 진행되어야 합니다.',
      wrongExplanations: [
        '하도급 금액은 제한이 있습니다',
        '신용 정보 확인은 필수입니다',
        '계약서 작성은 필수입니다',
      ],
      tags: ['하도급', '관리', '3과목'],
    },
    {
      detailItemId: (await prisma.detailItem.findFirst({ where: { name: '지체상금 부과' } }))?.id || '',
      subjectId: subject3.id,
      questionText: '지체상금 부과의 조건은?',
      options: [
        '발주처의 임의 판단',
        '계약금액과 지연 일수를 곱하여 산정하며 사전통지 필요',
        '지연이 있으면 자동 부과',
        '지연 사유를 묻지 않고 부과',
      ],
      correctAnswer: 1,
      difficulty: 2,
      explanation: '지체상금은 계약금액과 지연 일수에 따라 계산되며, 발주처는 사전에 통지해야 합니다.',
      wrongExplanations: [
        '법적 기준에 따라 부과됩니다',
        '불가항력적 사유는 제외될 수 있습니다',
        '정당한 사유에 따라 판단해야 합니다',
      ],
      tags: ['지체상금', '페널티', '3과목'],
    },
  ];

  for (const question of subject3Questions) {
    if (question.detailItemId) {
      await prisma.question.create({ data: question });
    }
  }

  console.log('Created sample questions');

  // ========== CREATE SAMPLE USER AND PROGRESS ==========
  const user = await prisma.user.create({
    data: {
      email: 'student@ppms.test',
      nickname: '공공조달관리사 합격자',
      targetExamDate: new Date('2026-10-03'),
      currentPhase: 1,
      studyStartDate: new Date('2026-03-01'),
      streakDays: 5,
      lastStudyDate: new Date(),
    },
  });

  // Create progress for some detail items
  const detailItemsForProgress = await prisma.detailItem.findMany({ take: 10 });
  for (const item of detailItemsForProgress) {
    await prisma.userProgress.create({
      data: {
        userId: user.id,
        detailItemId: item.id,
        conceptCardMastered: Math.random() > 0.5,
        questionCorrectRate: Math.random() * 100,
        questionAttempts: Math.floor(Math.random() * 10),
        reviewCount: Math.floor(Math.random() * 5),
        lastReviewedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  console.log('Created sample user and progress');

  console.log('Seed database completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
