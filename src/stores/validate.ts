import { AppTable } from '@/constants/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

export const useValidateItemStore: StoreDefinition = defineStore({
  id: 'validate-item',

  /**
   * We assume that each field is valid by default since defaulted input values (Create) and
   * selected item values (Update) should always be valid.
   */
  state: () => ({
    item: {
      id: null,
      createdDate: null,
      name: null,
      description: null,
      parentId: true, // @todo - async setup with Suspense
      number: null,
      rounds: null,
    },
  }),

  actions: {},
  getters: {
    /**
     * @todo
     */
    tableItem:
      (state: any) =>
      (table: AppTable): boolean => {
        return {
          [AppTable.EXAMPLES]: state.isExampleValid,
          [AppTable.EXAMPLE_RECORDS]: state.isExampleRecordValid,
          [AppTable.LOGS]: false,
          [AppTable.SETTINGS]: false,
        }[table]
      },
    isExampleValid: (state: any): boolean =>
      state.item.id && state.item.createdDate && state.item.name && state.item.description,
    isExampleRecordValid: (state: any): boolean =>
      state.item.id && state.item.createdDate && state.item.parentId && state.item.value,
  },
})
