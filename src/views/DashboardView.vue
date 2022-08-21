<script setup lang="ts">
import DefaultsBtn from '@/components/settings/DefaultsBtn.vue'
import TestLogsBtn from '@/components/settings/TestLogsBtn.vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { computed } from 'vue'

Chart.register(...registerables)

const testData = [
  {
    createdDate: new Date('2022-01-01').toISOString(),
    number: 1,
    rounds: [
      {
        primary: 45,
        secondary: 92,
      },
      {
        primary: 2,
        secondary: 9,
      },
    ],
  },
  {
    createdDate: new Date('2022-01-02').toISOString(),
    number: 2,
    rounds: [
      {
        primary: 47,
        secondary: 99,
      },
      {
        primary: 76,
        secondary: 65,
      },
    ],
  },
  {
    createdDate: new Date('2022-01-03').toISOString(),
    number: 4,
    rounds: [
      {
        primary: 78,
        secondary: 5,
      },
      {
        primary: 8,
        secondary: 97,
      },
    ],
  },
  {
    createdDate: new Date('2022-01-04').toISOString(),
    number: 8,
    rounds: [
      {
        primary: 76,
        secondary: 33,
      },
      {
        primary: 45,
        secondary: 63,
      },
    ],
  },
  {
    createdDate: new Date('2022-01-05').toISOString(),
    number: 16,
    rounds: [
      {
        primary: 22,
        secondary: 18,
      },
      {
        primary: 66,
        secondary: 99,
      },
    ],
  },
]

// REPORT OPTIONS
const chartOptions: { [x: string]: any } = {
  responsive: true,
  radius: 3,
  plugins: {
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Test Report',
    },
  },
}

// REPORT DATA
const chartData = computed<any>(() => ({
  labels: testData.map((d) => d.createdDate),
  datasets: [
    {
      data: testData.map((d) => d.number),
      borderColor: 'rgb(200, 80, 130)',
      label: 'Number',
    },
    {
      data: highestPrimaries(testData),
      borderColor: 'rgb(25, 118, 210)',
      label: 'Highest Primaries',
    },
    {
      data: lowestSecondaries(testData),
      borderColor: 'rgb(25, 40, 220)',
      label: 'Lowest Secondaries',
    },
  ],
}))

function highestPrimaries(data: any[]) {
  return data.map((d) => {
    // largest item
    return d.rounds.map((r: any) => r.primary).sort((a: number, b: number) => b - a)[0]
  })
}

function lowestSecondaries(data: any[]) {
  return data.map((d) => {
    // smallest item
    return d.rounds.map((r: any) => r.primary).sort((a: number, b: number) => a - b)[0]
  })
}
</script>

<template>
  <QPage padding>
    <div class="row justify-center">
      <QCard>
        <QCardSection class="bg-primary text-white text-h3">Dashboard</QCardSection>

        <QCardSection>
          This is a Vue 3 Typescript Boilerplate web app. It has basic data table and routing setup
          out of the box. Look through the code and README to get an understanding of how it is
          organized.
        </QCardSection>

        <QCardSection>
          The app settings are located at the right side of the nav bar and the menu is located at
          the left side of the nav bar.
        </QCardSection>

        <QCardSection>
          You can generate test logs that you can view by navigating to the settings and you can
          generate mock example records that you can view by navigating to the menu.
        </QCardSection>

        <QCardActions align="left">
          <TestLogsBtn />
          <DefaultsBtn />
        </QCardActions>
      </QCard>
    </div>

    <LineChart :options="chartOptions" :chartData="chartData" />
  </QPage>
</template>
