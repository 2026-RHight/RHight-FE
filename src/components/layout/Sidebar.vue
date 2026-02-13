<template>
  <aside class="sidebar">
    <!-- 인사 모드 -->
    <template v-if="isHrMode">
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
    <!-- 근태 모드 -->
    <template v-else-if="isAttendanceMode">
      <div class="sidebar-header">
        <span>근태 관리</span>
      </div>
      <div class="menu-section">
        <div
            v-for="item in attendanceMenus"
            :key="item.label"
            class="sidebar-item"
            :class="{ active: currentPath.includes(item.route) || (item.route === '/attendance' && currentPath === '/attendance') }"
            @click="handleNavigate(item.route)"
        >
          <component :is="item.icon" />
          {{ item.label }}
        </div>
      </div>
      <div class="divider"></div>
      <div class="divider"></div>
    </template>
    <!-- 급여 모드 -->
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
    <!-- 전자결재 모드 -->
    <template v-else-if="isApprovalMode">
      <div class="sidebar-header">
        <span>전자결재</span>
      </div>
      
      <div class="menu-section">
        <div v-for="menu in approvalMenus" :key="menu.label" class="menu-group">
          <div class="sidebar-item menu-head" @click="toggleMenu(menu.label)">
            <div class="menu-label-wrap">
              <component :is="menu.icon" />
              <span>{{ menu.label }}</span>
            </div>
            <svg 
              class="chevron" 
              :class="{ 'rotate': isOpen(menu.label) }"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          
          <div v-show="isOpen(menu.label)" class="sub-menu">
            <div 
              v-for="sub in menu.children" 
              :key="sub.label" 
              class="sidebar-item sub-item"
              @click="handleNavigate(sub.route)"
              :class="{ active: currentPath === sub.route }"
            >
              <span class="dot"></span>
              {{ sub.label }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="divider"></div>
    
    </template>

    <template v-else-if="isPerformance">
      <div class="sidebar-header">
        <span>성과 관리</span>
        <span class="sidebar-role-badge" :class="{ 'sidebar-role-badge--manager': perfStore.role === 'manager' }">
          {{ perfStore.role === 'manager' ? '관리자' : '사용자' }}
        </span>
      </div>

      <!-- 관리자 메뉴 -->
      <template v-if="perfStore.role === 'manager'">
        <div class="sidebar-section-label">팀 관리</div>
        <div
            v-for="item in managerMenuItems"
            :key="item.id"
            class="sidebar-item"
            :class="{ 'sidebar-item--active': perfStore.activePage === item.id }"
            @click="perfStore.setPage(item.id)"
        >
          <component :is="item.icon" />
          <span class="sidebar-item-text">{{ item.name }}</span>
          <span v-if="item.badge" class="sidebar-badge">{{ item.badge }}</span>
        </div>
        <div class="sidebar-divider" />
        <div class="sidebar-section-label">내 성과</div>
      </template>
      <!-- 사용자 메뉴 -->
      <div
          v-for="item in userMenuItems"
          :key="item.id"
          class="sidebar-item"
          :class="{ 'sidebar-item--active': perfStore.activePage === item.id }"
          @click="perfStore.setPage(item.id)"
      >
        <component :is="item.icon" />
        {{ item.name }}
      </div>

      <!-- 모드 전환 버튼 -->
      <div class="sidebar-toggle">
        <div class="sidebar-item sidebar-item--toggle" @click="perfStore.toggleRole()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          {{ perfStore.role === 'manager' ? '사용자 모드로 전환' : '관리자 모드로 전환' }}
        </div>
      </div>
    </template>


    <!-- 메인 모드 (기존 바로가기) -->
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
import { h, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePerformanceStore } from '@/store/performance'

const router = useRouter()
const route = useRoute()
const perfStore = usePerformanceStore()

// 현재 경로가 /approval 로 시작하면 전자결재 모드
const isApprovalMode = computed(() => route.path.startsWith('/approval'))

// 현재 경로가 /hr 로 시작하면 인사 모드
const isHrMode = computed(() => route.path.startsWith('/hr'))
// 현재 경로가 /attendance 로 시작하면 근태 모드
// 현재 경로가 /attendance 로 시작하면 근태 모드
const isAttendanceMode = computed(() => route.path.startsWith('/attendance'))
// 현재 경로가 /salary 로 시작하면 급여 모드
const isSalaryMode = computed(() => route.path.startsWith('/salary'))

const currentPath = computed(() => route.path)
const isPerformance = computed(() => route.path.startsWith('/performance'))

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
const CreditCardIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('rect', { x:'1', y:'4', width:'22', height:'16', rx:'2', ry:'2' }),
  h('line', { x1:'1', y1:'10', x2:'23', y2:'10' }),
])
const userMenuItems = [
  { id: 'dashboard', name: '대시보드', icon: DashboardIcon },
  { id: 'registration', name: '성과 등록', icon: PlusIcon },
  { id: 'inquiry', name: '성과 조회', icon: SearchIcon },
  { id: 'monthly', name: '월별 성과', icon: ChartIcon },
  { id: 'peer-review', name: '동료 평가', icon: UsersIcon },
]

const managerMenuItems = [
  { id: 'manager-dashboard', name: '팀 대시보드', icon: DashboardIcon },
  { id: 'approval-list', name: '승인 대기 목록', icon: CheckIcon, badge: 12 },
  { id: 'team-evaluation', name: '팀원 평가', icon: FileTextIcon },
  { id: 'team-stats', name: '부서 성과 통계', icon: ChartIcon },
]

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

// --- 근태 모드 데이터 ---
const attendanceMenus = [
  { label: '나의 근태', icon: ClockIcon, route: '/attendance/my' },
  { label: '출퇴근 기록', icon: ListIcon, route: '/attendance/record' },
  { label: '신청 내역 조회', icon: CheckIcon, route: '/attendance/history' },
  { label: '근무 일정', icon: CalendarIcon, route: '/attendance/schedule' },
]

// --- 급여 모드 데이터 ---
const salaryMenus = [
  { label: '급여 조회', icon: CreditCardIcon, route: '/salary/my' },
]

// --- 전자결재 모드 데이터 ---
// Mock User Rank
const userRank = 'manager' 

const approvalChildren = [
  { label: '전자 결재 기안', route: '/approval/draft' },
  { label: '전자 결재 현황', route: '/approval/status' },
  { label: '전자 결재 문서함', route: '/approval/box' },
]

if (['manager', 'admin'].includes(userRank)) {
  approvalChildren.push({ label: '전자 결재 검토', route: '/approval/review' })
}

const approvalMenus = [
  {
    label: '전자결재 메뉴', // 메뉴 그룹명
    icon: ApprovalIcon,
    children: approvalChildren
  }
]

// 메뉴 토글 상태 관리
const openMenus = ref({ '전자결재 메뉴': true }) 

const toggleMenu = (label) => {
  openMenus.value[label] = !openMenus.value[label]
}

const isOpen = (label) => !!openMenus.value[label]

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
</style>
