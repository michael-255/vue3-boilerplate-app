<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/ui-enums'
import usePageTableStore from '@/stores/page-table'

/**
 * PageDialog is a fullscreen dialog for views that use the PageTable components. You load
 * components needed for operations like Create, Update, and Report inside of its slot.
 */
const emits = defineEmits<{ (eventName: 'on-dialog-close'): void }>()
const pageTable = usePageTableStore()
</script>

<template>
  <QDialog
    v-model="pageTable.dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard>
      <QCardActions class="bg-primary text-white">
        <div class="q-table__title text-weight-bold q-ml-sm">
          {{ pageTable.operation }} {{ pageTable.itemLabel }}
        </div>
        <QSpace />
        <QBtn flat round :icon="Icon.CLOSE" @click="emits('on-dialog-close')" />
      </QCardActions>

      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
