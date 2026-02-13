<template>
  <div class="salary-dashboard">
    <!-- Password Overlay -->
    <div v-if="!isVerified" class="password-overlay">
      <div class="login-card">
        <div class="icon-lock">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
        <h2>급여 명세서 조회</h2>
        <p class="desc">개인 정보 보호를 위해 비밀번호를 입력해주세요.</p>
        
        <form @submit.prevent="verifyPassword" class="login-form">
          <div class="input-group">
            <input 
              type="password" 
              v-model="password" 
              placeholder="비밀번호를 입력하세요" 
            />
          </div>
          <button type="submit" class="btn-submit">확인</button>
        </form>
      </div>
    </div>

    <!-- Top Row: Salary Summary -->
    <div class="top-row">
      <!-- 1. This Month's Salary (Main Card) -->
      <div class="card salary-card">
        <div class="card-header-row">
          <div class="date-info">
            <span class="icon-calendar">📅</span>
            <span>2026년 2월 급여 명세서</span>
          </div>
          <span class="status-badge">지급 완료</span>
        </div>

        <div class="salary-display">
          <div class="amount-main">₩ 3,500,000</div>
          <div class="sub-info">실수령액 (세전 ₩ 4,200,000)</div>
        </div>

        <div class="salary-actions">
          <div class="detail-row">
            <div class="detail-item">
              <span class="label">기본급</span>
              <span class="value">₩ 3,800,000</span>
            </div>
            <div class="divider"></div>
            <div class="detail-item">
              <span class="label">식대</span>
              <span class="value">₩ 200,000</span>
            </div>
            <div class="divider"></div>
            <div class="detail-item">
              <span class="label">상여금</span>
              <span class="value">₩ 200,000</span>
            </div>
          </div>
          <button class="btn-download" @click="handleDownload">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            명세서 다운로드
          </button>
        </div>
      </div>

      <!-- 2. Deductions Summary -->
      <div class="card deduction-card">
        <div class="card-header-row">
           <span class="card-title">공제 내역</span>
           <span class="total-deduction">- ₩ 700,000</span>
        </div>
        
        <div class="deduction-list">
          <div class="d-item">
            <span class="label">국민연금</span>
            <span class="value">180,000</span>
          </div>
          <div class="d-item">
             <span class="label">건강보험</span>
             <span class="value">140,000</span>
          </div>
          <div class="d-item">
             <span class="label">장기요양</span>
             <span class="value">18,000</span>
          </div>
          <div class="d-item">
             <span class="label">고용보험</span>
             <span class="value">32,000</span>
          </div>
          <div class="d-item">
             <span class="label">소득세</span>
             <span class="value">300,000</span>
          </div>
           <div class="d-item">
             <span class="label">지방소득세</span>
             <span class="value">30,000</span>
          </div>
        </div>
        
        <div class="donut-chart-placeholder">
          <!-- Create a simple donut chart using conic-gradient -->
          <div class="donut-chart">
            <div class="donut-center">
              <span class="percent">16.6%</span>
              <span class="text">공제율</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Row: Payment History -->
    <div class="bottom-row">
      <div class="card history-card">
        <div class="card-header-row">
          <span class="card-title">최근 급여 내역</span>
          <div class="filter-tabs">
            <button class="tab active">최근 6개월</button>
            <button class="tab">2026년</button>
            <button class="tab">2025년</button>
          </div>
        </div>
        
        <div class="history-table-container">
          <table class="history-table">
            <thead>
              <tr>
                <th>지급일</th>
                <th>귀속월</th>
                <th>지급총액</th>
                <th>공제총액</th>
                <th>실수령액</th>
                <th>명세서</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in salaryHistory" :key="index">
                <td>{{ item.date }}</td>
                <td>{{ item.month }}</td>
                <td>{{ item.total }}</td>
                <td class="text-red">{{ item.deduction }}</td>
                <td class="text-blue">{{ item.net }}</td>
                <td>
                   <button class="btn-icon">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
                   </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVerified = ref(false)
const password = ref('')

const verifyPassword = () => {
  if (password.value === 'test1234!') {
    isVerified.value = true
  } else {
    alert('비밀번호가 올바르지 않습니다.')
    password.value = ''
  }
}

const salaryHistory = ref([
  { date: '2026.02.25', month: '2026-02', total: '4,200,000', deduction: '-700,000', net: '3,500,000' },
  { date: '2026.01.25', month: '2026-01', total: '4,200,000', deduction: '-700,000', net: '3,500,000' },
  { date: '2025.12.24', month: '2025-12', total: '4,100,000', deduction: '-680,000', net: '3,420,000' },
  { date: '2025.11.25', month: '2025-11', total: '4,100,000', deduction: '-680,000', net: '3,420,000' },
  { date: '2025.10.25', month: '2025-10', total: '4,100,000', deduction: '-680,000', net: '3,420,000' },
  { date: '2025.09.25', month: '2025-09', total: '4,800,000', deduction: '-820,000', net: '3,980,000' }, // Bonus
])

