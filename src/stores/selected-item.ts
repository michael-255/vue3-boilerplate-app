import { defineStore, type StoreDefinition } from 'pinia'

const useSelectedItemStore: StoreDefinition = defineStore({
  id: 'selected-item',

  state: () => ({
    item: {
      id: null,
      createdDate: null,
      name: null,
      description: null,
      parentId: null,
      number: null,
      rounds: null,
    },
  }),
})

export default useSelectedItemStore
