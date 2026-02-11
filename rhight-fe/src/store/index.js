import { defineStore } from 'pinia'

// 추후 백엔드 연결 시 실제 데이터로 교체
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      name: 'Steve',
      position: '매니저',
      team: '전략 기획팀',
      profileImage: null,
    },
    isLoggedIn: true,
  }),
  actions: {
    // login, logout 등 추후 구현
  }
})
