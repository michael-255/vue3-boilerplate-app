<script setup lang="ts">
import { QInput } from 'quasar'
import { DexieTable, TableField } from '@/constants/data-enums'
import { useTableManager } from '@/use/useTableManager'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

/**
 * @todo
 */
const props = defineProps<{ table: DexieTable }>()

const { getFieldValidator } = useTableManager(props.table)
const { valueModel, valueInputRef } = useInjectTableInputs()
</script>

<template>
  <QInput
    v-model.number="valueModel"
    ref="valueInputRef"
    label="Value"
    :rules="[getFieldValidator(TableField.VALUE)]"
    dense
    outlined
    type="number"
    color="primary"
    class="q-mb-xs"
  />
</template>
