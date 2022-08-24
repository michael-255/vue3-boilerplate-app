<script setup lang="ts">
import { QFile, QBtn } from 'quasar'
import { type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { AppTable } from '@/constants/data-enums'
import { AppData } from '@/models/AppData'
import { DB } from '@/services/LocalDatabase'
import { Icon, NotifyColor } from '@/constants/ui-enums'

const { log, consoleDebug } = useLogger()
const { confirmDialog } = useSimpleDialogs()

const file: Ref<any> = ref(null)
const tenMegabytes = 10485760

/**
 *
 * @param entries
 */
function onRejectedImport(entries: any): void {
  const fileName = entries[0]?.file?.name || undefined
  const size = entries[0]?.file?.size || undefined
  const type = entries[0]?.file?.type || undefined
  const name = entries[0]?.failedPropValidation || undefined

  consoleDebug(entries)

  log.warn(`Cannot import ${fileName}`, {
    name: name,
    message: `NAME: ${fileName}, SIZE: ${size}, TYPE: ${type}`,
    stack: 'onRejectedImport',
  })
}

/**
 * Confirm if you want to import your data from a JSON file.
 */
function onImport(): void {
  confirmDialog(
    'Import',
    `Import file "${file.value.name}" and attempt to load data from it?`,
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        await confirmedFileImport()
      } catch (error) {
        log.error('onImport', error)
      }
    }
  )
}

/**
 * Imports data properties it can parse using the AppData class that are defined in this function.
 */
async function confirmedFileImport(): Promise<void> {
  const fileData = await file.value.text()
  const parsedFileData = JSON.parse(fileData)

  /**
   * @see
   * ONLY TABLES DEFINED BELOW GET IMPORTED
   */
  const appData = new AppData({
    examples: parsedFileData?.examples,
    exampleRecords: parsedFileData?.exampleRecords,
    logs: parsedFileData?.logs, // Included to view in the console
    settings: parsedFileData?.settings, // Included to view in the console
  })

  consoleDebug(appData)

  /**
   * @see
   * TABLE NOT LISTED HERE ARE NOT IMPORTED
   */
  await Promise.all([
    DB.bulkAdd(AppTable.EXAMPLES, appData?.examples),
    DB.bulkAdd(AppTable.EXAMPLE_RECORDS, appData?.examples),
  ])
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
