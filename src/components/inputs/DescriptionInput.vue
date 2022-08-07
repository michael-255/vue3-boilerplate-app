<script setup lang="ts">
import { QInput } from 'quasar'
import { TableField } from '@/constants/data-enums'
import { isTextValid } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { descriptionModel, descriptionInputRef } = useInputInject(TableField.DESCRIPTION)
const maxLength = 500
</script>

<template>
  <QInput
    v-model="descriptionModel"
    ref="descriptionInputRef"
    label="Description"
    :rules="[(val: string) => isTextValid(val) || 'Description is limited to 500 characters']"
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
