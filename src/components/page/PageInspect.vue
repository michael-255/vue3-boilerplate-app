<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import { useLogger } from '@/use/useLogger'

/**
 * Component displays each data field and value.
 * @param selectedItem Row selected from table
 * @param columns Needed to get each field name and label
 */
const props = defineProps<{
  selectedItem: any
  columns: any[]
}>()
const inspectedItem: Ref<{ label: string; value: any }[]> = ref([])

const { log } = useLogger()

/**
 * Builds the displayable properties for the template loop.
 */
onMounted(async () => {
  try {
    inspectedItem.value = Object.keys(props.selectedItem).map((key) => {
      return {
        label: props.columns.find((i) => i.name === key).label,
        value: props.selectedItem[key] || '-',
      }
    })
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
