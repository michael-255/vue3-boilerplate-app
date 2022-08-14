<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { Field } from '@/constants/data-enums'
import { useFields } from '@/use/useFields'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

const { getFieldValidator } = useFields()
const { nameModel, nameInputRef, updateModel } = useInjectTableInputs()

/**
 * Sets the model ref with a default if no value is provided.
 */
onMounted(() => {
  if (!nameModel.value) {
    updateModel(nameModel, 'Example')
  }
})
</script>

<template>
  <QInput
    v-model="nameModel"
    ref="nameInputRef"
    label="Name"
    :rules="[getFieldValidator(Field.NAME)]"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
