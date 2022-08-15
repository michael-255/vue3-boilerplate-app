<script setup lang="ts">
import { QInput } from 'quasar'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'
import { isOptionalLongText } from '@/utils/validators'

const { descriptionModel, descriptionInputRef } = useInjectTableInputs()
const maxLength = 500
</script>

<template>
  <QInput
    v-model="descriptionModel"
    ref="descriptionInputRef"
    label="Description"
    :rules="[(val: string) => isOptionalLongText(val) || 'Description is limited to 500 characters']"
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
