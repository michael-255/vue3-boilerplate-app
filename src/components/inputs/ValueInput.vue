<script setup lang="ts">
import { QInput } from 'quasar'
import { Field } from '@/constants/data-enums'
import { useFields } from '@/use/useFields'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

/**
 * @todo
 */

const { getFieldValidator } = useFields()
const { valueModel, valueInputRef } = useInjectTableInputs()
</script>

<template>
  <QInput
    v-model.number="valueModel"
    ref="valueInputRef"
    label="Value"
    :rules="[getFieldValidator(Field.VALUE)]"
    dense
    outlined
    type="number"
    color="primary"
    class="q-mb-xs"
  />
</template>
