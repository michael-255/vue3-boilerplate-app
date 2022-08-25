import { defineStore, type StoreDefinition } from 'pinia'

/**
 * PageTable in temporary progress item used for creates and updates.
 */
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
      primaryRounds: null,
      secondaryRounds: null,
    },
  }),
})

export default useTemporaryItemStore
