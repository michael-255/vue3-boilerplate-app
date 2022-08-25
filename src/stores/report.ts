import { defineStore, type StoreDefinition } from 'pinia'
import { isoToDisplayDate } from '@/utils/luxon'

type ReportState = {
  options: ReportOptions
  chartData: ReportChartData
  firstDate: string
  lastDate: string
}

type ReportOptions = {
  responsive: boolean
  radius: number
  plugins: ReportPlugins
}

type ReportPlugins = { [x: string]: any }

type ReportChartData = {
  labels: any[]
  datasets: ReportDataset[]
}

type ReportDataset = {
  label: string
  borderColor: string
  data: any[]
}

/**
 * All data needed for displaying a specific report should be generated and stored here.
 */
const useReportStore: StoreDefinition = defineStore({
  id: 'report',

  state: () =>
    ({
      options: {
        responsive: true,
        radius: 3,
        plugins: {
          title: {
            display: true,
            text: '',
          },
          legend: {
            display: true,
          },
        },
      },
      chartData: {
        labels: [],
        datasets: [],
      },
      firstDate: '-',
      lastDate: '-',
    } as ReportState),

  actions: {
    generateExamplesReport(records: any[]) {
      const highestPrimaries = records.map((r) => {
        return r.primaryRounds.sort((a: number, b: number) => b - a)[0] // largest item
      })

      const lowestSecondaries = records.map((r) => {
        return r.secondaryRounds.sort((a: number, b: number) => a - b)[0] // smallest item
      })

      const numbers = records.map((d: any) => d?.number)

      const datasets: ReportDataset[] = []

      datasets.push({
        label: 'Highest Primaries',
        borderColor: 'rgb(25, 118, 210)',
        data: highestPrimaries,
      })
      datasets.push({
        label: 'Lowest Secondaries',
        borderColor: 'rgb(25, 40, 220)',
        data: lowestSecondaries,
      })
      datasets.push({
        label: 'Number',
        borderColor: 'rgb(200, 80, 130)',
        data: numbers,
      })

      this.options.plugins.title.text = 'Example Report'
      this.chartData.labels = records.map(() => '')
      this.chartData.datasets = datasets
      this.firstDate = isoToDisplayDate(records[0]?.createdDate)
      this.lastDate = isoToDisplayDate(records[records.length - 1]?.createdDate)
    },
  },
})

export default useReportStore
