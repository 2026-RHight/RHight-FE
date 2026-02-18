<template>
  <aside class="sidebar">
    <template v-if="isAdminMode">
      <div class="sidebar-header">
        <span>관리자</span>
      </div>

      <div class="menu-section">
        <div
            v-for="item in adminMenus"
            :key="item.label"
            class="sidebar-item"
            :class="{ active: currentPath === item.route, disabled: !item.route }"
            @click="handleNavigate(item.route)"
        >
          <component :is="item.icon" />
          {{ item.label }}
        </div>
      </div>

      <div class="divider"></div>
    </template>

    <template v-else-if="isHrMode">
      <div class="sidebar-header">
        <span>인사</span>
      </div>

      <div class="menu-section">
        <div
            v-for="item in hrMenus"
            :key="item.label"
            class="sidebar-item"
            :class="{ active: currentPath === item.route }"
            @click="handleNavigate(item.route)"
        >
          <component :is="item.icon" />
          {{ item.label }}
        </div>
      </div>

      <div class="divider"></div>
    </template>

    <template v-else-if="isAttendanceMode">
      <div class="sidebar-header">
        <span>근태 관리</span>
        <span v-if="['manager', 'admin'].includes(userRank)" class="sidebar-role-badge sidebar-role-badge--manager">관리자</span>
      </div>

      <template v-if="isAttendanceManager">
        <div class="sidebar-section-label">내 근태 관리</div>
        <div
            v-for="item in myAttendanceMenus"
            :key="item.label"
            class="sidebar-item"
            :class="{ 'active': currentPath.includes(item.route) || (item.route === '/attendance' && currentPath === '/attendance') }"
            @click="handleNavigate(item.route)"
        >
          <component :is="item.icon" />
          {{ item.label }}
        </div>

        <div class="sidebar-divider"></div>

        <div class="sidebar-section-label">팀 관리</div>
        <div
            v-for="item in teamAttendanceMenus"
            :key="item.label"
            class="sidebar-item"
            :class="{ 'active': currentPath.includes(item.route) }"
            @click="handleNavigate(item.route)"
        >
          <component :is="item.icon" />
          {{ item.label }}
        </div>
      </template>

      <template v-else>
        <div class="menu-section">
          <div
              v-for="item in myAttendanceMenus"
              :key="item.label"
              class="sidebar-item"
              :class="{ 'active': currentPath.includes(item.route) || (item.route === '/attendance' && currentPath === '/attendance') }"
              @click="handleNavigate(item.route)"
          >
            <component :is="item.icon" />
            {{ item.label }}
          </div>
        </div>
      </template>

      <div class="divider"></div>
    </template>

    <template v-else-if="isSalaryMode">
      <div class="sidebar-header">
        <span>급여 관리</span>
      </div>
      <div class="menu-section">
        <div
            v-for="item in salaryMenus"
            :key="item.label"
            class="sidebar-item"
            :class="{ active: currentPath.includes(item.route) }"
            @click="handleNavigate(item.route)"
        >
          <component :is="item.icon" />
          {{ item.label }}
        </div>
      </div>
      <div class="divider"></div>
    </template>

    <template v-else-if="isApprovalMode">
      <div class="sidebar-header">
        <span>전자결재</span>
      </div>

      <div
        class="sidebar-item"
        :class="{ 'sidebar-item--active': isMenuActive(approvalDashboardMenu) }"
        @click="handleNavigate(approvalDashboardMenu.route)"
      >
        <component :is="approvalDashboardMenu.icon" />
        {{ approvalDashboardMenu.label }}
      </div>

      <div class="sidebar-divider"></div>

      <template v-for="item in approvalMenus" :key="item.label">
        <div
          v-if="!item.isSub"
          class="sidebar-item"
          :class="{ 'sidebar-item--active': isMenuActive(item) }"
          @click="handleNavigate(item.route)"
        >
          <component :is="item.icon" />
          {{ item.label }}
        </div>

        <div
          v-else
          class="sidebar-item sub-item"
          :class="{ 'sidebar-item--active': isMenuActive(item) }"
          @click="handleNavigate(item.route)"
        >
          <span class="dot"></span>
          {{ item.label }}
        </div>
      </template>
    </template>

    <template v-else-if="isPerformance">
      <div class="sidebar-header">
        <span>성과</span>
      </div>

      <div
          class="sidebar-item"
          :class="{ 'sidebar-item--active': perfStore.activePage === dashboardPerformanceMenuItem.id }"
          @click="perfStore.setPage(dashboardPerformanceMenuItem.id)"
      >
        <component :is="dashboardPerformanceMenuItem.icon" />
        {{ dashboardPerformanceMenuItem.name }}
      </div>

      <div class="sidebar-divider"></div>
      <div class="sidebar-section-label">성과 관리</div>
      <div
          v-for="item in performanceManageMenuItems"
          :key="item.id"
          class="sidebar-item"
          :class="{ 'sidebar-item--active': perfStore.activePage === item.id }"
          @click="perfStore.setPage(item.id)"
      >
        <component :is="item.icon" />
        {{ item.name }}
      </div>

      <template v-if="isPerformanceManager">
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">팀 관리</div>
        <div
            v-for="item in teamManagementMenuItems"
            :key="item.id"
            class="sidebar-item"
            :class="{ 'sidebar-item--active': perfStore.activePage === item.id }"
            @click="perfStore.setPage(item.id)"
        >
          <component :is="item.icon" />
          {{ item.name }}
        </div>
      </template>
    </template>

    <template v-else-if="isKmsMode">
      <div class="sidebar-header">
        <span>KMS</span>
      </div>

      <div
        class="sidebar-item"
        :class="{ 'sidebar-item--active': isMenuActive(kmsDashboardMenu) }"
        @click="handleNavigate(kmsDashboardMenu.route)"
      >
        <component :is="kmsDashboardMenu.icon" />
        {{ kmsDashboardMenu.label }}
      </div>

      <div class="sidebar-divider"></div>
      <div class="sidebar-section-label">업무 메뉴얼</div>
      <div
        v-for="item in kmsManualMenus"
        :key="item.label"
        class="sidebar-item"
        :class="{ 'sidebar-item--active': isMenuActive(item) }"
        @click="handleNavigate(item.route)"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </div>

      <div class="sidebar-divider"></div>
      <div class="sidebar-section-label">아카이브</div>
      <div
        v-for="item in kmsArchiveMenus"
        :key="item.label"
        class="sidebar-item"
        :class="{ 'sidebar-item--active': isMenuActive(item) }"
        @click="handleNavigate(item.route)"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </div>
    </template>

    <template v-else>
      <div class="sidebar-header">
        <span>바로가기</span>
        <span class="sidebar-add" title="바로가기 추가">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </span>
      </div>
      <div
          v-for="item in shortcuts"
          :key="item.label"
          class="sidebar-item"
          @click="handleNavigate(item.route)"
      >
        <component :is="item.icon" />
        {{ item.label }}
      </div>
    </template>
  </aside>
