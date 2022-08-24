<script setup lang="ts">
import type { Icon, NotifyColor } from '@/constants/ui-enums'
import { QDialog, QCard, QCardSection, QCardActions, QIcon, QBtn } from 'quasar'
import { useDialogPluginComponent } from 'quasar'

/**
 * Small dialogs used for confirming operations or providing information that can be dismissed.
 *
 * @example
 * // You can hook into the methods below:
 * $q.dialog({...})
 *   .onOk(() => {
 *     console.log('OK')
 *   })
 *   .onCancel(() => {
 *     console.log('Cancel')
 *   })
 *   .onDismiss(() => {
 *     console.log('Called on OK or Cancel')
 *   })
 */
defineProps<{
  type: 'Confirm' | 'Dismiss'
  icon: Icon
  title: string
  message: string
  color: NotifyColor
  persistent: boolean // If it can be dismissed by clicking outside it
}>()
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

function onOKClick() {
  onDialogOK()
}
</script>

<template>
  <QDialog ref="dialogRef" :persistent="persistent" @hide="onDialogHide">
    <QCard class="q-dialog-plugin">
      <QCardSection :class="`bg-${color} text-white q-mb-sm`">
        <QIcon :name="icon" size="sm" class="q-pb-xs q-mr-md" />
        <span class="text-h6">{{ title }}</span>
      </QCardSection>

      <QCardSection class="q-py-none">{{ message }}</QCardSection>

      <QCardActions align="right">
        <QBtn v-if="type === 'Confirm'" flat label="Cancel" @click="onDialogCancel" />
        <QBtn flat :label="type" :color="color" @click="onOKClick" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
