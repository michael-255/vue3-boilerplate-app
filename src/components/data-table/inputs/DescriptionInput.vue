<script setup lang="ts">
import { QInput } from 'quasar'
import { Field } from '@/constants/data-enums'
import { useFields } from '@/use/useFields'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

const { getFieldValidator } = useFields()
const { descriptionModel, descriptionInputRef } = useInjectTableInputs()
const maxLength = 500
</script>

<template>
  <QInput
    v-model="descriptionModel"
    ref="descriptionInputRef"
    label="Description"
    :rules="[getFieldValidator(Field.DESCRIPTION)]"
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
