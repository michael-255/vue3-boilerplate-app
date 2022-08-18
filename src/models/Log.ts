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
}