</template>

<script setup>
import { h, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePerformanceStore } from '@/store/performance'
import { AUTH_KEYS } from '@/utils/auth'

const router = useRouter()
const route = useRoute()
const perfStore = usePerformanceStore()

// 현재 경로가 /admin 로 시작하면 관리자 모드
const isAdminMode = computed(() => route.path.startsWith('/admin'))

// 현재 경로가 /approval 로 시작하면 전자결재 모드
const isApprovalMode = computed(() => route.path.startsWith('/approval'))

// 현재 경로가 /hr 로 시작하면 인사 모드
const isHrMode = computed(() => route.path.startsWith('/hr'))

// 현재 경로가 /attendance 로 시작하면 근태 모드
const isAttendanceMode = computed(() => route.path.startsWith('/attendance'))

// 현재 경로가 /salary 로 시작하면 급여 모드
const isSalaryMode = computed(() => route.path.startsWith('/salary'))
const isKmsMode = computed(() => route.path.startsWith('/kms'))

const currentPath = computed(() => route.path)
const isPerformance = computed(() => route.path.startsWith('/performance'))
const currentUserId = computed(() => sessionStorage.getItem(AUTH_KEYS.userId) || '')
const PERFORMANCE_MANAGER_USER_IDS = ['admin1234']
const isPerformanceManager = computed(() => PERFORMANCE_MANAGER_USER_IDS.includes(currentUserId.value))
const isAttendanceManager = computed(() => ['admin1234'].includes(currentUserId.value))

