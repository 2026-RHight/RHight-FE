<template>
  <div class="card fade-up delay-3 notices-card">
    <div class="card-header">
      <div class="tab-pills">
        <div v-for="tab in tabs" :key="tab" class="tab-pill" :class="{active:activeTab===tab}" @click="activeTab=tab">{{tab}}</div>
      </div>
      <div class="icon-actions">
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></span>
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></span>
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></span>
      </div>
    </div>
    <div class="card-body" style="flex:1">
      <div v-for="(item, i) in notices" :key="i" class="notice-item">
        <div class="notice-dot" :class="item.isNew ? 'new' : 'read'"></div>
        <div class="notice-title">{{ item.title }}</div>
        <div class="notice-who">{{ item.who }}</div>
        <div class="notice-date font-num">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('공지사항')
const tabs = ['공지사항', '경조사 게시판']

const notices = [
  { title: '신규 구매시스템 - 검수절차별 동영상', who: '김서연', date: '2023.03.03', isNew: false },
  { title: '전사 사업검토 진행 변경 공지 (3/17 기준)', who: '서재원', date: '2023.03.02', isNew: true },
  { title: '3월 급여 주요사항 안내', who: '이승주', date: '2023.03.02', isNew: false },
  { title: '2023년 3월 주유단가', who: '제임스킹', date: '2023.03.02', isNew: false },
  { title: '클라우드 사업 Sales Kit (8/12 Update)', who: '최민서', date: '2023.02.28', isNew: false },
  { title: '전사 사업검토 진행 변경 공지 (3/17 기준)', who: '김아인', date: '2023.02.28', isNew: false },
]
</script>

<style scoped>
.notices-card{height:100%;display:flex;flex-direction:column}
.notice-item{
  display:flex;align-items:center;padding:13px 0;border-bottom:1px solid var(--gray100);gap:7px;
}
.notice-item:last-child{border-bottom:none}
.notice-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.notice-dot.new{background:var(--blue)}.notice-dot.read{background:var(--gray300)}
.notice-title{flex:1;font-size:0.88rem;color:var(--gray700);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.notice-who,.notice-date{font-size:0.75rem;color:var(--gray400);white-space:nowrap}
</style>
