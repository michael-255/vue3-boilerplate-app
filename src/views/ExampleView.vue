<script setup lang="ts">
import { Icon } from '@/constants/ui-enums'
import PageTabs from '@/components/page/PageTabs.vue'
import DefaultsButton from '@/components/buttons/DefaultsButton.vue'
</script>

<template>
  <PageTabs
    primaryName="Activities"
    :primaryIcon="Icon.ACTIVITIES"
    secondaryName="Records"
    :secondaryIcon="Icon.RECORDS"
  >
    <template v-slot:primary>
      <div>Primary</div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
      <div><DefaultsButton /></div>
    </template>

    <template v-slot:secondary>
      <div>Secondary</div>
    </template>
  </PageTabs>
</template>