const handleDownload = () => {
  alert('명세서 다운로드를 시작합니다.')
}
</script>

<style scoped>
.salary-dashboard {
  height: calc(100vh - var(--header-h) - 48px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  position: relative;
}

/* Password Overlay */
.password-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
  border: 1px solid var(--gray200);
}
.icon-lock {
  width: 80px; height: 80px;
  background: #E8F5FE;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 24px;
}
.salary-dashboard h2 {
  font-size: 1.5rem; font-weight: 700; color: var(--gray900); margin-bottom: 8px;
}
.desc {
  font-size: 0.95rem; color: var(--gray500); margin-bottom: 32px;
}
.login-form {
  display: flex; flex-direction: column; gap: 16px;
}
.input-group input {
  width: 100%; padding: 14px 16px;
  border: 1px solid var(--gray300); border-radius: 8px;
  font-size: 1rem; outline: none; transition: border-color 0.2s;
}
.input-group input:focus { border-color: var(--primary); }
.btn-submit {
  width: 100%; padding: 14px;
  background: var(--primary); color: white;
  border: none; border-radius: 8px; font-size: 1rem; font-weight: 600;
  cursor: pointer; transition: background-color 0.2s;
}
.btn-submit:hover { background: var(--primary-dark); }


/* Common Card */
.card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid var(--gray200);
  padding: 24px;
}
.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.card-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gray800);
}

/* Top Row */
.top-row {
  display: flex;
  gap: 16px;
  flex: 0 0 auto; 
}
.salary-card {
  flex: 1.5;
  display: flex;
  flex-direction: column;
}
.deduction-card {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Salary Card Styles */
.date-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gray800);
}
.status-badge {
  background: #E6F7ED;
  color: #00C853;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
}
.salary-display {
  text-align: center;
  margin: 20px 0;
}
.amount-main {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--gray900);
  letter-spacing: -1px;
}
.sub-info {
  font-size: 1rem;
  color: var(--gray500);
  margin-top: 8px;
}
.salary-actions {
  margin-top: auto;
}
.detail-row {
  background: var(--gray50);
  border-radius: 12px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
}
.detail-item {
  text-align: center;
}
.detail-item .label {
  display: block;
  font-size: 0.85rem;
  color: var(--gray500);
  margin-bottom: 4px;
}
.detail-item .value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--gray800);
}
.divider {
  width: 1px;
  height: 24px;
  background: var(--gray300);
}
.btn-download {
  width: 100%;
  padding: 14px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: opacity 0.2s;
}
.btn-download:hover {
  opacity: 0.9;
}

/* Deduction Card Styles */
.deduction-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 20px;
  margin-bottom: 16px;
}
.d-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
.d-item .label { color: var(--gray500); }
.d-item .value { font-weight: 600; color: var(--gray800); }

.donut-chart-placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.donut-chart {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: conic-gradient(var(--red) 0% 60%, var(--gray200) 60% 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.donut-chart::before {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 50%;
}
.donut-center {
  position: relative;
  text-align: center;
  z-index: 1;
}
.donut-center .percent {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray800);
}
.donut-center .text {
  font-size: 0.8rem;
  color: var(--gray500);
}
.total-deduction {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--red);
}

/* Bottom Row */
.bottom-row {
  flex: 1;
  display: flex;
  min-height: 0; 
}
.history-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0; /* Remove padding for full-width table */
  overflow: hidden;
}
.history-card .card-header-row {
  padding: 20px 24px;
  margin-bottom: 0;
  border-bottom: 1px solid var(--gray100);
}
.filter-tabs {
  display: flex;
  gap: 8px;
}
.tab {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--gray200);
  background: #fff;
  color: var(--gray600);
  font-size: 0.85rem;
  cursor: pointer;
}
.tab.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.history-table-container {
  flex: 1;
  overflow-y: auto;
}
.history-table {
  width: 100%;
  border-collapse: collapse;
}
.history-table th {
  background: var(--gray50);
  color: var(--gray500);
  font-weight: 600;
  font-size: 0.85rem;
  padding: 12px 24px;
  text-align: left;
  position: sticky;
  top: 0;
}
.history-table td {
  padding: 16px 24px;
  border-bottom: 1px solid var(--gray100);
  color: var(--gray800);
  font-size: 0.95rem;
}
.history-table tr:hover {
  background: var(--gray50);
}
.text-red { color: var(--red) !important; }
.text-blue { color: var(--primary) !important; font-weight: 700; }
.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray400);
  padding: 4px;
  border-radius: 4px;
}
.btn-icon:hover {
  background: var(--gray100);
  color: var(--gray600);
}
</style>
