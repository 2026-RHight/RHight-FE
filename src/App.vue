<template>
  <div id="app">
    <Headerbar :active-nav="activeNav" @nav-click="handleNavClick" />
    <div class="app-body">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
    <footer class="app-footer">© 2024 RHight</footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Headerbar from '@/components/layout/Headerbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

const router = useRouter()
const activeNav = ref('메인')

const handleNavClick = (nav) => {
  activeNav.value = nav
  if (nav === '메인') router.push('/')
  // 추후: 인사, 근태, 급여, 성과, 전자결재 라우트 추가
}
</script>
