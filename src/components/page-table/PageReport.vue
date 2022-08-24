<script setup lang="ts">
import type { AppTable } from '@/constants/data-enums.js'
import { onMounted } from 'vue'
import { useLogger } from '@/use/useLogger'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import useSelectedItemStore from '@/stores/selected-item'
import { getTableActions } from '@/helpers/table-actions'
import useReportStore from '@/stores/report'

/**
 * Component for handling reports for each supported table.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const selected = useSelectedItemStore()
const report = useReportStore()
const { log } = useLogger()
Chart.register(...registerables)

/**
 * Generating the report on mount for the table item.
 */
onMounted(async () => {
  try {
    const { generateReport } = getTableActions(props.table)
    if (generateReport) {
      await generateReport(selected.item?.id)
    } else {
      log.error('Missing generateReport action', { name: 'PageReport:onMounted' })
    }
  } catch (error) {
    log.error('PageReport:onMounted', error)
  }
})
</script>

<template>
  <LineChart :options="report.options" :chartData="report.chartData" />
  <!-- Dates below report -->
  <div class="q-mb-sm">
    <div class="text-subtitle1 text-weight-bold">First Record Date</div>
    <div>{{ report.firstDate || '-' }}</div>
  </div>
  <div class="q-mb-sm">
    <div class="text-subtitle1 text-weight-bold">Last Record Date</div>
    <div>{{ report.lastDate || '-' }}</div>
  </div>
</template>
