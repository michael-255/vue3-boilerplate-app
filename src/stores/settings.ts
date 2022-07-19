import { defineStore } from 'pinia'

/**
 * @todo Typescript for the state?
 */
export const useSettingsStore = defineStore({
  id: 'settings',

  state: () => ({
    DEBUG: true,
    NOTIFY: true,
  }),

  actions: {
    setDEBUG(bool: boolean): void {
      // DB fetch?
      this.DEBUG = !!bool
    },

    setNOTIFY(bool: boolean): void {
      // DB fetch?
      this.NOTIFY = !!bool
    },
  },
})
