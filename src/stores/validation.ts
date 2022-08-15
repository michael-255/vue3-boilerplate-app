import { defineStore, type StoreDefinition } from 'pinia'

export const useValidationStore: StoreDefinition = defineStore({
  id: 'validation',

  state: () => ({
    valid: false,
  }),

  actions: {},
})
