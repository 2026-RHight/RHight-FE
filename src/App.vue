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
      <footer class="app-footer">© 2024 RHight</footer>
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
  if (nav === '인사') router.push('/hr')
  if (nav === '전자결재') router.push('/approval')
}
</script>
