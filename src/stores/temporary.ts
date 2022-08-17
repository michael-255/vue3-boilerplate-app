import { defineStore, type StoreDefinition } from 'pinia'

export const useTemporaryItemStore: StoreDefinition = defineStore({
  id: 'temporary-item',

  state: () => ({
    item: {
      id: null,
      createdDate: null,
      name: null,
      description: null,
      parentId: null,
      value: null,
      rounds: null,
    },
  }),

  actions: {},
})
