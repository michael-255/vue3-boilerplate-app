<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/ui-enums'
import { useUIStore } from '@/stores/ui'
import { useTemporaryItemStore } from '@/stores/temporary-item'
import { useSelectedItemStore } from '@/stores/selected-item'
import { useValidateItemStore } from '@/stores/validate-item'

const ui = useUIStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const validate = useValidateItemStore()

async function closeDialog(): Promise<void> {
  ui.pageTable.dialog = false
  selected.$reset()
  temporary.$reset()
  validate.$reset()
}
</script>

<template>
  <QDialog
    v-model="ui.pageTable.dialog"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <QCard>
      <QCardActions class="bg-primary text-white">
        <div class="q-table__title text-weight-bold q-ml-sm">
          {{ ui.pageTable.operation }} {{ ui.pageTable.itemLabel }}
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
