<script setup lang="ts">
import { QSeparator, QBtn } from 'quasar'
import { useLogger } from '@/use/useLogger'
import { useTableManager } from '@/use/useTableManager'
import { DexieTable } from '@/constants/data-enums'

const { log } = useLogger()
const { tableManager, logsTable } = useTableManager(DexieTable.LOGS)

async function button1() {
  console.log('---tableManager---')
  console.log('name:', tableManager.name)
  console.log('relatedTable:', tableManager.relatedTable)
  console.log('label:', tableManager.label('plural'))
  console.log('actions:', tableManager.actions)
  console.log('supportedActions:', tableManager.supportedActions)
  console.log('rows:', await tableManager.rows())
  console.log('fields:', tableManager.fields)
  console.log('columns:', tableManager.columns)
  console.log('columnOptions:', tableManager.columnOptions)
  console.log('visibleColumns:', tableManager.visibleColumns)
}

async function button2() {
  console.log('---logsTable---')
  console.log(logsTable)
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
    <QBtn color="primary" label="tableManager" class="q-ma-sm" @click="button1()" />
    <QBtn color="primary" label="logsTable" class="q-ma-sm" @click="button2()" />
    <QBtn color="primary" label="Print" class="q-ma-sm" @click="print()" />
    <QSeparator />
  </div>
</template>
