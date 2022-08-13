<script setup lang="ts">
import { QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import DefaultsBtn from '@/components/buttons/DefaultsBtn.vue'

const { log } = useLogger()

/**
 * @deprecate
 * Temp function for generating test logs in the database.
 */
function generateTestLogs(): void {
  log.debug('This is a Debug Log', {
    name: 'generateTestLogs:Debug',
    message: 'Debug message',
    stack: 'Debug stack',
  })
  log.info('This is a Info Log', {
    name: 'generateTestLogs:Info',
    message: 'Info message',
    stack: 'Info stack',
  })
  log.warn('This is a Warning Log', {
    name: 'generateTestLogs:Warning',
    message: 'Warning message',
    stack: 'Warning stack',
  })
  log.error('This is a Error Log', {
    name: 'generateTestLogs:Error',
    message: 'Error message',
    stack: 'Error stack',
  })
  log.critical('This is a Critical Log', {
    name: 'generateTestLogs:Critical',
    message: 'Critical message',
    stack: 'Critical stack',
  })
}
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <QCard>
        <QCardSection class="bg-primary text-white text-h3">Dashboard</QCardSection>

        <QCardSection>
          This is a Vue 3 Typescript Boilerplate web app. It has basic data table and routing setup
          out of the box. Look through the code and README to get an understanding of how it is
          organized.
        </QCardSection>

        <QCardSection>
          The app settings are located at the right side of the nav bar and the menu is located at
          the left side of the nav bar.
        </QCardSection>

        <QCardSection>
          You can generate test logs that you can view by navigating to the settings and you can
          generate mock example records that you can view by navigating to the menu.
        </QCardSection>

        <QCardActions align="left">
          <QBtn class="q-my-sm" color="primary" label="Generate Logs" @click="generateTestLogs()" />
          <DefaultsBtn />
        </QCardActions>
      </QCard>
    </div>
  </QPage>
</template>
