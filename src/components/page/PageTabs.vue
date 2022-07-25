<script setup lang="ts">
import { QSeparator, QTabs, QTab, QTabPanels, QTabPanel } from 'quasar'
import type { Icon } from '@/constants/ui-enums'
import { ref } from 'vue'

const props = defineProps<{
  primaryName: string
  primaryIcon: Icon
  secondaryName: string
  secondaryIcon: Icon
}>()

const tab = ref('primary')
</script>

<template>
  <QTabs
    v-model="tab"
    class="bg-grey-2 text-blue-grey"
    align="justify"
    active-color="primary"
    indicator-color="primary"
    inline-label
  >
    <QTab name="primary" :icon="props.primaryIcon" :label="props.primaryName" />
    <QTab name="secondary" :icon="props.secondaryIcon" :label="props.secondaryName" />
  </QTabs>

  <QSeparator />

  <QTabPanels v-model="tab" animated>
    <QTabPanel name="primary" class="q-pa-none">
      <slot name="primary"></slot>
    </QTabPanel>

    <QTabPanel name="secondary" class="q-pa-none">
      <slot name="secondary"></slot>
    </QTabPanel>
  </QTabPanels>
</template>
