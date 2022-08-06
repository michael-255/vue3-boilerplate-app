<script setup lang="ts">
import { exportFile, QInput, QBtn } from 'quasar'
import { type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { DexieTable } from '@/constants/data-enums'
import { AppData } from '@/models/AppData'
import { DB } from '@/services/LocalDatabase'
import { Icon, NotifyColor } from '@/constants/ui-enums'

const { log, consoleDebug } = useLogger()
const { confirmDialog } = useSimpleDialogs()

const exportText: Ref<string> = ref('')

function onExport(): void {
  let filename = `export-${new Date().toISOString().split('T')[0]}`
  if (exportText.value && exportText.value.length > 0) {
    filename = exportText.value
  }
  filename += '.json'

  confirmDialog(
    'Export',
    `Export data as file "${filename}"`,
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        const appData = new AppData({
          examples: await DB.getAll(DexieTable.EXAMPLES),
          logs: await DB.getAll(DexieTable.LOGS),
        })

        consoleDebug(appData)

        const fileStatus = exportFile(filename, JSON.stringify(appData), {
          encoding: 'UTF-8',
          mimeType: 'application/json',
        })

        if (fileStatus === true) {
          consoleDebug('File downloaded succesfully!')
        } else {
          throw new Error('Browser denied file download')
        }
      } catch (error) {
        log.error('onExport', error)
      }
    }
  )
}
</script>

<template>
  <QInput v-model="exportText" dense outlined placeholder="Optional Name">
    <template v-slot:before>
      <QBtn label="Export" color="primary" class="q-mr-xs" @click="onExport()" />
    </template>
    <template v-slot:after>
      <QIcon :name="Icon.CLOSE" @click.stop="exportText = ''" class="cursor-pointer" />
    </template>
  </QInput>
</template>
