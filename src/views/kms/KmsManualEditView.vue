<template>
  <div v-if="manual" class="manual-edit">
    <section class="card header">
      <h1>업무 메뉴얼 수정</h1>
      <p>{{ manual.title }} · 현재 {{ manual.version }}</p>
    </section>

    <section class="card editor">
      <label>제목</label>
      <input v-model="title" type="text" />

      <label>내용</label>
      <textarea v-model="body" rows="10" />

      <div class="version">
        <label>버전 증가 방식</label>
        <div class="radio-row">
          <label><input v-model="versionType" type="radio" value="major" /> 메이저</label>
          <label><input v-model="versionType" type="radio" value="minor" /> 마이너</label>
        </div>
      </div>

      <div class="buttons">
        <button class="save" @click="onSave">저장</button>
        <button class="delete" @click="showDeleteConfirm = true">삭제</button>
      </div>
    </section>

    <section class="card history">
      <header>
        <h2>버전 관리 및 이력</h2>
      </header>
      <ul>
        <li v-for="item in manualVersionHistory" :key="item.version">
          <div>
            <strong>{{ item.version }}</strong>
            <span>{{ item.type === 'major' ? '메이저' : '마이너' }}</span>
          </div>
          <p>{{ item.updatedAt }} · {{ item.editor }} · {{ item.notes }}</p>
          <button type="button" @click="alert(`${item.version} 버전 복원을 실행했습니다(시안).`)">복원</button>
        </li>
      </ul>
    </section>

    <BaseModal v-model="showDeleteConfirm" width="420px">
      <div class="modal-body">
        <h3>메뉴얼 삭제 확인</h3>
        <p>삭제된 메뉴얼은 임시 보관함으로 이동되어 일정 기간 내 복원할 수 있습니다.</p>
        <div class="modal-actions">
          <button type="button" @click="showDeleteConfirm = false">취소</button>
          <button type="button" class="danger" @click="onDelete">삭제</button>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseModal from '@/components/common/BaseModal.vue'
import { manualVersionHistory, manuals } from '@/mocks/kms'

const route = useRoute()
const manual = computed(() => manuals.find((item) => String(item.id) === String(route.params.manualId)))
const title = ref(manual.value?.title || '')
const body = ref(manual.value?.body || '')
const versionType = ref('minor')
const showDeleteConfirm = ref(false)

const onSave = () => {
  const changeType = versionType.value === 'major' ? '메이저' : '마이너'
  alert(`수정 저장 완료(시안): ${changeType} 버전으로 저장, 수정일/수정자 자동 갱신`)
}

const onDelete = () => {
  showDeleteConfirm.value = false
  alert('삭제 처리 완료(시안): 임시 보관함으로 이동')
}
</script>

<style scoped>
.manual-edit { display: flex; flex-direction: column; gap: 16px; }
.header { border: 1px solid var(--gray200); padding: 18px; }
h1 { font-size: 1.15rem; color: var(--gray800); }
p { margin-top: 6px; color: var(--gray500); font-size: 0.84rem; }
.editor { border: 1px solid var(--gray200); padding: 18px; display: grid; gap: 8px; }
label { font-size: 0.8rem; color: var(--gray500); }
input, textarea { border: 1px solid var(--gray300); border-radius: 10px; padding: 10px; }
.version { margin-top: 8px; }
.radio-row { margin-top: 8px; display: flex; gap: 16px; }
.radio-row label { font-size: 0.84rem; color: var(--gray700); display: flex; gap: 6px; align-items: center; }
.buttons { margin-top: 10px; display: flex; gap: 8px; }
.save { background: var(--primary); color: #fff; border-radius: 10px; padding: 9px 14px; }
.delete { background: #fff; border: 1px solid #fecaca; color: #b91c1c; border-radius: 10px; padding: 9px 14px; }
.history { border: 1px solid var(--gray200); padding: 18px; }
h2 { font-size: 0.95rem; color: var(--gray800); }
ul { margin-top: 10px; display: flex; flex-direction: column; gap: 8px; }
li { border: 1px solid var(--gray100); border-radius: 10px; padding: 10px; display: flex; justify-content: space-between; align-items: center; gap: 10px; }
li strong { color: var(--gray800); }
li span { margin-left: 6px; font-size: 0.74rem; color: var(--primary); font-weight: 700; }
li p { margin-top: 3px; font-size: 0.78rem; }
li button { border: 1px solid var(--gray300); background: #fff; border-radius: 8px; padding: 6px 10px; font-size: 0.78rem; }
.modal-body h3 { font-size: 1rem; color: var(--gray800); }
.modal-body p { margin-top: 8px; line-height: 1.6; }
.modal-actions { margin-top: 14px; display: flex; justify-content: flex-end; gap: 8px; }
.modal-actions button { border-radius: 8px; padding: 7px 12px; border: 1px solid var(--gray300); background: #fff; }
.modal-actions .danger { border-color: #fecaca; background: #fee2e2; color: #b91c1c; }
</style>
