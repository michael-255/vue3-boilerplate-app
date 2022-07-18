<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { Severity } from '@/constants/data-enums'
import { useLogs } from '@/use/useLogs'

const { log, consoleTest } = useLogs()

function set() {
  console.log('---set---')
}

function get() {
  console.log('---get---')
  consoleTest('Hi there!')
}

function print() {
  console.log('---print---')
  log({ error: new Error('XXX'), severity: Severity.DEBUG, callerDetails: 'Hello World!' })
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
