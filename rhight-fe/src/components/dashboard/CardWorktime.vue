<template>
  <div class="card fade-up delay-4 worktime-card">
    <div class="card-header">
      <div class="wt-tabs">
        <div v-for="tab in tabs" :key="tab.key" class="wt-tab" :class="{active:activeTab===tab.key}" @click="activeTab=tab.key">{{tab.label}}</div>
      </div>
      <span class="icon-refresh">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
      </span>
    </div>
    <div class="card-body">
      <div class="wt-week">4월 3주</div>
      <div class="wt-value">
        <span class="wt-num font-num">49</span>
        <span class="wt-unit">h</span>
      </div>
      <div class="wt-chart">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="#06B6D4" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <polyline :points="linePoints" fill="none" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline :points="areaPoints" fill="url(#chartGrad)" stroke="none"/>
        </svg>
      </div>
      <div class="wt-days">
        <span v-for="d in days" :key="d">{{ d }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('weekly')
const tabs = [
  { key: 'weekly', label: '주간 근무시간' },
  { key: 'monthly', label: '월간 근무시간' },
]
const days = ['화', '수', '목', '금', '토']
const linePoints = '10,80 55,65 100,55 145,40 190,35 210,38 235,45 260,30 290,85'
const areaPoints = '10,80 55,65 100,55 145,40 190,35 210,38 235,45 260,30 290,85 290,100 10,100'
</script>

<style scoped>
.worktime-card{height:100%}
.wt-tabs{display:flex;gap:0}
.wt-tab{
  font-size:0.85rem;font-weight:600;color:var(--gray400);cursor:pointer;
  padding-bottom:4px;margin-right:14px;border-bottom:2px solid transparent;
  transition:all var(--transition);
}
.wt-tab.active{color:var(--gray800);border-bottom-color:var(--gray800)}
.icon-refresh{color:var(--gray400);cursor:pointer;display:flex}
.icon-refresh:hover{color:var(--gray600)}
.wt-week{font-size:0.78rem;color:var(--gray400);margin-bottom:2px}
.wt-num{font-size:2.5rem;font-weight:800;color:var(--gray800);line-height:1}
.wt-unit{font-size:1rem;font-weight:400;color:var(--secondary);margin-left:2px}
.wt-chart{width:100%;height:130px;margin-top:14px}
.wt-chart svg{width:100%;height:100%}
.wt-days{display:flex;justify-content:space-between;margin-top:5px;padding:0 6px}
.wt-days span{font-size:0.7rem;color:var(--gray400)}
</style>
