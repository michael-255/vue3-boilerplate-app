import { DexieTable, TableField, TableOperation } from '@/constants/data-enums'
import { Example } from '@/models/Example'
import { ExampleRecord } from '@/models/ExampleRecord'
import { Log } from '@/models/Log'
import { DB } from '@/services/LocalDatabase'
import { reactive } from 'vue'
import { useFields } from './useFields'

export function useTableManager(table: DexieTable) {
  const { getFieldDisplayProperties, getFieldValidator, getFieldComponent } = useFields()

  // Setup initial table properties
  const initTM = {
    [DexieTable.EXAMPLES]: Example.getTableProperties(),
    [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getTableProperties(),
    [DexieTable.LOGS]: Log.getTableProperties(),
    [DexieTable.SETTINGS]: {},
  }[table]

  initTM.columns = initTM?.fields.map((field: TableField) => getFieldDisplayProperties(field))

  initTM.columnOptions = initTM?.columns.filter((i: any) => i.name !== TableField.ID)

  initTM.actions = {
    [DexieTable.EXAMPLES]: {
      getRows: async () => await DB.getAll(table),
      create: async (...args: any[]) => {
        console.log('create', args)
      },
    },
    [DexieTable.EXAMPLE_RECORDS]: {
      getRows: async () => await DB.getAll(table),
    },
    [DexieTable.LOGS]: {
      getRows: async () => await DB.getAll(table),
    },
    [DexieTable.SETTINGS]: {},
  }[table]

  /**
   * Table Manager is an object where the passed in Dexie table makes the selection.
   * @param name Dexie table name
   * @param relatedTable Name of related Dexie table
   * @param labelSingular Singular table label
   * @param labelPlural Plural table label
   * @param actions Database actions for this table
   * @param supportedOperations Supported table operations for this table
   * @param fields Names of all field properties for this table
   * @param columns Field properties for display and validation
   * @param columnOptions Selectable field properties (Select component)
   * @param visibleColumns Names of fields that are displayed by default
   */
  const tableManager: { [x: string]: any } = reactive(initTM)

  /**
   * Checking if a Table Action is supported by the current table.
   * @param tableOperation
   * @returns boolean
   */
  function isSupported(tableOperation: TableOperation): boolean {
    return tableManager.supportedOperations?.includes(tableOperation)
  }

  async function updateRows(): Promise<void> {
    tableManager.rows = await tableManager.actions?.getRows()
  }

  return {
    getFieldValidator, // Pass these through from useFields
    getFieldComponent, // Pass these through from useFields
    isSupported,
    updateRows,
    TM: tableManager,
  }
}