// SVG icon components (inline)
const StarIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('polygon', { points:'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
])
const FileIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }),
  h('polyline', { points:'14 2 14 8 20 8' })
])
const ApprovalIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
  h('polyline', { points:'14 2 14 8 20 8' }),
  h('line', { x1:'16', y1:'13', x2:'8', y2:'13' }),
  h('line', { x1:'16', y1:'17', x2:'8', y2:'17' }),
  h('polyline', { points:'10 9 9 9 8 9' })
])
// 성과 아이콘
const DashboardIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('rect', { x:'3', y:'3', width:'7', height:'7', rx:'1' }),
  h('rect', { x:'14', y:'3', width:'7', height:'7', rx:'1' }),
  h('rect', { x:'3', y:'14', width:'7', height:'7', rx:'1' }),
  h('rect', { x:'14', y:'14', width:'7', height:'7', rx:'1' }),
])
const PlusIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('circle', { cx:'12', cy:'12', r:'10' }),
  h('line', { x1:'12', y1:'8', x2:'12', y2:'16' }),
  h('line', { x1:'8', y1:'12', x2:'16', y2:'12' }),
])
const SearchIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('circle', { cx:'11', cy:'11', r:'8' }),
  h('line', { x1:'21', y1:'21', x2:'16.65', y2:'16.65' }),
])
const ChartIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('rect', { x:'3', y:'12', width:'4', height:'9', rx:'1' }),
  h('rect', { x:'10', y:'7', width:'4', height:'14', rx:'1' }),
  h('rect', { x:'17', y:'3', width:'4', height:'18', rx:'1' }),
])
const UsersIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' }),
  h('circle', { cx:'9', cy:'7', r:'4' }),
  h('path', { d:'M23 21v-2a4 4 0 00-3-3.87' }),
  h('path', { d:'M16 3.13a4 4 0 010 7.75' }),
])
const UserIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
  h('circle', { cx:'12', cy:'7', r:'4' }),
])
const TreeIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('circle', { cx:'12', cy:'5', r:'2' }),
  h('circle', { cx:'5', cy:'19', r:'2' }),
  h('circle', { cx:'19', cy:'19', r:'2' }),
  h('line', { x1:'12', y1:'7', x2:'12', y2:'14' }),
  h('line', { x1:'12', y1:'14', x2:'5', y2:'17' }),
  h('line', { x1:'12', y1:'14', x2:'19', y2:'17' }),
])
const ClockIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('circle', { cx:'12', cy:'12', r:'10' }),
  h('polyline', { points:'12 6 12 12 16 14' })
])
const CalendarIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('rect', { x:'3', y:'4', width:'18', height:'18', rx:'2', ry:'2' }),
  h('line', { x1:'16', y1:'2', x2:'16', y2:'6' }),
  h('line', { x1:'8', y1:'2', x2:'8', y2:'6' }),
  h('line', { x1:'3', y1:'10', x2:'21', y2:'10' })
])
const ListIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('line', { x1:'8', y1:'6', x2:'21', y2:'6' }),
  h('line', { x1:'8', y1:'12', x2:'21', y2:'12' }),
  h('line', { x1:'8', y1:'18', x2:'21', y2:'18' }),
  h('line', { x1:'3', y1:'6', x2:'3.01', y2:'6' }),
  h('line', { x1:'3', y1:'12', x2:'3.01', y2:'12' }),
  h('line', { x1:'3', y1:'18', x2:'3.01', y2:'18' })
])
const CheckIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('polyline', { points:'9 11 12 14 22 4' }),
  h('path', { d:'M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11' }),
])
const FileTextIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }),
  h('polyline', { points:'14 2 14 8 20 8' }),
  h('line', { x1:'16', y1:'13', x2:'8', y2:'13' }),
  h('line', { x1:'16', y1:'17', x2:'8', y2:'17' }),
  h('line', { x1:'16', y1:'17', x2:'8', y2:'17' }),
])
const FolderIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' }),
])
const CreditCardIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('rect', { x:'1', y:'4', width:'22', height:'16', rx:'2', ry:'2' }),
  h('line', { x1:'1', y1:'10', x2:'23', y2:'10' }),
])
const UserPlusIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
  h('circle', { cx:'8.5', cy:'7', r:'4' }),
  h('line', { x1:'20', y1:'8', x2:'20', y2:'14' }),
  h('line', { x1:'17', y1:'11', x2:'23', y2:'11' })
])
const RefreshCwIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('polyline', { points:'23 4 23 10 17 10' }),
  h('polyline', { points:'1 20 1 14 7 14' }),
  h('path', { d:'M3.51 9a9 9 0 0114.13-3.36L23 10' }),
  h('path', { d:'M20.49 15a9 9 0 01-14.13 3.36L1 14' })
])
const ShieldIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })
])
const BellIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M18 8a6 6 0 10-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9' }),
  h('path', { d:'M13.73 21a2 2 0 01-3.46 0' })
])
const SlidersIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('line', { x1:'4', y1:'21', x2:'4', y2:'14' }),
  h('line', { x1:'4', y1:'10', x2:'4', y2:'3' }),
  h('line', { x1:'12', y1:'21', x2:'12', y2:'12' }),
  h('line', { x1:'12', y1:'8', x2:'12', y2:'3' }),
  h('line', { x1:'20', y1:'21', x2:'20', y2:'16' }),
  h('line', { x1:'20', y1:'12', x2:'20', y2:'3' }),
  h('line', { x1:'1', y1:'14', x2:'7', y2:'14' }),
  h('line', { x1:'9', y1:'8', x2:'15', y2:'8' }),
  h('line', { x1:'17', y1:'16', x2:'23', y2:'16' })
])

