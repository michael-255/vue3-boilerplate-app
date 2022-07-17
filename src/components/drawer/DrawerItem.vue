<script setup lang="ts">
import { QItem, QItemSection, QIcon } from 'quasar'
import type { Icon } from '@/constants/ui-enums'

defineProps<{
  to: string | object
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
