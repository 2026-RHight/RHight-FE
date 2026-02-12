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
