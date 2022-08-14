<script setup lang="ts">
import { AppTable } from '@/constants/data-enums'
import PageTable from '@/components/page/PageTable.vue'
</script>

<template>
  <PageTable :table="AppTable.LOGS" />
</template>
