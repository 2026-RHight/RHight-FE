export const kmsCategories = [
  { key: 'dev', name: '개발', restricted: false },
  { key: 'hr', name: '인사', restricted: false },
  { key: 'general', name: '총무', restricted: false },
  { key: 'finance', name: '재무', restricted: true },
  { key: 'security', name: '보안', restricted: true },
]

export const manuals = [
  { id: 101, title: 'Vue 프론트엔드 배포 가이드', category: 'dev', author: '김도윤', createdAt: '2026-02-13', updatedAt: '2026-02-15', version: 'V2.1', summary: 'Vite 기반 프론트엔드 배포 절차와 점검 항목', body: '배포 전 .env 검증, 빌드, 스테이징 검수, 운영 배포 순서로 진행합니다.' },
  { id: 102, title: '신규 입사자 온보딩 체크리스트', category: 'hr', author: '이하늘', createdAt: '2026-02-12', updatedAt: '2026-02-12', version: 'V1.4', summary: '입사 전 계정 발급부터 2주 온보딩 운영 절차', body: '입사 D-3 계정 발급, 입사일 장비 지급, 1주차 교육, 2주차 피드백을 포함합니다.' },
  { id: 103, title: '법인카드 정산 처리 기준', category: 'general', author: '박세진', createdAt: '2026-02-11', updatedAt: '2026-02-11', version: 'V1.2', summary: '법인카드 사용 및 정산 반려 기준 정리', body: '영수증 첨부 누락 시 반려되며, 결제일 기준 7일 내 정산해야 합니다.' },
  { id: 104, title: '로그 모니터링 알람 대응 가이드', category: 'dev', author: '정유진', createdAt: '2026-02-10', updatedAt: '2026-02-10', version: 'V1.8', summary: '에러 레벨별 대응 순서 및 장애 티켓 연결 규칙', body: 'Critical 알람은 10분 내 1차 대응하고 장애 티켓을 필수 발행합니다.' },
  { id: 105, title: '연차 촉진 절차 안내', category: 'hr', author: '오민석', createdAt: '2026-02-09', updatedAt: '2026-02-09', version: 'V1.0', summary: '연차 촉진 공지, 대상자 추출, 이력 보관 절차', body: '반기별로 미사용 연차 보유자를 추출하여 촉진 공지를 발송합니다.' },
  { id: 106, title: '회의실 예약 운영 정책', category: 'general', author: '최서연', createdAt: '2026-02-08', updatedAt: '2026-02-08', version: 'V1.3', summary: '회의실 예약 우선순위 및 취소 정책', body: '30분 이상 무단 미사용 시 자동 취소되며 반복 예약은 월 단위 승인합니다.' },
  { id: 107, title: '백엔드 API 장애 공지 템플릿', category: 'dev', author: '김태훈', createdAt: '2026-02-07', updatedAt: '2026-02-07', version: 'V1.6', summary: '장애 공지 작성 표준 템플릿', body: '장애 영향 범위, 임시 조치, 복구 예상 시간을 반드시 포함해야 합니다.' },
  { id: 108, title: '인사평가 이의신청 처리 흐름', category: 'hr', author: '한지민', createdAt: '2026-02-06', updatedAt: '2026-02-06', version: 'V1.1', summary: '평가 이의 접수부터 위원회 검토까지의 처리 절차', body: '접수 후 3영업일 이내 사실 확인을 시작하며 결과는 서면으로 통보합니다.' },
  { id: 109, title: '비품 구매 승인 매트릭스', category: 'general', author: '정소라', createdAt: '2026-02-05', updatedAt: '2026-02-05', version: 'V2.0', summary: '구매 금액 구간별 승인 권한 매트릭스', body: '200만원 이상 구매는 부서장+재무팀 이중 승인 대상입니다.' },
  { id: 110, title: '개인정보 반출 승인 절차', category: 'security', author: '윤성호', createdAt: '2026-02-04', updatedAt: '2026-02-04', version: 'V3.0', summary: '개인정보 반출 요청 및 승인 절차', body: '개인정보 반출은 최소 권한 원칙 기반으로 사전 승인 후 수행합니다.' },
  { id: 111, title: '월 마감 비용 계정 처리 규칙', category: 'finance', author: '신혜원', createdAt: '2026-02-03', updatedAt: '2026-02-03', version: 'V2.4', summary: '월 마감 시 계정 대체 기준과 검증 순서', body: '마감 전 비용 계정 잔액 검토, 전표 증빙 확인, 결산 체크리스트 점검이 필요합니다.' },
]

