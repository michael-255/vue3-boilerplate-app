<script setup lang="ts">
import type { DataObject } from '@/constants/types-interfaces'
import { onMounted, type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'

/**
 * Component displays each data field and value.
 * @param item Row selected from table
 * @param columns Needed to get each field name and label
 */
const props = defineProps<{
  item: DataObject | undefined
  columns: any[]
}>()
const inspectedItem: Ref<DataObject[]> = ref([])

const { log } = useLogger()

/**
 * Builds the displayable properties for the template loop.
 */
onMounted(async () => {
  try {
    if (props.item) {
      inspectedItem.value = Object.keys(props.item).map((key) => {
        return {
          label: props.columns.find((i) => i.name === key).label,
          value: props.item?.[key] || '-',
        }
      })
    } else {
      log.error('Item is undefined', { name: 'PageInspect:onMounted' })
    }
  } catch (error) {
    log.error('PageInspect:onMounted', error)
  }
})
</script>

<template>
  <div v-for="(item, i) in inspectedItem" :key="i">
    <div class="q-mb-sm">
      <div class="text-subtitle1 text-weight-bold">{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>
