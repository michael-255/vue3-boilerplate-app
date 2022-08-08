<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { DexieTable } from '@/constants/data-enums'
import { useTableManager } from '@/use/useTableManager.js'
import { isoToDisplayDate } from '@/utils/luxon'

const { log } = useLogger()
const { TM } = useTableManager(DexieTable.LOGS)

async function button1() {
  console.log(isoToDisplayDate(new Date().toISOString()))
}

async function button2() {
  console.log(TM)
}

async function print() {
  console.log('---print---')
  log.debug('debug')
  log.info('info')
  log.warn('warning')
  log.error('error')
  log.critical('critical')
}
</script>

<template>
  <h3>Dashboard</h3>

  <div class="q-my-sm">
    <QSeparator />
    <QBtn color="primary" label="button 1" class="q-ma-sm" @click="button1()" />
    <QBtn color="primary" label="button 2" class="q-ma-sm" @click="button2()" />
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="print()" />
    <QSeparator />
  </div>
</template>
