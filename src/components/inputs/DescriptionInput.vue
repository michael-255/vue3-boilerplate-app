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
const { descriptionModel, descriptionInputRef } = useInjectTableInputs()
const maxLength = 500
</script>

<template>
  <QInput
    v-model="descriptionModel"
    ref="descriptionInputRef"
    label="Description"
    :rules="[getFieldValidator(TableField.DESCRIPTION)]"
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
