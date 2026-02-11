import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue'),
        meta: { requiresAuth: false }  // 로그인 페이지는 인증 불필요
    },
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/MainView.vue'),
        meta: { requiresAuth: true }
    },
    // 추후 추가 페이지들도 meta: { requiresAuth: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// ── 네비게이션 가드 ──
router.beforeEach((to, from, next) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

    if (to.meta.requiresAuth && !isLoggedIn) {
        // 로그인 필요한 페이지인데 로그인 안 됨 → 로그인으로
        next('/login')
    } else if (to.path === '/login' && isLoggedIn) {
        // 이미 로그인했는데 로그인 페이지 접근 → 메인으로
        next('/')
    } else {
        next()
    }
})

export default router