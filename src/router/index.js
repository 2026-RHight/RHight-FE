import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/approval',
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'approval-main', component: () => import('@/views/approval/ApprovalMain.vue') },
      { path: 'draft', name: 'approval-draft', component: () => import('@/views/approval/ApprovalDraft.vue') },
      { path: 'status', name: 'approval-status', component: () => import('@/views/approval/ApprovalStatus.vue') },
      {
        path: 'box',
        name: 'approval-box-container',
        children: [
          { path: '', name: 'approval-box', component: () => import('@/views/approval/ApprovalBox.vue') },
          { path: ':type', name: 'approval-box-list', component: () => import('@/views/approval/ApprovalBoxList.vue') }
        ]
      },
      { path: 'review', name: 'approval-review', component: () => import('@/views/approval/ApprovalReview.vue') }
    ]
  },
  {
    path: '/hr',
    name: 'hr',
    redirect: '/hr/my',
    meta: { requiresAuth: true }
  },
  {
    path: '/hr/my',
    name: 'mypage',
    component: () => import('@/views/hr/MyPage.vue'),
    meta: { requiresAuth: true, section: 'hr' }
  },
  {
    path: '/hr/org',
    name: 'hr-org',
    component: () => import('@/views/hr/OrgTeamView.vue'),
    meta: { requiresAuth: true, section: 'hr' }
  },
  {
    path: '/hr/orgchart',
    name: 'hr-orgchart',
    component: () => import('@/views/hr/OrgChartView.vue'),
    meta: { requiresAuth: true, section: 'hr' }
  },
  {
    path: '/hr/team-member/:employeeId/attendance',
    name: 'hr-member-attendance',
    component: () => import('@/views/hr/MemberAttendanceView.vue'),
    meta: { requiresAuth: true, section: 'hr' }
  },
  {
    path: '/hr/team-member/:employeeId/goal',
    name: 'hr-member-goal',
    component: () => import('@/views/hr/MemberGoalView.vue'),
    meta: { requiresAuth: true, section: 'hr' }
  },
  // 인사 상세 하위 경로가 아직 없을 때 빈 화면 대신 마이페이지로 안전 리다이렉트
  {
    path: '/hr/:pathMatch(.*)*',
    redirect: '/hr/my',
    meta: { requiresAuth: true }
  },
  {
    path: '/performance',
    name: 'performance',
    meta: { requiresAuth: true },
    component: () => import('@/components/performance/Performance.vue')
  },
  {
    path: '/attendance',
    name: 'attendance',
    redirect: '/attendance/my',
    component: () => import('@/views/attendance/AttendanceLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'my', component: () => import('@/views/attendance/AttendanceMain.vue') },
      { path: 'record', component: () => import('@/views/attendance/AttendanceRecord.vue') },
      { path: 'request', component: () => import('@/views/attendance/AttendanceMain.vue') }, // Placeholder
      { path: 'history', component: () => import('@/views/attendance/AttendanceHistory.vue') },
      { path: 'schedule', component: () => import('@/views/attendance/AttendanceSchedule.vue') },
    ]
  },
  {
    path: '/salary',
    name: 'salary',
    redirect: '/salary/my',
    component: () => import('@/views/salary/SalaryLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'my', component: () => import('@/views/salary/SalaryMain.vue') },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
