import type { ColumnProps, DataObject, TableActions } from '@/constants/types-interfaces'
import { DexieTable, Field, Operation } from '@/constants/data-enums'
import { Example } from '@/models/Example'
import { ExampleRecord } from '@/models/ExampleRecord'
import { Log } from '@/models/Log'
import { DB } from '@/services/LocalDatabase'
import { isoToDisplayDate } from '@/utils/luxon'

/**
 * Composable with functions for working with data tables.
 */
export function useTable(): { [x: string]: any } {
  /**
   * Gets an array of the fields used by the table.
   * @param table
   */
  function getFields(table: DexieTable): Field[] {
    return {
      [DexieTable.EXAMPLES]: Example.getFields(),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getFields(),
      [DexieTable.LOGS]: Log.getFields(),
      [DexieTable.SETTINGS]: [],
    }[table]
  }

  /**
   * Gets the table that is related to the current table (Examples -> Example Records)
   * @param table
   */
  function getRelatedTable(table: DexieTable): DexieTable | null {
    return {
      [DexieTable.EXAMPLES]: Example.getRelatedTable(),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getRelatedTable(),
      [DexieTable.LOGS]: Log.getRelatedTable(),
      [DexieTable.SETTINGS]: null,
    }[table]
  }

  /**
   * Gets the singular label for the table (Example).
   * @param table
   */
  function getSingularLabel(table: DexieTable): string {
    return {
      [DexieTable.EXAMPLES]: Example.getSingularLabel(),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getSingularLabel(),
      [DexieTable.LOGS]: Log.getSingularLabel(),
      [DexieTable.SETTINGS]: '',
    }[table]
  }

  /**
   * Gets the plural label for the table (Examples).
   * @param table
   */
  function getPluralLabel(table: DexieTable): string {
    return {
      [DexieTable.EXAMPLES]: Example.getPluralLabel(),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getPluralLabel(),
      [DexieTable.LOGS]: Log.getPluralLabel(),
      [DexieTable.SETTINGS]: '',
    }[table]
  }

  /**
   * Gets an array of Operations that are supported by this table.
   * @param table
   */
  function getSupportedOperations(table: DexieTable): Operation[] {
    return {
      [DexieTable.EXAMPLES]: Example.getSupportedOperations(),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getSupportedOperations(),
      [DexieTable.LOGS]: Log.getSupportedOperations(),
      [DexieTable.SETTINGS]: [],
    }[table]
  }

  /**
   * Gets an array of columns that are visible by default for the select box for this table.
   * @param table
   */
  function getVisibleColumns(table: DexieTable): Field[] {
    return {
      [DexieTable.EXAMPLES]: Example.getVisibleColumns(),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getVisibleColumns(),
      [DexieTable.LOGS]: Log.getVisibleColumns(),
      [DexieTable.SETTINGS]: [],
    }[table]
  }

  /**
   * Gets an array of the column properties needed for QTables for this table.
   * @param table
   */
  function getColumns(table: DexieTable): ColumnProps[] {
    return {
      [DexieTable.EXAMPLES]: Example.getColumns(),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getColumns(),
      [DexieTable.LOGS]: Log.getColumns(),
      [DexieTable.SETTINGS]: [],
    }[table]
  }

  /**
   * Gets an array of the column option properties needed for QTables for this table.
   * @param table
   */
  function getColumnOptions(table: DexieTable): ColumnProps[] {
    return {
      [DexieTable.EXAMPLES]: Example.getColumnOptions(),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getColumnOptions(),
      [DexieTable.LOGS]: Log.getColumnOptions(),
      [DexieTable.SETTINGS]: [],
    }[table]
  }

  /**
   * Gets an object that contains the actions that can be performed on this table.
   * @param table
   * @returns
   */
  function getActions(table: DexieTable): TableActions {
    return {
      [DexieTable.EXAMPLES]: {
        getRows: async () => await DB.getAll(table),
        createRow: async (data: DataObject) => {
          await DB.add(
            DexieTable.EXAMPLES,
            new Example({
              id: data.id,
              createdDate: data.createdDate,
              name: data.name,
              description: data.description,
            })
          )
        },
        updateRow: async (data: DataObject) => {
          await DB.updateById(DexieTable.EXAMPLES, data.originalId, {
            id: data.id,
            createdDate: data.createdDate,
            name: data.name,
            description: data.description,
          })
        },
        generateReport: async (id: string) => {
          const records: ExampleRecord[] = await DB.getRecordsByParentId(
            DexieTable.EXAMPLE_RECORDS,
            id
          )
          const labels = records.map(() => '')
          const data = records.map((r: ExampleRecord) => r.value)
          const firstDate = isoToDisplayDate(records[0]?.createdDate)
          const lastDate = isoToDisplayDate(records[records.length - 1]?.createdDate)
          return { firstDate, lastDate, labels, data }
        },
      },
      [DexieTable.EXAMPLE_RECORDS]: {
        getRows: async () => await DB.getAll(table),
        createRow: async (data: DataObject) => {
          await DB.add(
            DexieTable.EXAMPLE_RECORDS,
            new ExampleRecord({
              id: data.id,
              createdDate: data.createdDate,
              parentId: data.parentId,
              value: data.value,
            })
          )
        },
        updateRow: async (data: DataObject) => {
          await DB.updateById(DexieTable.EXAMPLE_RECORDS, data.originalId, {
            id: data.id,
            createdDate: data.createdDate,
            parentId: data.parentId,
            value: data.value,
          })
        },
      },
      [DexieTable.LOGS]: {
        getRows: async () => await DB.getAll(table),
      },
      [DexieTable.SETTINGS]: {},
    }[table]
  }

  /**
   * Check table operation to see if it is supported.
   * @param table
   * @param operation
   * @returns boolean
   */
  function isSupported(table: DexieTable, operation: Operation): boolean {
    return {
      [DexieTable.EXAMPLES]: Example.getSupportedOperations()?.includes(operation),
      [DexieTable.EXAMPLE_RECORDS]: ExampleRecord.getSupportedOperations()?.includes(operation),
      [DexieTable.LOGS]: Log.getSupportedOperations()?.includes(operation),
      [DexieTable.SETTINGS]: false,
    }[table]
  }

  return {
    getFields,
    getRelatedTable,
    getSingularLabel,
    getPluralLabel,
    getSupportedOperations,
    getVisibleColumns,
    getColumns,
    getColumnOptions,
    getActions,
    isSupported,
  }
}
