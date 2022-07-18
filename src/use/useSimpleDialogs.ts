import { useQuasar } from 'quasar'
import { Icon } from '@/constants/ui-enums'
import SimpleDialog from '@/components/dialogs/SimpleDialog.vue'

/**
 * Simple customizable dialogs.
 */
export function useSimpleDialogs() {
  const $quasar = useQuasar()

  /**
   * Customizable Quasar confirm dialog.
   * @param title
   * @param message
   * @param onOkFunc Non-returning function
   * @param icon
   * @param color
   */
  function confirmDialog(
    title: string,
    message: string,
    onOkFunc: () => void,
    icon: Icon = Icon.INFO,
    color: 'deep-purple' | 'primary' | 'orange' | 'negative' = 'primary'
  ): void {
    $quasar
      .dialog({
        component: SimpleDialog,
        componentProps: {
          type: 'confirm',
          icon,
          title,
          message,
          color,
          persistent: false,
        },
      })
      .onOk(() => {
        onOkFunc()
      })
  }

  /**
   * Customizable Quasar confirm dialog.
   * @param title
   * @param message
   * @param icon
   * @param color
   */
  function dismissDialog(
    title: string,
    message: string,
    icon: Icon = Icon.INFO,
    color: 'deep-purple' | 'primary' | 'orange' | 'negative' = 'primary'
  ): void {
    $quasar.dialog({
      component: SimpleDialog,
      componentProps: {
        type: 'dismiss',
        icon,
        title,
        message,
        color,
        persistent: false,
      },
    })
  }

  return {
    confirmDialog,
    dismissDialog,
  }
}
