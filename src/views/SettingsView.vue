<script setup lang="ts">
import {
  exportFile,
  QPage,
  QCard,
  QCardSection,
  QFile,
  QSeparator,
  QBtn,
  QToggle,
  QInput,
} from 'quasar'
import { useSettingsStore } from '@/stores/settings'
import { type Ref, ref, computed } from 'vue'
import { useLogs } from '@/use/useLogs'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { DexieTable } from '@/constants/data-enums'
import { AppData } from '@/models/AppData'
import { db } from '@/services/LocalDatabase'
import { Icon, NotifyColor, Views } from '@/constants/ui-enums'
import ClearButton from '@/components/buttons/ClearButton.vue'

const { log, consoleDebug } = useLogs()
const { confirmDialog } = useSimpleDialogs()
const settings = useSettingsStore()

const file: Ref<any> = ref(null)
const exportText: Ref<string> = ref('')

const DEBUG = computed({
  get() {
    return settings.DEBUG
  },
  async set(bool: boolean) {
    await settings.setDEBUG(bool)
  },
})

const NOTIFY = computed({
  get() {
    return settings.NOTIFY
  },
  async set(bool: boolean) {
    await settings.setNOTIFY(bool)
  },
})

function onRejectedImport(entries: any): void {
  const fileName = entries[0]?.file?.name
  log.warn(`Cannot import ${fileName}`, {
    errorName: entries[0]?.failedPropValidation,
    message: `${fileName}, ${entries[0]?.file?.size}, ${entries[0]?.file?.type}`,
  })
}

function onLoadAllDefaults(): void {
  confirmDialog(
    'Load All Defaults',
    'Load default entires into all tables in the database?',
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        await console.log('onLoadAllDefaults')
      } catch (error) {
        log.error('onLoadAllDefaults', error)
      }
    }
  )
}

function onLoadExampleDefaults(): void {
  confirmDialog(
    'Load Example Defaults',
    'Load default entires into the Examples table in the database?',
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        await console.log('onLoadExampleDefaults')
      } catch (error) {
        log.error('onLoadExampleDefaults', error)
      }
    }
  )
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
          db.bulkAdd(DexieTable.EXAMPLES, appData?.examples),
          db.bulkAdd(DexieTable.LOGS, appData?.logs), // @todo - TEMP REMOVE!
        ])
      } catch (error) {
        log.error('onImport', error)
      }
    }
  )
}

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
          examples: await db.getAll(DexieTable.EXAMPLES),
          logs: await db.getAll(DexieTable.LOGS),
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
  <QPage padding>
    <div class="row justify-center">
      <QCard>
        <QCardSection class="bg-primary text-white">
          <div class="text-h3">Settings</div>
        </QCardSection>

        <QCardSection>
          <div class="text-h6 q-mb-sm">Debugging & Notifications</div>

          <div class="q-mb-sm">
            Turning Debug on will cause all logs to appear in the console. Turning on Notify will
            allow you to see low priority notifications on screen.
          </div>

          <div><QToggle v-model="DEBUG" />Debug</div>
          <div><QToggle v-model="NOTIFY" />Notify</div>
        </QCardSection>

        <QSeparator />

        <QCardSection>
          <div class="text-h6 q-mb-sm">Pre-Configured Defaults</div>

          <div class="q-mb-md">
            Load default data into the database that you can begin using right away.
          </div>

          <div class="q-mb-md">
            <QBtn label="Load All Defaults" color="primary" @click="onLoadAllDefaults()" />
          </div>
          <div>
            <QBtn label="Load Examples" color="primary" @click="onLoadExampleDefaults()" />
          </div>
        </QCardSection>

        <QSeparator />

        <QCardSection>
          <div class="text-h6 q-mb-sm">Import & Export</div>

          <div class="q-mb-md">You can import data into the app database from a JSON file.</div>
          <QFile
            v-model="file"
            dense
            outlined
            counter
            bottom-slots
            label="File"
            max-file-size="10485760"
            accept="application/json"
            @rejected="onRejectedImport"
          >
            <template v-slot:before>
              <QBtn
                :disable="!file"
                label="Import"
                color="primary"
                class="q-mr-xs"
                @click="onImport()"
              />
            </template>
            <template v-slot:after>
              <QIcon :name="Icon.CLOSE" @click.stop="file = null" class="cursor-pointer" />
            </template>
          </QFile>

          <div class="q-mb-md">You can export the entire app database as a JSON file.</div>
          <QInput v-model="exportText" dense outlined placeholder="Optional Name">
            <template v-slot:before>
              <QBtn label="Export" color="primary" class="q-mr-xs" @click="onExport()" />
            </template>
            <template v-slot:after>
              <QIcon :name="Icon.CLOSE" @click.stop="exportText = ''" class="cursor-pointer" />
            </template>
          </QInput>
        </QCardSection>

        <QSeparator />

        <QCardSection>
          <div>
            <div class="text-h6 q-mb-sm">Application Logs</div>

            <div class="q-mb-md">View your app logs to troubleshoot errors.</div>

            <QBtn label="View Logs" color="primary" :to="{ name: Views.LOGS }" />
          </div>
        </QCardSection>

        <QSeparator />

        <QCardSection>
          <div>
            <div class="text-h6 q-mb-sm">DANGER ZONE</div>

            <div class="q-mb-md">
              Permanetly delete all of your app data. This action cannot be undone. Export your data
              if you intend to use it later.
            </div>

            <ClearButton table="ALL" label="Clear All App Data" />
          </div>
        </QCardSection>
      </QCard>
    </div>
  </QPage>
</template>
