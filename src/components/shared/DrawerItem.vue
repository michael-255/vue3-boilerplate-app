<script setup lang="ts">
import { QItem, QItemSection, QIcon } from 'quasar'

defineProps<{
  to: string
  icon: string
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
