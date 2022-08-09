import { DexieTable, TableField, TableOperation } from '@/constants/data-enums'
import { DB } from '@/services/LocalDatabase'
import { reactive } from 'vue'
import { useFields } from './useFields'

export function useTableManager(table: DexieTable) {
  const { getFieldDisplayProperties, getFieldValidator, getFieldComponent } = useFields()

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
  const tableManager: { [x: string]: any } = reactive(
    {
      [DexieTable.EXAMPLES]: {
        name: DexieTable.EXAMPLES,
        relatedTable: DexieTable.EXAMPLE_RECORDS,
        labelSingular: 'Example',
        labelPlural: 'Examples',
        actions: {
          getRows: async () => await DB.getAll(table),
        },
        supportedOperations: [
          TableOperation.CREATE,
          TableOperation.UPDATE,
          TableOperation.DELETE,
          TableOperation.CLEAR,
          TableOperation.INSPECT,
          TableOperation.REPORT,
        ],
        fields: [TableField.ID, TableField.CREATED_DATE, TableField.NAME, TableField.DESCRIPTION],
        rows: [],
        columns: [],
        columnOptions: [],
        visibleColumns: [TableField.CREATED_DATE], // @todo
      },
      [DexieTable.EXAMPLE_RECORDS]: {
        name: DexieTable.EXAMPLE_RECORDS,
        relatedTable: DexieTable.EXAMPLES,
        labelSingular: 'Example Record',
        labelPlural: 'Example Records',
        actions: {
          getRows: async () => await DB.getAll(table),
        },
        supportedOperations: [
          TableOperation.CREATE,
          TableOperation.UPDATE,
          TableOperation.DELETE,
          TableOperation.CLEAR,
          TableOperation.INSPECT,
        ],
        fields: [TableField.ID, TableField.CREATED_DATE, TableField.PARENT_ID, TableField.VALUE],
        rows: [],
        columns: [],
        columnOptions: [],
        visibleColumns: [TableField.CREATED_DATE], // @todo
      },
      [DexieTable.LOGS]: {
        name: DexieTable.LOGS,
        relatedTable: null,
        labelSingular: 'Log',
        labelPlural: 'Logs',
        actions: {
          getRows: async () => await DB.getAll(table),
        },
        supportedOperations: [TableOperation.DELETE, TableOperation.CLEAR, TableOperation.INSPECT],
        fields: [
          TableField.ID,
          TableField.CREATED_DATE,
          TableField.SEVERITY,
          TableField.CALLER_DETAILS,
          TableField.ERROR_NAME,
          TableField.MESSAGE,
          TableField.STACK,
        ],
        rows: [],
        columns: [],
        columnOptions: [],
        visibleColumns: [
          TableField.CREATED_DATE,
          TableField.SEVERITY,
          TableField.CALLER_DETAILS,
          TableField.ERROR_NAME,
        ],
      },
    }[table as string] || {} // As string so table without a value will return {}
  )

  // Some required PRE operations to fully setup table manager
  tableManager.columns = getTableColumns()
  tableManager.columnOptions = getTableColumns().filter((i: any) => i.name !== TableField.ID)

  /**
   * Get the field column display properties for a Dexie table.
   * @returns Array of field column display properties
   */
  function getTableColumns(): { [x: string]: any }[] {
    return tableManager.fields.map((field: TableField) => getFieldDisplayProperties(field))
  }

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
