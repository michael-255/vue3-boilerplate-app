<script setup lang="ts">
import { QInput } from 'quasar'
import { isOptionalPositiveNumber } from '@/utils/validators'
import { ref, type Ref } from 'vue'
import useTemporaryItemStore from '@/stores/temporary-item'
import useValidateItemStore from '@/stores/validate-item'

const props = defineProps<{
  index: number
  primary: number | undefined
  secondary: number | undefined
}>()
const validate = useValidateItemStore()
const temporary = useTemporaryItemStore()
const primaryInputRef: Ref<any> = ref(null)
const secondaryInputRef: Ref<any> = ref(null)
const primaryModel: Ref<number | undefined> = ref(props.primary)
const secondaryModel: Ref<number | undefined> = ref(props.secondary)
const rulesMessage = 'Invalid'

function updateTemporaryRound(): void {
  temporary.item.primaryRounds[props.index] = primaryModel.value
  temporary.item.secondaryRounds[props.index] = secondaryModel.value
  validateInput()
}

function validateInput(): void {
  validate.item.primaryRounds = !!primaryInputRef?.value?.validate()
  validate.item.secondaryRounds = !!secondaryInputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model.number="primaryModel"
    ref="primaryInputRef"
    :rules="[(val: number) => isOptionalPositiveNumber(val) || rulesMessage]"
    dense
    outlined
    type="number"
    color="primary"
    class="col"
    @blur="updateTemporaryRound()"
  />

  <QInput
    v-model.number="secondaryModel"
    ref="secondaryInputRef"
    :rules="[(val: number) => isOptionalPositiveNumber(val) || rulesMessage]"
    dense
    outlined
    type="number"
    color="primary"
    class="col"
    @blur="updateTemporaryRound()"
  />
</template>
