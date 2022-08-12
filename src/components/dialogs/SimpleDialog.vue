<script setup lang="ts">
import type { Icon } from '@/constants/ui-enums'
import { QDialog, QCard, QCardSection, QCardActions, QIcon, QBtn } from 'quasar'
import { useDialogPluginComponent } from 'quasar'

/**
 * Available methods to hook into when using this dialog:
 * - onOk
 * - onCancel
 * - onDismiss (called on OK or Cancel)
 *
 * @example
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

const props = defineProps<{
  type: 'confirm' | 'dismiss'
  icon: Icon
  title: string
  message: string
  color: 'primary' | 'orange' | 'negative'
  persistent: boolean
}>()

defineEmits([...useDialogPluginComponent.emits])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const okLabel = props.type === 'confirm' ? 'Confirm' : 'Dismiss'

function onOKClick() {
  onDialogOK()
}
</script>

<template>
  <QDialog ref="dialogRef" :persistent="persistent" @hide="onDialogHide">
    <QCard class="q-dialog-plugin">
      <QCardSection :class="`bg-${props.color} text-white q-mb-sm`">
        <QIcon :name="props.icon" size="sm" class="q-pb-xs q-mr-md" />
        <span class="text-h6">{{ title }}</span>
      </QCardSection>

      <QCardSection class="q-py-none">{{ message }}</QCardSection>

      <QCardActions align="right">
        <QBtn v-if="type === 'confirm'" flat label="Cancel" @click="onDialogCancel" />
        <QBtn flat :label="okLabel" :color="props.color" @click="onOKClick" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>
