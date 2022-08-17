<script setup lang="ts">
import type { DataObject } from '@/constants/types-interfaces'
import { onMounted, type Ref, ref } from 'vue'
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

/**
 * Builds the displayable properties for the template loop.
 */
onMounted(async () => {
  try {
    inspectionValues.value = Object.keys(selected.item).map((key) => {
      console.log(JSON.parse(JSON.stringify(selected.item)))
      console.log(inspectionValues)
      return {
        label: props.columns.find((i) => i.name === key).label,
        value: selected.item?.[key] || '-',
      }
    })
  } catch (error) {
    log.error('PageInspect:onMounted', error)
  }
})
</script>

<template>
  <div v-for="(item, i) in inspectionValues" :key="i">
    <div class="q-mb-sm">
      <div class="text-subtitle1 text-weight-bold">{{ item.label }}</div>
      <div>{{ item.value }}</div>
    </div>
  </div>
</template>
