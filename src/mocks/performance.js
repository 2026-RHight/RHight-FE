export const PERFORMANCE_MEMBERS = [
  {
    id: 1,
    name: '김서연',
    role: 'UX Designer',
    department: '디자인팀',
    avgScore: 4.6,
    image:
      'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzA1MzkwMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    chartData: [
      { subject: '업무성과', A: 4.5 },
      { subject: '업무태도', A: 4.8 },
      { subject: '협업능력', A: 4.2 },
      { subject: '창의성', A: 4.9 },
    ],
    tasks: [
      { id: 't1', title: '모바일 앱 메인화면 리뉴얼', date: '2023.06.20', status: 'completed', description: '사용성 개선을 위한 UX 개편' },
      { id: 't2', title: 'Q3 신규 기능 사용자 조사', date: '2023.06.15', status: 'completed', description: '타겟 유저 20명 대상 심층 인터뷰' },
      { id: 't3', title: '디자인 시스템 업데이트', date: '2023.06.30', status: 'in-progress', description: '컴포넌트 라이브러리 현행화' },
    ],
  },
  {
    id: 2,
    name: '이승주',
    role: 'Frontend Dev',
    department: '개발팀',
    avgScore: 4.5,
    image:
      'https://images.unsplash.com/photo-1701463387028-3947648f1337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGJ1c2luZXNzJTIwbWFuJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzA2MTcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    chartData: [
      { subject: '업무성과', A: 4.8 },
      { subject: '업무태도', A: 4.5 },
      { subject: '협업능력', A: 4.7 },
      { subject: '창의성', A: 3.8 },
    ],
    tasks: [
      { id: 't4', title: '관리자 대시보드 성능 최적화', date: '2023.06.10', status: 'completed', description: 'LCP 2.5초 -> 1.2초 단축' },
      { id: 't5', title: '공통 컴포넌트 리팩토링', date: '2023.06.25', status: 'in-progress', description: '레거시 코드 제거 및 패턴 적용' },
    ],
  },
  {
    id: 3,
    name: '박준호',
    role: 'Product Manager',
    department: '기획팀',
    avgScore: 4.7,
    image:
      'https://images.unsplash.com/photo-1738566061505-556830f8b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGJ1c2luZXNzJTIwbWFuJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzA2MTcyODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    chartData: [
      { subject: '업무성과', A: 4.2 },
      { subject: '업무태도', A: 4.9 },
      { subject: '협업능력', A: 5.0 },
      { subject: '창의성', A: 4.5 },
    ],
    tasks: [
      { id: 't6', title: 'Q3 제품 로드맵 수립', date: '2023.06.01', status: 'completed', description: '전사 목표와 연계된 전략 수립' },
      { id: 't7', title: '경쟁사 분석 리포트', date: '2023.06.18', status: 'completed', description: '주요 3사 기능 및 가격 정책' },
    ],
  },
]

export const PERFORMANCE_DASHBOARD = {
  pendingApprovalCount: 12,
  trendLabels: ['1월', '2월', '3월', '4월', '5월', '6월'],
  trendScores: [85, 92, 88, 95, 90, 98],
  feedbacks: [
    {
      id: 1,
      text: '지난 프로젝트에서 보여준 리더십이 인상적이었습니다.',
      author: '김팀장',
      date: '2023.06.15',
      inquiryItemId: 1,
      detail: '캠페인 전략 수립부터 운영, 성과 리포트까지 주도적으로 수행했습니다.',
    },
    {
      id: 2,
      text: '문서 작성 능력이 매우 탁월합니다. 꼼꼼한 처리에 감사드립니다.',
      author: '이과장',
      date: '2023.06.10',
      inquiryItemId: 2,
      detail: '마이그레이션 기준 문서와 개발 가이드를 체계적으로 정리해 팀 공유를 완료했습니다.',
    },
    {
      id: 3,
      text: '협업 시 커뮤니케이션이 원활하여 업무 진행이 빨랐습니다.',
      author: '박대리',
      date: '2023.05.28',
      inquiryItemId: 3,
      detail: '온보딩 단계별 이슈를 빠르게 공유하고 타 부서와 조율해 전체 일정 지연을 줄였습니다.',
    },
  ],
}

export const PERFORMANCE_INQUIRY_ITEMS = [
  { id: 1, type: 'Team', title: 'Q2 마케팅 캠페인 기획 및 실행', date: '2023.06.01 ~ 2023.06.15', status: '완료', progress: 100 },
  { id: 2, type: 'Individual', title: 'Vue 3 마이그레이션 완료', date: '2023.06.05 ~ 2023.06.20', status: '완료', progress: 100 },
  { id: 3, type: 'Team', title: '신규 고객사 온보딩 프로세스 개선', date: '2023.06.10 ~ 2023.06.30', status: '진행중', progress: 85 },
  { id: 4, type: 'Individual', title: '사내 기술 세미나 발표', date: '2023.06.18', status: '완료', progress: 100 },
  { id: 5, type: 'Team', title: 'Q3 제품 로드맵 수립', date: '2023.06.01 ~ 2023.06.30', status: '진행중', progress: 70 },
]

