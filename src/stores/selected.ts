import { defineStore, type StoreDefinition } from 'pinia'

export const useSelectedItemStore: StoreDefinition = defineStore({
  id: 'selected-item',

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
