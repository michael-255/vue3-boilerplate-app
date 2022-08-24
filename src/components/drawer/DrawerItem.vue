<script setup lang="ts">
import { QItem, QItemSection, QIcon } from 'quasar'
import type { Icon } from '@/constants/ui-enums'

/**
 * Drawer list item that is used by MenuLayout.
 */
defineProps<{
  to: string | { [x: string]: any }
  icon: Icon
  label: string
}>()
</script>

<template>
  <QItem clickable v-ripple :to="to">
    <QItemSection avatar>
      <QIcon color="primary" :name="icon" />
    </QItemSection>
    <QItemSection>{{ label }}</QItemSection>
  </QItem>
</template>
