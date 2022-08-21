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
temporary.item.rounds = selected.item?.rounds
  ? JSON.parse(JSON.stringify(selected.item.rounds))
  : []
validate.item.rounds = true

function addRound(): void {
  temporary.item.rounds.push({
    primary: undefined,
    secondary: undefined,
  })
}

function removeRound(): void {
  if (validate.item.rounds) {
    confirmDialog(
      'Remove Round',
      'Are you sure you want to remove the last round?',
      Icon.DELETE,
      NotifyColor.ERROR,
      () => {
        temporary.item.rounds.pop()
      }
    )
  } else {
    dismissDialog(
      'Validation Failed',
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
        :disable="temporary.item.rounds.length >= 20"
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
        v-for="(round, index) in temporary.item.rounds"
        :key="index"
        class="q-gutter-md row items-start q-mb-sm"
      >
        <div class="text-bold q-mt-lg">{{ index + 1 }}</div>
        <RoundsItem :index="index" :primary="round.primary" :secondary="round.secondary" />
      </div>

      <div align="right">
        <QBtn
          :disable="!temporary.item.rounds.length"
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
