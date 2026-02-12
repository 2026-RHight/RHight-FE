export const hrMyPageUserMock = {
  name: '김세현',
  team: '모바일1팀',
  jobTitle: '백엔드 개발자',
  position: '팀장',
  email: 'sehyun.kim@rhight.co.kr',
  phone: '010-1234-5678',
  extension: '1042',
  workLocation: '서울 강남',
  lastLogin: '2026.02.09 09:12',
  empNo: '2402040001',
  birthDate: '1995.03.28',
  address: '서울시 강남구 테헤란로 123 어딘가 아파트 101동 202호',
  ssn: '950328-1******',
  bankAccount: '신한 110-****-****890',
  orgPosition: '모바일1팀 · 팀장',
  jobRole: '백엔드 개발자 · 사무직',
  rank: '과장 · 3호봉',
  status: '재직',
  hireDate: '2024.02.04',
  tenure: '2년 0개월',
  workType: '정규직',
  workRegion: '서울 강남',
  hireType: '경력',
  careers: [
    { company: 'RHight', role: '백엔드 개발자 · 모바일1팀', period: '2024.02 ~ 재직중', duration: '2년 0개월' },
    { company: '네이버', role: '서버 개발자 · 플랫폼개발팀', period: '2021.03 ~ 2024.01', duration: '2년 11개월' },
    { company: '카카오', role: '백엔드 개발자 · 서비스개발팀', period: '2019.07 ~ 2021.02', duration: '1년 8개월' }
  ],
  skills: [
    { type: '자격증', name: '정보처리기사', issuer: '한국산업인력공단', date: '2023.06', status: '유효' },
    { type: '어학', name: 'TOEIC 920', issuer: 'ETS', date: '2024.01', status: '유효' },
    { type: '자격증', name: 'SQLD', issuer: '한국데이터산업진흥원', date: '2023.09', status: '유효' }
  ]
}

export const createHrMyPageUserMock = () => structuredClone(hrMyPageUserMock)
