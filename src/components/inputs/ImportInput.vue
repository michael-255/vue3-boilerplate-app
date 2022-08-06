<script setup lang="ts">
import { QFile, QBtn } from 'quasar'
import { type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { DexieTable } from '@/constants/data-enums'
import { AppData } from '@/models/AppData'
import { DB } from '@/services/LocalDatabase'
import { Icon, NotifyColor } from '@/constants/ui-enums'

const { log, consoleDebug } = useLogger()
const { confirmDialog } = useSimpleDialogs()

const file: Ref<any> = ref(null)
const tenMegabytes = 10485760

function onRejectedImport(entries: any): void {
  const fileName = entries[0]?.file?.name || undefined
  const size = entries[0]?.file?.size || undefined
  const type = entries[0]?.file?.type || undefined
  const errorName = entries[0]?.failedPropValidation || undefined

  consoleDebug(entries)

  log.warn(`Cannot import ${fileName}`, {
    name: errorName,
    message: `NAME: ${fileName}, SIZE: ${size}, TYPE: ${type}`,
    stack: 'onRejectedImport',
  })
}

function onImport(): void {
  consoleDebug(file.value)

  confirmDialog(
    'Import',
    `Import data from file "${file.value.name}"`,
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        const fileData = await file.value.text()
        const parsedFileData = JSON.parse(fileData)

        const appData = new AppData({
          examples: parsedFileData?.examples,
          logs: parsedFileData?.logs, // Logs are included but not added to the database
        })

        consoleDebug(appData)

        await Promise.all([
          DB.bulkAdd(DexieTable.EXAMPLES, appData?.examples),
          DB.bulkAdd(DexieTable.LOGS, appData?.logs), // @todo - TEMP REMOVE!
        ])
      } catch (error) {
        log.error('onImport', error)
      }
    }
  )
}
</script>

<template>
  <QFile
    v-model="file"
    dense
    outlined
    counter
    bottom-slots
    label="File"
    :max-file-size="tenMegabytes"
    accept="application/json"
    @rejected="onRejectedImport"
  >
    <template v-slot:before>
      <QBtn :disable="!file" label="Import" color="primary" class="q-mr-xs" @click="onImport()" />
    </template>
    <template v-slot:after>
      <QIcon :name="Icon.CLOSE" @click.stop="file = null" class="cursor-pointer" />
    </template>
  </QFile>
</template>
