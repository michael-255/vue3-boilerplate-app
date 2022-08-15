<script setup lang="ts">
import { QInput } from 'quasar'
import { isPositiveNumber } from '@/utils/validators'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

const { valueModel, valueInputRef } = useInjectTableInputs()
</script>

<template>
  <QInput
    v-model.number="valueModel"
    ref="valueInputRef"
    label="Value"
    :rules="[(val: number) => isPositiveNumber(val) || 'Positive number not exceeding 1,000,000,000 is required']"
    dense
    outlined
    type="number"
    color="primary"
    class="q-mb-xs"
  />
</template>
