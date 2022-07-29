<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { useLogs } from '@/use/useLogs'
import { useTableManager } from '@/use/useTableManager'
import { DexieTable } from '@/constants/data-enums'

const { log } = useLogs()
const { tableManager, examplesTable } = useTableManager(DexieTable.LOGS)

async function button1() {
  console.log('---tableManager---')
  // console.log(tableManager)
  console.log('name:', tableManager.name)
  console.log('relatedTable:', tableManager.relatedTable)
  console.log('label:', tableManager.label('plural'))
  console.log('actions:', tableManager.actions)
  console.log('rows:', await tableManager.rows())
  console.log('fields:', tableManager.fields)
  console.log('columns:', tableManager.columns)
  console.log('columnOptions:', tableManager.columnOptions)
  console.log('visibleColumns:', tableManager.visibleColumns)
}

async function button2() {
  console.log('---examplesTable---')
  console.log(examplesTable)
}

async function print() {
  console.log('---print---')
  log.debug('debug')
  log.info('info')
  log.warn('wanring')
  log.error('error')
  log.critical('critical')
}
</script>

<template>
  <h3>Dashboard</h3>

  <div class="q-my-sm">
    <QSeparator />
    <QBtn color="primary" label="tableManager" class="q-ma-sm" @click="button1()" />
    <QBtn color="primary" label="examplesTable" class="q-ma-sm" @click="button2()" />
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="print()" />
    <QSeparator />
  </div>
</template>
