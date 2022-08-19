<script setup lang="ts">
import { QInput } from 'quasar'
import { ref, type Ref } from 'vue'
import { isShortText } from '@/utils/validators'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const inputRef: Ref<any> = ref(null)

// Setup
temporary.item.name = selected.item?.name ? selected.item.name : 'Example Name'
validate.item.name = true

function validateInput(): void {
  validate.item.name = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="temporary.item.name"
    ref="inputRef"
    label="Name"
    :rules="[(val: string) => isShortText(val) || 'Name must be between 1 and 40 characters']"
    :maxlength="40"
    dense
    outlined
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
