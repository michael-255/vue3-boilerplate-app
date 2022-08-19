<script setup lang="ts">
import type { ColumnProps, DataObject } from '@/constants/types-interfaces'
import { type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import useSelectedItemStore from '@/stores/selected-item'
import usePageTableStore from '@/stores/page-table'

const selected = useSelectedItemStore()
const pageTable = usePageTableStore()
const inspectionValues: Ref<DataObject[]> = ref([])
const { log } = useLogger()

try {
  Object.entries(selected.item).forEach((entry) => {
    if (entry[1]) {
      inspectionValues.value.push({
        label: pageTable.columns.find((col: ColumnProps) => col.name === entry[0])?.label,
        value: entry[1] || '-',
      })
    }
  })
} catch (error) {
  log.error('PageInspect:Setup', error)
}
</script>

<template>
  <div v-for="(item, i) in inspectionValues" :key="i">
    <div class="q-mb-sm">
      <div class="text-subtitle1 text-weight-bold">{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>
