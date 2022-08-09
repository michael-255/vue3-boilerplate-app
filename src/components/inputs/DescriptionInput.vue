<script setup lang="ts">
import { QInput } from 'quasar'
import { DexieTable, TableField } from '@/constants/data-enums'
import { useInputInject } from '@/use/useInputInject'
import { useTableManager } from '@/use/useTableManager'

/**
 * @todo
 */
const props = defineProps<{ table: DexieTable }>()
const field = TableField.DESCRIPTION

const { getFieldValidator } = useTableManager(props.table)
const { descriptionModel, descriptionInputRef } = useInputInject(field)
const maxLength = 500
</script>

<template>
  <QInput
    v-model="descriptionModel"
    ref="descriptionInputRef"
    label="Description"
    :rules="[getFieldValidator(field)]"
    :maxlength="maxLength"
    :hint="`${descriptionModel?.length || '0'}/${maxLength}`"
    dense
    outlined
    autogrow
    type="textarea"
    color="primary"
    class="q-mb-xs"
  />
</template>
