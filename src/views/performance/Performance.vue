<template>
  <div class="performance-content">
    <PerformanceDashboard v-if="perfStore.activePage === 'dashboard'" />
    <ManagerApprovalList v-else-if="perfStore.activePage === 'approval-list'" />
    <TeamEvaluation v-else-if="perfStore.activePage === 'team-evaluation'" />
    <PerformanceRegistration v-else-if="perfStore.activePage === 'registration'" />
    <PerformanceInquiry v-else-if="perfStore.activePage === 'inquiry'" />
    <PerformanceMonthly v-else-if="perfStore.activePage === 'monthly'" />
    <PeerReview v-else-if="perfStore.activePage === 'peer-review'" />
    <TeamStats v-else-if="perfStore.activePage === 'team-stats'" />
  </div>
</template>

<script setup>
import { usePerformanceStore } from '@/store/performance'
import PerformanceDashboard from './PerformanceDashboard.vue'
import ManagerApprovalList from './ManagerApprovalList.vue'
import TeamEvaluation from './TeamEvaluation.vue'
import PerformanceRegistration from "./PerformanceRegistration.vue";
import PerformanceInquiry from './PerformanceInquiry.vue'
import PerformanceMonthly from './PerformanceMonthly.vue'
import PeerReview from './PeerReview.vue'
import TeamStats from './TeamStats.vue'


const perfStore = usePerformanceStore()
</script>

<style scoped>
.performance-content {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
