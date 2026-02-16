<template>
  <div v-if="open && notice" class="overlay" @click.self="emit('close')">
    <div class="modal" :class="{ compact }">
      <button type="button" class="close-btn" aria-label="닫기" @click="emit('close')">×</button>
      <h2>공지사항 상세</h2>
      <header class="detail-head">
        <h3>{{ notice.title }}</h3>
        <div class="meta-row">
          <span>생성일자: <strong class="font-num">{{ notice.createdAt }}</strong></span>
          <span>작성 부서(작성자): <strong>{{ notice.department }} ({{ notice.author }})</strong></span>
          <span>공지사항 유형: <strong>{{ notice.typeLabel }}</strong></span>
        </div>
      </header>
      <div class="detail-body">{{ notice.content }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  },
  notice: {
    type: Object,
    default: null
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.4);
}
.modal {
  position: relative;
  width: 780px;
  height: 560px;
  max-width: calc(100vw - 36px);
  max-height: calc(100vh - 36px);
  overflow: auto;
  border-radius: 16px;
  border: 1px solid var(--gray200);
  background: #fff;
  box-shadow: 0 24px 40px rgba(15, 23, 42, 0.22);
  padding: 18px;
}
.modal.compact {
  width: 740px;
}
.modal h2 {
  margin: 0 0 12px;
  color: var(--gray800);
  font-size: 1.16rem;
  padding-right: 30px;
}
.close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--gray500);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
}
.close-btn:hover {
  background: var(--gray100);
  color: var(--gray700);
}
.detail-head {
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--gray100);
}
.detail-head h3 {
  margin: 0 0 10px;
  color: var(--gray800);
  font-size: 1.06rem;
}
.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.82rem;
  color: var(--gray500);
}
.meta-row strong {
  color: var(--gray700);
  font-weight: 700;
}
.detail-body {
  min-height: 180px;
  color: var(--gray700);
  line-height: 1.68;
  white-space: pre-line;
  padding-bottom: 4px;
}
</style>
