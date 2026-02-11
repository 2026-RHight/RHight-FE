<template>
  <div class="approval-container">
    <div class="header-section">
      <h1 class="page-title">전자결재</h1>
      <p class="page-subtitle">쉽고 빠른 전자결재 시스템</p>
    </div>

    <div class="card-grid">
      <div 
        v-for="card in cards" 
        :key="card.route" 
        class="nav-card"
        @click="$router.push(card.route)"
      >
        <div class="card-content">
          <div class="icon-wrapper" :class="card.colorClass">
            <component :is="card.icon" />
          </div>
          <h2 class="card-title">{{ card.title }}</h2>
          <p class="card-desc">{{ card.description }}</p>
        </div>
        <div class="card-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

// Icons
const EditIcon = () => h('svg', { width:32, height:32, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' }),
  h('path', { d:'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' })
])
const ActivityIcon = () => h('svg', { width:32, height:32, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('polyline', { points:'22 12 18 12 15 21 9 3 6 12 2 12' })
])
const ArchiveIcon = () => h('svg', { width:32, height:32, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('polyline', { points:'21 8 21 21 3 21 3 8' }),
  h('rect', { x:'1', y:'3', width:'22', height:'5' }),
  h('line', { x1:'10', y1:'12', x2:'14', y2:'12' })
])
const CheckCircleIcon = () => h('svg', { width:32, height:32, viewBox:'0 0 24 24', fill:'none', stroke:'currentColor', 'stroke-width':'2' }, [
  h('path', { d:'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
  h('polyline', { points:'22 4 12 14.01 9 11.01' })
])

const cards = [
  {
    title: '전자 결재 기안',
    description: '새로운 결재 문서를 작성하고 상신합니다.',
    route: '/approval/draft',
    icon: EditIcon,
    colorClass: 'blue-icon'
  },
  {
    title: '전자 결재 현황',
    description: '진행 중인 결재 문서의 상태를 확인합니다.',
    route: '/approval/status',
    icon: ActivityIcon,
    colorClass: 'green-icon'
  },
  {
    title: '전자 결재 문서함',
    description: '완료된 결재 문서와 수신 문서를 보관합니다.',
    route: '/approval/box',
    icon: ArchiveIcon,
    colorClass: 'orange-icon'
  },
  {
    title: '전자 결재 검토',
    description: '결재 문서를 검토하고 승인합니다.',
    route: '/approval/review',
    icon: CheckCircleIcon,
    colorClass: 'purple-icon'
  }
]
</script>

<style scoped>
.approval-container {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 40px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.page-subtitle {
  color: #6B7280;
  font-size: 1.1rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.nav-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 280px;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid #E5E7EB;
}

.nav-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #3B82F6;
}

.icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background: #F3F4F6;
  color: #4B5563;
  transition: all 0.3s ease;
}

.nav-card:hover .icon-wrapper {
  transform: scale(1.1);
}

.blue-icon { background: #EBF5FF; color: #3B82F6; }
.green-icon { background: #ECFDF5; color: #10B981; }
.orange-icon { background: #FFF7ED; color: #F59E0B; }
.purple-icon { background: #F5F3FF; color: #8B5CF6; }

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 8px;
}

.card-desc {
  color: #6B7280;
  line-height: 1.5;
  font-size: 0.95rem;
}

.card-arrow {
  position: absolute;
  bottom: 24px;
  right: 24px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: #3B82F6;
}

.nav-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}
</style>
