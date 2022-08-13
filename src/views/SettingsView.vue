<script setup lang="ts">
import { QPage, QCard, QCardSection, QSeparator, QBtn, QToggle } from 'quasar'
import { useSettingsStore } from '@/stores/settings'
import { computed } from 'vue'
import { Views } from '@/constants/ui-enums'
import DefaultsBtn from '@/components/buttons/DefaultsBtn.vue'
import ImportInput from '@/components/inputs/ImportInput.vue'
import ExportInput from '@/components/inputs/ExportInput.vue'
import ClearAllBtn from '@/components/buttons/ClearAllBtn.vue'

const settings = useSettingsStore()

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

          <DefaultsBtn />
        </QCardSection>

        <QSeparator />

        <QCardSection>
          <div class="text-h6 q-mb-sm">Import & Export</div>

          <div class="q-mb-md">You can import data into the app database from a JSON file.</div>
          <ImportInput />

          <div class="q-mb-md">You can export the entire app database as a JSON file.</div>
          <ExportInput />
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

            <ClearAllBtn />
          </div>
        </QCardSection>
      </QCard>
    </div>
  </QPage>
</template>
