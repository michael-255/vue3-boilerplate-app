<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'

const props = defineProps<{
  selectedItem: any
  columns: any[]
}>()

const inspectedItem: Ref<{ label: string; value: any }[]> = ref([])

onMounted(async () => {
  inspectedItem.value = Object.keys(props.selectedItem).map((key) => {
    return {
      label: props.columns.find((i) => i.name === key).label,
      value: props.selectedItem[key] || '-',
    }
  })
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
