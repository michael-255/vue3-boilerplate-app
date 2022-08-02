import { DexieTable, TableField, TableAction } from '@/constants/data-enums'
import { db } from '@/services/LocalDatabase'
import { DateTime } from 'luxon'
import { truncateString } from '@/utils/common'
import {
  isRequired,
  isIdValid,
  isRequiredDateValid,
  isShortTextValid,
  isTextValid,
  isOptionalNumber,
} from '@/utils/validators'
import { defineAsyncComponent } from 'vue'

export function useTableManager(table: DexieTable) {
  /**
   * Table Manager is an object where the passed in Dexie table makes the selection.
   * @param name Dexie table name
   * @param relatedTable Name of a related Dexie table (like a records table)
   * @param label Table label function (singular or plural)
   * @param actions Supported actions for this table
   * @param fields Names of all field properties for this table
   * @param rows Async function that returns all data from the DB for this table
   * @param columns Field properties for display and validation
   * @param columnOptions Selectable field properties (Select component)
   * @param visibleColumns Names of fields that are displayed by default
   */
  const tableManager: { [x: string]: any } =
    {
      [DexieTable.EXAMPLES]: {
        name: DexieTable.EXAMPLES,
        relatedTable: DexieTable.EXAMPLE_RECORDS,
        label: tableLabels('Example', 'Examples'),
        actions: {}, // @todo
        supportedActions: [
          TableAction.CREATE,
          TableAction.UPDATE,
          TableAction.DELETE,
          TableAction.CLEAR,
          TableAction.INSPECT,
          TableAction.REPORT,
        ],
        fields: getTableFields(table),
        rows: async () => await db.getAll(table),
        columns: getTableColumns(table),
        columnOptions: getTableColumns(table).filter((i: any) => i.name !== TableField.ID),
        visibleColumns: [], // @todo
      },
      [DexieTable.EXAMPLE_RECORDS]: {
        name: DexieTable.EXAMPLE_RECORDS,
        relatedTable: DexieTable.EXAMPLES,
        label: tableLabels('Example Record', 'Example Record'),
        actions: {}, // @todo
        supportedActions: [
          TableAction.CREATE,
          TableAction.UPDATE,
          TableAction.DELETE,
          TableAction.CLEAR,
          TableAction.INSPECT,
          TableAction.REPORT,
        ],
        fields: getTableFields(table),
        rows: async () => await db.getAll(table),
        columns: getTableColumns(table),
        columnOptions: getTableColumns(table).filter((i: any) => i.name !== TableField.ID),
        visibleColumns: [], // @todo
      },
      [DexieTable.LOGS]: {
        name: DexieTable.LOGS,
        relatedTable: null,
        label: tableLabels('Log', 'Logs'),
        actions: {},
        supportedActions: [TableAction.DELETE, TableAction.CLEAR, TableAction.INSPECT],
        fields: getTableFields(table),
        rows: async () => await db.getAll(table),
        columns: getTableColumns(table),
        columnOptions: getTableColumns(table).filter((i: any) => i.name !== TableField.ID),
        visibleColumns: [TableField.SEVERITY, TableField.CALLER_DETAILS, TableField.ERROR_NAME],
      },
    }[table as string] || {} // Selecting table as string so I can ignore uneeded tables (like settings)

  //
  // Internal table manager functions
  //

  function fieldProperties(field: TableField) {
    return {
      [TableField.ID]: {
        component: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
        name: TableField.ID,
        label: 'Id',
        align: 'left',
        sortable: true,
        required: true,
        field: (row: any) => row.id,
        format: (val: string) => val,
        validator: (val: string) => isIdValid(val),
      },
      [TableField.CREATED_DATE]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.CREATED_DATE,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.createdDate,
        format: (val: string) => DateTime.fromISO(val).toFormat('ccc LLL d yyyy ttt'),
        validator: (val: string) => isRequiredDateValid(val),
      },
      [TableField.NAME]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.NAME,
        label: 'Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.name,
        format: (val: string) => truncateString(val),
        validator: (val: string) => isShortTextValid(val),
      },
      [TableField.DESCRIPTION]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.DESCRIPTION,
        label: 'Description',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.description,
        format: (val: string) => truncateString(val),
        validator: (val: string) => isTextValid(val),
      },
      [TableField.NOTES]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.NOTES,
        label: 'Notes',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => truncateString(val),
        validator: (val: string) => isTextValid(val),
      },
      [TableField.VALUE]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.VALUE,
        label: 'Value',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.value,
        format: (val: number) => val,
        validator: (val: number | undefined) => isOptionalNumber(val),
      },
      [TableField.SEVERITY]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.SEVERITY,
        label: 'Severity',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.severity,
        format: (val: string) => val,
        validator: (val: string) => isRequired(val),
      },
      [TableField.CALLER_DETAILS]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.CALLER_DETAILS,
        label: 'Caller Details',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.callerDetails,
        format: (val: string) => truncateString(val),
        validator: (val: string) => isRequired(val),
      },
      [TableField.ERROR_NAME]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.ERROR_NAME,
        label: 'Error Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.errorName,
        format: (val: string) => truncateString(val),
        validator: () => true,
      },
      [TableField.MESSAGE]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.MESSAGE,
        label: 'Messages',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.message,
        format: (val: string) => truncateString(val),
        validator: () => true,
      },
      [TableField.STACK]: {
        component: () => import('@/components/inputs/IdInput.vue'),
        name: TableField.STACK,
        label: 'Stack',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.stack,
        format: (val: string) => truncateString(val),
        validator: () => true,
      },
    }[field]
  }

  /**
   * Create a function that can return the 'singular' or 'plural' label for something.
   * @param singular Display label in singular form
   * @param plural Display label in plural form
   * @returns Function that accepts 'singular' or 'plural'
   */
  function tableLabels(singular: string, plural: string): (x: 'singular' | 'plural') => string {
    return (labelType: 'singular' | 'plural'): string => {
      return { singular, plural }[labelType]
    }
  }

  /**
   * Get the table fields for a Dexie table.
   * @param table Dexie table enum
   * @returns Array of fields on that table item
   */
  function getTableFields(table: DexieTable): string[] {
    return (
      {
        [DexieTable.EXAMPLES]: [TableField.ID, TableField.CREATED_DATE],
        [DexieTable.EXAMPLE_RECORDS]: [TableField.ID, TableField.CREATED_DATE],
        [DexieTable.LOGS]: [
          TableField.ID,
          TableField.CREATED_DATE,
          TableField.SEVERITY,
          TableField.CALLER_DETAILS,
          TableField.ERROR_NAME,
          TableField.MESSAGE,
          TableField.STACK,
        ],
      }[table as string] || []
    )
  }

  /**
   * Get the field properties for a Dexie table.
   * @param table Dexie table enum
   * @returns Array of field properties
   */
  function getTableColumns(table: DexieTable): { [x: string]: any }[] {
    return getTableFields(table).map((field: any) => fieldProperties(field))
  }

  return {
    tableManager,
    [table + 'TableManager']: tableManager, // Named output if needed
  }
}
