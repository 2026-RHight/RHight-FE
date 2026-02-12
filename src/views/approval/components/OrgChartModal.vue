<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      <div class="modal-body">
        <!-- Left: Org Chart -->
        <div class="panel org-chart-panel">
          <div class="panel-header">
            <h4>조직도</h4>
            <div class="search-box">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="이름/부서 검색..."
                @input="onSearch"
              />
              <span class="search-icon">🔍</span>
            </div>
          </div>
          <div class="tree-view">
             <!-- Search Results -->
             <div v-if="searchQuery" class="search-results">
                <div 
                    v-for="user in filteredUsers" 
                    :key="user.id" 
                    class="tree-user"
                    :class="{ 'is-selected': isSelected(user.id) }"
                    @click="selectUser(user)"
                >
                    <span class="user-avatar">👤</span>
                    <div class="user-detail">
                        <span class="user-name-pos">{{ user.name }} {{ user.position }}</span>
                        <span class="user-dept">{{ user.department }}</span>
                    </div>
                    <span v-if="user.canFinalize && mode === 'approval'" class="finalize-badge">전결</span>
                </div>
                <div v-if="filteredUsers.length === 0" class="empty-search">
                    검색 결과가 없습니다.
                </div>
             </div>
             <!-- Original Tree -->
             <div v-else v-for="node in orgChart" :key="node.id">
                <tree-item 
                  :node="node" 
                  @select-user="selectUser"
                  :selected-users="localSelection"
                  :mode="mode"
                />
             </div>
          </div>
        </div>

        <!-- Center: Action Buttons -->
        <div class="actions">
          <div class="arrow-icon">➡</div>
        </div>

        <!-- Right: Selected Users -->
        <div class="panel selection-panel">
          <div class="panel-header">
            <h4>
              {{ mode === 'approval' ? '결재선' : '참조자' }}
              <span class="count" v-if="mode === 'referrer'">({{ localSelection.length }}/10)</span>
            </h4>
            <button class="clear-all" @click="localSelection = []">전체 해제</button>
          </div>
          
          <div class="selected-list" 
               @dragover.prevent 
               @drop="onDrop">
            <div 
              v-for="(user, index) in localSelection" 
              :key="user.id"
              class="selected-item"
              :draggable="mode === 'approval'"
              @dragstart="onDragStart($event, index)"
              @dragenter="onDragEnter($event, index)"
            >
              <span class="rank-badge" v-if="mode === 'approval'">{{ index + 1 }}</span>
              <div class="user-info">
                <span class="name">{{ user.name }}</span>
                <span class="position">{{ user.position }}</span>
                <span class="dept">{{ user.department }}</span>
                <span v-if="user.canFinalize && mode === 'approval'" class="finalize-badge-small">전결 가능</span>
              </div>
              <button class="remove-btn" @click="removeUser(index)">&times;</button>
            </div>
            <div v-if="localSelection.length === 0" class="empty-state">
              조직도에서 인원을 클릭하여 선택하세요.
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="cancel-btn" @click="close">취소</button>
        <button class="confirm-btn" @click="confirm">확인</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { orgChart as rawOrgChart, mockUsers } from '@/utils/approvalData';
import TreeItem from './TreeItem.vue';


const props = defineProps({
  isOpen: Boolean,
  mode: {
    type: String,
    default: 'approval'
  },
  initialSelection: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'confirm']);

const orgChart = ref(rawOrgChart);
const localSelection = ref([]);
const searchQuery = ref('');

const filteredUsers = computed(() => {
    if (!searchQuery.value) return [];
    const lowerQuery = searchQuery.value.toLowerCase();
    return mockUsers.filter(user => 
        user.name.toLowerCase().includes(lowerQuery) || 
        user.department.toLowerCase().includes(lowerQuery)
    );
});

// Sync with props when modal opens
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    localSelection.value = [...props.initialSelection];
    searchQuery.value = '';
  }
});

const title = computed(() => props.mode === 'approval' ? '결재선 설정' : '참조자 설정');

const isSelected = (userId) => localSelection.value.some(u => u.id === userId);

