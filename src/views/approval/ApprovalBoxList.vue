<template>
  <div class="list-container">
    <div class="page-header">
      <div class="header-left">
        <button class="back-btn" @click="router.go(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <div>
          <h2>{{ pageTitle }}</h2>
          <p class="subtitle">{{ pageSubtitle }}</p>
        </div>
      </div>
      
      <div class="header-right">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="문서 제목, 기안자 검색..." class="search-input">
          <span class="search-icon">🔍</span>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-section">
      <div class="filter-tabs">
        <button 
          v-for="cat in filterOptions" 
          :key="cat.value"
          class="filter-tab"
          :class="{ active: currentFilter === cat.value }"
          @click="currentFilter = cat.value"
        >
          {{ cat.label }}
        </button>
      </div>
      <div class="sort-select">
        <select v-model="sortBy">
          <option value="date-desc">최신순</option>
          <option value="date-asc">오래된순</option>
        </select>
      </div>
    </div>

    <!-- List Table -->
    <div class="table-card">
      <table class="box-table">
        <thead>
          <tr>
            <th class="w-status">상태</th>
            <th class="w-category">카테고리</th>
            <th>제목</th>
            <th class="w-drafter">기안자</th>
            <th class="w-date">기안일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredList" :key="item.id" class="clickable-row" @click="openDetail(item)">
            <td>
              <span class="status-chip" :class="getStatusClass(item.status)">{{ item.status }}</span>
            </td>
            <td><span class="category-text">{{ item.category }}</span></td>
            <td class="title-cell">
              <span :class="item.isRead ? 'read-style' : 'unread-style'">{{ item.title }}</span>
              <p class="preview">{{ item.content }}</p>
            </td>
            <td>
              <div class="drafter-cell">
                <span class="drafter-name">{{ item.drafter }}</span>
                <span class="drafter-sub">{{ item.position }} / {{ item.department }}</span>
              </div>
            </td>
            <td class="date-text">{{ item.date }}</td>
          </tr>
          <tr v-if="filteredList.length === 0">
            <td colspan="5" class="empty-state">조회된 내역이 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <ApprovalDetailModal 
      :is-open="isDetailOpen" 
      :item="selectedItem" 
      @close="isDetailOpen = false"
      @action="handleModalAction"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mockApprovalBox } from '@/utils/approvalData';
import ApprovalDetailModal from './components/ApprovalDetailModal.vue';

const route = useRoute();
const router = useRouter();

const currentType = ref(route.params.type || 'all');
const allDocuments = ref([...mockApprovalBox]);
const searchQuery = ref('');
const currentFilter = ref('전체');
const sortBy = ref('date-desc');

const isDetailOpen = ref(false);
const selectedItem = ref({});

const pageTitle = computed(() => {
  switch (currentType.value) {
    case 'all': return '전체 문서함';
    case 'ing': return '처리중인 문서함';
    case 'issue': return '보류/반려 문서함';
    case 'completed': return '완료 문서함';
    case 'temp': return '임시 보관함';
    default: return '문서함';
  }
});

const pageSubtitle = computed(() => `${pageTitle.value}의 모든 문서를 조회합니다.`);

const filterOptions = [
  { label: '전체', value: '전체' },
  { label: '기안', value: '기안서' },
  { label: '품의', value: '품의서' },
  { label: '보고', value: '보고서' }
];

const getStatusClass = (status) => {
  switch (status) {
    case '완료': return 'status-completed';
    case '진행중': return 'status-ing';
    case '반려': return 'status-rejected';
    case '보류': return 'status-hold';
    case '임시저장': return 'status-temp';
    default: return '';
  }
};

const baseList = computed(() => {
  let list = [...allDocuments.value];
  
  // Type filtering
  if (currentType.value === 'ing') list = list.filter(d => d.status === '진행중');
  else if (currentType.value === 'issue') list = list.filter(d => d.status === '반려' || d.status === '보류');
  else if (currentType.value === 'completed') list = list.filter(d => d.status === '완료');
  else if (currentType.value === 'temp') list = list.filter(d => d.status === '임시저장');
  
  return list;
});

