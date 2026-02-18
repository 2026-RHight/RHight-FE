<template>
  <section class="admin-page">
    <header class="admin-head">
      <h1>관리자 대시보드</h1>
      <p>인사/정책/전자결재 운영 현황을 한눈에 확인합니다.</p>
    </header>

    <div class="kpi-grid">
      <article class="kpi-card" v-for="card in cards" :key="card.label">
        <p class="kpi-label">{{ card.label }}</p>
        <strong class="kpi-value">{{ card.value }}</strong>
        <span class="kpi-note">{{ card.note }}</span>
      </article>
    </div>

    <div class="panel-grid">
      <article class="panel">
        <h3>처리 필요 항목</h3>
        <ul>
          <li>인사 변경 요청 검토 7건</li>
          <li>전자결재 정책선 수정 요청 2건</li>
          <li>급여 마감 전 확인 항목 3건</li>
        </ul>
      </article>

      <article class="panel">
        <h3>최근 공지</h3>
        <ul>
          <li>2026.02.14 인사평가 일정 안내</li>
          <li>2026.02.13 급여 정산 정책 업데이트</li>
          <li>2026.02.12 전자결재 라우팅 규칙 개편</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup>
const cards = [
  { label: '전체 구성원', value: '248명', note: '재직 241 / 휴직 7' },
  { label: '이번 달 입사', value: '9명', note: '전월 대비 +2' },
  { label: '인사변경 대기', value: '7건', note: '승인 필요' },
  { label: '미확인 공지', value: '3건', note: '관리자 확인 필요' }
]
</script>

<style scoped>
.admin-page { width: 100%; max-width: none; min-width: 0; }

.admin-head {
  margin-top: 12px;
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 18px;
}

.admin-head h1 { margin: 0; font-size: 1.4rem; color: var(--gray800); }
.admin-head p { margin: 6px 0 0; color: var(--gray500); font-size: .88rem; }

.kpi-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.kpi-card {
  background: #fff;
  border: 1px solid var(--gray200);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 14px;
  display: grid;
  gap: 4px;
}

.kpi-label { margin: 0; color: var(--gray500); font-size: .8rem; }
.kpi-value { color: var(--gray800); font-size: 1.2rem; }
.kpi-note { color: var(--gray400); font-size: .74rem; }

.panel-grid {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.panel {
  background: #fff;
  border: 1px solid var(--gray200);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 16px;
}

.panel h3 { margin: 0 0 10px; color: var(--gray800); font-size: 1rem; }
.panel ul { margin: 0; padding-left: 18px; color: var(--gray600); }
.panel li { margin-bottom: 8px; }

@media (max-width: 1100px) {
  .kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .panel-grid { grid-template-columns: minmax(0, 1fr); }
}
</style>
