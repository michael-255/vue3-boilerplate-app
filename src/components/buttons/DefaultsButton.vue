<script setup lang="ts">
import { QBtn } from 'quasar'
import { v4 as createId } from 'uuid'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { Example } from '@/models/Example'
import { DB } from '@/services/LocalDatabase'
import { DexieTable } from '@/constants/data-enums'
import { ExampleRecord } from '@/models/ExampleRecord'

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()

/**
 * @todo ability to load defaults of many types
 */

function onDefaults(): void {
  confirmDialog(
    'Load All Defaults',
    'Load default entires into appropriate tables in the database?',
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        await createExampleDefaults() // TEMP
      } catch (error) {
        log.error('onDefaults', error)
      }
    }
  )
}

/**
 * Temp function to create example records for viewing.
 */
async function createExampleDefaults(): Promise<void> {
  const limit = 5

  const ids = []
  for (let i = 0; i < limit; i++) {
    ids.push(createId())
  }

  const defaultExamples = []
  const defaultExampleRecords = []
  for (let i = 0; i < limit; i++) {
    defaultExamples.push(
      new Example({
        id: ids[i],
        createdDate: new Date().toISOString(),
        name: `Example ${i}`,
        description: 'Default Example!',
      })
    )
    // Build out records for the Example item
    for (let j = 0; j < 20; j++) {
      defaultExampleRecords.push(
        new ExampleRecord({
          id: createId(),
          createdDate: new Date().toISOString(),
          parentId: ids[i],
          value: Number(Math.random().toString(10).substring(2, 4)) + i + j, // Steady increase
        })
      )
    }
  }

  await DB.bulkAdd(DexieTable.EXAMPLES, defaultExamples)
  await DB.bulkAdd(DexieTable.EXAMPLE_RECORDS, defaultExampleRecords)
}
</script>

<template>
  <QBtn label="Load All Defaults" color="primary" @click="onDefaults()" />
</template>
