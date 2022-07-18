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
  error: Error | any
  severity: Severity
  callerDetails: string
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
}
