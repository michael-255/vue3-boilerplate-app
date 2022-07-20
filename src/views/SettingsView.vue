<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { type Ref, ref, computed } from 'vue'

const settings = useSettingsStore()

const importText: Ref<string> = ref('')
const exportText: Ref<string> = ref(`export-${new Date().toISOString().split('T')[0]}`)

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
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <QCard>
        <QCardSection class="bg-primary text-white">
          <div class="text-h3">Settings</div>
        </QCardSection>

        <QCardSection>
          <div>
            <div class="text-h6 q-mb-md">Debugging & Notifications</div>
            <div class="q-mb-md">
              Turning Debug on will cause all logs to appear in the console. Turning on Notify will
              allow you to see low priority notifications on screen.
            </div>
            <div><QToggle v-model="DEBUG" />Debug</div>
            <div><QToggle v-model="NOTIFY" />Notify</div>
          </div>

          <QSeparator class="q-my-md" />

          <div>
            <div class="text-h6 q-mb-md">Pre-Configured Defaults</div>
            <div class="q-mb-md">
              Load default data into the database that you can begin using right away.
            </div>
            <div class="q-mb-md">
              <QBtn label="Load All Defaults" color="primary" />
            </div>
            <div class="q-mb-md">
              <QBtn label="Load Examples" color="primary" />
            </div>
          </div>

          <QSeparator class="q-my-md" />

          <div class="q-mb-md">
            <div class="text-h6 q-mb-md">Import & Export</div>
            <div class="q-mb-md">You can import data into the app database from a JSON file.</div>
            <QInput v-model="importText" class="q-mb-md" dense outlined>
              <template v-slot:before>
                <QBtn :disable="!importText" label="Import" color="primary" class="q-mr-xs" />
              </template>
            </QInput>
            <div class="q-mb-md">You can export the entire app database as a JSON file.</div>
            <QInput v-model="exportText" class="q-mb-md" dense outlined>
              <template v-slot:before>
                <QBtn :disable="!exportText" label="Export" color="primary" class="q-mr-xs" />
              </template>
            </QInput>
          </div>

          <QSeparator class="q-my-md" />

          <div>
            <div class="text-h6 q-mb-md">Application Logs</div>
            <div class="q-mb-md">View your app logs to troubleshoot issues and errors.</div>
            <QBtn label="View Logs" color="primary" />
          </div>

          <QSeparator class="q-my-md" />

          <div>
            <div class="text-h6 q-mb-md">DANGER ZONE</div>
            <div class="q-mb-md">
              Permanetly delete all of your app data. This action cannot be undone. Export your data
              if you intend to use it later.
            </div>
            <QBtn label="Clear All App Data" color="red" />
          </div>
        </QCardSection>
      </QCard>
    </div>
  </QPage>
</template>
