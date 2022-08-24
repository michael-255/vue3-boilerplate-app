<script setup lang="ts">
import { QPage, QCard, QCardSection, QSeparator, QBtn } from 'quasar'
import { View } from '@/constants/ui-enums'
import SettingToggles from '@/components/settings/SettingToggles.vue'
import TestLogsBtn from '@/components/settings/TestLogsBtn.vue'
import DefaultsBtn from '@/components/settings/DefaultsBtn.vue'
import ImportInput from '@/components/settings/ImportInput.vue'
import ExportInput from '@/components/settings/ExportInput.vue'
import ClearAllBtn from '@/components/settings/ClearAllBtn.vue'
import DeleteDBBtn from '@/components/settings/DeleteDBBtn.vue'
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
            Turning on Debug Logging will cause all logs to appear in the console. Turning on View
            All Alerts will allow you to see low priority notifications on screen. Turning on Save
            Info Logs will cause informational logs to be stored in the database for later review.
          </div>

          <SettingToggles />

          <TestLogsBtn class="q-mt-sm" />
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

            <QBtn label="View Logs" color="primary" :to="{ name: View.LOGS }" />
          </div>
        </QCardSection>

        <QSeparator />

        <QCardSection>
          <div>
            <div class="text-h6 q-mb-sm">DANGER ZONE</div>

            <div class="q-mb-md">
              Permanetly delete all of your app data or delete the underling Dexie database. This
              action cannot be undone. Export your data if you intend to use it later.
            </div>

            <div>
              <ClearAllBtn />
            </div>
            <div class="q-mt-md">
              <DeleteDBBtn />
            </div>
          </div>
        </QCardSection>
      </QCard>
    </div>
  </QPage>
</template>
