<template>
  <section class="admin-page">
    <header class="head">
      <h1>공지사항 관리</h1>
      <p>공지 등록/수정 및 게시 상태를 관리합니다.</p>
    </header>

    <article class="card">
      <div class="card-head">
        <h3>공지 목록</h3>
        <button class="btn-primary" type="button">새 공지 등록</button>
      </div>
      <ul class="notice-list">
        <li><strong>[중요]</strong> 인사평가 일정 안내 <span>게시중</span></li>
        <li><strong>[일반]</strong> 설 연휴 휴무 일정 <span>게시중</span></li>
        <li><strong>[일반]</strong> 사내 네트워크 점검 <span>임시저장</span></li>
      </ul>
    </article>
  </section>
</template>

<style scoped>
.admin-page { max-width: 1200px; }
.head { margin-top: 12px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 18px; }
.head h1 { margin: 0; color: var(--gray800); }
.head p { margin: 6px 0 0; color: var(--gray500); }
.card { margin-top: 12px; background: #fff; border: 1px solid var(--gray200); border-radius: var(--radius); box-shadow: var(--shadow); padding: 16px; }
.card-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.card-head h3 { margin: 0; color: var(--gray800); }
.btn-primary { height: 32px; border: none; border-radius: 8px; background: var(--primary); color: #fff; padding: 0 10px; font-weight: 700; }
.notice-list { list-style: none; margin: 0; padding: 0; }
.notice-list li { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--gray100); padding: 10px 0; color: var(--gray700); }
.notice-list span { font-size: .74rem; color: var(--gray500); }
</style>