const adminMenus = [
  { label: '사원 등록', icon: UserPlusIcon, route: '/admin/employees' },
  { label: '인사변경 관리', icon: RefreshCwIcon, route: '/admin/hr-change' },
  { label: '근태 관리', icon: ClockIcon, route: '/admin/attendance' },
  { label: '정책 관리', icon: ShieldIcon, route: '/admin/policies' },
  { label: '공지사항 관리', icon: BellIcon, route: '/admin/notices' },
  { label: '급여 관리', icon: CreditCardIcon, route: '/admin/salary' },
  { label: '전자결재 정책선 관리', icon: SlidersIcon, route: '' }
]
const myPerformanceMenuItems = [
  { id: 'dashboard', name: '대시보드', icon: DashboardIcon },
  { id: 'registration', name: '성과 등록', icon: PlusIcon },
  { id: 'inquiry', name: '성과 조회', icon: SearchIcon },
  { id: 'monthly', name: '월별 성과', icon: ChartIcon },
  { id: 'peer-review', name: '동료 평가', icon: UsersIcon },
]
const teamManagementMenuItems = [
  { id: 'approval-list', name: '승인 대기 목록', icon: CheckIcon },
  { id: 'team-evaluation', name: '팀원 평가', icon: UsersIcon },
  { id: 'team-stats', name: '부서 성과 통계', icon: ChartIcon },
]

const dashboardPerformanceMenuItem = myPerformanceMenuItems[0]
const performanceManageMenuItems = myPerformanceMenuItems.filter(item => item.id !== 'dashboard')
const performanceMenuItems = computed(() => (
  isPerformanceManager.value
    ? [...myPerformanceMenuItems, ...teamManagementMenuItems]
    : myPerformanceMenuItems
))
const performanceMenuIds = computed(() => performanceMenuItems.value.map(item => item.id))
const myPerformanceMenuIds = computed(() => myPerformanceMenuItems.map(item => item.id))

watch([isPerformance, isPerformanceManager, performanceMenuIds], ([performance, manager]) => {
  if (!performance) return
  if (!performanceMenuIds.value.includes(perfStore.activePage)) {
    const nextPage = manager ? myPerformanceMenuIds.value[0] : myPerformanceMenuIds.value[0]
    perfStore.setPage(nextPage)
  }
}, { immediate: true })

