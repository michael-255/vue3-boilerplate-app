<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { useLogs } from '@/use/useLogs'
import { useSettingsStore } from '@/stores/settings'

const { log } = useLogs()
const settings = useSettingsStore()

async function debugToggle() {
  await settings.setDEBUG(!settings.DEBUG)
  console.log('DEBUG:', settings.DEBUG)
}

async function notifyToggle() {
  await settings.setNOTIFY(!settings.NOTIFY)
  console.log('NOTIFY:', settings.NOTIFY)
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
    <QBtn color="primary" label="debugToggle" class="q-ma-sm" @click="debugToggle()" />
    <QBtn color="primary" label="notifyToggle" class="q-ma-sm" @click="notifyToggle()" />
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="print()" />
    <QSeparator />
  </div>
</template>
