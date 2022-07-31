<script setup lang="ts">
import { QInput } from 'quasar'
import { onMounted } from 'vue'
import { v4 as createId } from 'uuid'
import { Icon } from '@/constants/ui-enums'
import { TableField } from '@/constants/data-enums'
import { isIdValid } from '@/utils/validators'
import { useInputInject } from '@/use/useInputInject'

/**
 * @todo
 */

const { idModel, idInputRef, idUpdateModel } = useInputInject(TableField.ID)

/**
 * @todo
 */
onMounted(() => {
  if (!idModel.value) {
    idUpdateModel(createId())
  }
})
</script>

<template>
  <QInput
    v-model="idModel"
    ref="idInputRef"
    label="Id"
    :rules="[(val: string) => isIdValid(val) || 'Id must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
  >
    <template v-slot:after>
      <QBtn
        :icon="Icon.RENEW"
        color="primary"
        class="q-ml-xs q-px-sm"
        @click="idUpdateModel(createId())"
      />
    </template>
  </QInput>
</template>
