<template>
  <div v-if="archive" class="archive-detail">
    <section class="card header">
      <h1>{{ archive.title }}</h1>
      <p>{{ archive.team }} · {{ archive.owner }} · {{ archive.createdAt }}</p>
    </section>
    <section class="card body">
      <h2>회의 요약</h2>
      <p>{{ archive.summary }}</p>
      <button type="button" @click="router.push('/kms/archive')">목록으로</button>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { meetingArchives } from '@/mocks/kms'

const route = useRoute()
const router = useRouter()
const archive = computed(() => meetingArchives.find((item) => String(item.id) === String(route.params.archiveId)))
</script>

<style scoped>
.archive-detail { display: flex; flex-direction: column; gap: 16px; }
.header, .body { border: 1px solid var(--gray200); padding: 18px; }
h1 { font-size: 1.15rem; color: var(--gray800); }
h2 { font-size: 0.95rem; color: var(--gray800); }
p { margin-top: 6px; color: var(--gray500); font-size: 0.86rem; line-height: 1.7; }
button { margin-top: 14px; border-radius: 10px; border: 1px solid var(--gray300); background: #fff; padding: 8px 12px; }
</style>
