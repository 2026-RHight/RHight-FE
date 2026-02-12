<template>
  <BaseModal v-model="visible" width="440px">
    <h2 class="modal-title">비밀번호 초기화</h2>

    <div class="modal-fields">
      <div class="modal-field">
        <label>사번</label>
        <input
            type="text"
            v-model="empNo"
            placeholder="사번을 입력하세요"
        />
      </div>
      <div class="modal-field">
        <label>주민등록번호</label>
        <input
            type="password"
            v-model="ssn"
            placeholder="주민등록번호를 입력하세요"
            inputmode="numeric"
            maxlength="13"
            autocomplete="off"
        />
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn-confirm" :disabled="!empNo || !ssn" @click="handleConfirm">확인</button>
      <button class="btn-cancel" @click="visible = false">취소</button>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '@/components/common/BaseModal.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const empNo = ref('')
const ssn = ref('')

const handleConfirm = () => {
  if (!empNo.value || !ssn.value) return
  // 추후 API 연결: await api.post('/auth/reset-password', { empNo, ssn })
  emit('confirm', { empNo: empNo.value, ssn: ssn.value })
  empNo.value = ''
  ssn.value = ''
  visible.value = false
}
</script>

<style scoped>
.modal-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 24px;
}

.modal-fields {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.modal-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.modal-field label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #334155;
}

.modal-field input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 10px;
  font-size: 0.88rem;
  font-family: 'Noto Sans KR', sans-serif;
  color: #334155;
  outline: none;
  transition: all 0.2s;
}

.modal-field input::placeholder {
  color: #94A3B8;
}

.modal-field input:focus {
  border-color: #0891B2;
  box-shadow: 0 0 0 3px #ECFEFF;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 28px;
}

.btn-confirm, .btn-cancel {
  padding: 10px 28px;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 600;
  font-family: 'Noto Sans KR', sans-serif;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-confirm {
  background: #0891B2;
  color: #fff;
}
.btn-confirm:hover:not(:disabled) {
  background: #0E7490;
}
.btn-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-cancel {
  background: #fff;
  color: #475569;
  border: 1px solid #E2E8F0;
}
.btn-cancel:hover {
  background: #F8FAFC;
}
</style>
