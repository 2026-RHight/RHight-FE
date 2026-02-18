<template>
  <div class="archive-manage">
    <section class="card head">
      <h1>{{ isEditMode ? '아카이브 문서 수정' : '아카이브 문서 등록' }}</h1>
      <p>저장 시 해당 조직/팀 구성원에게 알림이 발송됩니다.</p>
    </section>

    <section class="card form-card">
      <div class="form-grid">
        <label>
          제목
          <input v-model="form.title" type="text" placeholder="문서 제목 입력" />
        </label>
        <label>
          카테고리
          <select v-model="form.category">
            <option v-for="item in archiveCategoryOptions.slice(1)" :key="item" :value="item">{{ item }}</option>
          </select>
        </label>
      </div>

      <label>
        본문
        <textarea v-model="form.body" rows="9" placeholder="문서 본문 입력" />
      </label>

      <div class="form-grid">
        <label>
          조직 접근 권한
          <select v-model="form.orgScope">
            <option v-for="org in orgOptions" :key="org" :value="org">{{ org }}</option>
          </select>
        </label>
        <label>
          팀 접근 권한
          <select v-model="form.teamScope">
            <option v-for="team in teamOptions" :key="team" :value="team">{{ team }}</option>
          </select>
        </label>
      </div>

      <label>
        첨부파일
        <input type="file" multiple @change="handleFileChange" />
      </label>
      <ul v-if="form.attachments.length > 0" class="file-list">
        <li v-for="file in form.attachments" :key="file.name">
          <span>{{ file.name }}</span>
          <em>{{ file.size }}</em>
        </li>
      </ul>

      <div class="actions">
        <button type="button" class="ghost" @click="router.push('/kms/archive')">취소</button>
        <button type="button" class="save" @click="handleSave">{{ isEditMode ? '수정 저장' : '문서 등록' }}</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { archiveCategoryOptions } from '@/mocks/kms'
import { AUTH_KEYS } from '@/utils/auth'
import { resolveCurrentUserOrgContext, useKmsArchiveStore } from '@/store/kmsArchive'

const route = useRoute()
const router = useRouter()
const isEditMode = computed(() => route.params.archiveId !== 'new')
const archiveStore = useKmsArchiveStore()
const currentUserId = computed(() => sessionStorage.getItem(AUTH_KEYS.userId) || '')
const userContext = computed(() => resolveCurrentUserOrgContext(currentUserId.value))

const baseDoc = computed(() => archiveStore.getDocById(route.params.archiveId))
const teamOptions = computed(() => [...new Set(archiveStore.teamMetaList.map((row) => row.teamName))])
const orgOptions = computed(() => [...new Set(archiveStore.teamMetaList.map((row) => row.pathNames.find((name) => name.endsWith('본부') || name.endsWith('연구소'))).filter(Boolean))])

const form = reactive({
  title: baseDoc.value?.title || '',
  category: baseDoc.value?.category || '회의록',
  body: baseDoc.value?.body || '',
  orgScope: baseDoc.value?.org || '기술연구소',
  teamScope: baseDoc.value?.team || '모바일1팀',
  attachments: baseDoc.value?.attachments ? [...baseDoc.value.attachments] : []
})

const handleFileChange = (event) => {
  const fileList = [...(event.target.files || [])]
  form.attachments = fileList.map((file) => ({
    name: file.name,
    size: `${Math.max(1, Math.round(file.size / 1024))}KB`
  }))
}

const handleSave = () => {
  if (!form.title.trim() || !form.body.trim()) {
    alert('제목과 본문을 입력해 주세요.')
    return
  }

  const ownerName = sessionStorage.getItem(AUTH_KEYS.userName) || '사용자'
  const payload = {
    title: form.title.trim(),
    category: form.category,
    body: form.body.trim(),
    org: form.orgScope,
    team: form.teamScope,
    owner: ownerName,
    attachments: form.attachments
  }

  const actionText = isEditMode.value ? '수정' : '등록'
  const savedDoc = isEditMode.value
    ? archiveStore.updateDoc(route.params.archiveId, payload, userContext.value)
    : archiveStore.createDoc(payload)

  if (!savedDoc) {
    alert('저장 대상 문서를 찾을 수 없습니다.')
    return
  }

  alert(`아카이브 문서 ${actionText}이 완료되었습니다. ${form.orgScope}/${form.teamScope} 구성원에게 알림을 발송했습니다.`)
  router.push(`/kms/archive/${savedDoc.id}`)
}
</script>

<style scoped>
.archive-manage { display: flex; flex-direction: column; gap: 16px; }
.head,.form-card { border: 1px solid var(--gray200); padding: 18px; }
h1 { font-size: 1.15rem; color: var(--gray800); }
p { margin-top: 6px; color: var(--gray500); font-size: 0.84rem; }
.form-card { display: grid; gap: 10px; }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
label { display: grid; gap: 6px; color: var(--gray600); font-size: 0.81rem; }
input, select, textarea { border: 1px solid var(--gray300); border-radius: 10px; padding: 10px 12px; font-size: 0.86rem; }
input[type="file"] {
  padding: 7px 10px;
  min-height: 38px;
  line-height: 1.2;
}
.file-list { list-style: none; padding: 0; margin: -4px 0 0; display: flex; flex-direction: column; gap: 6px; }
.file-list li { border: 1px solid var(--gray100); border-radius: 9px; padding: 8px 10px; display: flex; justify-content: space-between; }
.file-list span { color: var(--gray700); font-size: 0.81rem; }
.file-list em { color: var(--gray400); font-style: normal; font-size: 0.76rem; }
.actions { margin-top: 8px; display: flex; justify-content: flex-end; gap: 8px; }
.ghost { border: 1px solid var(--gray300); background: #fff; color: var(--gray600); border-radius: 9px; padding: 8px 12px; }
.save { border: 1px solid var(--primary); background: var(--primary); color: #fff; border-radius: 9px; padding: 8px 12px; font-weight: 700; }
@media (max-width: 900px) { .form-grid { grid-template-columns: 1fr; } }
</style>
