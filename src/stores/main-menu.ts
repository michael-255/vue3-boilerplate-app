import { defineStore, type StoreDefinition } from 'pinia'

const useMainMenuStore: StoreDefinition = defineStore({
  id: 'main-menu',

  state: () => ({
    drawer: false,
  }),
})

export default useMainMenuStore
