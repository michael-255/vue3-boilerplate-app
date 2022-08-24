<script setup lang="ts">
import type { DataObject } from '@/constants/types-interfaces'
import { type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'
import type { AppTable, ExactField } from '@/constants/data-enums'
import { getTableExactFields } from '@/helpers/table-fields'
import { getExactFieldColumnProps } from '@/helpers/field-column-props'
import useSelectedItemStore from '@/stores/selected-item'

/**
 * Component allows you to view the values in each of its internal (Exact) fields.
 * @param table
 */
const props = defineProps<{ table: AppTable }>()
const selected = useSelectedItemStore()
const inspectionValues: Ref<DataObject[]> = ref([])
const { log } = useLogger()

// Setup
try {
  const fields = getTableExactFields(props.table)

  // entry[0] = field name
  // entry[1] = field value
  Object.entries(selected.item).forEach((entry: [string, any]) => {
    // Make sure the field in the store is in the table
    if (fields.includes(entry[0] as ExactField)) {
      // Get the display label for the field
      const label = getExactFieldColumnProps(entry[0] as ExactField)?.label
      // Get the field value or '-' if its falsy
      const value = entry[1] || '-'

      inspectionValues.value.push({ label, value })
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
