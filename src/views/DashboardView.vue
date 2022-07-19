<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'

function set() {
  console.log('---set---')
}

function get() {
  console.log('---get---')
}

async function print() {
  console.log('---print---')
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
