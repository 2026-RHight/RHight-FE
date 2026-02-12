<template>
  <div v-if="isOpen" class="confirm-modal-overlay" @click.self="close">
    <div class="confirm-modal-content">
      <div class="confirm-modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      <div class="confirm-modal-body">
        <p class="confirm-message">{{ message }}</p>
      </div>
      <div class="confirm-modal-footer">
        <button class="cancel-btn" @click="close">{{ cancelText }}</button>
        <button class="confirm-btn" @click="handleConfirm">{{ confirmText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: '확인'
  },
  message: {
    type: String,
    default: '진행하시겠습니까?'
  },
  confirmText: {
    type: String,
    default: '확인'
  },
  cancelText: {
    type: String,
    default: '취소'
  }
});

const emit = defineEmits(['close', 'confirm']);

const close = () => {
  emit('close');
};

const handleConfirm = () => {
  emit('confirm');
  close();
};
</script>

<style scoped>
.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(2px);
}

.confirm-modal-content {
  background: white;
  width: 400px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  overflow: hidden;
  animation: modal-in 0.2s ease-out;
}

@keyframes modal-in {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.confirm-modal-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.confirm-modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.confirm-modal-body {
  padding: 20px 24px 32px;
  text-align: center;
}

.confirm-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.confirm-message {
  margin: 0;
  font-size: 1.05rem;
  color: #444;
  line-height: 1.5;
  white-space: pre-line;
}

.confirm-modal-footer {
  padding: 16px 20px;
  background: #f9fafb;
  display: flex;
  justify-content: center;
  gap: 12px;
}

.cancel-btn {
  padding: 10px 24px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #666;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #f3f4f6;
}

.confirm-btn {
  padding: 10px 32px;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.confirm-btn:hover {
  background: #0052a3;
  box-shadow: 0 4px 8px rgba(0, 102, 204, 0.3);
}
</style>