const selectUser = (user) => {
  const index = localSelection.value.findIndex(u => u.id === user.id);
  
  if (index !== -1) {
    removeUser(index);
  } else {
    if (props.mode === 'referrer' && localSelection.value.length >= 10) {
      alert('참조자는 최대 10명까지 지정할 수 있습니다.');
      return;
    }
    localSelection.value.push(user);
  }
};

const removeUser = (index) => {
  localSelection.value.splice(index, 1);
};

// Drag and Drop implementation
let draggingIndex = -1;

const onDragStart = (e, index) => {
    draggingIndex = index;
    e.dataTransfer.effectAllowed = 'move';
};

const onDragEnter = (e, index) => {
    if (draggingIndex !== index && draggingIndex !== -1) {
        const item = localSelection.value.splice(draggingIndex, 1)[0];
        localSelection.value.splice(index, 0, item);
        draggingIndex = index;
    }
};

const onDrop = () => {
    draggingIndex = -1;
};

const close = () => {
  emit('close');
};

const confirm = () => {
  emit('confirm', localSelection.value);
  close();
};

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  width: 800px;
  max-width: 95%;
  height: 600px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.modal-header {
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  flex: 1;
  display: flex;
  padding: 20px;
  gap: 20px;
  overflow: hidden;
}

.panel {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.panel-header {
  background: #f8f9fa;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-header h4 {
  margin: 0;
  border: none;
  background: none;
  padding: 0;
  font-size: 0.95rem;
}

.search-box {
  position: relative;
  width: 200px;
}

.search-box input {
  width: 100%;
  padding: 6px 30px 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.85rem;
}

.search-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 0.8rem;
}

.clear-all {
    background: none;
    border: none;
    color: #0066cc;
    font-size: 0.8rem;
    cursor: pointer;
    text-decoration: underline;
}

.tree-view, .selected-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.search-results {
    padding: 10px 0;
}

.empty-search {
    text-align: center;
    color: #999;
    padding: 20px 0;
    font-size: 0.85rem;
}

/* Tree Item Styles */
:deep(.tree-item) {
  margin-left: 10px;
}
:deep(.node-label) {
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.2s;
}
:deep(.node-label:hover) {
  background: #f0f0f0;
}
:deep(.toggle-icon) {
  font-size: 0.7rem;
  width: 12px;
  color: #888;
}
:deep(.folder-icon) {
    font-size: 1rem;
}
:deep(.node-name) {
  font-size: 0.9rem;
  color: #333;
}
:deep(.tree-user) {
  padding: 6px 8px 6px 24px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}
:deep(.tree-user:hover) {
  background-color: #f0f7ff;
}
:deep(.tree-user.is-selected) {
  background-color: #e6f3ff;
  color: #0066cc;
  font-weight: 500;
}
:deep(.user-avatar) {
    font-size: 0.9rem;
    color: #555;
}
:deep(.finalize-badge) {
    background: #fff1f0;
    color: #cf1322;
    border: 1px solid #ffa39e;
    font-size: 0.7rem;
    padding: 0 4px;
    border-radius: 2px;
    margin-left: auto;
}

.search-results .tree-user {
    margin-left: 0;
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
}
.user-detail {
    display: flex;
    flex-direction: column;
    gap: 2px;
}
.user-name-pos {
    font-size: 0.9rem;
}
.user-dept {
    font-size: 0.75rem;
    color: #999;
}

/* Selected List Styles */
.selected-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid #eee;
  margin-bottom: 6px;
  background: white;
  border-radius: 6px;
  cursor: grab;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.selected-item:active {
  cursor: grabbing;
}

.rank-badge {
  background: #0066cc;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  margin-right: 12px;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.user-info .position {
  color: #666;
  font-size: 0.8rem;
}

.user-info .dept {
  color: #999;
  font-size: 0.8rem;
}

.finalize-badge-small {
    font-size: 0.7rem;
    color: #cf1322;
    background: #fff1f0;
    padding: 0 4px;
    border-radius: 2px;
    border: 1px solid #ffa39e;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0 4px;
  margin-left: auto;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 40px 0;
  font-size: 0.9rem;
}

.modal-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn {
  padding: 8px 16px;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.confirm-btn:hover {
  background: #0052a3;
}
</style>
