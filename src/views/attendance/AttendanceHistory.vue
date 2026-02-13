<template>
  <div class="attendance-history">
    <!-- Header Card -->
    <div class="header-card">
      <div class="icon-file-text">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
      </div>
      <div class="header-text">
        <h2 class="page-title">신청 내역 조회</h2>
        <p class="page-desc">휴가, 연장근무 등 각종 신청 내역을 확인하세요.</p>
      </div>
    </div>

    <!-- Status Summary Cards -->
    <div class="summary-row">
      <!-- Pending -->
      <div class="summary-card">
        <div class="card-content">
          <span class="card-label">결재 대기</span>
          <div class="card-value-row">
            <span class="card-value orange">1</span>
            <span class="card-unit">건</span>
          </div>
        </div>
        <div class="card-icon-circle orange-bg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
      </div>
      <!-- Approved -->
      <div class="summary-card">
        <div class="card-content">
          <span class="card-label">승인 완료</span>
          <div class="card-value-row">
            <span class="card-value green">3</span>
            <span class="card-unit">건</span>
          </div>
        </div>
        <div class="card-icon-circle green-bg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        </div>
      </div>
      <!-- Rejected -->
      <div class="summary-card">
        <div class="card-content">
          <span class="card-label">반려</span>
          <div class="card-value-row">
            <span class="card-value red">1</span>
            <span class="card-unit">건</span>
          </div>
        </div>
        <div class="card-icon-circle red-bg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        </div>
      </div>
    </div>

    <!-- List Section -->
    <div class="list-section-card">
      <div class="filter-row">
        <div class="tabs">
          <button class="tab active">전체</button>
          <button class="tab">휴가</button>
          <button class="tab">근무</button>
        </div>
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="검색" />
        </div>
      </div>

      <div class="table-wrapper">
        <table class="history-table">
          <thead>
            <tr>
              <th width="15%">신청일</th>
              <th width="10%">구분</th>
              <th width="35%">제목/내용</th>
              <th width="15%">해당 일자</th>
              <th width="15%">결재자</th>
              <th width="10%" class="text-right">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in historyList" :key="idx">
              <td class="date">{{ item.date }}</td>
              <td><span class="type-badge" :class="getTypeColor(item.type)">{{ item.type }}</span></td>
              <td class="title">{{ item.title }}</td>
              <td class="target-date">{{ item.targetDate }}</td>
              <td class="approver">{{ item.approver }}</td>
              <td class="text-right"><span class="status-badge" :class="getStatusColor(item.status)">{{ item.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="page-arrow" disabled>&lt;</button>
        <button class="page-num active">1</button>
        <button class="page-arrow">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const historyList = ref([
  { date: '2026.02.13', type: '휴가', title: '연차 신청 (1일)', targetDate: '2026.02.20', approver: 'Steve 매니저', status: '대기' },
  { date: '2026.02.12', type: '연장', title: '연장근무 신청 (2h)', targetDate: '2026.02.12', approver: 'Steve 매니저', status: '승인' },
  { date: '2026.02.10', type: '외근', title: '외근 신청 (미팅)', targetDate: '2026.02.11', approver: 'Steve 매니저', status: '승인' },
  { date: '2026.02.01', type: '휴가', title: '반차 신청 (오후)', targetDate: '2026.02.06', approver: 'Steve 매니저', status: '승인' },
  { date: '2026.02.02', type: '재택', title: '재택근무 신청', targetDate: '2026.02.03', approver: 'Kim 이사', status: '반려' },
])

const getTypeColor = (type) => {
  if (type === '휴가') return 'pink'
  if (type === '연장') return 'blue'
  if (type === '외근' || type === '출장') return 'gray'
  if (type === '재택') return 'purple'
  return 'gray'
}

const getStatusColor = (status) => {
  if (status === '대기') return 'orange'
  if (status === '승인') return 'green'
  if (status === '반려') return 'red'
  return 'gray'
}
</script>

<style scoped>
.attendance-history {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: calc(100vh - var(--header-h) - 48px);
  overflow: hidden;
}

/* Header Card */
.header-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid var(--gray200);
}
.icon-file-text {
  width: 48px; height: 48px;
  background: var(--gray50);
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  color: var(--gray600);
}
.page-title { font-size: 1.2rem; font-weight: 700; color: var(--gray900); margin-bottom: 4px; }
.page-desc { font-size: 0.9rem; color: var(--gray500); }

/* Summary Cards */
.summary-row {
  display: flex;
  gap: 16px;
}
.summary-card {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid var(--gray200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-label { font-size: 0.9rem; color: var(--gray500); font-weight: 600; margin-bottom: 8px; display: block; }
.card-value-row { display: flex; align-items: baseline; gap: 4px; }
.card-value { font-size: 1.8rem; font-weight: 800; line-height: 1; }
.card-unit { font-size: 0.9rem; color: var(--gray400); font-weight: 600; }

.card-value.orange { color: #F59E0B; }
.card-value.green { color: #10B981; }
.card-value.red { color: #EF4444; }

.card-icon-circle {
  width: 44px; height: 44px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
}
.orange-bg { background: #FEF3C7; }
.green-bg { background: #D1FAE5; }
.red-bg { background: #FEE2E2; }


/* List Section */
.list-section-card {
  flex: 1;
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--gray200);
  padding: 24px 24px 16px 24px;
  display: flex; flex-direction: column;
  min-height: 0;
}
.filter-row {
  display: flex; justify-content: space-between; margin-bottom: 24px;
}
.tabs { display: flex; gap: 8px; }
.tab {
  padding: 6px 16px; border-radius: 20px;
  border: none; background: var(--gray100); color: var(--gray500);
  font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
}
.tab.active { background: var(--primary); color: #fff; }

.search-box {
  display: flex; align-items: center; gap: 8px;
  background: var(--gray50); border: 1px solid var(--gray200);
  border-radius: 6px; padding: 6px 12px; width: 240px; color: var(--gray400);
}
.search-box input { border: none; background: transparent; width: 100%; font-size: 0.9rem; }

/* Table */
.table-wrapper {
  flex: 1;
  overflow-y: auto;
}
.history-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.history-table th {
  background: var(--gray50);
  color: var(--gray600); font-weight: 600;
  padding: 12px 16px; text-align: left;
  font-size: 0.8rem;
  border-bottom: 1px solid var(--gray200); /* Optional header border */
}
.history-table td {
  padding: 18px 16px;
  border-bottom: 1px solid var(--gray100);
  color: var(--gray800);
  vertical-align: middle;
}
.text-right { text-align: right; }
.date, .target-date, .approver { color: var(--gray600); font-size: 0.9rem; }
.title { font-weight: 600; }

/* Badges */
.type-badge {
  display: inline-block; padding: 4px 10px; border-radius: 4px;
  font-size: 0.8rem; font-weight: 700;
}
.type-badge.pink { background: #FCE7F3; color: #EC4899; }
.type-badge.blue { background: #DBEAFE; color: #3B82F6; }
.type-badge.gray { background: #F3F4F6; color: #4B5563; }
.type-badge.purple { background: #F3E8FF; color: #A855F7; }

.status-badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 10px; border-radius: 20px;
  font-size: 0.8rem; font-weight: 600;
  border: 1px solid transparent;
}
/* For status, we will use outlined style to match image closely or filled?
   Image shows outline style with icon. Let's simplify first.
*/
.status-badge.orange { background: #FFFBEB; color: #D97706; border-color: #FCD34D; }
.status-badge.green { background: #ECFDF5; color: #059669; border-color: #6EE7B7; }
.status-badge.red { background: #FEF2F2; color: #DC2626; border-color: #FCA5A5; }


/* Pagination */
.pagination {
  display: flex; justify-content: center; align-items: center; gap: 8px;
  margin-top: 16px;
}
.page-arrow, .page-num {
  width: 32px; height: 32px; border-radius: 4px; border: none;
  background: transparent; color: var(--gray500); font-size: 0.9rem; font-weight: 500;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.page-arrow:hover, .page-num:hover { background: var(--gray50); color: var(--gray800); }
.page-num.active { background: var(--primary); color: #fff; }
.page-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
</style>
