<script setup lang="ts">
import { QBtn } from 'quasar'
import { v4 as createId } from 'uuid'
import { useLogger } from '@/use/useLogger'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { Icon, NotifyColor } from '@/constants/ui-enums'
import { Example } from '@/models/Example'
import { DB } from '@/services/LocalDatabase'
import { AppTable } from '@/constants/data-enums'
import { ExampleRecord } from '@/models/ExampleRecord'

const { log } = useLogger()
const { confirmDialog } = useSimpleDialogs()

/**
 * Confirm if you want to load defaults into your tables.
 */
function onDefaults(): void {
  confirmDialog(
    'Load Defaults',
    'Load default entires into appropriate tables in the database?',
    Icon.INFO,
    NotifyColor.INFO,
    async (): Promise<void> => {
      try {
        await createExampleDefaults() // TEMP FUNCTION
      } catch (error) {
        log.error('onDefaults', error)
      }
    }
  )
}

/**
 * @deprecate
 * Temporary function that creates example records for viewing.
 */
async function createExampleDefaults(): Promise<void> {
  let date = new Date('2022/01/01')
  const limit = 2

  // Generating unique ids for the main Example items
  const ids = []
  for (let i = 0; i < limit; i++) {
    ids.push(createId())
  }

  const defaultExamples = []
  const defaultExampleRecords = []
  for (let i = 0; i < limit; i++) {
    // Add the Example item
    defaultExamples.push(
      new Example({
        id: ids[i],
        createdDate: date.toISOString(),
        name: `Example ${i}`,
        description: 'Default Example!',
      })
    )

    for (let j = 0; j < 30; j++) {
      // Increment the date by 1 day each iteration
      date = new Date(date.setDate(date.getDate() + 1))
      // Add the Example Record item
      defaultExampleRecords.push(
        // Building random values that trend so reports look interesting
        new ExampleRecord({
          id: createId(),
          createdDate: date.toISOString(),
          parentId: ids[i],
          number: Number(Math.random().toString(10).substring(2, 3)) + i + j,
          primaryRounds: [
            Number(Math.random().toString(10).substring(2, 3)) + i + 50 - j,
            Number(Math.random().toString(10).substring(2, 3)) + i,
          ],
          secondaryRounds: [
            Number(Math.random().toString(10).substring(2, 3)) + i + 50 - j,
            Number(Math.random().toString(10).substring(2, 3)) + i,
          ],
        })
      )
    }
  }

  await DB.bulkAdd(AppTable.EXAMPLES, defaultExamples)
  await DB.bulkAdd(AppTable.EXAMPLE_RECORDS, defaultExampleRecords)
}
</script>

<template>
  <QBtn label="Load Defaults" color="primary" @click="onDefaults()" />
</template>
