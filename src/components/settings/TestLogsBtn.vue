<script setup lang="ts">
import { QBtn } from 'quasar'
import { NotifyColor } from '@/constants/ui-enums'
import { useLogger } from '@/use/useLogger'
import useSettingsStore from '@/stores/settings'

const { log } = useLogger()
const settings = useSettingsStore()

/**
 * Generates example logs that can be examined on the Logs table and the console (if DEBUG = true).
 */
function generateTestLogs(): void {
  log.debug('This is a Debug Log (not saved)', {
    name: 'generateTestLogs:Debug',
    message: `Debug logs are never saved to the database. Alert is suppressed if NOTIFY = false`,
    stack: `Settings when called: DEBUG = ${settings.DEBUG}, NOTIFY = ${settings.NOTIFY}`,
  })
  log.info('This is an Info Log', {
    name: 'generateTestLogs:Info',
    message: `Info logs are saved to the database, but alerts are suppressed if NOTIFY = false`,
    stack: `Settings when called: DEBUG = ${settings.DEBUG}, NOTIFY = ${settings.NOTIFY}`,
  })
  log.warn('This is a Warning Log', {
    name: 'generateTestLogs:Warning',
    message: `Warning logs always save to the database and alert the user.`,
    stack: `Settings when called: DEBUG = ${settings.DEBUG}, NOTIFY = ${settings.NOTIFY}`,
  })
  log.error('This is an Error Log', {
    name: 'generateTestLogs:Error',
    message: `Error logs always save to the database and alert the user.`,
    stack: `Settings when called: DEBUG = ${settings.DEBUG}, NOTIFY = ${settings.NOTIFY}`,
  })
  log.critical('This is a Critical Log', {
    name: 'generateTestLogs:Critical',
    message: `Critical logs always save to the database and alert the user.`,
    stack: `Settings when called: DEBUG = ${settings.DEBUG}, NOTIFY = ${settings.NOTIFY}`,
  })
}
</script>

<template>
  <QBtn label="Test Logs" :color="NotifyColor.INFO" @click="generateTestLogs()" />
</template>
