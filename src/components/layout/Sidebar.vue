<template>
  <aside class="sidebar">
    <!-- 전자결재 모드 -->
    <template v-if="isApprovalMode">
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

const router = useRouter()
const route = useRoute()

// 현재 경로가 /approval 로 시작하면 전자결재 모드
const isApprovalMode = computed(() => route.path.startsWith('/approval'))
const currentPath = computed(() => route.path)

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

// --- 메인 모드 데이터 ---
const shortcuts = [
  { label: '마이페이지', icon: StarIcon, route: '/hr/my' },
  { label: '휴가 신청', icon: FileIcon, route: '/hr/leave' },
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
</style>
