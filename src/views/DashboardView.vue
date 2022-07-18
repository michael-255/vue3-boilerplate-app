<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { useLogs } from '@/use/useLogs'

const { log, consoleTest } = useLogs()

function set() {
  console.log('---set---')
}

function get() {
  console.log('---get---')
  consoleTest(log)
}

async function print() {
  console.log('---print---')
  await log.debug('debug', new Error(''))
  await log.info('info', new Error(''))
  await log.warn('warn', new Error(''))
  await log.error('error', new Error(''))
  await log.critical('critical', new Error(''))
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
</template>
