<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <button class="more-btn" @click="goToList">
        더보기 <span class="arrow">→</span>
      </button>
    </div>
    <div class="card-body">
      <div v-if="items.length > 0" class="mini-list">
        <div 
          v-for="item in items" 
          :key="item.id" 
          class="mini-item"
          @click="$emit('click-item', item)"
        >
          <div class="item-main">
            <span 
              class="item-title" 
              :class="item.isRead ? 'read-style' : 'unread-style'"
            >
              {{ item.title }}
            </span>
            <div class="item-meta">
              <span class="item-drafter">{{ item.drafter }} {{ item.position }}</span>
              <span class="separator">|</span>
              <span class="item-date">{{ item.date.split(' ')[0] }}</span>
            </div>
          </div>
          <div class="item-right">
            <span v-if="!isTemp" class="status-tag" :class="'status-' + item.status">
              {{ item.status }}
            </span>
            <div v-else class="temp-actions">
              <button class="action-icon-btn" @click.stop="$emit('click-item', item)">🖋️</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-list">
        데이터가 없습니다.
      </div>
    </div>
    <div class="card-footer">
      <span class="total-count">총 <strong>{{ items.length }}</strong> {{ countLabel }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: String,
  items: Array,
  countLabel: String,
  linkType: String,
  isTemp: Boolean
});

const emit = defineEmits(['click-item']);
const router = useRouter();

const goToList = () => {
  router.push({ name: 'approval-box-list', params: { type: props.linkType } });
};
</script>

<style scoped>
.card {
  background: white;
  border-radius: 20px;
  border: 1px solid #f1f3f5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f3f5;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #212529;
}

.more-btn {
  font-size: 0.8rem;
  font-weight: 700;
  color: #339af0;
  background: #f0f7ff;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}

.more-btn:hover {
  background: #e7f5ff;
  gap: 8px;
}

.card-body {
  flex: 1;
  padding: 4px 0;
}

.mini-list {
  display: flex;
  flex-direction: column;
}

.mini-item {
  padding: 11px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f8f9fa;
}

.mini-item:last-child {
  border-bottom: none;
}

.mini-item:hover {
  background: #f8f9fa;
}

.item-main {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 70%;
}

.item-title {
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unread-style {
  font-weight: 800;
  color: #212529;
}

.read-style {
  color: #339af0;
  text-decoration: underline;
  font-weight: 500;
}

.item-meta {
  font-size: 0.8rem;
  color: #adb5bd;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-tag {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
}

.status-완료 { background: #f2fcf5; color: #40c057; border: 1px solid #d3f9d8; }
.status-진행중 { background: #f0f7ff; color: #339af0; border: 1px solid #d0e7ff; }
.status-반려 { background: #fff5f5; color: #fa5252; border: 1px solid #ffe3e3; }
.status-보류 { background: #fff9db; color: #f08c00; border: 1px solid #ffec99; }

.temp-actions {
  display: flex;
}

.action-icon-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}

.empty-list {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #adb5bd;
  font-size: 0.9rem;
}

.card-footer {
  padding: 12px 20px;
  background: #f8f9fa;
  border-top: 1px solid #f1f3f5;
}

.total-count {
  font-size: 0.8rem;
  color: #868e96;
}

.total-count strong {
  color: #212529;
}
</style>
