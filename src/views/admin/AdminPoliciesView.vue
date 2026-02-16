<template>
  <section class="admin-page">
    <header class="head">
      <h1>정책 관리</h1>
      <p>인사/근태/급여 정책 버전과 적용 일자를 관리합니다.</p>
    </header>

    <div class="grid">
      <article class="card" v-for="policy in policies" :key="policy.name">
        <h3>{{ policy.name }}</h3>
        <p>현재 버전: <strong>{{ policy.version }}</strong></p>
        <p>적용일: {{ policy.effectiveDate }}</p>
        <button class="btn-ghost" type="button">수정</button>
      </article>
    </div>
  </section>
</template>

<script setup>
const policies = [
  { name: '인사 정책', version: 'v2.3', effectiveDate: '2026.02.01' },
  { name: '근태 정책', version: 'v1.8', effectiveDate: '2026.01.15' },
  { name: '보상 정책', version: 'v1.2', effectiveDate: '2026.02.10' }
]
</script>

<style scoped>
.admin-page { max-width: 1200px; }
.head { margin-top: 12px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 18px; }
.head h1 { margin: 0; color: var(--gray800); }
.head p { margin: 6px 0 0; color: var(--gray500); }
.grid { margin-top: 12px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.card { background: #fff; border: 1px solid var(--gray200); border-radius: var(--radius); box-shadow: var(--shadow); padding: 16px; }
.card h3 { margin: 0 0 10px; color: var(--gray800); }
.card p { margin: 0 0 6px; color: var(--gray600); }
.btn-ghost { margin-top: 10px; height: 32px; border-radius: 8px; border: 1px solid var(--gray200); background: #fff; padding: 0 10px; }
@media (max-width: 1100px) { .grid { grid-template-columns: minmax(0, 1fr); } }
</style>
