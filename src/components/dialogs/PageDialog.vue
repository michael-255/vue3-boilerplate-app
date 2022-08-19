<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/ui-enums'
import usePageTableStore from '@/stores/page-table'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'

const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const validate = useValidateItemStore()
const pageTable = usePageTableStore()

async function closeDialog(): Promise<void> {
  pageTable.dialog = false
  selected.$reset()
  temporary.$reset()
  validate.$reset()
}
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
        <QBtn flat round :icon="Icon.CLOSE" @click="closeDialog()" />
      </QCardActions>

      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
