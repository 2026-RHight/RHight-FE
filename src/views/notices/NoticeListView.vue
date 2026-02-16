<template>
  <div class="notice-page">
    <div class="breadcrumb">메인 / 공지사항</div>

    <section class="card page-head fade-up">
      <div class="title-wrap">
        <h1>공지사항</h1>
      </div>

      <div class="search-row">
        <select v-model="selectedType" class="type-select">
          <option v-for="type in NOTICE_TYPE_OPTIONS" :key="type.value" :value="type.value">
            {{ type.label }}
          </option>
        </select>
        <input v-model="keyword" type="text" class="keyword-input" placeholder="공지사항 제목 검색" />
      </div>
    </section>

    <section class="card list-card fade-up delay-1">
      <div class="list-head">
        <div>제목</div>
        <div>생성일자</div>
        <div>작성 부서(작성자)</div>
        <div>공지사항 유형</div>
      </div>

      <div v-if="notices.length === 0" class="empty">검색 결과가 없습니다.</div>

      <div v-for="notice in pagedNotices" :key="notice.id" class="list-row">
        <button class="title-btn" type="button" @click="openDetailModal(notice)">{{ notice.title }}</button>
        <div class="font-num">{{ notice.createdAt }}</div>
        <div>{{ notice.department }} ({{ notice.author }})</div>
        <div><span class="type-chip">{{ notice.typeLabel }}</span></div>
      </div>

      <div v-if="notices.length > 0" class="pagination">
        <button type="button" class="page-btn" :disabled="currentPage === 1" @click="currentPage--">이전</button>
        <span class="page-info font-num">{{ currentPage }} / {{ totalPages }}</span>
        <button type="button" class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">다음</button>
      </div>
    </section>

    <NoticeDetailModal :open="showDetailModal" :notice="selectedNotice" @close="closeDetailModal" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import NoticeDetailModal from '@/components/notices/NoticeDetailModal.vue'
import { NOTICE_TYPE_OPTIONS, searchNotices } from '@/mocks/notices'

const PAGE_SIZE = 10
const keyword = ref('')
const selectedType = ref('ALL')
const currentPage = ref(1)
const showDetailModal = ref(false)
const selectedNotice = ref(null)

const notices = computed(() => searchNotices({ keyword: keyword.value, type: selectedType.value }))
const totalPages = computed(() => Math.max(1, Math.ceil(notices.value.length / PAGE_SIZE)))
const pagedNotices = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return notices.value.slice(start, start + PAGE_SIZE)
})

watch([keyword, selectedType], () => {
  currentPage.value = 1
})

watch(totalPages, (next) => {
  if (currentPage.value > next) currentPage.value = next
})

const openDetailModal = (notice) => {
  selectedNotice.value = notice
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedNotice.value = null
}
</script>

<style scoped>
.notice-page{max-width:1200px}
.breadcrumb{font-size:.78rem;color:var(--gray400);margin-bottom:4px}
.page-head{margin-top:12px;margin-bottom:12px;padding:16px}
.title-wrap h1{margin:0;font-size:1.5rem;color:var(--gray800)}
.search-row{margin-top:12px;display:flex;gap:8px}
.type-select,.keyword-input{
  height:34px;border:1px solid var(--gray200);border-radius:10px;background:#fff;
  color:var(--gray700);font-size:.85rem;padding:0 10px;
}
.keyword-input{width:260px}
.list-card{overflow:hidden}
.list-head,.list-row{
  display:grid;grid-template-columns:minmax(0,1.8fr) .7fr 1fr .8fr;
  align-items:center;gap:8px;padding:12px 16px;
}
.list-head{background:var(--gray50);border-bottom:1px solid var(--gray200);font-size:.8rem;font-weight:700;color:var(--gray500)}
.list-row{border-bottom:1px solid var(--gray100)}
.list-row:last-child{border-bottom:none}
.title-btn{
  border:none;background:transparent;text-align:left;font-size:.9rem;color:var(--gray700);font-weight:600;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.title-btn:hover{color:var(--primary-dark);text-decoration:underline}
.type-chip{
  display:inline-flex;align-items:center;justify-content:center;height:24px;padding:0 10px;
  border-radius:999px;background:#E0F2FE;color:#075985;font-size:.76rem;font-weight:700;
}
.empty{padding:48px 16px;text-align:center;color:var(--gray400);font-size:.9rem}
.pagination{
  display:flex;align-items:center;justify-content:center;gap:10px;
  padding:14px 16px;border-top:1px solid var(--gray100);
}
.page-btn{
  height:30px;padding:0 12px;border:1px solid var(--gray200);border-radius:8px;
  background:#fff;color:var(--gray600);font-size:.8rem;font-weight:600;
}
.page-btn:hover:not(:disabled){background:var(--gray50)}
.page-btn:disabled{opacity:.45;cursor:default}
.page-info{font-size:.82rem;color:var(--gray500)}
</style>
