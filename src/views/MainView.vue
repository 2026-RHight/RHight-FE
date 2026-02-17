<template>
  <div class="dashboard">
    <!-- ═══ TOP ROW ═══ -->
    <div class="top-row">
      <!-- 왼쪽: 프로필 + 연차 현황 (세로 쌓기) -->
      <div class="col-left">
        <CardProfile />
        <CardAnnual />
      </div>
      <!-- 가운데: 전자결재 -->
      <div class="col-mid">
        <CardApprovals />
      </div>
      <!-- 오른쪽: 공지사항 -->
      <div class="col-right">
        <CardNotices />
      </div>
    </div>

    <!-- ═══ BOTTOM ROW: 3칸 (근무시간 | 팀기념일 | TODO) ═══ -->
    <div class="bottom-row">
      <div class="col-bottom">
        <CardWorktime />
      </div>
      <div class="col-bottom">
        <CardTeamAnniversary />
      </div>
      <div class="col-bottom">
        <CardTodo />
      </div>
    </div>

  </div>
</template>

<script setup>
import CardProfile from '@/components/dashboard/CardProfile.vue'
import CardApprovals from '@/components/dashboard/CardApprovals.vue'
import CardNotices from '@/components/dashboard/CardNotices.vue'
import CardAnnual from '@/components/dashboard/CardAnnual.vue'
import CardWorktime from '@/components/dashboard/CardWorktime.vue'
import CardTeamAnniversary from '@/components/dashboard/CardTeamAnniversary.vue'
import CardTodo from '@/components/dashboard/CardTodo.vue'
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Top row: 3 columns */
.top-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  align-items: stretch;
}

/* 왼쪽 열: 프로필 + 연차 세로 쌓기 */
.col-left {
  flex: 0 0 240px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 가운데: 전자결재 */
.col-mid {
  flex: 1.2 1 0;
  min-width: 0;
}

/* 오른쪽: 공지사항 */
.col-right {
  flex: 1.3 1 0;
  min-width: 0;
}

/* Bottom row: 3 columns */
.bottom-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  align-items: stretch;
}

.col-bottom {
  flex: 1 1 0;
  min-width: 0;
}
.col-bottom :deep(.card) {
  min-height: 310px;
  display: flex;
  flex-direction: column;
}
.col-bottom :deep(.card-body) {
  flex: 1;
}
</style>
