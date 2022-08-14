<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { AppTable } from '@/constants/data-enums'
import { DB } from '@/services/LocalDatabase'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()

/**
 * Removes all data from all databases defined in the AppTable enum.
 */
async function onClearAll(): Promise<void> {
  confirmDialog(
    'Clear All',
    'Permanetly remove all app data from the database?',
    Icon.DELETE,
    NotifyColor.ERROR,
    async (): Promise<void> => {
      try {
        await Promise.all(Object.values(AppTable).map((table) => DB.clear(table as AppTable)))
        /**
         * @see
         * COULD DEFAULT SETTINGS HERE IF DESIRED
         */
      } catch (error) {
        log.error('onClearAll', error)
      }
    }
  )
}
</script>

<template>
  <QBtn label="Clear All" :color="NotifyColor.ERROR" @click="onClearAll()" />
</template>
