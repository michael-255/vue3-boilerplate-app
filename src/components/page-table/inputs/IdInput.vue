<script setup lang="ts">
import { QInput } from 'quasar'
import { ref, type Ref } from 'vue'
import { v4 as createId } from 'uuid'
import { Icon } from '@/constants/ui-enums'
import { isId } from '@/utils/validators'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const inputRef: Ref<any> = ref(null)

// Setup
temporary.item.id = selected.item?.id ? selected.item.id : createId()
validate.item.id = true

function generateId(): void {
  temporary.item.id = createId()
  validate.item.id = true
}

function validateInput(): void {
  validate.item.id = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="temporary.item.id"
    ref="inputRef"
    label="Id"
    :rules="[(val: string) => isId(val) || 'Id must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  >
    <template v-slot:after>
      <QBtn :icon="Icon.RENEW" color="primary" class="q-ml-xs q-px-sm" @click="generateId()" />
    </template>
  </QInput>
</template>
