import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainView.vue')
  },
  // 추후 추가 예정
  // { path: '/hr/my', name: 'mypage', component: () => import('@/views/my/MyPage.vue') },
  // { path: '/hr/org', name: 'org', component: () => import('@/views/org/TeamOrg.vue') },
  // { path: '/hr/notice', name: 'notice', component: () => import('@/views/notice/NoticeList.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
