import { useQuasar } from 'quasar'
import { NotifyColor, Icon } from '@/constants/ui-enums'
import SimpleDialog from '@/components/dialogs/SimpleDialog.vue'

/**
 * Simple customizable dialogs.
 */
export function useSimpleDialogs(): { [x: string]: any } {
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
    icon: Icon,
    color: NotifyColor,
    onOkFunc: () => void
  ): void {
    $quasar
      .dialog({
        component: SimpleDialog,
        componentProps: {
          type: 'Confirm',
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
    color: NotifyColor = NotifyColor.INFO
  ): void {
    $quasar.dialog({
      component: SimpleDialog,
      componentProps: {
        type: 'Dismiss',
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
