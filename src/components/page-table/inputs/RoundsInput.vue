<script setup lang="ts">
import { QInput, QTable } from 'quasar'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'
import { ref, type Ref } from 'vue'

/**
 * @todo
 * - Not going to use an InputRef for validation (just too difficult to implement)
 * - Going to cast the value to undefined if it is not a positive number
 * - Going to use a data table to ADD and REMOVE buttons for the rounds
 * - Will need to determine what the ROWS and COLUMNS need to be for the table
 * - Add ROUNDS to ingored fields in your tests
 * - Don't worry about reusing this component for the Active Page (that will be a different component)
 * - What do I do when multiple components need the same ref (sets)???
 */

const { roundsModel } = useInjectTableInputs()

const primary: Ref<number> = ref(0)
const secondary: Ref<number> = ref(0)

const rows = ref([])
const columns = ref([])

function updateRounds(): void {
  roundsModel.value = [
    {
      primary: primary.value && primary.value > 0 ? primary.value : undefined,
      secondary: secondary.value && secondary.value > 0 ? secondary.value : undefined,
    },
  ]

  console.log(roundsModel.value)
}
</script>

<template>
  <QTable title="Rounds" :rows="rows" :columns="columns">
    <!-- Column Headers -->
    <template v-slot:header>
      <QTr>
        <QTh> Round </QTh>
        <QTh>
          <QInput
            v-model.number="primary"
            label="Primary"
            dense
            outlined
            type="number"
            color="primary"
            class="q-mb-xs"
            @blur="updateRounds()"
          />
        </QTh>
        <QTh>
          <QInput
            v-model.number="secondary"
            label="Secondary"
            dense
            outlined
            type="number"
            color="primary"
            class="q-mb-xs"
            @blur="updateRounds()"
          />
        </QTh>
        <QTh auto-width />
      </QTr>
    </template>

    <!-- Rows -->
    <template v-slot:body>
      <QTr>
        <QTd> 1 </QTd>
        <QTd> 2 </QTd>
        <QTd> 3 </QTd>
      </QTr>
    </template>
  </QTable>
</template>
