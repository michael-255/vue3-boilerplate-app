<script setup lang="ts">
import { QDialog, QCard, QCardSection, QCardActions, QBtn } from 'quasar'
import { Icon } from '@/constants/ui-enums'
import { useUIStore } from '@/stores/ui'
import { useTemporaryItemStore } from '@/stores/temporary'
import { useSelectedItemStore } from '@/stores/selected'
import { useValidateItemStore } from '@/stores/validate'

const ui = useUIStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const validate = useValidateItemStore()

async function deleteTemporaryItem(): Promise<void> {
  selected.$reset()
  temporary.$reset()
  validate.$reset()
  ui.pageTable.dialog = false
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
        <QBtn flat round :icon="Icon.CLOSE" @click="deleteTemporaryItem()" />
      </QCardActions>

      <QCardSection>
        <slot />
      </QCardSection>
    </QCard>
  </QDialog>
</template>
