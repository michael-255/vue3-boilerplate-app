<script setup lang="ts">
import { Icon } from '@/constants/ui-enums'
import { AppTable } from '@/constants/data-enums'
import PageTabs from '@/components/page-table/PageTabs.vue'
import PageTable from '@/components/page-table/PageTable.vue'
</script>

<template>
  <PageTabs
    primaryName="Activities"
    :primaryIcon="Icon.ACTIVITIES"
    secondaryName="Records"
    :secondaryIcon="Icon.RECORDS"
  >
    <template v-slot:primary>
      <PageTable :table="AppTable.EXAMPLES" />
    </template>

    <template v-slot:secondary>
      <PageTable :table="AppTable.EXAMPLE_RECORDS" />
    </template>
  </PageTabs>
</template>
