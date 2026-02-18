<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { mockApprovalStatusList } from '@/utils/approvalData';
import ApprovalDetailModal from './components/ApprovalDetailModal.vue';

const router = useRouter();
const searchQuery = ref('');
const activeTab = ref('all'); // 'all', 'drafting', 'pending', 'rejected'
const isModalOpen = ref(false);
const selectedItem = ref({});

const isDrafting = (status) => status === '기안중' || status === '湲곗븞以?';
const isPending = (status) => status === '진행중' || status === '吏꾪뻾以?';
const isRejected = (status) => status === '반려' || status === '諛섎젮';
const isCompleted = (status) => status === '완료' || status === '?꾨즺';

const tabs = computed(() => [
  { id: 'all', label: '전체', count: mockApprovalStatusList.length },
  { id: 'drafting', label: '기안중', count: mockApprovalStatusList.filter(i => isDrafting(i.status)).length },
  { id: 'pending', label: '진행중', count: mockApprovalStatusList.filter(i => isPending(i.status)).length },
  { id: 'rejected', label: '반려', count: mockApprovalStatusList.filter(i => isRejected(i.status)).length }
]);

const filteredList = computed(() => {
  return mockApprovalStatusList.filter(item => {
    const matchesTab = activeTab.value === 'all' ||
      (activeTab.value === 'drafting' && isDrafting(item.status)) ||
      (activeTab.value === 'pending' && isPending(item.status)) ||
      (activeTab.value === 'rejected' && isRejected(item.status));

    const q = searchQuery.value.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);

    return matchesTab && matchesSearch;
  });
});

const getStatusClass = (status) => {
  if (isDrafting(status)) return 'status-draft';
  if (isPending(status)) return 'status-pending';
  if (isRejected(status)) return 'status-rejected';
  if (isCompleted(status)) return 'status-completed';
  return '';
};

const openModal = (item) => {
  selectedItem.value = {
    ...item,
    category: item.templateName || '-',
    date: item.draftDate || '-',
    content: item.content || '상세 본문 데이터가 없습니다.',
    attachments: Array.isArray(item.attachments) ? item.attachments : [],
    referrers: Array.isArray(item.referrers) ? item.referrers : [],
    department: item.department || '-',
    isDrafter: true,
    statusClass: getStatusClass(item.status)
  };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleModalAction = (action) => {
  if (action.type === 'redraft') {
    router.push({ name: 'approval-draft', query: { from: action.id } });
  }
  isModalOpen.value = false;
};

const handleRedraft = (item) => {
  router.push({ name: 'approval-draft', query: { from: item.id } });
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
            v-model="searchQuery"
            type="text"
            placeholder="문서 번호 또는 제목으로 검색"
            class="search-input"
          />
        </div>
      </div>
    </header>

    <main class="page-content">
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
              <th>재상신</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredList"
              :key="item.id"
              class="table-row clickable-row"
              @click="openModal(item)"
            >
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
              <td @click.stop>
                <button
                  v-if="getStatusClass(item.status) === 'status-rejected'"
                  type="button"
                  class="redraft-btn"
                  @click="handleRedraft(item)"
                >
                  재상신
                </button>
              </td>
            </tr>

            <tr v-if="filteredList.length === 0">
              <td colspan="8" class="empty-state">
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

    <ApprovalDetailModal
      :is-open="isModalOpen"
      :item="selectedItem"
      @close="closeModal"
      @action="handleModalAction"
    />
  </div>
</template>

<style scoped>
.status-container {
  padding: 32px;
  min-height: 100vh;
  background: var(--gray50);
  border-radius: 14px;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 18px 20px;
  border: 1px solid var(--gray200);
  border-radius: 14px;
  background: #fff;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #212529;
  margin-bottom: 6px;
}

.page-subtitle {
  color: #868e96;
  font-size: 0.92rem;
}

.search-input-wrapper {
  position: relative;
  width: 300px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #adb5bd;
  font-size: 0.9rem;
}

.search-input {
  width: 100%;
  padding: 10px 14px 10px 36px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  font-size: 0.85rem;
  transition: all 0.2s;
  outline: none;
  background: #fff;
}

.search-input:focus {
  border-color: #339af0;
  box-shadow: 0 0 0 3px rgba(51, 154, 240, 0.12);
}

.tabs-row {
  border-bottom: 1px solid var(--gray200);
  margin-bottom: 20px;
  padding: 0 4px;
}

.tabs {
  display: flex;
  gap: 20px;
}

.tab-btn {
  padding: 12px 4px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #868e96;
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
  color: #339af0;
  border-bottom-color: #339af0;
}

.tab-btn .count {
  font-size: 0.75rem;
  background: #f1f3f5;
  padding: 2px 7px;
  border-radius: 10px;
  color: #868e96;
}

.tab-btn.active .count {
  background: #f0f7ff;
  color: #339af0;
}

.table-card {
  background: white;
  border-radius: 14px;
  border: 1px solid var(--gray200);
  box-shadow: none;
  overflow: hidden;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: #f8f9fa;
  padding: 13px 20px;
  text-align: left;
  font-size: 0.8rem;
  font-weight: 600;
  color: #868e96;
  border-bottom: 1px solid #f1f3f5;
}

.data-table td {
  padding: 14px 20px;
  font-size: 0.85rem;
  color: #495057;
  border-bottom: 1px solid #f8f9fa;
}

.table-row:hover {
  background: #f8f9fa;
}

.clickable-row {
  cursor: pointer;
}

.col-id { color: #868e96; font-family: monospace; }
.col-title { font-weight: 500; }
.title-text:hover { color: #339af0; text-decoration: underline; cursor: pointer; }

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid transparent;
}

.status-draft { background: #f1f3f5; color: #495057; border-color: #e9ecef; }
.status-pending { background: #fff4e6; color: #f08c00; border-color: #ffe8cc; }
.status-rejected { background: #fff5f5; color: #fa5252; border-color: #ffe3e3; }
.status-completed { background: #f2fcf5; color: #40c057; border-color: #d3f9d8; }

.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar-bg {
  flex: 1;
  height: 6px;
  background: #e9ecef;
  border-radius: 3px;
  overflow: hidden;
  min-width: 80px;
}

.progress-bar-fill {
  height: 100%;
  background: #339af0;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.75rem;
  color: #868e96;
  width: 35px;
  text-align: right;
}

.redraft-btn {
  border: 1px solid #d0e7ff;
  background: #f0f7ff;
  color: #1971c2;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 6px 10px;
  cursor: pointer;
}

.redraft-btn:hover {
  background: #e7f5ff;
}

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
  color: #adb5bd;
  font-size: 0.95rem;
}
</style>
