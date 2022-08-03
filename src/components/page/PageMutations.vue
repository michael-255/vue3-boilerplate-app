<script setup lang="ts">
import { DexieTable } from '@/constants/data-enums.js'

defineProps<{
  table: DexieTable
}>()
</script>

<template>
  <div v-if="table === DexieTable.EXAMPLES">
    <div class="text-bold">{{ DexieTable.EXAMPLES }}</div>
  </div>
  <div v-else-if="table === DexieTable.EXAMPLE_RECORDS">
    <div class="text-bold">{{ DexieTable.EXAMPLE_RECORDS }}</div>
  </div>
  <div v-else-if="table === DexieTable.LOGS">
    <div class="text-bold">{{ DexieTable.LOGS }}</div>
  </div>
  <div v-else>
    <div class="text-bold">Unsupported Table Selected</div>
  </div>
</template>
