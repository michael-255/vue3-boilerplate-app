<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { Icon, NotifyColor } from '@/constants/ui-enums'

const { log, consoleDebug } = useLogger()
const { confirmDialog } = useSimpleDialogs()

/**
 * @todo ability to load defaults of many types
 */

function onDefaults(): void {
  confirmDialog(
    'Load All Defaults',
    'Load default entires into all tables in the database?',
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        consoleDebug('Not Implemented')
      } catch (error) {
        log.error('onDefaults', error)
      }
    }
  )
}
</script>

<template>
  <QBtn label="Load All Defaults" color="primary" @click="onDefaults()" />
</template>
