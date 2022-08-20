<script setup lang="ts">
import { QInput, QChip, QCard, QCardSection, QSeparator } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'

// Testing
const rows: Ref<any[]> = ref([])
const primary: Ref<number | undefined | null> = ref(null)
const secondary: Ref<number | undefined | null> = ref(null)

onMounted(() => {
  rows.value = [
    {
      index: 0,
      primary: 5,
      secondary: 10,
    },
    {
      index: 1,
      primary: 10,
      secondary: 20,
    },
    {
      index: 2,
      primary: 15,
      secondary: 30,
    },
    {
      index: 3,
      primary: 20,
      secondary: 40,
    },
  ]
})
</script>

<template>
  <QCard>
    <QCardSection class="text-h6 q-py-xs">Rounds</QCardSection>

    <QSeparator />

    <QCardSection class="q-gutter-md row items-start q-py-none">
      <div>#</div>
      <QSeparator vertical />
      <div>Primary</div>
      <QSeparator vertical />
      <div>Secondary</div>
    </QCardSection>

    <QSeparator />

    <QCardSection>
      <div v-for="(row, index) in rows" :key="index" class="q-gutter-md row items-start">
        <QChip color="primary" class="text-white">
          {{ index + 1 }}
        </QChip>
        <QInput
          v-model.number="primary"
          label="Primary"
          dense
          outlined
          type="number"
          color="primary"
          :placeholder="row?.primary"
          :input-style="{ width: '80px' }"
        />
        <QInput
          v-model.number="secondary"
          label="Secondary"
          dense
          outlined
          type="number"
          color="primary"
          :placeholder="row?.secondary"
          :input-style="{ width: '80px' }"
        />
      </div>
    </QCardSection>
  </QCard>
  <!-- <QTable
    title="Rounds"
    :rows="rows"
    :columns="columns"
    :rows-per-page-options="[0]"
    row-key="index"
  >
    <template v-slot:header="props">
      <QTr :props="props">
        <QTh v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </QTh>
      </QTr>
    </template>

    <template v-slot:body="props">
      <QTr :props="props">
        <QTd v-for="col in props.cols" :key="col.name" :props="props">
          <div v-if="col.name === 'index'">
            {{ col.value }}
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
  </QTable> -->
</template>