// --- 메인 모드 데이터 ---
const shortcuts = [
  { label: '마이페이지', icon: StarIcon, route: '/hr/my' },
  { label: '휴가 신청', icon: FileIcon, route: '/hr/leave' },
]

// --- 인사 모드 데이터 ---
const hrMenus = [
  { label: '마이페이지', icon: UserIcon, route: '/hr/my' },
  { label: '내 조직 조회', icon: UsersIcon, route: '/hr/org' },
  { label: '조직도', icon: TreeIcon, route: '/hr/orgchart' },
]

// --- 전자결재 모드 데이터 ---
const userRank = computed(() => {
  const userId = sessionStorage.getItem(AUTH_KEYS.userId)
  return ['admin1234'].includes(userId) ? 'manager' : 'user'
})

// --- 근태 모드 데이터 ---
const myAttendanceMenus = [
  { label: '나의 근태', icon: ClockIcon, route: '/attendance/my' },
  { label: '출퇴근 기록', icon: ListIcon, route: '/attendance/record' },
  { label: '신청 내역 조회', icon: CheckIcon, route: '/attendance/history' },
  { label: '근무 일정', icon: CalendarIcon, route: '/attendance/schedule' },
]

const teamAttendanceMenus = [
  { label: '팀 근태 관리', icon: UsersIcon, route: '/attendance/team' },
  { label: '근태 관리', icon: UsersIcon, route: '/attendance/manage' },
  { label: '유연근무관리', icon: SlidersIcon, route: '/attendance/flexible' },
]

const attendanceMenus = computed(() => {
  return isAttendanceManager.value ? [...myAttendanceMenus, ...teamAttendanceMenus] : myAttendanceMenus
})

// --- 급여 모드 데이터 ---
const salaryMenus = [
  { label: '급여 조회', icon: CreditCardIcon, route: '/salary/my' },
]

const approvalMenus = computed(() => {
  const topMenus = [
    { label: '전자 결재 기안', icon: PlusIcon, route: '/approval/draft' },
    { label: '전자 결재 현황', icon: SearchIcon, route: '/approval/status' },
    { label: '전자 결재 검토', icon: CheckIcon, route: '/approval/review' }
  ]

  const boxMenu = { label: '전자 결재 문서함', icon: FolderIcon, route: '/approval/box' }
  const boxSubMenus = [
    { label: '전체 문서함', route: '/approval/box/all', routePrefix: '/approval/box/all', isSub: true },
    { label: '처리중인 문서함', route: '/approval/box/ing', routePrefix: '/approval/box/ing', isSub: true },
    { label: '보류/반려 문서함', route: '/approval/box/issue', routePrefix: '/approval/box/issue', isSub: true },
    { label: '완료 문서함', route: '/approval/box/completed', routePrefix: '/approval/box/completed', isSub: true },
    { label: '임시 보관함', route: '/approval/box/temp', routePrefix: '/approval/box/temp', isSub: true },
  ]

  return [...topMenus, boxMenu, ...boxSubMenus]
})
const approvalDashboardMenu = { label: '전자결재 대시보드', icon: DashboardIcon, route: '/approval' }
const kmsManualMenus = [
  {
    label: '메뉴얼 대시보드',
    icon: FileTextIcon,
    route: '/kms/manuals',
    routePrefixes: ['/kms/manuals/category', '/kms/manuals/detail', '/kms/manuals/edit']
  },
  { label: '메뉴얼 업로드', icon: PlusIcon, route: '/kms/manuals/upload' },
]

const kmsArchiveMenus = [
  {
    label: '회의록 아카이브',
    icon: FolderIcon,
    route: '/kms/archive',
    routePrefix: '/kms/archive',
    excludePrefixes: ['/kms/archive/manage']
  },
  { label: '아카이브 문서 등록', icon: PlusIcon, route: '/kms/archive/manage/new', routePrefix: '/kms/archive/manage' },
]

const kmsDashboardMenu = { label: 'KMS 대시보드', icon: DashboardIcon, route: '/kms' }

