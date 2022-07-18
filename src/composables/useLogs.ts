import { logger } from '@/services/Logger'
import { useNotifications } from '@/composables/useNotifications'
import type { LogParams } from '@/models/Log'
import { DexieTable, Severity } from '@/constants/data-enums'
import { Icon } from '@/constants/ui-enums'
import { database } from '@/services/LocalDatabase'
import { Log } from '@/models/Log'

/**
 * Composable with utilities for logging, notifications, and basic dialogs.
 */
export function useLogs() {
  const { notify } = useNotifications()

  const DEBUG: Readonly<boolean> = true

  function logDisplay(severity: Severity) {
    return {
      console: addConsoleLog(severity),
      notify: addNotification(severity),
      log: async (params: LogParams) => await database.add(DexieTable.LOGS, new Log(params)),
    }
  }

  function addConsoleLog(severity: Severity) {
    return {
      [Severity.DEBUG]: (params: LogParams) => {
        if (DEBUG) {
          logger.log(`[${severity}]`, params?.callerDetails, params?.error)
        }
      },
      [Severity.INFO]: (params: LogParams) => {
        if (DEBUG) {
          logger.log(`[${severity}]`, params?.callerDetails, params?.error)
        }
      },
      [Severity.WARN]: (params: LogParams) => {
        if (DEBUG) {
          logger.warn(`[${severity}]`, params?.callerDetails, params?.error)
        }
      },
      [Severity.ERROR]: (params: LogParams) => {
        if (DEBUG) {
          logger.error(`[${severity}]`, params?.callerDetails, params?.error)
        }
      },
      [Severity.CRITICAL]: (params: LogParams) => {
        if (DEBUG) {
          logger.error(`[${severity}]`, params?.callerDetails, params?.error)
        }
      },
    }[severity]
  }

  function addNotification(severity: Severity) {
    return {
      [Severity.DEBUG]: (params: LogParams) => {
        notify(`${severity} ${params?.callerDetails}`, Icon.DEBUG, 'deep-purple')
      },
      [Severity.INFO]: (params: LogParams) => {
        notify(`${severity} ${params?.callerDetails}`, Icon.INFO, 'primary')
      },
      [Severity.WARN]: (params: LogParams) => {
        notify(`${severity} ${params?.callerDetails}`, Icon.WARN, 'orange')
      },
      [Severity.ERROR]: (params: LogParams) => {
        notify(`${severity} ${params?.callerDetails}`, Icon.ERROR, 'negative')
      },
      [Severity.CRITICAL]: (params: LogParams) => {
        notify(`${severity} ${params?.callerDetails}`, Icon.CRITICAL, 'negative')
      },
    }[severity]
  }

  /**
   * Logs to the DB and console while also showing a notification.
   */
  async function log(params: LogParams): Promise<void> {
    const display = logDisplay(params?.severity)
    display.console(params)
    display.log(params)
    display.notify(params)
  }

  /**
   * Simple console log for testing.
   * @param value
   */
  function consoleTest(value: any): void {
    logger.log('[TEST] ', value)
  }

  return {
    consoleTest,
    log,
  }
}
