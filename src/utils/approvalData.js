export const mockUsers = [
    // 임원
    { id: 'u7', name: '강동원', position: '대표이사', department: '임원실', email: 'kang@example.com', canFinalize: true },
    { id: 'u6', name: '정수진', position: '이사', department: '경영지원본부', email: 'jung@example.com', canFinalize: true },
    { id: 'u13', name: '송혜교', position: '본부장', department: '기술연구소', email: 'song@example.com', canFinalize: true },
    { id: 'u14', name: '현빈', position: '상무', department: '영업본부', email: 'hyun@example.com', canFinalize: true },

    // 경영지원본부 - 인사팀
    { id: 'u1', name: '홍길동', position: '사원', department: '인사팀', email: 'hong@example.com', canFinalize: false },
    { id: 'u2', name: '김철수', position: '대리', department: '인사팀', email: 'kim@example.com', canFinalize: false },
    { id: 'u15', name: '최유진', position: '과장', department: '인사팀', email: 'choi@example.com', canFinalize: true },

    // 경영지원본부 - 마케팅팀
    { id: 'u11', name: '김남준', position: '과장', department: '마케팅팀', email: 'kim2@example.com', canFinalize: true },
    { id: 'u16', name: '박지민', position: '사원', department: '마케팅팀', email: 'park3@example.com', canFinalize: false },

    // 기술연구소 - SW개발센터 - 개발1팀
    { id: 'u3', name: '이영희', position: '과장', department: '개발1팀', email: 'lee@example.com', canFinalize: true },
    { id: 'u4', name: '박민수', position: '차장', department: '개발1팀', email: 'park@example.com', canFinalize: true },
    { id: 'u17', name: '정국', position: '사원', department: '개발1팀', email: 'jk@example.com', canFinalize: false },

    // 기술연구소 - SW개발센터 - 개발2팀
    { id: 'u8', name: '이지아', position: '사원', department: '개발2팀', email: 'lee2@example.com', canFinalize: false },
    { id: 'u9', name: '윤도현', position: '대리', department: '개발2팀', email: 'yoon@example.com', canFinalize: false },
    { id: 'u18', name: '민윤기', position: '과장', department: '개발2팀', email: 'suga@example.com', canFinalize: true },

    // 기술연구소 - 디자인팀
    { id: 'u12', name: '박보검', position: '대리', department: '디자인팀', email: 'park2@example.com', canFinalize: false },
    { id: 'u19', name: '김태형', position: '사원', department: '디자인팀', email: 'v@example.com', canFinalize: false },

    // 영업본부 - 영업1팀
    { id: 'u5', name: '최지훈', position: '부장', department: '영업1팀', email: 'choi@example.com', canFinalize: true },
    { id: 'u20', name: '강석진', position: '차장', department: '영업1팀', email: 'jin@example.com', canFinalize: true },

    // 영업본부 - 영업2팀
    { id: 'u10', name: '한소희', position: '사원', department: '영업2팀', email: 'han@example.com', canFinalize: false },
    { id: 'u21', name: '김제니', position: '대리', department: '영업2팀', email: 'jennie@example.com', canFinalize: false },

    // 추가 인원 (대규모 데이터)
    { id: 'u22', name: '임영웅', position: '과장', department: '영업1팀', email: 'lim@example.com', canFinalize: false },
    { id: 'u23', name: '장원영', position: '사원', department: '인사팀', email: 'jang@example.com', canFinalize: false },
    { id: 'u24', name: '안유진', position: '대리', department: '디자인팀', email: 'ahn@example.com', canFinalize: false },
    { id: 'u25', name: '손흥민', position: '본부장', department: '영업본부', email: 'son@example.com', canFinalize: true },
];

