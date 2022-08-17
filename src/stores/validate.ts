import { AppTable } from '@/constants/data-enums'
import { defineStore, type StoreDefinition } from 'pinia'

export const useValidateItemStore: StoreDefinition = defineStore({
  id: 'validate-item',

  /**
   * We assume that each field is valid by default since defaulted input values (Create) and
   * selected item values (Update) should always be valid.
   */
  state: () => ({
    id: true,
    createdDate: true,
    name: true,
    description: true,
    parentId: true,
    value: true,
    rounds: true,
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
        }[table]
      },
    isExampleValid: (state: any): boolean =>
      state.id && state.createdDate && state.name && state.description,
    isExampleRecordValid: (state: any): boolean =>
      state.id && state.createdDate && state.parentId && state.value,
  },
})
