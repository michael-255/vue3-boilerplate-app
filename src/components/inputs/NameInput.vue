<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { TableField } from '@/constants/data-enums'
import { isShortTextValid } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { nameModel, nameInputRef, nameUpdateModel } = useInputInject(TableField.NAME)

/**
 * @todo
 */
onMounted(() => {
  if (!nameModel.value) {
    nameUpdateModel('Example')
  }
})
</script>

<template>
  <QInput
    v-model="nameModel"
    ref="nameInputRef"
    label="Name"
    :rules="[(val: string) => isShortTextValid(val) || 'Name must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  />
</template>
