<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { DexieTable } from '@/constants/data-enums'
import { DB } from '@/services/LocalDatabase'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { useSettingsStore } from '@/stores/settings'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const settings = useSettingsStore()

/**
 * Removes all data from all databases defined in the DexieTable enum.
 */
async function onClearAll(): Promise<void> {
  confirmDialog(
    'Clear All',
    'Permanetly remove all app data from the database?',
    Icon.DELETE,
    NotifyColor.ERROR,
    async (): Promise<void> => {
      try {
        await Promise.all(Object.values(DexieTable).map((table) => DB.clear(table as DexieTable)))
        /**
         * @see
         * DEFAULT SETTINGS BELOW
         */
        await settings.initSettings()
        await settings.setDEBUG(false)
        await settings.setNOTIFY(false)
        await settings.setINFO(false)
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
