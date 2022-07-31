<script setup lang="ts">
import { DexieTable } from '@/constants/data-enums'
import PageTable from '@/components/page/PageTable.vue'
</script>

<template>
  <PageTable :table="DexieTable.LOGS" />
</template>
