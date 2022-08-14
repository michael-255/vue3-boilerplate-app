import type { ColumnProps, DataObject, TableActions } from '@/constants/types-interfaces'
import { AppTable, Field, Operation } from '@/constants/data-enums'
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
  function getFields(table: AppTable): Field[] {
    return {
      [AppTable.EXAMPLES]: Example.getFields(),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getFields(),
      [AppTable.LOGS]: Log.getFields(),
    }[table]
  }

  /**
   * Gets the table that is related to the current table (Examples -> Example Records)
   * @param table
   */
  function getRelatedTable(table: AppTable): AppTable | null {
    return {
      [AppTable.EXAMPLES]: Example.getRelatedTable(),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getRelatedTable(),
      [AppTable.LOGS]: Log.getRelatedTable(),
    }[table]
  }

  /**
   * Gets the singular label for the table (Example).
   * @param table
   */
  function getSingularLabel(table: AppTable): string {
    return {
      [AppTable.EXAMPLES]: Example.getSingularLabel(),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getSingularLabel(),
      [AppTable.LOGS]: Log.getSingularLabel(),
    }[table]
  }

  /**
   * Gets the plural label for the table (Examples).
   * @param table
   */
  function getPluralLabel(table: AppTable): string {
    return {
      [AppTable.EXAMPLES]: Example.getPluralLabel(),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getPluralLabel(),
      [AppTable.LOGS]: Log.getPluralLabel(),
    }[table]
  }

  /**
   * Gets an array of Operations that are supported by this table.
   * @param table
   */
  function getSupportedOperations(table: AppTable): Operation[] {
    return {
      [AppTable.EXAMPLES]: Example.getSupportedOperations(),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getSupportedOperations(),
      [AppTable.LOGS]: Log.getSupportedOperations(),
    }[table]
  }

  /**
   * Gets an array of columns that are visible by default for the select box for this table.
   * @param table
   */
  function getVisibleColumns(table: AppTable): Field[] {
    return {
      [AppTable.EXAMPLES]: Example.getVisibleColumns(),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getVisibleColumns(),
      [AppTable.LOGS]: Log.getVisibleColumns(),
    }[table]
  }

  /**
   * Gets an array of the column properties needed for QTables for this table.
   * @param table
   */
  function getColumns(table: AppTable): ColumnProps[] {
    return {
      [AppTable.EXAMPLES]: Example.getColumns(),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getColumns(),
      [AppTable.LOGS]: Log.getColumns(),
    }[table]
  }

  /**
   * Gets an array of the column option properties needed for QTables for this table.
   * @param table
   */
  function getColumnOptions(table: AppTable): ColumnProps[] {
    return {
      [AppTable.EXAMPLES]: Example.getColumnOptions(),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getColumnOptions(),
      [AppTable.LOGS]: Log.getColumnOptions(),
    }[table]
  }

  /**
   * Gets an object that contains the actions that can be performed on this table.
   * @param table
   * @returns
   */
  function getActions(table: AppTable): TableActions {
    return {
      [AppTable.EXAMPLES]: {
        getRows: async () => await DB.getAll(table),
        createRow: async (data: DataObject) => {
          await DB.add(
            AppTable.EXAMPLES,
            new Example({
              id: data.id,
              createdDate: data.createdDate,
              name: data.name,
              description: data.description,
            })
          )
        },
        updateRow: async (data: DataObject) => {
          await DB.updateById(AppTable.EXAMPLES, data.originalId, {
            id: data.id,
            createdDate: data.createdDate,
            name: data.name,
            description: data.description,
          })
        },
        generateReport: async (id: string) => {
          const records: ExampleRecord[] = await DB.getByParentId(AppTable.EXAMPLE_RECORDS, id)
          const labels = records.map(() => '')
          const data = records.map((r: ExampleRecord) => r.value)
          const firstDate = isoToDisplayDate(records[0]?.createdDate)
          const lastDate = isoToDisplayDate(records[records.length - 1]?.createdDate)
          return { firstDate, lastDate, labels, data }
        },
      },
      [AppTable.EXAMPLE_RECORDS]: {
        getRows: async () => await DB.getAll(table),
        createRow: async (data: DataObject) => {
          await DB.add(
            AppTable.EXAMPLE_RECORDS,
            new ExampleRecord({
              id: data.id,
              createdDate: data.createdDate,
              parentId: data.parentId,
              value: data.value,
            })
          )
        },
        updateRow: async (data: DataObject) => {
          await DB.updateById(AppTable.EXAMPLE_RECORDS, data.originalId, {
            id: data.id,
            createdDate: data.createdDate,
            parentId: data.parentId,
            value: data.value,
          })
        },
      },
      [AppTable.LOGS]: {
        getRows: async () => await DB.getAll(table),
      },
    }[table]
  }

  /**
   * Check table operation to see if it is supported.
   * @param table
   * @param operation
   * @returns boolean
   */
  function isSupported(table: AppTable, operation: Operation): boolean {
    return {
      [AppTable.EXAMPLES]: Example.getSupportedOperations()?.includes(operation),
      [AppTable.EXAMPLE_RECORDS]: ExampleRecord.getSupportedOperations()?.includes(operation),
      [AppTable.LOGS]: Log.getSupportedOperations()?.includes(operation),
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
