<script setup lang="ts">
import { QInput, QTable } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'

// Test Table
const rows: Ref<any[]> = ref([])
const columns: Ref<any[]> = ref([])
// Test Inputs
const primary: Ref<number | undefined | null> = ref(null)
const secondary: Ref<number | undefined | null> = ref(null)

onMounted(() => {
  rows.value = [
    {
      count: 1,
      primary: 10,
      secondary: 20,
    },
    {
      count: 2,
      primary: 15,
      secondary: 40,
    },
    {
      count: 3,
      primary: 20,
      secondary: 80,
    },
  ]
  columns.value = [
    {
      name: 'count',
      label: '#',
      align: 'left',
      sortable: true,
      required: true,
      field: (row: any) => row.count,
      format: (val: number) => val,
    },
    {
      name: 'primary',
      label: 'Primary',
      align: 'left',
      sortable: true,
      required: true,
      field: (row: any) => row.primary,
      format: (val: number) => val,
    },
    {
      name: 'secondary',
      label: 'Secondary',
      align: 'left',
      sortable: true,
      required: true,
      field: (row: any) => row.secondary,
      format: (val: number) => val,
    },
  ]
})

function printThis(value: any): void {
  console.log(value)
}
</script>

<template>
  <QTable title="Rounds" :rows="rows" :columns="columns" :rows-per-page-options="[0]">
    <!-- Column Headers -->
    <template v-slot:header="props">
      <QTr :props="props">
        <QTh v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </QTh>
      </QTr>
    </template>

    <!-- Rows -->
    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="(col, index) in props.cols" :key="col.name" :props="props">
          {{ printThis(index) }}
          <div v-if="col.name === 'count'">
            {{ index + 1 }}
          </div>
          <QInput
            v-else-if="col.name === 'primary'"
            v-model.number="primary"
            label="Primary"
            dense
            outlined
            type="number"
            color="primary"
            :placeholder="col.value"
          />
          <QInput
            v-else-if="col.name === 'secondary'"
            v-model.number="secondary"
            label="Secondary"
            dense
            outlined
            type="number"
            color="primary"
            :placeholder="col.value"
          />
        </QTd>
      </QTr>
    </template>
  </QTable>
</template>
