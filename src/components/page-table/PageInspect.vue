<script setup lang="ts">
import type { DataObject } from '@/constants/types-interfaces'
import { type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import { useSelectedItemStore } from '@/stores/selected'

const selected = useSelectedItemStore()

/**
 * Component displays each data field and value.
 * @param columns Needed to get each field name and label
 */
const props = defineProps<{ columns: any[] }>()
const inspectionValues: Ref<DataObject[]> = ref([])
const { log } = useLogger()

try {
  Object.entries(selected.item).forEach((entry) => {
    if (entry[1]) {
      inspectionValues.value.push({
        label: props.columns.find((i) => i?.name === entry[0])?.label,
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
