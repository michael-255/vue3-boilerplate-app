<script setup lang="ts">
import { Icon } from '@/constants/ui-enums'
import { QInput, QBtn, QSpace, QCard, QCardSection, QSeparator } from 'quasar'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()

// Setup
temporary.item.rounds = selected.item?.rounds ? selected.item.rounds : []
validate.item.rounds = true
</script>

<template>
  <QCard>
    <QCardSection class="row items-start">
      <div class="text-h6">Rounds</div>
      <QSpace />
      <QBtn color="positive" label="Add Round" />
    </QCardSection>

    <QSeparator />

    <QCardSection class="q-gutter-md row items-start">
      <div>#</div>
      <QSeparator vertical />
      <div class="col">Primary</div>
      <QSeparator vertical />
      <div class="col q-mr-xl">Secondary</div>
    </QCardSection>

    <QSeparator />

    <QCardSection>
      <div
        v-for="(round, index) in temporary.item.rounds"
        :key="index"
        class="q-gutter-md row items-start q-mb-sm"
      >
        <div class="text-bold q-mt-lg">
          {{ index + 1 }}
        </div>
        <QInput
          v-model.number="round.primary"
          dense
          outlined
          type="number"
          color="primary"
          class="col"
        />
        <QInput
          v-model.number="round.secondary"
          dense
          outlined
          type="number"
          color="primary"
          class="col"
        />
        <QBtn round color="negative" size="sm" :icon="Icon.REMOVE" class="q-mt-lg" />
      </div>
    </QCardSection>
  </QCard>
</template>
