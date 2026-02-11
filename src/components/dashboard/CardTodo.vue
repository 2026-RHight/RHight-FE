<template>
  <div class="card fade-up delay-5 todo-card">
    <div class="card-header">
      <h3>TODO List</h3>
      <div class="icon-actions">
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.6.77 1.05 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg></span>
        <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg></span>
      </div>
    </div>
    <div class="card-body" style="padding:6px 18px">
      <TodoRow v-for="(item, i) in todos" :key="i" v-bind="item" />
      <div class="todo-footer">
        <a href="#">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          완료된 항목 보기
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoRow from './TodoRow.vue'

const todos = [
  { title: 'RPA 등록 (인사팀/총무팀)', pct: 68, color: '#06B6D4' },
  { title: 'E-accounting 디자인 방향성', pct: 77, color: '#06B6D4' },
  { title: '전자결재 발표자료 준비', pct: 44, color: '#06B6D4' },
  { title: '기타 사업관리', pct: 7, color: '#06B6D4' },
]
</script>

<style scoped>
.todo-footer{text-align:center;padding-top:8px}
.todo-footer a{
  font-size:0.75rem;color:var(--gray400);display:flex;align-items:center;justify-content:center;gap:4px;
}
.todo-footer a:hover{color:var(--primary)}
</style>
