<template>
  <div class="performance-content">
    <PerformanceDashboard v-if="perfStore.activePage === 'dashboard'" />
    <PerformanceRegistration v-else-if="perfStore.activePage === 'registration'" />
  </div>
</template>

<script setup>
import { usePerformanceStore } from '@/store/performance'
import PerformanceDashboard from './PerformanceDashboard.vue'
import PerformanceRegistration from "./PerformanceRegistration.vue";

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
