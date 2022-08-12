<script setup lang="ts">
import { DexieTable } from '@/constants/data-enums.js'
import { onMounted } from 'vue'
import { useLogger } from '@/use/useLogger'
import { useTableManager } from '@/use/useTableManager'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

/**
 * Component for handling reports for each supported table.
 */

const props = defineProps<{
  table: DexieTable
  selectedItem: { [x: string]: any }
}>()

const { log } = useLogger()
const { TM } = useTableManager(props.table)

// Report
Chart.register(...registerables)
const testData = {
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}

onMounted(async () => {
  try {
    const { id, createdDate, name, description, parentId, value } = props.selectedItem
    await TM.actions.report({
      id,
      createdDate,
      name,
      description,
      parentId,
      value,
    })
  } catch (error) {
    log.critical('PageReport:onMounted', error)
  }
})
</script>

<template>
  <div class="text-bold">{{ DexieTable.EXAMPLES }}</div>
  <div>{{ selectedItem }}</div>
  <DoughnutChart :chartData="testData" />
</template>
