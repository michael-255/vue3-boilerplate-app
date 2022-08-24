<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { DB } from '@/services/LocalDatabase'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'

const { log } = useLogger()
const { confirmDialog, dismissDialog } = useSimpleDialogs()

/**
 * Deletes the underling Dexie Database. This removes all data, and will require a website reload.
 */
async function onDeleteDB(): Promise<void> {
  confirmDialog(
    'Delete Database',
    'Delete the underlining Dexie database? This only needs to be done to correct schema changes in newer versions of the app. All data will be lost.',
    Icon.DELETE,
    NotifyColor.ERROR,
    async (): Promise<void> => {
      try {
        await DB.delete()
        reloadMessageDialog()
      } catch (error) {
        log.error('onDeleteDB', error)
      }
    }
  )
}

function reloadMessageDialog(): void {
  dismissDialog('Reload Reminder', 'Please reload the website now.', Icon.INFO, NotifyColor.INFO)
}
</script>

<template>
  <QBtn label="Delete Database" :color="NotifyColor.ERROR" @click="onDeleteDB()" />
</template>
