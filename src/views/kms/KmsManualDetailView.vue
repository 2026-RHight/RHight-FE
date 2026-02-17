<template>
  <div v-if="manual" class="manual-detail">
    <section class="card head">
      <div>
        <h1>{{ manual.title }}</h1>
        <p>{{ categoryName }} · {{ manual.author }} · {{ manual.updatedAt }} · {{ manual.version }}</p>
      </div>
      <div class="actions">
        <div class="search-box">
          <input v-model="searchTerm" type="text" placeholder="돋보기 검색" />
        </div>
        <button class="btn" @click="router.push(`/kms/manuals/edit/${manual.id}`)">수정</button>
      </div>
    </section>

    <section class="card body">
      <p :class="{ hit: hasHit }">{{ manual.body }}</p>
      <p class="summary">{{ manual.summary }}</p>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { kmsCategories, manuals } from '@/mocks/kms'

const route = useRoute()
const router = useRouter()
const searchTerm = ref('')

const manual = computed(() => manuals.find((item) => String(item.id) === String(route.params.manualId)))
const categoryName = computed(() => kmsCategories.find((item) => item.key === manual.value?.category)?.name || '-')
const hasHit = computed(() => searchTerm.value.trim() && manual.value?.body.includes(searchTerm.value.trim()))
</script>

<style scoped>
.manual-detail { display: flex; flex-direction: column; gap: 16px; }
.head { border: 1px solid var(--gray200); padding: 18px; display: flex; justify-content: space-between; gap: 10px; }
h1 { color: var(--gray800); font-size: 1.2rem; }
p { margin-top: 6px; color: var(--gray500); font-size: 0.84rem; }
.actions { display: flex; gap: 8px; align-items: center; }
.search-box input { border: 1px solid var(--gray300); border-radius: 10px; padding: 8px 10px; min-width: 220px; }
.btn { border: 1px solid var(--gray300); border-radius: 10px; padding: 8px 12px; background: #fff; }
.body { border: 1px solid var(--gray200); padding: 18px; min-height: 300px; }
.body p { margin: 0; font-size: 0.9rem; line-height: 1.7; color: var(--gray700); }
.body p.hit { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 12px; border-radius: 8px; }
.summary { margin-top: 16px !important; font-size: 0.82rem !important; color: var(--gray500) !important; }
</style>
