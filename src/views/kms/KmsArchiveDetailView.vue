<template>
  <div v-if="archive" class="archive-detail">
    <section class="card head">
      <div>
        <h1>{{ archive.title }}</h1>
        <p>{{ archive.owner }} · {{ archive.createdAt }} · {{ archive.category }}</p>
      </div>
      <div class="head-actions">
        <button type="button" class="ghost" @click="router.push('/kms/archive')">목록</button>
        <button
          v-if="canDownload"
          type="button"
          class="download"
          @click="alert('다운로드를 시작합니다. (시안)')"
        >
          다운로드
        </button>
      </div>
    </section>

    <section class="card body">
      <h2>본문</h2>
      <p>{{ archive.body }}</p>
    </section>

    <section class="card attach">
      <h2>첨부파일</h2>
      <ul>
        <li v-for="file in archive.attachments" :key="file.name">
          <span>{{ file.name }}</span>
          <em>{{ file.size }}</em>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AUTH_KEYS } from '@/utils/auth'
import { canReadArchiveDoc, resolveCurrentUserOrgContext, useKmsArchiveStore } from '@/store/kmsArchive'

const route = useRoute()
const router = useRouter()
const currentUserId = computed(() => sessionStorage.getItem(AUTH_KEYS.userId) || '')
const userContext = computed(() => resolveCurrentUserOrgContext(currentUserId.value))
const archiveStore = useKmsArchiveStore()

const archive = computed(() => archiveStore.getDocById(route.params.archiveId))
const canDownload = computed(() => {
  if (!archive.value) return false
  return archive.value.allowDownload && canReadArchiveDoc(archive.value, userContext.value)
})
</script>

<style scoped>
.archive-detail { display: flex; flex-direction: column; gap: 16px; }
.head,.body,.attach { border: 1px solid var(--gray200); padding: 18px; }
.head { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
h1 { font-size: 1.15rem; color: var(--gray800); }
h2 { font-size: 0.94rem; color: var(--gray800); margin-bottom: 8px; }
p { margin-top: 6px; color: var(--gray500); font-size: 0.84rem; line-height: 1.7; }
.head-actions { display: flex; gap: 8px; }
.ghost { border: 1px solid var(--gray300); background: #fff; color: var(--gray600); border-radius: 9px; padding: 8px 12px; }
.download { border: 1px solid var(--primary); background: var(--primary); color: #fff; border-radius: 9px; padding: 8px 12px; font-weight: 700; }
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
li { display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--gray100); border-radius: 9px; padding: 9px 10px; background: #fff; }
li span { color: var(--gray700); font-size: 0.84rem; }
li em { font-style: normal; color: var(--gray400); font-size: 0.76rem; }
</style>