export const orgChart = [
    {
        id: 'd1',
        name: 'RHight Inc.',
        children: [
            {
                id: 'd2',
                name: '경영지원본부',
                children: [
                    { id: 'd3', name: '인사팀', users: ['u1', 'u2', 'u15', 'u23'] },
                    { id: 'd4', name: '총무팀', users: [] },
                    { id: 'd11', name: '마케팅팀', users: ['u11', 'u16'] },
                ],
                users: ['u6'],
            },
            {
                id: 'd5',
                name: '기술연구소',
                children: [
                    {
                        id: 'd12',
                        name: 'SW개발센터',
                        children: [
                            { id: 'd6', name: '개발1팀', users: ['u3', 'u4', 'u17'] },
                            { id: 'd13', name: '개발2팀', users: ['u8', 'u9', 'u18'] },
                        ]
                    },
                    { id: 'd7', name: 'QA팀', users: [] },
                    { id: 'd14', name: '디자인팀', users: ['u12', 'u19', 'u24'] },
                ],
                users: ['u13'],
            },
            {
                id: 'd8',
                name: '영업본부',
                children: [
                    { id: 'd9', name: '영업1팀', users: ['u5', 'u20', 'u22'] },
                    { id: 'd15', name: '영업2팀', users: ['u10', 'u21'] },
                ],
                users: ['u14', 'u25'],
            },
            {
                id: 'd10',
                name: '임원실',
                users: ['u7']
            }
        ],
    },
];

// 기본 Mock 결재선 (팀장 -> 부장 -> 대표이사)
export const mockApprovalLine = [
    mockUsers.find(u => u.id === 'u2'),  // 김철수 대리
    mockUsers.find(u => u.id === 'u5'),  // 최지훈 부장
    mockUsers.find(u => u.id === 'u7')   // 강동원 대표이사
];

// 기본 Mock 참조자
export const mockReferrers = [
    mockUsers.find(u => u.id === 'u3'),  // 이영희 과장
    mockUsers.find(u => u.id === 'u6')   // 정수진 이사
];

export const templates = [
    { id: 'vacation', name: '휴가 신청서', type: 'HR' },
    { id: 'flexible', name: '유연근무 신청서', type: 'HR' },
    { id: 'leave', name: '휴직신청서', type: 'HR' },
    { id: 'reinstatement', name: '복직신청서', type: 'HR' },
];

export const mockApprovalStatusList = [
    {
        id: 'DOC-2024-001',
        title: '2024년 정기 휴가 신청',
        templateName: '휴가 신청서',
        drafter: '홍길동',
        draftDate: '2024-02-10',
        status: '진행중',
        currentApprover: '최지훈 부장',
        progress: 66,
        approvalLine: [
            { name: '김철수', position: '대리', status: '승인', date: '2024-02-10' },
            { name: '최지훈', position: '부장', status: '대기', date: '' },
            { name: '강동원', position: '대표이사', status: '대기', date: '' }
        ]
    },
    {
        id: 'DOC-2024-002',
        title: '신규 프로젝트 협업툴 도입 품의',
        templateName: '기안서',
        drafter: '홍길동',
        draftDate: '2024-02-11',
        status: '반려',
        currentApprover: '정수진 이사',
        progress: 33,
        approvalLine: [
            { name: '김철수', position: '대리', status: '승인', date: '2024-02-11' },
            { name: '정수진', position: '이사', status: '반려', date: '2024-02-12' }
        ]
    },
    {
        id: 'DOC-2024-003',
        title: '3월 유연근무제 신청',
        templateName: '유연근무 신청서',
        drafter: '홍길동',
        draftDate: '2024-02-12',
        status: '기안중',
        currentApprover: '-',
        progress: 0,
        approvalLine: []
    }
];

export const mockPendingApprovals = [
    { id: 1, title: '2024년 정기 휴가 신청', templateName: '휴가', drafter: '김팀원', draftDate: '02-10', isNew: true },
    { id: 2, title: '신규 프로젝트 협업툴 도입 품의', templateName: '기안', drafter: '이대리', draftDate: '02-11', isNew: false },
    { id: 3, title: '운영 서버 스토리지 증설 요청', templateName: '품의', drafter: '박과장', draftDate: '02-12', isNew: false },
];

export const mockMyDrafts = [
    { id: 1, title: '4월 마케팅 예산 승인 요청', currentApprover: '박본부장', status: '진행', approverInitial: '박' },
    { id: 2, title: '비품(노트북) 구매 요청의 건', currentApprover: '이지아 과장', status: '진행', approverInitial: '이' },
    { id: 3, title: '상반기 워크샵 장소 선정 보고', currentApprover: '정수진 이사', status: '완료', approverInitial: '정' },
    { id: 4, title: '팀 빌딩 비용 정산', currentApprover: '-', status: '기안', approverInitial: '-' },
];

