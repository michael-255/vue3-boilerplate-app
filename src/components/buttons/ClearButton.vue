<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { DexieTable } from '@/constants/data-enums'
import { db } from '@/services/LocalDatabase'
import { Icon, NotifyColor } from '@/constants/ui-enums'

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()

const props = defineProps<{
  table: DexieTable | 'ALL'
}>()

function onClear(): void {
  if (props.table === 'ALL') {
    confirmDialog(
      'Clear All',
      'Permanetly remove all app data from the database?',
      Icon.DELETE,
      NotifyColor.ERROR,
      async (): Promise<void> => {
        try {
          await Promise.all(Object.values(DexieTable).map((table) => db.clear(table as DexieTable)))
        } catch (error) {
          log.error('onClear', error)
        }
      }
    )
  } else {
    confirmDialog(
      'Clear',
      'Permanetly remove all data from table?',
      Icon.DELETE,
      NotifyColor.ERROR,
      async (): Promise<void> => {
        try {
          await db.clear(props.table as DexieTable)
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
