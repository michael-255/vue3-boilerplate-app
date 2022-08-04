import { DexieTable, TableField, TableAction } from '@/constants/data-enums'
import { db } from '@/services/LocalDatabase'
import { DateTime } from 'luxon'
import { truncateString } from '@/utils/common'
import { defineAsyncComponent } from 'vue'
import {
  isRequired,
  isIdValid,
  isRequiredDateValid,
  isShortTextValid,
  isTextValid,
  isOptionalNumber,
} from '@/utils/validators'

export class TableManager {
  private tableManager: { [x: string]: any } | undefined

  constructor(dexieTable: DexieTable) {
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
    this.tableManager = {
      [DexieTable.EXAMPLES]: {
        name: DexieTable.EXAMPLES,
        relatedTable: DexieTable.EXAMPLE_RECORDS,
        labelSingular: 'Example',
        labelPlural: 'Examples',
        actions: {}, // @todo
        supportedActions: [
          TableAction.CREATE,
          TableAction.UPDATE,
          TableAction.DELETE,
          TableAction.CLEAR,
          TableAction.INSPECT,
          TableAction.REPORT,
        ],
        fields: [TableField.ID, TableField.CREATED_DATE],
        rows: async () => await db.getAll(dexieTable),
        columns: [],
        columnOptions: [],
        visibleColumns: [], // @todo
      },
      [DexieTable.EXAMPLE_RECORDS]: {
        name: DexieTable.EXAMPLE_RECORDS,
        relatedTable: DexieTable.EXAMPLES,
        labelSingular: 'Example Record',
        labelPlural: 'Example Records',
        actions: {}, // @todo
        supportedActions: [
          TableAction.CREATE,
          TableAction.UPDATE,
          TableAction.DELETE,
          TableAction.CLEAR,
          TableAction.INSPECT,
        ],
        fields: [TableField.ID, TableField.CREATED_DATE],
        rows: async () => await db.getAll(dexieTable),
        columns: [],
        columnOptions: [],
        visibleColumns: [], // @todo
      },
      [DexieTable.LOGS]: {
        name: DexieTable.LOGS,
        relatedTable: null,
        labelSingular: 'Log',
        labelPlural: 'Logs',
        actions: {},
        supportedActions: [TableAction.DELETE, TableAction.CLEAR, TableAction.INSPECT],
        fields: [
          TableField.ID,
          TableField.CREATED_DATE,
          TableField.SEVERITY,
          TableField.CALLER_DETAILS,
          TableField.ERROR_NAME,
          TableField.MESSAGE,
          TableField.STACK,
        ],
        rows: async () => await db.getAll(dexieTable),
        columns: [],
        columnOptions: [],
        visibleColumns: [TableField.SEVERITY, TableField.CALLER_DETAILS, TableField.ERROR_NAME],
      },
    }[dexieTable as string] // As string so fields without a value will return undefined (settings)

    // Setup the columns and columnOptions for the current Dexie table
    if (this.tableManager) {
      this.tableManager.columns = this.tableManager?.fields?.map((field: any) =>
        this.getFieldDisplayProperties(field)
      )
      this.tableManager.columnOptions = this.tableManager?.columns?.filter(
        (i: any) => i.name !== TableField.ID
      )
    } else {
      throw new Error('TableManager is undefined when passed Dexie Table: ' + dexieTable)
    }
  }

