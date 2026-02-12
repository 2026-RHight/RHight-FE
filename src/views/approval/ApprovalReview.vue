<template>
  <div class="review-container">
    <div class="page-header">
      <h2>전자 결재 검토</h2>
      <p class="subtitle">나에게 배정된 결재 대기 문서를 검토하고 승인/반려를 처리합니다.</p>
    </div>

    <div class="list-card">
      <div class="table-container">
        <table class="review-table">
          <thead>
            <tr>
              <th class="w-10">상태</th>
              <th class="w-category">카테고리</th>
              <th>제목</th>
              <th class="w-drafter">기안자</th>
              <th class="w-date">기안일</th>
              <th class="w-actions">관리</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in reviewList" 
              :key="item.id" 
              class="clickable-row"
              @click="openModal(item)"
            >
              <td class="text-center">
                <span class="status-dot" :class="{ 'unread': !item.isRead }"></span>
              </td>
              <td>
                <span class="category-tag">{{ item.category }}</span>
              </td>
              <td class="title-cell">
                <span :class="item.isRead ? 'read-style' : 'unread-style'">
                  {{ item.title }}
                </span>
                <p class="preview-text">{{ item.content }}</p>
              </td>
              <td>
                <div class="drafter-info">
                  <span class="name">{{ item.drafter }}</span>
                  <span class="pos-dept">{{ item.position }} / {{ item.department }}</span>
                </div>
              </td>
              <td class="text-light-gray">{{ item.date }}</td>
              <td class="text-center" @click.stop>
                <button class="review-btn" @click="openModal(item)">검토</button>
              </td>
            </tr>
            <tr v-if="reviewList.length === 0">
              <td colspan="6" class="empty-state">검토할 대기 문서가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Review Modal -->
    <ReviewModal 
      :is-open="isModalOpen" 
      :item="selectedItem" 
      @close="isModalOpen = false"
      @action="handleReviewAction"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { mockReviewList } from '@/utils/approvalData';
import ReviewModal from './components/ReviewModal.vue';

const reviewList = ref([...mockReviewList]);
const isModalOpen = ref(false);
const selectedItem = ref({});

const openModal = (item) => {
  selectedItem.value = item;
  isModalOpen.value = true;
  
  // Mark as read after opening
  const index = reviewList.value.findIndex(r => r.id === item.id);
  if (index !== -1 && !reviewList.value[index].isRead) {
    reviewList.value[index].isRead = true;
  }
};

const handleReviewAction = (data) => {
  console.log('Review action:', data);
  // Remove from list after action for demonstration
  reviewList.value = reviewList.value.filter(r => r.id !== data.id);
};
</script>

<style scoped>
.review-container {
  padding: 24px;
  background-color: #fcfcfc;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 8px;
}

.subtitle {
  color: #868e96;
  font-size: 0.95rem;
}

.list-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.table-container {
  overflow-x: auto;
}

.review-table {
  width: 100%;
  border-collapse: collapse;
}

.review-table th {
  padding: 14px 20px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 600;
  color: #868e96;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.review-table td {
  padding: 20px;
  border-bottom: 1px solid #f8f9fa;
  vertical-align: middle;
}

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-row:hover {
  background-color: #f8f9fa;
}

.w-10 { width: 60px; }
.w-category { width: 100px; }
.w-drafter { width: 180px; }
.w-date { width: 120px; }
.w-actions { width: 100px; }

.status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dee2e6;
}

.status-dot.unread {
  background: #228be6;
  box-shadow: 0 0 0 3px rgba(34, 139, 230, 0.2);
}

.category-tag {
  font-size: 0.75rem;
  padding: 4px 8px;
  background: #f1f3f5;
  color: #495057;
  border-radius: 4px;
}

.title-cell {
  max-width: 400px;
}

.unread-style {
  font-weight: 800;
  color: #212529;
  font-size: 1rem;
}

.read-style {
  color: #228be6;
  text-decoration: underline;
  font-weight: 500;
  font-size: 1rem;
}

.preview-text {
  margin-top: 4px;
  font-size: 0.85rem;
  color: #adb5bd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.drafter-info {
  display: flex;
  flex-direction: column;
}

.drafter-info .name {
  font-weight: 600;
  color: #495057;
  font-size: 0.9rem;
}

.drafter-info .pos-dept {
  font-size: 0.8rem;
  color: #adb5bd;
  margin-top: 2px;
}

.text-light-gray {
  color: #adb5bd;
  font-size: 0.85rem;
}

.review-btn {
  padding: 6px 14px;
  border: 1px solid #dee2e6;
  background: white;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;
}

.review-btn:hover {
  background: #f1f3f5;
  color: #212529;
  border-color: #adb5bd;
}

.text-center { text-align: center !important; }

.empty-state {
  padding: 60px !important;
  text-align: center;
  color: #adb5bd;
  font-size: 1rem;
}
</style>
