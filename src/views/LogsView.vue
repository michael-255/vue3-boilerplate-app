<script setup lang="ts">
import { Icon } from '@/constants/ui-enums'
import PageTabs from '@/components/page/PageTabs.vue'
</script>

<template>
  <PageTabs
    primaryName="Logs 1"
    :primaryIcon="Icon.TEMPO"
    secondaryName="Logs 2"
    :secondaryIcon="Icon.REST"
  >
    <template v-slot:primary>
      <div>Logs - Primary</div>
    </template>

    <template v-slot:secondary>
      <div>Logs - Secondary</div>
    </template>
  </PageTabs>
</template>
