import { defineStore, type StoreDefinition } from 'pinia'

/**
 * @todo Typescript for the state?
 */
export const useUIStore: StoreDefinition = defineStore({
  id: 'ui',

  state: () => ({
    drawer: false,
  }),

  actions: {
    toggleDrawer(): void {
      this.drawer = !this.drawer
    },

    closeDrawer(): void {
      this.drawer = false
    },

    openDrawer(): void {
      this.drawer = true
    },
  },
})