const isMenuActive = (item) => {
  if (currentPath.value === item.route) return true
  if (item.routePrefix && currentPath.value.startsWith(item.routePrefix)) {
    if (item.excludePrefixes) {
      return !item.excludePrefixes.some((prefix) => currentPath.value.startsWith(prefix))
    }
    return true
  }
  if (item.routePrefixes) return item.routePrefixes.some((prefix) => currentPath.value.startsWith(prefix))
  return false
}

const handleNavigate = (route) => {
  if (route) {
    router.push(route)
  }
}
</script>

<style scoped>
.sidebar{
  width:var(--sidebar-w);background:var(--gray50);
  border-right:1px solid var(--gray200);padding:16px 12px;
  flex-shrink:0;position:sticky;top:var(--header-h);
  height:calc(100vh - var(--header-h));overflow-y:auto;
}
.sidebar-header{
  display:flex;align-items:center;justify-content:space-between;
  font-size:0.75rem;font-weight:600;color:var(--gray400);
  margin-bottom:10px;padding:0 6px;
}
.sidebar-add{color:var(--secondary);cursor:pointer;display:flex}
.sidebar-item{
  display:flex;align-items:center;gap:8px;
  padding:8px 10px;border-radius:var(--radius-xs);
  font-size:0.85rem;color:var(--gray600);cursor:pointer;
  transition:all var(--transition);margin-bottom:2px;
  user-select: none;
}
.sidebar-item:hover{background:var(--gray200);color:var(--gray700)}
.sidebar-item svg{opacity:0.5;flex-shrink:0}
.sidebar-item.active { background: var(--gray200); color: var(--primary); font-weight: 600; }
.sidebar-item.disabled {
  opacity: .55;
  cursor: default;
}
.sidebar-item.disabled:hover {
  background: transparent;
  color: var(--gray600);
}

/* Divider */
.divider {
  height: 1px;
  background-color: var(--gray200);
  margin: 12px 0;
}

/* Menu Section */
.menu-head {
  justify-content: space-between;
  font-weight: 500;
}
.menu-label-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.chevron {
  transition: transform 0.2s;
  opacity: 0.4;
}
.rotate {
  transform: rotate(180deg);
}
.sub-menu {
  padding-left: 12px;
  overflow: hidden;
}
.sub-item {
  font-size: 0.8rem;
  padding: 6px 10px 6px 24px; /* 들여쓰기 */
  position: relative;
}
.sub-item .dot {
  position: absolute;
  left: 10px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--gray400);
}
.sub-item:hover .dot {
  background-color: var(--primary);
}
.sub-item.active .dot {
  background-color: var(--primary);
}

/* ── Performance sidebar ── */
.sidebar-role-badge {
  font-size: 0.65rem;
  padding: 2px 7px;
  border-radius: 6px;
  background: var(--gray100);
  color: var(--gray500);
  font-weight: 600;
}
.sidebar-role-badge--manager {
  background: var(--accent);
  color: var(--primary);
}
.sidebar-section-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--gray400);
  padding: 10px 10px 4px;
  text-transform: uppercase;
}
.sidebar-item--active {
  background: var(--accent);
  color: var(--primary);
  font-weight: 600;
}
.sidebar-item--active svg { opacity: 1; }
.sidebar-badge {
  margin-left: auto;
  font-size: 0.65rem;
  font-weight: 700;
  background: var(--primary);
  color: #fff;
  padding: 1px 6px;
  border-radius: 8px;
}
.sidebar-divider {
  height: 1px;
  background: var(--gray200);
  margin: 8px 0;
}
.sidebar-toggle {
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--gray200);
}
.sidebar-item--toggle {
  font-size: 0.78rem;
  color: var(--gray400);
}
.sidebar-item--toggle:hover {
  color: var(--primary);
}

/* Approval sub-menu indent tuning */
.sub-item {
  margin-left: 16px;
  width: calc(100% - 16px);
  padding-left: 28px;
  border-radius: 8px;
}

.sub-item .dot {
  left: 12px;
}

.sub-item.sidebar-item--active .dot {
  background-color: var(--primary);
}
</style>
