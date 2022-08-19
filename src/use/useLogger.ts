import { logger } from '@/services/Logger'
import { AppTable, Severity } from '@/constants/data-enums'
import { NotifyColor, Icon } from '@/constants/ui-enums'
import { DB } from '@/services/LocalDatabase'
import { Log } from '@/models/Log'
import { useNotifications } from '@/use/useNotifications'
import useSettingsStore from '@/stores/settings'

/**
 * Composable with utilities for logging, notifications, and basic dialogs.
 * Never awaiting for any logging calls. Don't want to slow down the UI.
 */
export function useLogger(): { [x: string]: any } {
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
    /**
     * DEBUG logs never get saved to the database. Controlled by DEBUG and NOTIFY settings.
     */
    debug: (details: string, error?: Error | any) => {
      if (settings.DEBUG) {
        const severity = Severity.DEBUG
        logger.debug(`[${severity}]`, details, error)
        // No DB call on DEBUG
        if (settings.NOTIFY) {
          notify(`${severity} - ${details}`, Icon.DEBUG, NotifyColor.DEBUG)
        }
      }
    },
    /**
     * INFO logs can be suppressed if desired. Controlled by DEBUG, NOTIFY, and INFO settings.
     */
    info: (details: string, error?: Error | any) => {
      const severity = Severity.INFO
      if (settings.DEBUG) {
        logger.info(`[${severity}]`, details, error)
      }
      if (settings.INFO) {
        DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      }
      if (settings.NOTIFY) {
        notify(`${severity} - ${details}`, Icon.INFO, NotifyColor.INFO)
      }
    },
    /**
     * WARN logs cannot be suppressed. Can hide the console output with DEBUG setting.
     */
    warn: (details: string, error?: Error | any) => {
      const severity = Severity.WARN
      if (settings.DEBUG) {
        logger.warn(`[${severity}]`, details, error)
      }
      DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      notify(`${severity} - ${details}`, Icon.WARN, NotifyColor.WARN)
    },
    /**
     * ERROR logs cannot be suppressed. Can hide the console output with DEBUG setting.
     */
    error: (details: string, error?: Error | any) => {
      const severity = Severity.ERROR
      if (settings.DEBUG) {
        logger.error(`[${severity}]`, details, error)
      }
      DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      notify(`${severity} - ${details}`, Icon.ERROR, NotifyColor.ERROR)
    },
    /**
     * CRITICAL logs cannot be suppressed. Can hide the console output with DEBUG setting.
     */
    critical: (details: string, error?: Error | any) => {
      const severity = Severity.CRITICAL
      if (settings.DEBUG) {
        logger.critical(`[${severity}]`, details, error)
      }
      DB.add(AppTable.LOGS, new Log({ error, severity, details }))
      notify(`${severity} - ${details}`, Icon.CRITICAL, NotifyColor.CRITICAL)
    },
  }

  /**
   * Simple console log for testing.
   * @param value
   */
  function consoleDebug(value: any): void {
    if (settings.DEBUG) {
      logger.log(value)
    }
  }

  return {
    consoleDebug,
    log,
  }
}
