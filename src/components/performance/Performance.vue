<template>
  <div class="performance-content">
    <PerformanceDashboard v-if="perfStore.activePage === 'dashboard'" />
    <PerformanceRegistration v-else-if="perfStore.activePage === 'registration'" />
    <PerformanceInquiry v-else-if="perfStore.activePage === 'inquiry'" />
    <PerformanceMonthly v-else-if="perfStore.activePage === 'monthly'" />
    <PeerReview v-else-if="perfStore.activePage === 'peer-review'" />
  </div>
</template>

<script setup>
import { usePerformanceStore } from '@/store/performance'
import PerformanceDashboard from './PerformanceDashboard.vue'
import PerformanceRegistration from "./PerformanceRegistration.vue";
import PerformanceInquiry from "@/components/performance/PerformanceInquiry.vue";
import PerformanceMonthly from "@/components/performance/PerformanceMonthly.vue";
import PeerReview from "@/components/performance/PeerReview.vue";


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
