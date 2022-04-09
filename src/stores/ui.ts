import { defineStore } from 'pinia'

export const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
  }),

  actions: {
    toggleDrawer() {
      console.log('drawer toggle')
      this.drawer = !this.drawer
    },

    closeDrawer() {
      console.log('drawer close')
      this.drawer = false
    },

    openDrawer() {
      this.drawer = true
    },
  },
})