const filteredList = computed(() => {
  let list = [...baseList.value];

  // Category Filter
  if (currentFilter.value !== '전체') {
    list = list.filter(d => d.category === currentFilter.value);
  }

  // Search
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    list = list.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.drafter.toLowerCase().includes(q)
    );
  }

  // Sorting
  list.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortBy.value === 'date-desc' ? dateB - dateA : dateA - dateB;
  });

  return list;
});

const openDetail = (item) => {
  selectedItem.value = item;
  isDetailOpen.value = true;
  
  if (!item.isRead) {
    const doc = allDocuments.value.find(d => d.id === item.id);
    if (doc) doc.isRead = true;
  }
};

const handleModalAction = (action) => {
  if (action.type === 'redraft') {
    router.push({ name: 'approval-draft', query: { from: action.id } });
  } else if (action.type === 'delete' || action.type === 'cancel') {
    allDocuments.value = allDocuments.value.filter(d => d.id !== action.id);
  } else if (action.type === 'review') {
    router.push({ name: 'approval-review' });
  }
  isDetailOpen.value = false;
};

watch(() => route.params.type, (newType) => {
  currentType.value = newType || 'all';
});
</script>

<style scoped>
.list-container {
  padding: 32px;
  background-color: #f8fafc;
  min-height: 100vh;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.back-btn {
  width: 44px; height: 44px;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  background: white;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #64748b;
  transition: all 0.2s;
}

.back-btn:hover { background: #f1f5f9; color: #0f172a; border-color: #cbd5e1; }

.page-header h2 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
.subtitle { color: #64748b; font-size: 1rem; }

.search-bar {
  position: relative;
  width: 300px;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.search-input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }

.search-icon {
  position: absolute; left: 14px; top: 12px;
  color: #94a3b8; font-size: 1rem;
}

.filter-section {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 24px;
}

.filter-tabs { display: flex; gap: 8px; }

.filter-tab {
  padding: 10px 20px; border-radius: 10px;
  background: white; border: 1px solid #e2e8f0;
  font-size: 0.9rem; font-weight: 700; color: #64748b;
  cursor: pointer; transition: all 0.2s;
}

.filter-tab:hover { background: #f8fafc; color: #0f172a; }
.filter-tab.active { background: #6366f1; color: white; border-color: #6366f1; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2); }

.sort-select select {
  padding: 10px 16px; border-radius: 10px;
  border: 1px solid #e2e8f0; background: white;
  font-size: 0.9rem; font-weight: 600; color: #475569;
  outline: none; cursor: pointer;
}

.table-card {
  background: white; border-radius: 24px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.box-table { width: 100%; border-collapse: collapse; }

.box-table th {
  padding: 18px 24px; text-align: left;
  background: #f8fafc; color: #64748b;
  font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
  border-bottom: 1px solid #f1f5f9;
}

.box-table td { padding: 20px 24px; border-bottom: 1px solid #f8fafc; vertical-align: middle; }

.clickable-row { cursor: pointer; transition: background 0.2s; }
.clickable-row:hover { background: #f8fafc; }

.w-status { width: 100px; }
.w-category { width: 120px; }
.w-drafter { width: 220px; }
.w-date { width: 180px; }

.status-chip {
  padding: 6px 12px; border-radius: 8px;
  font-size: 0.75rem; font-weight: 800;
}

.status-completed { background: #ecfdf5; color: #059669; }
.status-ing { background: #eff6ff; color: #2563eb; }
.status-rejected { background: #fef2f2; color: #dc2626; }
.status-hold { background: #fffbeb; color: #d97706; }
.status-temp { background: #f8fafc; color: #475569; }

.category-text { font-size: 0.85rem; font-weight: 600; color: #64748b; background: #f1f5f9; padding: 4px 8px; border-radius: 6px; }

.title-cell { max-width: 500px; }
.unread-style { font-weight: 800; color: #0f172a; font-size: 1rem; }
.read-style { color: #3b82f6; text-decoration: underline; font-weight: 500; font-size: 1rem; }

.preview { margin-top: 4px; font-size: 0.85rem; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.drafter-cell { display: flex; flex-direction: column; gap: 2px; }
.drafter-name { font-weight: 700; color: #1e293b; font-size: 0.9rem; }
.drafter-sub { font-size: 0.8rem; color: #94a3b8; }

.date-text { color: #64748b; font-size: 0.85rem; }

.empty-state { padding: 100px !important; text-align: center; color: #94a3b8; font-size: 1.1rem; }
</style>
