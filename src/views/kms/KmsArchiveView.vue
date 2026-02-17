<template>
  <div class="archive-list">
    <section class="card header">
      <h1>회의록 아카이브</h1>
      <p>현재 소속 팀/조직 기준 최대 10개 노출</p>
    </section>

    <section class="card table-wrap">
      <table>
        <thead>
        <tr>
          <th>제목</th>
          <th>팀</th>
          <th>작성일</th>
          <th>작성자</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in rows" :key="item.id" @click="router.push(`/kms/archive/${item.id}`)">
          <td>{{ item.title }}</td>
          <td>{{ item.team }}</td>
          <td>{{ item.createdAt }}</td>
          <td>{{ item.owner }}</td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { meetingArchives, sortByDateDesc } from '@/mocks/kms'

const router = useRouter()
const rows = computed(() => sortByDateDesc(meetingArchives).slice(0, 10))
</script>

<style scoped>
.archive-list { display: flex; flex-direction: column; gap: 16px; }
.header { border: 1px solid var(--gray200); padding: 18px; }
h1 { font-size: 1.15rem; color: var(--gray800); }
p { margin-top: 6px; color: var(--gray500); font-size: 0.84rem; }
.table-wrap { border: 1px solid var(--gray200); padding: 16px; }
table { width: 100%; border-collapse: collapse; }
th, td { border-bottom: 1px solid var(--gray100); text-align: left; padding: 12px 10px; font-size: 0.85rem; }
th { color: var(--gray500); font-weight: 600; }
tbody tr { cursor: pointer; }
tbody tr:hover { background: var(--gray50); }
</style>
