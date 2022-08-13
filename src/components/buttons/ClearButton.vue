<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { DexieTable } from '@/constants/data-enums'
import { DB } from '@/services/LocalDatabase'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { useSettingsStore } from '@/stores/settings'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { useTable } from '@/use/useTable'

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()
const { getPluralLabel } = useTable()
const settings = useSettingsStore()

const props = defineProps<{ table: DexieTable | 'ALL' }>()

function onClear(): void {
  if (props.table === 'ALL') {
    confirmDialog(
      'Clear All',
      'Permanetly remove all app data from the database?',
      Icon.DELETE,
      NotifyColor.ERROR,
      async (): Promise<void> => {
        try {
          await Promise.all(Object.values(DexieTable).map((table) => DB.clear(table as DexieTable)))
          await settings.initSettings()
          await settings.setDEBUG(false)
          await settings.setNOTIFY(false)
        } catch (error) {
          log.error('onClear', error)
        }
      }
    )
  } else {
    confirmDialog(
      'Clear',
      `Permanetly remove all ${getPluralLabel(props.table)}?`,
      Icon.DELETE,
      NotifyColor.ERROR,
      async (): Promise<void> => {
        try {
          await DB.clear(props.table as DexieTable)
        } catch (error) {
          log.error('onClear', error)
        }
      }
    )
  }
}
</script>

<template>
  <QBtn color="red" @click="onClear()" />
</template>
