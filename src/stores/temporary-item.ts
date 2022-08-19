import { defineStore, type StoreDefinition } from 'pinia'

const useTemporaryItemStore: StoreDefinition = defineStore({
  id: 'temporary-item',

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

export default useTemporaryItemStore
