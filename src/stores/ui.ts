import { Operation } from '@/constants/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

export const useUIStore: StoreDefinition = defineStore({
  id: 'ui',

  state: () => ({
    mainMenu: false,
    pageTable: {
      dialog: false,
      operation: Operation.NO_OP,
      itemLabel: '',
    },
  }),

  actions: {
    toggleMainMenu(): void {
      this.mainMenu = !this.mainMenu
    },
  },
})
