<script setup lang="ts">
import { Icon } from '@/constants/ui-enums'
import { DexieTable } from '@/constants/data-enums'
import PageTabs from '@/components/page/PageTabs.vue'
import PageTable from '@/components/page/PageTable.vue'
</script>

<template>
  <PageTabs
    primaryName="Activities"
    :primaryIcon="Icon.ACTIVITIES"
    secondaryName="Records"
    :secondaryIcon="Icon.RECORDS"
  >
    <template v-slot:primary>
      <PageTable :table="DexieTable.EXAMPLES" />
    </template>

    <template v-slot:secondary>
      <PageTable :table="DexieTable.EXAMPLE_RECORDS" />
    </template>
  </PageTabs>
</template>
