import { DexieTable, TableField } from '@/constants/data-enums'
import { db } from '@/services/LocalDatabase'

export function useTableManager(table: DexieTable) {
  /**
   * Table Manager is an object where the passed in Dexie table makes the selection.
   * @param name Dexie table name
   * @param relatedTable Name of a related Dexie table (like a records table)
   * @param label Table label function (singular or plural)
   * @param actions ??? (is this the supported actions for this table? Like CREATE, EDIT, etc?)
   * @param fields Names of all field properties for this table
   * @param rows Async function that returns all data from the DB for this table
   * @param columns Field properties for display and validation
   * @param columnOptions Selectable field properties (Select component)
   * @param visibleColumns Names of fields that are displayed by default
   */
  const tableManager = {
    [DexieTable.EXAMPLES]: {
      name: DexieTable.EXAMPLES,
      relatedTable: DexieTable.EXAMPLE_RECORDS,
      label: tableLabels('Example', 'Examples'),
      actions: null,
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
      actions: null,
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
      actions: null,
      fields: getTableFields(table),
      rows: async () => await db.getAll(table),
      columns: getTableColumns(table),
      columnOptions: getTableColumns(table).filter((i: any) => i.name !== TableField.ID),
      visibleColumns: [TableField.SEVERITY, TableField.CALLER_DETAILS, TableField.ERROR_NAME],
    },
    // Settings use unique values for all entries, so they can't be handled by the tableManager
    [DexieTable.SETTINGS]: {
      name: DexieTable.SETTINGS,
      relatedTable: '',
      label: () => '',
      actions: null,
      fields: [],
      rows: () => [],
      columns: [],
      columnOptions: [],
      visibleColumns: [],
    },
  }[table] // Selecting table

  //
  // Internal table manger functions
  //

  function fieldProperties(field: TableField) {
    return {
      [TableField.ID]: {
        inputType: 'text',
        name: TableField.ID,
        label: 'Id',
        align: 'left',
        sortable: true,
        required: true,
        field: (row: any) => row.id,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.CREATED_DATE]: {
        inputType: 'text',
        name: TableField.CREATED_DATE,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.createdDate,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.NAME]: {
        inputType: 'text',
        name: TableField.NAME,
        label: 'Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.name,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.DESCRIPTION]: {
        inputType: 'text',
        name: TableField.DESCRIPTION,
        label: 'Description',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.description,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.NOTES]: {
        inputType: 'text',
        name: TableField.NOTES,
        label: 'Notes',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.VALUE]: {
        inputType: 'number',
        name: TableField.VALUE,
        label: 'Value',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.value,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.SEVERITY]: {
        inputType: 'text',
        name: TableField.SEVERITY,
        label: 'Severity',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.severity,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.CALLER_DETAILS]: {
        inputType: 'text',
        name: TableField.CALLER_DETAILS,
        label: 'Caller Details',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.callerDetails,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.ERROR_NAME]: {
        inputType: 'text',
        name: TableField.ERROR_NAME,
        label: 'Error Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.errorName,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.MESSAGE]: {
        inputType: 'text',
        name: TableField.MESSAGE,
        label: 'Messages',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.message,
        format: (val: string) => val,
        validator: (val: any) => !!val,
      },
      [TableField.STACK]: {
        inputType: 'text',
        name: TableField.STACK,
        label: 'Stack',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.stack,
        format: (val: string) => val,
        validator: (val: any) => !!val,
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
    return {
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
      [DexieTable.SETTINGS]: [],
    }[table]
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
    [table + 'Table']: tableManager, // Named output if needed
  }
}
