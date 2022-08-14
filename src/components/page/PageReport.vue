<script setup lang="ts">
import type { DexieTable } from '@/constants/data-enums.js'
import type { DataObject } from '@/constants/types-interfaces'
import { onMounted, computed, ref, type Ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { useTable } from '@/use/useTable'

/**
 * Component for handling reports for each supported table.
 * @param table
 * @param item Needed for the name and id
 */
const props = defineProps<{
  table: DexieTable
  item: DataObject | undefined
}>()

const { log } = useLogger()
const { getActions } = useTable()

// REPORT
Chart.register(...registerables)

const firstDate: Ref<string> = ref('')
const lastDate: Ref<string> = ref('')

const datasetLabels: Ref<string[]> = ref([])
const datasetData: Ref<number[]> = ref([])

// REPORT OPTIONS
const chartOptions: { [x: string]: any } = {
  responsive: true,
  fill: true,
  radius: 3,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: props.item?.name,
    },
  },
}

// REPORT DATA
const chartData = computed<any>(() => ({
  labels: datasetLabels.value,
  datasets: [
    {
      data: datasetData.value,
      borderColor: 'rgb(25, 118, 210)',
      backgroundColor: 'rgba(25, 118, 210, 0.25)',
    },
  ],
}))

/**
 * Report action called on mount to generate the datasets.
 * @todo
 * Will likely need a table selection object here in the future for different table reports.
 */
onMounted(async () => {
  try {
    const { generateReport } = getActions(props.table)
    if (generateReport) {
      const dataset = await generateReport(props.item?.id)
      datasetLabels.value = dataset.labels
      datasetData.value = dataset.data
      firstDate.value = dataset.firstDate
      lastDate.value = dataset.lastDate
    } else {
      log.error('Missing generateReport action', { name: 'PageReport:onMounted' })
    }
  } catch (error) {
    log.error('PageReport:onMounted', error)
  }
})
</script>

<template>
  <LineChart :options="chartOptions" :chartData="chartData" />
  <!-- Dates below report -->
  <div class="q-mb-sm">
    <div class="text-subtitle1 text-weight-bold">First Record Date</div>
    <div>{{ firstDate || '-' }}</div>
  </div>
  <div class="q-mb-sm">
    <div class="text-subtitle1 text-weight-bold">Last Record Date</div>
    <div>{{ lastDate || '-' }}</div>
  </div>
</template>
