<template>
  <section class="admin-page">
    <header class="head">
      <h1>인사변경 관리</h1>
      <p>발령/직급/재직 상태 변경 요청을 검토하고 처리합니다.</p>
    </header>

    <article class="card">
      <h3>변경 요청 목록</h3>
      <table class="table">
        <thead>
          <tr><th>요청일</th><th>사원</th><th>유형</th><th>변경 내용</th><th>상태</th></tr>
        </thead>
        <tbody>
          <tr><td>2026.02.15</td><td>박민수</td><td>직급</td><td>차장 → 부장</td><td><span class="badge wait">대기</span></td></tr>
          <tr><td>2026.02.14</td><td>김세현</td><td>발령</td><td>개발2팀 → 모바일1팀</td><td><span class="badge done">완료</span></td></tr>
          <tr><td>2026.02.13</td><td>최수빈</td><td>재직 상태</td><td>휴직 → 재직</td><td><span class="badge wait">대기</span></td></tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<style scoped>
.admin-page { max-width: 1200px; }
.head { margin-top: 12px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 18px; }
.head h1 { margin: 0; color: var(--gray800); }
.head p { margin: 6px 0 0; color: var(--gray500); }
.card { margin-top: 12px; background: #fff; border: 1px solid var(--gray200); border-radius: var(--radius); box-shadow: var(--shadow); padding: 16px; }
.card h3 { margin: 0 0 12px; color: var(--gray800); }
.table { width: 100%; border-collapse: collapse; font-size: .84rem; }
.table th, .table td { border-bottom: 1px solid var(--gray100); padding: 10px; text-align: left; }
.table th { color: var(--gray500); }
.badge { border-radius: 999px; padding: 2px 8px; font-size: .72rem; font-weight: 700; }
.badge.wait { background: #FEF3C7; color: #D97706; }
.badge.done { background: #DCFCE7; color: #16A34A; }
</style>
