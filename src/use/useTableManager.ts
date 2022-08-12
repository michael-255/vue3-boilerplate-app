import { DexieTable, TableField, TableOperation } from '@/constants/data-enums'
import { Example } from '@/models/Example'
import { ExampleRecord } from '@/models/ExampleRecord'
import { Log } from '@/models/Log'
import { DB } from '@/services/LocalDatabase'
import { reactive } from 'vue'
import { useFields } from './useFields'

export function useTableManager(table: DexieTable) {
  const { getFieldDisplayProperties, getFieldValidator, getFieldComponent } = useFields()

  // Setup initial table properties from the app models
  const initTM = {
    [DexieTable.EXAMPLES]: Example.getTableProperties(),
    [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getTableProperties(),
    [DexieTable.LOGS]: Log.getTableProperties(),
    [DexieTable.SETTINGS]: {},
  }[table]
  // Setup field display column properties for tables
  initTM.columns = initTM?.fields.map((field: TableField) => getFieldDisplayProperties(field))
  // Setup which columns can be controled by the column selector in table views (just no id)
  initTM.columnOptions = initTM?.columns.filter((i: any) => i.name !== TableField.ID)
  // Setup actions for each table type
  initTM.actions = {
    [DexieTable.EXAMPLES]: {
      getRows: async () => await DB.getAll(table),
      create: async (fields: { [x: string]: any }) => {
        const example = new Example({
          id: fields.id,
          createdDate: fields.createdDate,
          name: fields.name,
          description: fields.description,
        })
        await DB.add(DexieTable.EXAMPLES, example)
      },
      update: async (fields: { [x: string]: any }) => {
        const updateObject = {
          id: fields.id,
          createdDate: fields.createdDate,
          name: fields.name,
          description: fields.description,
        }
        await DB.updateById(DexieTable.EXAMPLES, fields.originalId, updateObject)
      },
      report: async (fields: { [x: string]: any }) => {
        console.log(fields)
      },
    },
    [DexieTable.EXAMPLE_RECORDS]: {
      getRows: async () => await DB.getAll(table),
      create: async (fields: { [x: string]: any }) => {
        const exampleRecord = new ExampleRecord({
          id: fields.id,
          createdDate: fields.createdDate,
          parentId: fields.parentId,
          value: fields.value,
        })
        await DB.add(DexieTable.EXAMPLE_RECORDS, exampleRecord)
      },
      update: async (fields: { [x: string]: any }) => {
        const updateObject = {
          id: fields.id,
          createdDate: fields.createdDate,
          parentId: fields.parentId,
          value: fields.value,
        }
        await DB.updateById(DexieTable.EXAMPLE_RECORDS, fields.originalId, updateObject)
      },
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

  /**
   * Call to update the current table rows for table views.
   */
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
