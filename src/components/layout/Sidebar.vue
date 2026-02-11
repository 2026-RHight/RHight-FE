<template>
  <aside class="sidebar">
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
      @click="handleClick(item)"
    >
      <component :is="item.icon" />
      {{ item.label }}
    </div>
  </aside>
</template>

<script setup>
import { h } from 'vue'

// SVG icon components (inline)
const StarIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('polygon', { points:'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' })
])
const FileIcon = () => h('svg', { width:16, height:16, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }),
  h('polyline', { points:'14 2 14 8 20 8' })
])

const shortcuts = [
  { label: '마이페이지', icon: StarIcon, route: '/hr/my' },
  { label: '휴가 신청', icon: FileIcon, route: '/hr/leave' },
]

const handleClick = (item) => {
  // 추후 router.push(item.route)
  console.log('Navigate to:', item.route)
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
}
.sidebar-item:hover{background:var(--gray200);color:var(--gray700)}
.sidebar-item svg{opacity:0.5;flex-shrink:0}
</style>
