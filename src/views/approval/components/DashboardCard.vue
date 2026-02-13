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
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1e293b;
}

.more-btn {
  font-size: 0.8rem;
  font-weight: 700;
  color: #6366f1;
  background: #f5f3ff;
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
  background: #ede9fe;
  gap: 8px;
}

.card-body {
  flex: 1;
  padding: 8px 0;
  min-height: 300px;
}

.mini-list {
  display: flex;
  flex-direction: column;
}

.mini-item {
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid #f8fafc;
}

.mini-item:last-child {
  border-bottom: none;
}

.mini-item:hover {
  background: #f8fafc;
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
  color: #0f172a;
}

.read-style {
  color: #3b82f6;
  text-decoration: underline;
  font-weight: 500;
}

.item-meta {
  font-size: 0.8rem;
  color: #94a3b8;
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

.status-완료 { background: #ecfdf5; color: #059669; }
.status-진행중 { background: #eff6ff; color: #2563eb; }
.status-반려 { background: #fef2f2; color: #dc2626; }
.status-보류 { background: #fffbeb; color: #d97706; }

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
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.9rem;
}

.card-footer {
  padding: 16px 24px;
  background: #f8fafc;
  border-top: 1px solid #f1f5f9;
}

.total-count {
  font-size: 0.8rem;
  color: #64748b;
}

.total-count strong {
  color: #0f172a;
}
</style>
