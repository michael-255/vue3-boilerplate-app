import type { ColumnProps } from '@/constants/types-interfaces'
import { Field, Operation } from '@/constants/data-enums'
import { getFieldColumnProps } from '@/helpers/field-column-props'
import { _Entity } from '@/models/_Entity'
import type { Severity } from '@/constants/data-enums'
import { v4 as createId } from 'uuid'

export interface ILog {
  severity: Severity
  details: string
  name?: string
  message?: string
  stack?: string
}

export interface LogParams {
  severity: Severity
  details: string
  error?: Error | any
}

/**
 * Log Class
 * @param params.error Error or any if unknown
 * @param params.severity Severity
 * @param params.details Information about the error
 */
export class Log extends _Entity {
  severity: Severity
  details: string
  name?: string
  message?: string
  stack?: string

  constructor(params: LogParams) {
    super({ id: createId(), createdDate: new Date().toISOString() })

    this.severity = params?.severity
    this.details = params?.details
    this.name = params?.error?.name
    this.message = params?.error?.message
    this.stack = params?.error?.stack
  }

  static getFields(): Field[] {
    return [
      ..._Entity.getFields(),
      Field.SEVERITY,
      Field.DETAILS,
      Field.NAME,
      Field.MESSAGE,
      Field.STACK,
    ]
  }

  static getColumns(): ColumnProps[] {
    return this.getFields().map((field: Field) => getFieldColumnProps(field))
  }

  static getColumnOptions(): ColumnProps[] {
    return this.getColumns().filter((col: ColumnProps) => !col.required)
  }

  static getRelatedTable(): null {
    return null
  }

  static getSingularLabel(): 'Log' {
    return 'Log'
  }

  static getPluralLabel(): 'Logs' {
    return 'Logs'
  }

  static getSupportedOperations(): Operation[] {
    return [Operation.DELETE, Operation.CLEAR, Operation.INSPECT]
  }

  static getVisibleColumns(): Field[] {
    return [Field.CREATED_DATE, Field.SEVERITY, Field.DETAILS, Field.NAME]
  }
}
