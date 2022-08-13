<script setup lang="ts">
import type { DexieTable } from '@/constants/data-enums.js'
import { onMounted, computed, ref, type Ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import { useTableManager } from '@/use/useTableManager'
import { LineChart } from 'vue-chart-3'
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

const firstDate: Ref<string> = ref('')
const lastDate: Ref<string> = ref('')

const datasetLabels: Ref<string[]> = ref([])
const datasetData: Ref<number[]> = ref([])

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
      text: props.selectedItem.name,
    },
  },
}

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

onMounted(async () => {
  try {
    const dataset = await TM.actions.report(props.selectedItem.id)
    datasetLabels.value = dataset.labels
    datasetData.value = dataset.data
    firstDate.value = dataset.firstDate
    lastDate.value = dataset.lastDate
  } catch (error) {
    log.critical('PageReport:onMounted', error)
  }
})
</script>

<template>
  <LineChart :options="chartOptions" :chartData="chartData" />
  <div class="q-mb-sm">
    <div class="text-subtitle1 text-weight-bold">First Record Date</div>
    <div>{{ firstDate || '-' }}</div>
  </div>
  <div class="q-mb-sm">
    <div class="text-subtitle1 text-weight-bold">Last Record Date</div>
    <div>{{ lastDate || '-' }}</div>
  </div>
</template>
