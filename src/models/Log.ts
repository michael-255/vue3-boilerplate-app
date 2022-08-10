import { DexieTable, TableField, TableOperation } from '@/constants/data-enums'
import { Entity } from '@/models/Entity'
import type { Severity } from '@/constants/data-enums'
import { v4 as createId } from 'uuid'

export interface ILog {
  severity: Severity
  callerDetails: string
  errorName?: string
  message?: string
  stack?: string
}

export interface LogParams {
  severity: Severity
  callerDetails: string
  error?: Error | any
}

/**
 * Log Class
 * @param params.error Error or any if unknown
 * @param params.severity Severity severity
 * @param params.callerDetails Name of caller, data causing the issue, etc.
 */
export class Log extends Entity {
  severity: Severity
  callerDetails: string
  errorName?: string
  message?: string
  stack?: string

  constructor(params: LogParams) {
    super({ id: createId(), createdDate: new Date().toISOString() })

    this.severity = params?.severity
    this.callerDetails = params?.callerDetails
    this.errorName = params?.error?.name
    this.message = params?.error?.message
    this.stack = params?.error?.stack
  }

  static getTableProperties(): { [x: string]: any } {
    return {
      name: DexieTable.LOGS,
      relatedTable: null,
      labelSingular: 'Log',
      labelPlural: 'Logs',
      actions: {},
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
    }
  }
}
