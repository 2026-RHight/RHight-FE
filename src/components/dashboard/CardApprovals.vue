<template>
  <div class="card fade-up delay-2 approvals-card">
    <div class="card-header">
      <div class="tab-pills">
        <div
          v-for="tab in tabs" :key="tab.key"
          class="tab-pill" :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >{{ tab.label }}</div>
      </div>
      <div class="icon-actions">
        <span title="필터"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></span>
        <span title="새로고침"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></span>
        <span title="추가"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></span>
      </div>
    </div>
    <div class="card-body" style="display:flex;flex-direction:column;flex:1">
      <div style="flex:1">
        <div v-for="(item, i) in items" :key="i" class="approval-item">
          <div class="approval-icon">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div class="approval-title">{{ item.title }}</div>
          <div class="approval-meta">
            <span>{{ item.who }}</span>
            <span>{{ item.date }}</span>
          </div>
        </div>
      </div>
      <div class="approval-footer">
        <a href="#">전체보기 →</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('pending')
const tabs = [
  { key: 'pending', label: '미결문서 18건' },
  { key: 'progress', label: '진행문서 8건' },
]

// 더미 데이터 (추후 API 연결)
const items = [
  { title: '휴가 신청서 이연 월차 외', who: '김서연', date: '2023.03.03' },
  { title: '출장 보고서 (해외)', who: 'Steve', date: '2023.03.03' },
  { title: '출장 보고서 (해외)', who: 'Kalan', date: '2023.03.03' },
  { title: '법인카드 상신', who: '강민준', date: '2023.03.02' },
]
</script>

<style scoped>
.approvals-card{height:100%;display:flex;flex-direction:column}
.approval-item{
  display:flex;align-items:center;gap:10px;
  padding:10px 0;border-bottom:1px solid var(--gray100);
}
.approval-item:last-child{border-bottom:none}
.approval-icon{
  width:26px;height:26px;border-radius:7px;background:var(--gray50);
  display:flex;align-items:center;justify-content:center;color:var(--gray400);flex-shrink:0;
}
.approval-title{flex:1;font-size:0.88rem;font-weight:500;color:var(--gray700)}
.approval-meta{display:flex;gap:10px;font-size:0.78rem;color:var(--gray400);white-space:nowrap}
.approval-footer{
  text-align:center;padding-top:10px;border-top:1px solid var(--gray100);margin-top:4px;
}
.approval-footer a{font-size:0.8rem;color:var(--gray500)}
.approval-footer a:hover{color:var(--primary)}
</style>
