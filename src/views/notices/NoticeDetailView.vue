<template>
  <div class="notice-page">
    <div class="breadcrumb">메인 / 공지사항 / 상세</div>

    <section v-if="notice" class="card detail-card fade-up">
      <header class="detail-head">
        <h1>{{ notice.title }}</h1>
        <div class="meta-row">
          <span>생성일자: <strong class="font-num">{{ notice.createdAt }}</strong></span>
          <span>작성 부서(작성자): <strong>{{ notice.department }} ({{ notice.author }})</strong></span>
          <span>공지사항 유형: <strong>{{ notice.typeLabel }}</strong></span>
        </div>
      </header>

      <div class="detail-body">
        <p>{{ notice.content }}</p>
      </div>

      <footer class="detail-foot">
        <button type="button" class="back-btn" @click="goList">목록으로</button>
      </footer>
    </section>

    <section v-else class="card not-found fade-up">
      <p>존재하지 않는 공지사항입니다.</p>
      <button type="button" class="back-btn" @click="goList">목록으로</button>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getNoticeById } from '@/mocks/notices'

const route = useRoute()
const router = useRouter()

const notice = computed(() => getNoticeById(route.params.noticeId))

const goList = () => {
  router.push('/notices')
}
</script>

<style scoped>
.notice-page{max-width:1080px}
.breadcrumb{font-size:.78rem;color:var(--gray400);margin-bottom:12px}
.detail-card{overflow:hidden}
.detail-head{padding:20px 24px;border-bottom:1px solid var(--gray200);background:var(--gray50)}
.detail-head h1{margin:0 0 12px;font-size:1.35rem;color:var(--gray800)}
.meta-row{display:flex;flex-wrap:wrap;gap:14px;font-size:.84rem;color:var(--gray500)}
.meta-row strong{color:var(--gray700);font-weight:700}
.detail-body{padding:28px 24px;min-height:260px;color:var(--gray700);line-height:1.7;white-space:pre-line}
.detail-foot{border-top:1px solid var(--gray100);padding:14px 24px;display:flex;justify-content:flex-end}
.back-btn{
  height:34px;border-radius:10px;border:1px solid var(--gray200);background:#fff;
  color:var(--gray600);padding:0 12px;font-size:.83rem;font-weight:700;
}
.back-btn:hover{background:var(--gray50)}
.not-found{min-height:220px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px}
</style>
