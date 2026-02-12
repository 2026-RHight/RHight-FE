<template>
  <div id="app">
    <template v-if="showLayout">
      <Headerbar :active-nav="activeNav" @nav-click="handleNavClick" />
      <div class="app-body">
        <Sidebar />
        <main class="main-content">
          <router-view />
        </main>
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Headerbar from '@/components/layout/Headerbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

const router = useRouter()
const route = useRoute()
const activeNav = ref('메인')

// 로그인 페이지에서는 레이아웃 숨기기
const showLayout = computed(() => route.path !== '/login')

const handleNavClick = (nav) => {
  console.log('Navigating to:', nav)
  activeNav.value = nav
  if (nav === '메인') router.push('/')
  else if (nav === '전자결재') router.push('/approval')
  else if (nav === '성과') router.push('/performance')
}
</script>