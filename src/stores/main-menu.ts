import { defineStore, type StoreDefinition } from 'pinia'

/**
 * Currently only tracks the side menu drawer state.
 */
const useMainMenuStore: StoreDefinition = defineStore({
  id: 'main-menu',

  state: () => ({
    drawer: false,
  }),
})

export default useMainMenuStore
