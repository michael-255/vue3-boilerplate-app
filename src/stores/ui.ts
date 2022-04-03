import { defineStore } from 'pinia'

export const useUIStore = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
  }),

  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },

    closeDrawer() {
      this.drawer = false
    },

    openDrawer() {
      this.drawer = true
    },
  },
})
