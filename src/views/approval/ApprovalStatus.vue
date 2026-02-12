<script setup>
import { ref, computed } from 'vue';
import { mockApprovalStatusList } from '@/utils/approvalData';

// State
const searchQuery = ref('');
const activeTab = ref('all'); // 'all', 'drafting', 'pending', 'rejected'

// Tabs Configuration
const tabs = [
  { id: 'all', label: '전체', count: mockApprovalStatusList.length },
  { id: 'drafting', label: '기안중', count: mockApprovalStatusList.filter(i => i.status === '기안중').length },
  { id: 'pending', label: '진행중', count: mockApprovalStatusList.filter(i => i.status === '진행중').length },
  { id: 'rejected', label: '반려', count: mockApprovalStatusList.filter(i => i.status === '반려').length }
];

// Computed
const filteredList = computed(() => {
  return mockApprovalStatusList.filter(item => {
    const matchesTab = activeTab.value === 'all' || 
                      (activeTab.value === 'drafting' && item.status === '기안중') ||
                      (activeTab.value === 'pending' && item.status === '진행중') ||
                      (activeTab.value === 'rejected' && item.status === '반려');
    
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         item.id.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
});

const getStatusClass = (status) => {
  switch (status) {
    case '기안중': return 'status-draft';
    case '진행중': return 'status-pending';
    case '반려': return 'status-rejected';
    case '완료': return 'status-completed';
    default: return '';
  }
};
</script>

<template>
  <div class="status-container">
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">전자 결재 현황</h1>
        <p class="page-subtitle">본인이 기안한 문서의 실시간 결재 진행 상태를 확인합니다.</p>
      </div>
      
      <div class="search-box">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="문서 번호 또는 제목으로 검색" 
            class="search-input"
          />
        </div>
      </div>
    </header>

    <main class="page-content">
      <!-- Filter Tabs -->
      <div class="tabs-row">
        <div class="tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab-btn"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
            <span class="count">{{ tab.count }}</span>
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div class="table-card">
        <table class="data-table">
          <thead>
            <tr>
              <th>문서번호</th>
              <th>문서종류</th>
              <th>제목</th>
              <th>기안일</th>
              <th>결재상태</th>
              <th>현재 결재자</th>
              <th>진행률</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filteredList" :key="item.id" class="table-row">
              <td class="col-id">{{ item.id }}</td>
              <td class="col-tpl">{{ item.templateName }}</td>
              <td class="col-title">
                <span class="title-text">{{ item.title }}</span>
              </td>
              <td class="col-date">{{ item.draftDate }}</td>
              <td class="col-status">
                <span class="status-badge" :class="getStatusClass(item.status)">
                  {{ item.status }}
                </span>
              </td>
              <td class="col-approver">{{ item.currentApprover }}</td>
              <td class="col-progress">
                <div class="progress-container">
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :style="{ width: item.progress + '%' }"></div>
                  </div>
                  <span class="progress-text">{{ item.progress }}%</span>
                </div>
              </td>
            </tr>
            <tr v-if="filteredList.length === 0">
              <td colspan="7" class="empty-state">
                <div class="empty-content">
                  <span class="empty-icon">📂</span>
                  <p>조회된 결재 문서가 없습니다.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<style scoped>
.status-container {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.page-subtitle {
  color: #6B7280;
  font-size: 1.1rem;
}

/* Search Box */
.search-input-wrapper {
  position: relative;
  width: 320px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9CA3AF;
  font-size: 0.9rem;
}

.search-input {
  width: 100%;
  padding: 10px 16px 10px 40px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;
  outline: none;
}

.search-input:focus {
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Tabs */
.tabs-row {
  border-bottom: 1px solid #E5E7EB;
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  gap: 32px;
}

.tab-btn {
  padding: 12px 4px;
  font-size: 1rem;
  font-weight: 500;
  color: #6B7280;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-btn.active {
  color: #3B82F6;
  border-bottom-color: #3B82F6;
}

.tab-btn .count {
  font-size: 0.8rem;
  background: #F3F4F6;
  padding: 2px 8px;
  border-radius: 10px;
  color: #6B7280;
}

.tab-btn.active .count {
  background: #EBF5FF;
  color: #3B82F6;
}

/* Table Card */
.table-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: #F9FAFB;
  padding: 14px 20px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  color: #4B5563;
  border-bottom: 1px solid #E5E7EB;
}

.data-table td {
  padding: 16px 20px;
  font-size: 0.9rem;
  color: #1F2937;
  border-bottom: 1px solid #F3F4F6;
}

.table-row:hover {
  background: #F9FAFB;
}

.col-id { color: #6B7280; font-family: monospace; }
.col-title { font-weight: 500; }
.title-text:hover { color: #3B82F6; text-decoration: underline; cursor: pointer; }

/* Status Badge */
.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.status-draft { background: #E5E7EB; color: #4B5563; }
.status-pending { background: #FFF7ED; color: #F59E0B; }
.status-rejected { background: #FEF2F2; color: #EF4444; }
.status-completed { background: #ECFDF5; color: #10B981; }

/* Progress Bar */
.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar-bg {
  flex: 1;
  height: 6px;
  background: #E5E7EB;
  border-radius: 3px;
  overflow: hidden;
  min-width: 80px;
}

.progress-bar-fill {
  height: 100%;
  background: #3B82F6;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: #6B7280;
  width: 35px;
  text-align: right;
}

/* Empty State */
.empty-state {
  padding: 80px 0;
  text-align: center;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-icon {
  font-size: 3rem;
  opacity: 0.3;
}

.empty-content p {
  color: #9CA3AF;
  font-size: 1.1rem;
}
</style>