export const mockReviewList = [
    {
        id: '2024-REG-001',
        title: '2024년 1분기 영업 실적 분석 및 전략 보고',
        drafter: '최지훈',
        position: '부장',
        department: '영업1팀',
        date: '2024-02-10',
        status: '진행중',
        content: '2024년 1분기 영업 실적을 분석하고 향후 전략을 보고합니다.',
        isRead: false,
        category: '보고서',
        attachments: ['performance_2024_q1.pdf'],
        canFinalize: true,
        step: 2
    },
    {
        id: '2024-EXP-015',
        title: '신규 서버 인프라 구축 비용 정산',
        drafter: '박민수',
        position: '차장',
        department: '개발1팀',
        date: '2024-02-12',
        status: '진행중',
        content: '클라우드 마이그레이션에 따른 신규 서버 구축 비용 정산 요청입니다.',
        isRead: true,
        category: '품의서',
        attachments: ['invoice_cloud.png', 'cost_benefit_analysis.xlsx'],
        canFinalize: false,
        step: 3
    },
    {
        id: '2024-HR-048',
        title: '하반기 공채 채용 홍보 예산 기안',
        drafter: '김철수',
        position: '대리',
        department: '인사팀',
        date: '2024-02-13',
        status: '진행중',
        content: '우수 인재 확보를 위한 하반기 공채 채용 홍보 예산 집행 요청입니다.',
        isRead: false,
        category: '기안서',
        attachments: [],
        canFinalize: true,
        step: 1
    }
];

export const mockApprovalBox = [
    {
        id: '2024-REG-101',
        title: '연간 마케팅 제안서 검토 요청',
        drafter: '최지훈',
        position: '부장',
        department: '마케팅팀',
        date: '2024-02-01 10:00',
        status: '완료',
        category: '보고서',
        isRead: true,
        content: '2024년 연간 마케팅 핵심 전략 및 예산안 보고서입니다.',
        attachments: ['marketing_strategy_2024.pdf'],
        approvalLine: [
            { name: '최지훈', position: '부장', status: '기안', date: '2024-02-01' },
            { name: '이팀장', position: '팀장', status: '승인', date: '2024-02-01' },
            { name: '박본부장', position: '본부장', status: '승인', date: '2024-02-02' }
        ],
        referrers: ['김철수 (대리)', '이영희 (사원)'],
        comments: [
            { name: '박본부장', text: '좋은 마케팅 계획입니다. 실행에 차질 없도록 하세요.', date: '2024-02-02' }
        ]
    },
    {
        id: '2024-EXP-202',
        title: '신규 법인카드 발급 신청',
        drafter: '김나영',
        position: '사원',
        department: '경영지원팀',
        date: '2024-02-05 14:30',
        status: '진행중',
        category: '품의서',
        isRead: false,
        content: '영업팀 신규 입사자 법인카드 발급을 요청합니다.',
        attachments: [],
        approvalLine: [
            { name: '김나영', position: '사원', status: '기안', date: '2024-02-05' },
            { name: '백팀장', position: '팀장', status: '대기', date: '-' }
        ]
    },
    {
        id: '2024-HR-303',
        title: '3월 연차 휴가 사용 계획',
        drafter: '정수진',
        position: '이사',
        department: 'IT디자인실',
        date: '2024-02-08 09:15',
        status: '반려',
        category: '기안서',
        isRead: true,
        content: '3월 중순 개인 사정으로 인한 연차 휴가 사용 계획입니다.',
        attachments: [],
        rejectReason: '해당 주간에 전사 워크샵이 예정되어 있습니다. 일정 조정 바랍니다.',
        approvalLine: [
            { name: '정수진', position: '이사', status: '기안', date: '2024-02-08' },
            { name: '김상무', position: '상무', status: '반려', date: '2024-02-08' }
        ]
    },
    {
        id: 'TEMP-001',
        title: '(임시) 전사 보안 교육 실시의 건',
        drafter: '박기안',
        position: '대리',
        department: '정보보안팀',
        date: '2024-02-12 11:00',
        status: '임시저장',
        category: '기안서',
        isRead: true,
        content: '전 임직원 대상 상반기 정보보안 교육 실시를 위한 기안입니다.',
        attachments: ['sec_training_plan.docx']
    },
    {
        id: '2024-PUR-404',
        title: '모니터링 서버 노후 장비 교체 품의',
        drafter: '이대리',
        position: '대리',
        department: '인프라팀',
        date: '2024-02-10 16:45',
        status: '보류',
        category: '품의서',
        isRead: false,
        content: '인프라 모니터링 서버의 내구연한 만료에 따른 장비 교체 요청입니다.',
        attachments: ['server_spec_compare.xlsx']
    }
];




