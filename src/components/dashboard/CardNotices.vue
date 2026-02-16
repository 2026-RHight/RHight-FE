<template>
  <div class="card fade-up delay-3 notices-card">
    <div class="card-header">
      <h3>공지사항</h3>
      <button class="more-btn" type="button" @click="goList">더보기</button>
    </div>
    <div class="card-body card-body-fill">
      <div v-for="item in notices" :key="item.id" class="notice-item">
        <div class="notice-dot"></div>
        <button class="notice-title" type="button" @click="openDetail(item)">{{ item.title }}</button>
        <div class="notice-who">{{ item.department }} ({{ item.author }})</div>
        <div class="notice-date font-num">{{ item.createdAt }}</div>
      </div>
    </div>
  </div>

  <NoticeDetailModal :open="showDetailModal" :notice="selectedNotice" @close="closeDetail" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import NoticeDetailModal from '@/components/notices/NoticeDetailModal.vue'
import { getDashboardNotices } from '@/mocks/notices'

const router = useRouter()
const notices = computed(() => getDashboardNotices({ limit: 6 }))
const showDetailModal = ref(false)
const selectedNotice = ref(null)

const goList = () => router.push('/notices')
const openDetail = (notice) => {
  selectedNotice.value = notice
  showDetailModal.value = true
}
const closeDetail = () => {
  showDetailModal.value = false
  selectedNotice.value = null
}
</script>

<style scoped>
.notices-card{height:100%;display:flex;flex-direction:column}
.card-body-fill{flex:1}
.more-btn{
  border:none;background:transparent;color:var(--gray500);
  font-size:.8rem;font-weight:600;padding:4px 8px;border-radius:8px;
}
.more-btn:hover{background:var(--gray100);color:var(--gray700)}
.notice-item{
  display:flex;align-items:center;padding:13px 0;border-bottom:1px solid var(--gray100);gap:7px;
}
.notice-item:last-child{border-bottom:none}
.notice-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
.notice-dot{background:var(--blue)}
.notice-title{
  flex:1;border:none;background:transparent;text-align:left;
  font-size:0.88rem;color:var(--gray700);font-weight:500;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap
}
.notice-title:hover{color:var(--primary-dark);text-decoration:underline}
.notice-who,.notice-date{font-size:0.75rem;color:var(--gray400);white-space:nowrap}
</style>
