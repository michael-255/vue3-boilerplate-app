import { defineStore, type StoreDefinition } from 'pinia'
import { isoToDisplayDate } from '@/utils/luxon'

type Dataset = {
  label: string
  borderColor: string
  data: any[]
}

const useReportStore: StoreDefinition = defineStore({
  id: 'report',

  state: () => ({
    workingData: [],
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
  }),

  actions: {
    generateExamplesReport(records: any[]) {
      const highestPrimaries = (data: any[]) => {
        return data.map((d) => {
          return d.rounds
            .map((round: any) => {
              return round?.primary
            })
            .sort((a: number, b: number) => b - a)[0] // largest item
        })
      }

      const lowestSecondaries = (data: any[]) => {
        return data.map((d) => {
          return d.rounds
            .map((round: any) => {
              return round?.secondary
            })
            .sort((a: number, b: number) => a - b)[0] // smallest item
        })
      }

      const numbers = (data: any[]) => {
        return data.map((d: any) => d?.number)
      }

      const datasets: Dataset[] = []

      datasets.push({
        label: 'Highest Primaries',
        borderColor: 'rgb(25, 118, 210)',
        data: highestPrimaries(records),
      })
      datasets.push({
        label: 'Lowest Secondaries',
        borderColor: 'rgb(25, 40, 220)',
        data: lowestSecondaries(records),
      })
      datasets.push({
        label: 'Number',
        borderColor: 'rgb(200, 80, 130)',
        data: numbers(records),
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
