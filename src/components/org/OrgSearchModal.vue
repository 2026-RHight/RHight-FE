<template>
  <BaseModal v-model="isOpen" width="1040px">
    <div class="org-modal-shell">
      <div class="org-modal-head">
        <h3>조직도 사원 검색</h3>
        <button class="org-close-btn" type="button" @click="isOpen = false">닫기</button>
      </div>

      <div class="org-modal-body">
        <OrgExplorer mode="modal" :initial-keyword="initialKeyword" />
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'
import OrgExplorer from '@/components/org/OrgExplorer.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  initialKeyword: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<style scoped>
.org-modal-shell {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 180px);
  max-height: 700px;
  min-height: 520px;
}

.org-modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.org-modal-head h3 {
  margin: 0;
  font-size: 1.12rem;
  color: var(--gray800);
}

.org-close-btn {
  border: 1px solid var(--gray200);
  background: #fff;
  color: var(--gray600);
  height: 32px;
  border-radius: 9px;
  padding: 0 12px;
  font-size: .8rem;
  font-weight: 700;
  cursor: pointer;
}

.org-close-btn:hover { background: var(--gray50); }

.org-modal-body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

@media (max-width: 1180px) {
  .org-modal-shell {
    height: calc(100vh - 150px);
    min-height: 500px;
  }
}
</style>
