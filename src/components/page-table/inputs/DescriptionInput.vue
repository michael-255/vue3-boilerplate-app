<script setup lang="ts">
import { QInput } from 'quasar'
import { isOptionalLongText } from '@/utils/validators'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'
import { ref, type Ref } from 'vue'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const inputRef: Ref<any> = ref(null)
const maxLength = 500

// Setup
temporary.item.description = selected.item?.description ? selected.item.description : ''
validate.item.description = true

function validateInput(): void {
  validate.item.description = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="temporary.item.description"
    ref="inputRef"
    label="Description"
    :rules="[(val: string) => isOptionalLongText(val) || 'Description is limited to 500 characters']"
    :maxlength="maxLength"
    :hint="`${temporary.item.description?.length || '0'}/${maxLength}`"
    dense
    outlined
    autogrow
    type="textarea"
    color="primary"
    class="q-mb-xs"
    @blur="validateInput()"
  />
</template>
