<script setup lang="ts">
import { QSeparator, QBtn, QCard, QCardSection, QToggle, QInput } from 'quasar'
import { useLogs } from '@/use/useLogs'

const { log } = useLogs()

const test = false
const test2 = ''

function set() {
  console.log('---set---')
}

function get() {
  console.log('---get---')
}

async function print() {
  console.log('---print---')
  log.debug('A')
  log.info('A')
  log.warn('A')
  log.error('A')
  log.critical('A')
}
</script>

<template>
  <h3>Dashboard</h3>

  <div class="q-my-sm">
    <QSeparator />
    <QBtn color="primary" label="Set" class="q-ma-sm" @click="set()" />
    <QBtn color="primary" label="Get" class="q-ma-sm" @click="get()" />
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="print()" />
    <QSeparator />
  </div>

  <QSeparator />
  Settings Below
  <QSeparator />

  <QCard>
    <QCardSection>
      <!-- TODO - Need heading sections for certain parts -->
      <div>
        <div class="q-mb-sm">Info about what debug is and does.</div>
        <QToggle v-model="test" />Debug
      </div>

      <QSeparator class="q-my-md" />

      <div>
        <div class="q-mb-sm">Info about what notify is and does.</div>
        <QToggle v-model="test" />Notify
      </div>

      <QSeparator class="q-my-md" />

      <div>
        <div class="q-mb-sm">Info about loading default data for you to use (activities).</div>
        <QBtn label="Load Defaults" color="primary" />
      </div>

      <QSeparator class="q-my-md" />

      <div>
        <div class="q-mb-sm">Info about import formating and what it expects.</div>
        <QInput v-model="test2" dense outlined>
          <template v-slot:after>
            <QBtn label="Import" color="primary" class="q-ml-xs" />
          </template>
        </QInput>
      </div>

      <QSeparator class="q-my-md" />

      <div>
        <div class="q-mb-sm">Info about exporting your data and what it will look like.</div>
        <QBtn label="Export" color="primary" />
      </div>

      <QSeparator class="q-my-md" />

      <div>
        <div class="q-mb-sm">Permanetly delete all of your app data (CLEAR).</div>
        <QBtn label="Clear All App Data" color="red" />
      </div>
    </QCardSection>
  </QCard>
</template>
