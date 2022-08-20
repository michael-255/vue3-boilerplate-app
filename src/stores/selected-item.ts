import type { DataObject } from '@/constants/types-interfaces'
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

  actions: {
    setItem(item: DataObject): void {
      this.item = Object.assign(this.item, item)
    },
  },
})

export default useSelectedItemStore
