<script setup lang="ts">
import { QInput } from 'quasar'
import { DexieTable, TableField } from '@/constants/data-enums'
import { useInputInject } from '@/use/useInputInject'
import { useTableManager } from '@/use/useTableManager'

/**
 * @todo
 */
const props = defineProps<{ table: DexieTable }>()
const field = TableField.VALUE

const { getFieldValidator } = useTableManager(props.table)
const { valueModel, valueInputRef } = useInputInject(field)
</script>

<template>
  <QInput
    v-model.number="valueModel"
    ref="valueInputRef"
    label="Value"
    :rules="[getFieldValidator(field)]"
    dense
    outlined
    type="number"
    color="primary"
    class="q-mb-xs"
  />
</template>
