<script setup lang="ts">
import { QBtn, QSpace, QCard, QCardSection, QSeparator } from 'quasar'
import RoundsItem from '@/components/page-table/inputs/RoundsItem.vue'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'
import { useSimpleDialogs } from '@/use/useSimpleDialogs'
import { Icon, NotifyColor } from '@/constants/ui-enums'

const { confirmDialog, dismissDialog } = useSimpleDialogs()
const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()

// Setup
temporary.item.primaryRounds = selected.item?.primaryRounds ? [...selected.item.primaryRounds] : []
temporary.item.secondaryRounds = selected.item?.secondaryRounds
  ? [...selected.item.secondaryRounds]
  : []
validate.item.primaryRounds = true
validate.item.secondaryRounds = true

function addRound(): void {
  temporary.item.primaryRounds.push(undefined)
  temporary.item.secondaryRounds.push(undefined)
}

function removeRound(): void {
  if (validate.item.primaryRounds && validate.item.secondaryRounds) {
    confirmDialog(
      'Remove Round',
      'Are you sure you want to remove the last round?',
      Icon.DELETE,
      NotifyColor.ERROR,
      () => {
        temporary.item.primaryRounds.pop()
        temporary.item.secondaryRounds.pop()
      }
    )
  } else {
    dismissDialog(
      'Validation Errors',
      'Cannot remove any rounds until validation errors are cleared.',
      Icon.WARN,
      NotifyColor.WARN
    )
  }
}
</script>

<template>
  <QCard>
    <QCardSection class="row items-start">
      <div class="text-h6">Rounds</div>
      <QSpace />
      <QBtn
        :disable="temporary.item.primaryRounds.length >= 20"
        round
        color="positive"
        size="sm"
        :icon="Icon.ADD"
        @click="addRound()"
      />
    </QCardSection>

    <QSeparator />

    <QCardSection class="q-gutter-md row items-start">
      <div>#</div>
      <QSeparator vertical />
      <div class="col">Primary</div>
      <QSeparator vertical />
      <div class="col">Secondary</div>
    </QCardSection>

    <QSeparator />

    <QCardSection>
      <div
        v-for="(round, index) in temporary.item.primaryRounds"
        :key="index"
        class="q-gutter-md row items-start q-mb-sm"
      >
        <div class="text-bold q-mt-lg">{{ index + 1 }}</div>
        <RoundsItem
          :index="index"
          :primary="temporary.item.primaryRounds[index]"
          :secondary="temporary.item.secondaryRounds[index]"
        />
      </div>

      <div align="right">
        <QBtn
          :disable="!temporary.item.primaryRounds.length"
          round
          color="negative"
          size="sm"
          :icon="Icon.REMOVE"
          @click="removeRound()"
        />
      </div>
    </QCardSection>
  </QCard>
</template>
