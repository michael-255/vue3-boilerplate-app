<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { DexieTable } from '@/constants/data-enums'
import { useTableManager } from '@/use/useTableManager.js'

const { log } = useLogger()
const { tableManager } = useTableManager(DexieTable.LOGS)

async function button1() {
  console.log('name:', tableManager?.name)
  console.log('relatedTable:', tableManager?.relatedTable)
  console.log('label:', tableManager?.labelPlural)
  console.log('actions:', tableManager?.actions)
  console.log('supportedActions:', tableManager?.supportedOperations)
  console.log('rows:', await tableManager?.rows)
  console.log('fields:', tableManager?.fields)
  console.log('columns:', tableManager?.columns)
  console.log('columnOptions:', tableManager?.columnOptions)
  console.log('visibleColumns:', tableManager?.visibleColumns)
}

async function button2() {
  console.log(tableManager)
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
