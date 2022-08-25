import { Operation } from '@/constants/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Tracks state for the PageTable components.
 */
const usePageTableStore: StoreDefinition = defineStore({
  id: 'page-table',

  state: () => ({
    dialog: false,
    operation: Operation.NOOP,
    itemLabel: '',
    rows: [],
    columns: [],
    columnOptions: [],
    visibleColumns: [],
  }),
})

export default usePageTableStore