export const meetingArchives = [
  { id: 901, team: '프론트엔드팀', title: '2월 2주차 스프린트 회고', createdAt: '2026-02-14', owner: '김도윤', summary: '배포 지연 원인 및 스프린트 개선안 논의' },
  { id: 902, team: '프론트엔드팀', title: '디자인 시스템 운영회의', createdAt: '2026-02-13', owner: '정유진', summary: '컴포넌트 표준화와 릴리즈 정책 합의' },
  { id: 903, team: '프론트엔드팀', title: '접근성 품질 점검 회의', createdAt: '2026-02-12', owner: '최서연', summary: 'WCAG 기준 미흡 항목 정리 및 일정 확정' },
  { id: 904, team: '프론트엔드팀', title: 'Q1 목표 재정렬 미팅', createdAt: '2026-02-11', owner: '김태훈', summary: '성과지표 재설정 및 리소스 재배분' },
  { id: 905, team: '프론트엔드팀', title: '테스트 자동화 전략회의', createdAt: '2026-02-10', owner: '박세진', summary: 'E2E 파이프라인 범위 확정' },
  { id: 906, team: '프론트엔드팀', title: '협업툴 개선 TF 회의', createdAt: '2026-02-09', owner: '한지민', summary: '지식관리 도구 통합 방안 검토' },
  { id: 907, team: '프론트엔드팀', title: '코드리뷰 가이드 정비', createdAt: '2026-02-08', owner: '윤성호', summary: '리뷰 SLA와 필수 체크리스트 수립' },
  { id: 908, team: '프론트엔드팀', title: '릴리즈 캘린더 운영회의', createdAt: '2026-02-07', owner: '신혜원', summary: '정기 배포 주기 조정 및 공지 프로세스' },
  { id: 909, team: '프론트엔드팀', title: '신입 멘토링 회의', createdAt: '2026-02-06', owner: '이하늘', summary: '온보딩 개선 피드백 공유' },
  { id: 910, team: '프론트엔드팀', title: '장애 대응 리허설 회의', createdAt: '2026-02-05', owner: '오민석', summary: '비상대응 역할 분장 및 훈련 계획' },
  { id: 911, team: '플랫폼팀', title: 'DB 이중화 운영 점검', createdAt: '2026-02-04', owner: '조민재', summary: '장애 복구 시나리오 테스트 결과' },
]

export const manualVersionHistory = [
  { version: 'V2.1', type: 'minor', editor: '김도윤', updatedAt: '2026-02-15', notes: '배포 체크리스트 보강' },
  { version: 'V2.0', type: 'major', editor: '김도윤', updatedAt: '2026-01-30', notes: '배포 전략 전면 개편' },
  { version: 'V1.4', type: 'minor', editor: '정유진', updatedAt: '2025-12-18', notes: '검수 항목 세부화' },
]

export const permissionTargets = {
  read: ['프론트엔드팀', '플랫폼팀', '김도윤'],
  edit: ['프론트엔드팀 리더', '김도윤'],
  delete: ['관리자', '김도윤'],
}

export const sortByDateDesc = (rows, dateKey = 'createdAt') => {
  return [...rows].sort((a, b) => new Date(b[dateKey]).getTime() - new Date(a[dateKey]).getTime())
}
