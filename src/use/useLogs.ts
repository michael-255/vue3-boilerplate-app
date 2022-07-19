import { logger } from '@/services/Logger'
import { DexieTable, Severity } from '@/constants/data-enums'
import { NotifyColor, Icon } from '@/constants/ui-enums'
import { database } from '@/services/LocalDatabase'
import { Log } from '@/models/Log'
import { useNotifications } from '@/use/useNotifications'
import { useSettingsStore } from '@/stores/settings'

/**
 * Composable with utilities for logging, notifications, and basic dialogs.
 * Never awaiting for any logging calls. Don't want to slow down the UI.
 */
export function useLogs() {
  const settings = useSettingsStore()
  const { notify } = useNotifications()

  /**
   * Log object with common logger functions. Output can be controled by DEBUG and NOTIFY refs.
   * - debug
   * - info
   * - warn
   * - error
   * - critical
   */
  const log = {
    debug: (callerDetails: string, error?: Error | any) => {
      debugLog(callerDetails, error)
    },
    info: (callerDetails: string, error?: Error | any) => {
      infoLog(callerDetails, error)
    },
    warn: (callerDetails: string, error?: Error | any) => {
      warnLog(callerDetails, error)
    },
    error: (callerDetails: string, error?: Error | any) => {
      errorLog(callerDetails, error)
    },
    critical: (callerDetails: string, error?: Error | any) => {
      criticalLog(callerDetails, error)
    },
  }

  function debugLog(callerDetails: string, error?: Error | any) {
    if (settings.DEBUG) {
      const severity = Severity.DEBUG
      logger.log(`[${severity}]`, callerDetails, error)
      // No DB call on DEBUG
      if (settings.NOTIFY) {
        notify(`${severity} - ${callerDetails}`, Icon.DEBUG, NotifyColor.DEBUG)
      }
    }
  }

  function infoLog(callerDetails: string, error?: Error | any) {
    const severity = Severity.INFO
    if (settings.DEBUG) {
      logger.log(`[${severity}]`, callerDetails, error)
    }
    database.add(DexieTable.LOGS, new Log({ error, severity, callerDetails }))
    if (settings.NOTIFY) {
      notify(`${severity} - ${callerDetails}`, Icon.INFO, NotifyColor.INFO)
    }
  }

  function warnLog(callerDetails: string, error?: Error | any) {
    const severity = Severity.WARN
    if (settings.DEBUG) {
      logger.warn(`[${severity}]`, callerDetails, error)
    }
    database.add(DexieTable.LOGS, new Log({ error, severity, callerDetails }))
    notify(`${severity} - ${callerDetails}`, Icon.WARN, NotifyColor.WARN)
  }

  function errorLog(callerDetails: string, error?: Error | any) {
    const severity = Severity.ERROR
    if (settings.DEBUG) {
      logger.error(`[${severity}]`, callerDetails, error)
    }
    database.add(DexieTable.LOGS, new Log({ error, severity, callerDetails }))
    notify(`${severity} - ${callerDetails}`, Icon.ERROR, NotifyColor.ERROR)
  }

  function criticalLog(callerDetails: string, error?: Error | any) {
    const severity = Severity.CRITICAL
    if (settings.DEBUG) {
      logger.error(`[${severity}]`, callerDetails, error)
    }
    database.add(DexieTable.LOGS, new Log({ error, severity, callerDetails }))
    notify(`${severity} - ${callerDetails}`, Icon.CRITICAL, NotifyColor.CRITICAL)
  }

  /**
   * Simple console log for testing.
   * @param value
   */
  function consoleTest(value: any): void {
    logger.log('[Test]', value)
  }

  return {
    consoleTest,
    log,
  }
}
