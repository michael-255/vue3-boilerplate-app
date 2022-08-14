<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import type { Operation } from '@/constants/data-enums'
import { Icon } from '@/constants/ui-enums'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  dialog: boolean
  action: Operation
  label: string
}>()
const emits = defineEmits<{
  (event: 'update:dialog', bool: boolean): void
}>()

const dialog = useVModel(props, 'dialog', emits)
</script>

<template>
  <QDialog
    v-model="dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard>
      <QCardActions class="bg-primary text-white">
        <div class="q-table__title text-weight-bold q-ml-sm">{{ action }}</div>
        <QSpace />
        <QBtn flat round :icon="Icon.CLOSE" v-close-popup />
      </QCardActions>

      <QCardSection class="q-table__title text-weight-bold">{{ label }}</QCardSection>

      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