  /**
   * Get the table column display properties for a field.
   * @param tableField
   * @returns Object with the properties needed for data table display
   */
  getFieldDisplayProperties(tableField: TableField): { [x: string]: any } | undefined {
    return {
      [TableField.ID]: {
        name: TableField.ID,
        label: 'Id',
        align: 'left',
        sortable: true,
        required: true,
        field: (row: any) => row.id,
        format: (val: string) => val,
      },
      [TableField.CREATED_DATE]: {
        name: TableField.CREATED_DATE,
        label: 'Created Date',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.createdDate,
        format: (val: string) => DateTime.fromISO(val).toFormat('ccc LLL d yyyy ttt'),
      },
      [TableField.NAME]: {
        name: TableField.NAME,
        label: 'Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.name,
        format: (val: string) => truncateString(val),
      },
      [TableField.DESCRIPTION]: {
        name: TableField.DESCRIPTION,
        label: 'Description',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.description,
        format: (val: string) => truncateString(val),
      },
      [TableField.NOTES]: {
        name: TableField.NOTES,
        label: 'Notes',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.id,
        format: (val: string) => truncateString(val),
      },
      [TableField.VALUE]: {
        name: TableField.VALUE,
        label: 'Value',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.value,
        format: (val: number) => val,
      },
      [TableField.SEVERITY]: {
        name: TableField.SEVERITY,
        label: 'Severity',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.severity,
        format: (val: string) => val,
      },
      [TableField.CALLER_DETAILS]: {
        name: TableField.CALLER_DETAILS,
        label: 'Caller Details',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.callerDetails,
        format: (val: string) => truncateString(val),
      },
      [TableField.ERROR_NAME]: {
        name: TableField.ERROR_NAME,
        label: 'Error Name',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.errorName,
        format: (val: string) => truncateString(val),
      },
      [TableField.MESSAGE]: {
        name: TableField.MESSAGE,
        label: 'Messages',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.message,
        format: (val: string) => truncateString(val),
      },
      [TableField.STACK]: {
        name: TableField.STACK,
        label: 'Stack',
        align: 'left',
        sortable: true,
        required: false,
        field: (row: any) => row.stack,
        format: (val: string) => truncateString(val),
      },
    }[tableField as string] // As string so fields without a value will return undefined
  }

  /**
   * Get the component that should render for a specific Dexie table field.
   * @param tableField
   * @returns Lazy loaded Vue Component
   */
  getFieldValidator(tableField: TableField): { [x: string]: any } | undefined {
    return {
      [TableField.ID]: (val: string) => isIdValid(val),
      [TableField.CREATED_DATE]: (val: string) => isRequiredDateValid(val),
      [TableField.NAME]: (val: string) => isShortTextValid(val),
      [TableField.DESCRIPTION]: (val: string) => isTextValid(val),
      [TableField.NOTES]: (val: string) => isTextValid(val),
      [TableField.VALUE]: (val: number | undefined) => isOptionalNumber(val),
      [TableField.SEVERITY]: (val: string) => isRequired(val),
      [TableField.CALLER_DETAILS]: (val: string) => isRequired(val),
      [TableField.ERROR_NAME]: () => true,
      [TableField.MESSAGE]: () => true,
      [TableField.STACK]: () => true,
    }[tableField as string] // As string so fields without a value will return undefined
  }

  /**
   * Get the component that should render for a specific Dexie table field.
   * @param tableField
   * @returns Lazy loaded Vue Component
   */
  getFieldComponent(tableField: TableField): { [x: string]: any } | undefined {
    return {
      [TableField.ID]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [TableField.CREATED_DATE]: defineAsyncComponent(
        () => import('@/components/inputs/IdInput.vue')
      ),
      [TableField.NAME]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [TableField.DESCRIPTION]: defineAsyncComponent(
        () => import('@/components/inputs/IdInput.vue')
      ),
      [TableField.NOTES]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [TableField.VALUE]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [TableField.SEVERITY]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [TableField.CALLER_DETAILS]: defineAsyncComponent(
        () => import('@/components/inputs/IdInput.vue')
      ),
      [TableField.ERROR_NAME]: defineAsyncComponent(
        () => import('@/components/inputs/IdInput.vue')
      ),
      [TableField.MESSAGE]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
      [TableField.STACK]: defineAsyncComponent(() => import('@/components/inputs/IdInput.vue')),
    }[tableField as string] // As string so fields without a value will return undefined
  }

  /**
   * Checking if a Table Action is supported by the current table.
   * @param tableAction
   * @returns boolean
   */
  isSupported(tableAction: TableAction): boolean {
    return this.tableManager?.supportedActions?.includes(tableAction)
  }
}
