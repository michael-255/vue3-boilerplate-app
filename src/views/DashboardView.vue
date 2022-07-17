<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'

enum Severity {
  DEBUG = 'Debug',
  INFO = 'Info',
  WARN = 'Warning',
  ERROR = 'Error',
  CRITICAL = 'Critical',
}

// const Severity: Readonly<string[]> = ['Debug', 'Info', 'Warning', 'Error', 'Critical']

function set() {
  console.log('set')
}

function get() {
  console.log('get')
  console.log(Object.keys(Severity)[0])
}
2

function print() {
  console.log('print')
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
