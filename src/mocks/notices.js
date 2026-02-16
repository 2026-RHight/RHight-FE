import { ref } from 'vue'

const noticesState = ref([
  {
    id: 'N-202602-001',
    title: '2026년 인사 평가 일정 안내',
    createdAt: '2026.02.14',
    department: '인사팀',
    author: '김서연',
    type: 'HR_ANNOUNCEMENT',
    typeLabel: '인사 발령 공지',
    content:
      '2026년 상반기 인사 평가 일정이 확정되었습니다. 대상자별 일정은 부서장에게 별도 공유되며, 평가 입력 마감은 2026.02.28입니다.'
  },
  {
    id: 'N-202602-002',
    title: '개인정보 처리 지침 개정 안내',
    createdAt: '2026.02.11',
    department: '인사팀',
    author: '박지은',
    type: 'POLICY_CHANGE',
    typeLabel: '정책 변경 공지',
    content:
      '사내 개인정보 처리 지침이 개정되었습니다. 주요 변경 사항은 보관 기간, 접근 권한, 파기 절차 강화이며 2026.02.20부터 시행됩니다.'
  },
  {
    id: 'N-202602-003',
    title: '시스템 점검 안내 (2/19 22:00 ~ 23:00)',
    createdAt: '2026.02.09',
    department: '인사팀',
    author: '정우성',
    type: 'SYSTEM_NOTICE',
    typeLabel: '시스템 공지',
    content:
      '안정적인 서비스 제공을 위해 시스템 점검이 진행됩니다. 점검 시간 동안 일부 메뉴 접속이 제한될 수 있습니다.'
  },
  {
    id: 'N-202602-004',
    title: '직급 승진자 발령 공지',
    createdAt: '2026.02.08',
    department: '인사팀',
    author: '김서연',
    type: 'HR_ANNOUNCEMENT',
    typeLabel: '인사 발령 공지',
    content:
      '2026년 2월 정기 승진 대상자 발령이 완료되었습니다. 세부 발령 사항은 마이페이지 인사 히스토리에서 확인 가능합니다.'
  },
  {
    id: 'N-202602-005',
    title: '근무 형태 운영 기준 변경 안내',
    createdAt: '2026.02.05',
    department: '인사팀',
    author: '최민아',
    type: 'POLICY_CHANGE',
    typeLabel: '정책 변경 공지',
    content:
      '유연근무제 운영 기준이 일부 변경됩니다. 변경 기준은 다음 달 1일부터 적용되며 세부 내용은 정책 문서에서 확인해 주세요.'
  },
  {
    id: 'N-202602-006',
    title: '2026년 상반기 인사 발령 계획 사전 안내',
    createdAt: '2026.02.03',
    department: '인사팀',
    author: '김서연',
    type: 'HR_ANNOUNCEMENT',
    typeLabel: '인사 발령 공지',
    content: '상반기 인사 발령 일정과 대상 기준을 사전 안내드립니다. 부서별 세부 일정은 별도 메일로 전달 예정입니다.'
  },
  {
    id: 'N-202602-007',
    title: '복리후생 신청 절차 변경 안내',
    createdAt: '2026.01.30',
    department: '인사팀',
    author: '박지은',
    type: 'POLICY_CHANGE',
    typeLabel: '정책 변경 공지',
    content: '복리후생 신청 절차가 간소화되었습니다. 2월 1일부터 새 양식과 승인 절차를 사용해 주세요.'
  },
  {
    id: 'N-202602-008',
    title: '인사정보시스템 점검 공지 (1/28 21:00~22:00)',
    createdAt: '2026.01.27',
    department: '인사팀',
    author: '정우성',
    type: 'SYSTEM_NOTICE',
    typeLabel: '시스템 공지',
    content: '인사정보시스템 안정화 작업으로 인해 일시적으로 조회가 지연될 수 있습니다.'
  },
  {
    id: 'N-202602-009',
    title: '2026년 승진 심사 기준 공지',
    createdAt: '2026.01.24',
    department: '인사팀',
    author: '최민아',
    type: 'HR_ANNOUNCEMENT',
    typeLabel: '인사 발령 공지',
    content: '승진 심사 기준과 평가 반영 비율을 공지합니다. 상세 내용은 첨부 문서를 참고해 주세요.'
  },
  {
    id: 'N-202602-010',
    title: '개인정보 보관 기간 정책 변경 안내',
    createdAt: '2026.01.21',
    department: '인사팀',
    author: '김서연',
    type: 'POLICY_CHANGE',
    typeLabel: '정책 변경 공지',
    content: '인사 데이터 보관 기간 기준이 변경되었습니다. 변경된 기간은 정책 문서 3.2항에서 확인 가능합니다.'
  },
  {
    id: 'N-202602-011',
    title: '전자결재 연동 시스템 패치 공지',
    createdAt: '2026.01.18',
    department: '인사팀',
    author: '정우성',
    type: 'SYSTEM_NOTICE',
    typeLabel: '시스템 공지',
    content: '전자결재 연동 모듈 패치가 예정되어 있습니다. 패치 시간 동안 결재 상신이 제한될 수 있습니다.'
  },
  {
    id: 'N-202602-012',
    title: '신규 입사자 온보딩 일정 안내',
    createdAt: '2026.01.15',
    department: '인사팀',
    author: '박지은',
    type: 'HR_ANNOUNCEMENT',
    typeLabel: '인사 발령 공지',
    content: '1월 입사자 온보딩 프로그램 일정과 교육 장소를 안내드립니다.'
  },
  {
    id: 'N-202602-013',
    title: '재택근무 신청 정책 개정 공지',
    createdAt: '2026.01.12',
    department: '인사팀',
    author: '최민아',
    type: 'POLICY_CHANGE',
    typeLabel: '정책 변경 공지',
    content: '재택근무 신청 횟수 및 승인 기준이 일부 조정되었습니다. 시행일은 2026.01.20입니다.'
  },
  {
    id: 'N-202602-014',
    title: '인사포털 인증 모듈 업데이트 공지',
    createdAt: '2026.01.09',
    department: '인사팀',
    author: '정우성',
    type: 'SYSTEM_NOTICE',
    typeLabel: '시스템 공지',
    content: '보안 강화를 위해 인증 모듈이 업데이트됩니다. 최초 로그인 시 추가 인증이 필요할 수 있습니다.'
  },
  {
    id: 'N-202602-015',
    title: '2026년 1분기 인사 운영 계획 공지',
    createdAt: '2026.01.06',
    department: '인사팀',
    author: '김서연',
    type: 'HR_ANNOUNCEMENT',
    typeLabel: '인사 발령 공지',
    content: '1분기 인사 운영 목표와 주요 추진 항목을 공유드립니다.'
  }
])

