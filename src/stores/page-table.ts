import { Operation } from '@/constants/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

export const usePageTableStore: StoreDefinition = defineStore({
  id: 'page-table',

  state: () => ({
    dialog: false,
    operation: Operation.NO_OP,
    itemLabel: '',
  }),
})
