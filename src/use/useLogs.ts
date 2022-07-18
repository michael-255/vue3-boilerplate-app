import { logger } from '@/services/Logger'
import { useNotifications } from '@/use/useNotifications'
import { DexieTable, Severity } from '@/constants/data-enums'
import { Icon } from '@/constants/ui-enums'
import { database } from '@/services/LocalDatabase'
import { Log } from '@/models/Log'
import { ref, type Ref } from 'vue'

/**
 * Composable with utilities for logging, notifications, and basic dialogs.
 */
export function useLogs() {
  const { notify } = useNotifications()

  const DEBUG: Ref<boolean> = ref(true)
  const NOTIFY: Ref<boolean> = ref(true)

  /**
   * Log object with common logger functions. Output can be controled by DEBUG and NOTIFY refs.
   * - debug
   * - info
   * - warn
   * - error
   * - critical
   */
  const log = {
    debug: async (callerDetails: string, error: Error | any) => {
      debugLog(callerDetails, error)
    },
    info: async (callerDetails: string, error: Error | any) => {
      infoLog(callerDetails, error)
    },
    warn: async (callerDetails: string, error: Error | any) => {
      warnLog(callerDetails, error)
    },
    error: async (callerDetails: string, error: Error | any) => {
      errorLog(callerDetails, error)
    },
    critical: async (callerDetails: string, error: Error | any) => {
      criticalLog(callerDetails, error)
    },
  }

  async function debugLog(callerDetails: string, error: Error | any) {
    if (DEBUG.value && NOTIFY.value) {
      const severity = Severity.DEBUG
      logger.log(`[${severity}]`, callerDetails, error)
      // No DB call on DEBUG
      notify(`${severity} ${callerDetails}`, Icon.DEBUG, 'deep-purple')
    }
  }

  async function infoLog(callerDetails: string, error: Error | any) {
    const severity = Severity.INFO
    if (DEBUG.value) {
      logger.log(`[${severity}]`, callerDetails, error)
    }

    await database.add(DexieTable.LOGS, new Log({ error, severity, callerDetails }))

    if (NOTIFY.value) {
      notify(`${severity} ${callerDetails}`, Icon.INFO, 'primary')
    }
  }

  async function warnLog(callerDetails: string, error: Error | any) {
    const severity = Severity.WARN
    if (DEBUG.value) {
      logger.warn(`[${severity}]`, callerDetails, error)
    }

    await database.add(DexieTable.LOGS, new Log({ error, severity, callerDetails }))

    if (NOTIFY.value) {
      notify(`${severity} ${callerDetails}`, Icon.WARN, 'orange')
    }
  }

  async function errorLog(callerDetails: string, error: Error | any) {
    const severity = Severity.ERROR
    if (DEBUG.value) {
      logger.error(`[${severity}]`, callerDetails, error)
    }

    await database.add(DexieTable.LOGS, new Log({ error, severity, callerDetails }))

    if (NOTIFY.value) {
      notify(`${severity} ${callerDetails}`, Icon.ERROR, 'negative')
    }
  }

  async function criticalLog(callerDetails: string, error: Error | any) {
    const severity = Severity.CRITICAL
    if (DEBUG.value) {
      logger.error(`[${severity}]`, callerDetails, error)
    }

    await database.add(DexieTable.LOGS, new Log({ error, severity, callerDetails }))

    if (NOTIFY.value) {
      notify(`${severity} ${callerDetails}`, Icon.CRITICAL, 'negative')
    }
  }

  /**
   * Simple console log for testing.
   * @param value
   */
  function consoleTest(value: any): void {
    logger.log('[TEST]', value)
  }

  return {
    consoleTest,
    log,
  }
}