export const NOTICE_TYPE_OPTIONS = [
  { value: 'ALL', label: '전체 유형' },
  { value: 'SYSTEM_NOTICE', label: '시스템 공지' },
  { value: 'POLICY_CHANGE', label: '정책 변경 공지' },
  { value: 'HR_ANNOUNCEMENT', label: '인사 발령 공지' }
]

const parseDate = (dateText) => new Date(dateText.replace(/\./g, '-'))

const sorted = () =>
  [...noticesState.value].sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt))

const typeLabelOf = (type) =>
  NOTICE_TYPE_OPTIONS.find((item) => item.value === type)?.label || '기타'

const todayText = () => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

export const getDashboardNotices = ({ limit = 6 } = {}) => sorted().slice(0, limit)

export const getNoticeById = (id) => sorted().find((item) => item.id === id) || null

export const searchNotices = ({ keyword = '', type = 'ALL' } = {}) => {
  const q = keyword.trim().toLowerCase()

  return sorted().filter((item) => {
    const titleMatch = q ? item.title.toLowerCase().includes(q) : true
    const typeMatch = type === 'ALL' ? true : item.type === type
    return titleMatch && typeMatch
  })
}

export const createNotice = ({ title, type, content, author }) => {
  const newNotice = {
    id: `N-${Date.now()}`,
    title: title.trim(),
    createdAt: todayText(),
    department: '인사팀',
    author: (author || '관리자').trim(),
    type,
    typeLabel: typeLabelOf(type),
    content: content.trim()
  }

  noticesState.value.unshift(newNotice)
  return newNotice
}
