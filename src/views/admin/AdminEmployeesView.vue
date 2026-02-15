<template>
  <section class="admin-page">
    <header class="head">
      <h1>사원 등록</h1>
      <p>신규 사원 등록 및 계정 발급을 관리합니다.</p>
    </header>

    <div class="layout">
      <article class="card form-card">
        <h3>신규 사원 등록</h3>
        <div class="form-grid">
          <label>이름<input type="text" placeholder="예: 김세현" /></label>
          <label>사번<input type="text" placeholder="예: 2603010001" /></label>
          <label>이메일<input type="text" placeholder="example@rhight.co.kr" /></label>
          <label>연락처<input type="text" placeholder="010-0000-0000" /></label>
          <label>소속팀<input type="text" placeholder="모바일1팀" /></label>
          <label>직급<input type="text" placeholder="사원" /></label>
        </div>
        <button class="btn-primary" type="button">등록</button>
      </article>

      <article class="card">
        <h3>최근 등록 요청</h3>
        <ul class="list">
          <li>김유나 / 디자인팀 / 등록 대기</li>
          <li>박서진 / 모바일1팀 / 승인 완료</li>
          <li>최민규 / 인사팀 / 등록 대기</li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.admin-page { max-width: 1200px; }
.head { margin-top: 12px; background: var(--glass); border: 1px solid var(--glass-border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 18px; }
.head h1 { margin: 0; color: var(--gray800); }
.head p { margin: 6px 0 0; color: var(--gray500); }
.layout { margin-top: 12px; display: grid; grid-template-columns: 1.2fr .8fr; gap: 12px; }
.card { background: #fff; border: 1px solid var(--gray200); border-radius: var(--radius); box-shadow: var(--shadow); padding: 16px; }
.card h3 { margin: 0 0 12px; color: var(--gray800); }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-bottom: 12px; }
label { display: grid; gap: 6px; font-size: .8rem; color: var(--gray600); }
input { height: 34px; border: 1px solid var(--gray200); border-radius: 8px; padding: 0 10px; }
.btn-primary { height: 34px; border: none; border-radius: 8px; background: var(--primary); color: #fff; padding: 0 12px; font-weight: 700; }
.list { margin: 0; padding-left: 18px; color: var(--gray600); }
.list li { margin-bottom: 8px; }
@media (max-width: 1100px) { .layout { grid-template-columns: minmax(0, 1fr); } .form-grid { grid-template-columns: minmax(0, 1fr); } }
</style>
