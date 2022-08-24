<script setup lang="ts">
import { QInput, QDate, QBtn, QTime, QPopupProxy } from 'quasar'
import { type Ref, ref } from 'vue'
import { isoToDisplayDate } from '@/utils/luxon'
import { Icon } from '@/constants/ui-enums'
import { isDate } from '@/utils/validators'
import useTemporaryItemStore from '@/stores/temporary-item'
import useSelectedItemStore from '@/stores/selected-item'
import useValidateItemStore from '@/stores/validate-item'

const validate = useValidateItemStore()
const selected = useSelectedItemStore()
const temporary = useTemporaryItemStore()
const inputRef: Ref<any> = ref(null)
const displayedDate: Ref<string> = ref('')
const dateTimePicker: Ref<string> = ref('')

// Setup
if (selected.item?.createdDate) {
  updateDates(selected.item.createdDate)
} else {
  updateDates()
}
validate.item.createdDate = true

function updateDates(date: string = new Date().toISOString()): void {
  temporary.item.createdDate = new Date(date).toISOString()
  displayedDate.value = isoToDisplayDate(date as string)
  validate.item.createdDate = true
}

/**
 * If a picker time exists, sets display date and model ref to the picker time.
 */
function onPickerDateTime(): void {
  if (dateTimePicker.value) {
    updateDates(dateTimePicker.value)
  }
}

function validateInput(): void {
  validate.item.createdDate = !!inputRef?.value?.validate()
}
</script>

<template>
  <QInput
    v-model="displayedDate"
    ref="inputRef"
    label="Created Date"
    :rules="[(val: string) => isDate(val) || 'Date must be of format YYYY-MM-DDTHH:MM:SS.###Z']"
    dense
    outlined
    disable
    color="primary"
    @blur="validateInput()"
  >
    <template v-slot:after>
      <!-- Date Picker -->
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
      <!-- Time Picker -->
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
      <!-- Set DateTime to now -->
      <QBtn
        :icon="Icon.CALENDAR_CHECK"
        color="positive"
        class="q-ml-sm q-px-sm"
        @click="updateDates()"
      />
    </template>
  </QInput>
</template>
