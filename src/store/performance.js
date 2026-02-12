import { defineStore } from 'pinia'

export const usePerformanceStore = defineStore('performance', {
  state: () => ({
    activePage: 'dashboard',
    role: 'user',
  }),
  actions: {
    setPage(page) {
      this.activePage = page
    },
    toggleRole() {
      this.role = this.role === 'manager' ? 'user' : 'manager'
    },
  },
})
