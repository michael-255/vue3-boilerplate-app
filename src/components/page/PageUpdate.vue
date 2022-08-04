<script setup lang="ts">
import { DexieTable, TableField } from '@/constants/data-enums.js'
import { computed } from 'vue'
import { useInputProvide } from '@/use/useInputProvide'

/**
 * Component for handling table item Creates and Updates
 */

const props = defineProps<{
  table: DexieTable // To determine what input data to emit back
  tableColumns: { [x: string]: any }[]
}>()

// TEST
const fieldComponent = computed(() => {
  return props.tableColumns[0].component
})

const { idModel, idValidate } = useInputProvide(TableField.ID)
</script>

<template>
  <component :is="fieldComponent" />
  <component :is="fieldComponent" />
  <component :is="fieldComponent" />
</template>
