<script setup lang="ts">
import { QInput, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { type Ref, ref, onMounted } from 'vue'
import { isoToDisplayDate } from '@/utils/luxon'
import { Field } from '@/constants/data-enums'
import { Icon } from '@/constants/ui-enums'
import { useFields } from '@/use/useFields'
import { useInjectTableInputs } from '@/use/useInjectTableInputs'

const { getFieldValidator } = useFields()
const { createdDateModel, createdDateInputRef, updateModel } = useInjectTableInputs()
const userDisplayedDate: Ref<string> = ref('')
const dateTimePicker: Ref<string> = ref('')

/**
 * Sets the display date based on the model ref, or defaults it to the current date.
 */
onMounted(() => {
  if (createdDateModel.value) {
    userDisplayedDate.value = isoToDisplayDate(createdDateModel.value as string)
  } else {
    onNowDate()
  }
})

/**
 * Sets display date and model ref to the current date.
 */
function onNowDate(): void {
  const now = new Date().toISOString()
  updateModel(createdDateModel, now)
  userDisplayedDate.value = isoToDisplayDate(now)
}

/**
 * If a picker time exists, sets display date and model ref to the picker time.
 */
function onPickerDateTime(): void {
  if (dateTimePicker.value) {
    updateModel(createdDateModel, new Date(dateTimePicker.value).toISOString())
    userDisplayedDate.value = isoToDisplayDate(dateTimePicker.value)
  }
}
</script>

<template>
  <QInput
    v-model="userDisplayedDate"
    ref="createdDateInputRef"
    label="Created Date"
    :rules="[getFieldValidator(Field.CREATED_DATE)]"
    dense
    outlined
    disable
    color="primary"
  >
    <template v-slot:after>
      <QBtn :icon="Icon.CALENDAR_DATE" color="primary" class="q-ml-xs q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QDate v-model="dateTimePicker" mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
            </div>
          </QDate>
        </QPopupProxy>
      </QBtn>

      <QBtn :icon="Icon.TIME" color="primary" class="q-ml-sm q-px-sm">
        <QPopupProxy cover transition-show="scale" transition-hide="scale">
          <QTime v-model="dateTimePicker" now-btn mask="YYYY-MM-DDTHH:mm:ss.000Z">
            <div class="row items-center justify-end q-gutter-sm">
              <QBtn label="Cancel" flat v-close-popup />
              <QBtn label="OK" color="primary" flat @click="onPickerDateTime()" v-close-popup />
            </div>
          </QTime>
        </QPopupProxy>
      </QBtn>

      <QBtn
        :icon="Icon.CALENDAR_CHECK"
        color="positive"
        class="q-ml-sm q-px-sm"
        @click="onNowDate()"
      />
    </template>
  </QInput>
</template>
