import { defineStore, type StoreDefinition } from 'pinia'

const useReportStore: StoreDefinition = defineStore({
  id: 'report',

  state: () => ({
    options: null,
    data: null,
  }),
})

export default useReportStore