export const PERFORMANCE_MONTHLY = {
  initialYear: 2023,
  initialMonth: 6,
  stats: [
    { label: '업무 달성률', value: '98%' },
    { label: '협업 지수', value: '4.8' },
    { label: '성장 지수', value: 'A+' },
    { label: '종합 점수', value: '96.5' },
  ],
  chartLabels: ['1월', '2월', '3월', '4월', '5월', '6월'],
  myScores: [85, 92, 88, 95, 90, 98],
  teamScores: [80, 82, 81, 83, 85, 84],
  detailItems: [
    {
      id: 1,
      type: 'team',
      title: 'Q2 마케팅 캠페인 기획 및 실행',
      date: '06.01 ~ 06.15',
      progress: 100,
      score: 98,
      description: '신규 고객 유입 확대를 목표로 채널별 메시지를 최적화하고, 주간 단위 성과 분석 기반으로 운영 전략을 조정했습니다.',
      achievement: '전환율 22% 상승, CAC 14% 절감',
      feedbacks: [
        { id: 1, author: '김팀장', date: '2023.06.16', text: '캠페인 운영 속도가 매우 좋았고 리포트 품질도 높았습니다.' },
        { id: 2, author: '박매니저', date: '2023.06.18', text: '다음 분기에는 세그먼트별 실험 설계를 더 세분화하면 좋겠습니다.' },
      ],
    },
    {
      id: 2,
      type: 'individual',
      title: 'Vue 3 마이그레이션 완료',
      date: '06.05 ~ 06.20',
      progress: 100,
      score: 95,
      description: '레거시 Vue2 컴포넌트를 Vue3 Composition API 기반으로 전환하고, 공통 상태 관리와 라우팅 구조를 정리했습니다.',
      achievement: '핵심 화면 100% 전환, 렌더링 성능 개선',
      feedbacks: [
        { id: 1, author: '이리드', date: '2023.06.21', text: '전환 중 장애 없이 배포한 점이 인상적이었습니다.' },
        { id: 2, author: '정아키텍트', date: '2023.06.22', text: '테스트 코드 커버리지를 더 보강하면 유지보수성이 더 높아질 것 같습니다.' },
      ],
    },
    {
      id: 3,
      type: 'team',
      title: '신규 고객사 온보딩 프로세스 개선',
      date: '06.10 ~ 06.30',
      progress: 85,
      score: 92,
      description: '온보딩 단계별 체크리스트와 자동 안내 플로우를 도입해 초기 정착 속도를 높이는 작업을 진행했습니다.',
      achievement: '온보딩 완료 기간 평균 2.3일 단축',
      feedbacks: [
        { id: 1, author: '최팀장', date: '2023.06.28', text: '고객 관점에서 절차를 단순화한 접근이 좋았습니다.' },
      ],
    },
    {
      id: 4,
      type: 'individual',
      title: '사내 기술 세미나 발표',
      date: '06.18',
      progress: 100,
      score: 97,
      description: '프론트엔드 성능 최적화 사례를 주제로 사내 기술 세미나를 발표하고 Q&A 세션을 진행했습니다.',
      achievement: '참석자 만족도 4.9/5.0',
      feedbacks: [
        { id: 1, author: '조리더', date: '2023.06.19', text: '실무 사례 중심 구성이라 이해하기 쉬웠습니다.' },
        { id: 2, author: '한선임', date: '2023.06.19', text: '다음에는 실습형 세션도 추가해보면 좋겠습니다.' },
      ],
    },
  ],
}

export const PERFORMANCE_APPROVAL = {
  planItems: [
    { id: 1, user: '김서연', dept: '디자인팀', title: 'Q2 마케팅 캠페인 기획 및 실행', date: '2023.06.03', status: '대기', type: '팀 성과', progress: 0 },
    { id: 2, user: '이승주', dept: '개발팀', title: 'Vue 3 마이그레이션 완료', date: '2023.06.05', status: '대기', type: '개인 성과', progress: 0 },
    { id: 3, user: '박준호', dept: '기획팀', title: 'Q3 제품 로드맵 수립', date: '2023.06.06', status: '대기', type: '팀 성과', progress: 0 },
  ],
  resultItems: [
    { id: 4, user: '김서연', dept: '디자인팀', title: '신규 고객사 온보딩 프로세스 개선', date: '2023.06.30', status: '대기', type: '팀 성과', achievement: '85%', progress: 85 },
    { id: 5, user: '이승주', dept: '개발팀', title: '사내 기술 세미나 발표', date: '2023.06.18', status: '대기', type: '개인 성과', achievement: '100%', progress: 100 },
  ],
}

export const TEAM_EVALUATION_MEMBERS = [
  { id: 1, name: '김서연', role: 'UX Designer', department: '디자인팀', status: '평가 대기' },
  { id: 2, name: '이승주', role: 'Frontend Dev', department: '개발팀', status: '진행 중' },
  { id: 3, name: '박준호', role: 'Product Manager', department: '기획팀', status: '완료' },
]

export const PEER_REVIEW_COLLEAGUES = [
  { name: '김서연', team: '디자인팀', color: '#3b82f6', evaluated: false },
  { name: '이승주', team: '개발팀', color: '#22c55e', evaluated: false },
  { name: '박준호', team: '기획팀', color: '#f59e0b', evaluated: false },
]
