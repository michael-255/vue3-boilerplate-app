<script setup lang="ts">
import { DexieTable } from '@/constants/data-enums.js'

/**
 * Component for handling reports for each supported table.
 */

defineProps<{
  table: DexieTable
}>()
</script>

<template>
  <div v-if="table === DexieTable.EXAMPLES">
    <div class="text-bold">{{ DexieTable.EXAMPLES }}</div>
  </div>
  <div v-else>
    <div class="text-bold">Unsupported Table Selected</div>
  </div>
</template>
