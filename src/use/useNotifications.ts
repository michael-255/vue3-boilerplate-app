import { useQuasar } from 'quasar'
import { NotifyColor, Icon } from '@/constants/ui-enums'

/**
 * Simple customizable notifications.
 */
export function useNotifications(): { [x: string]: any } {
  const $quasar = useQuasar()

  /**
   * Customizable Quasar notification.
   * @param message
   * @param icon
   * @param color
   * @param multiLine
   * @param position
   * @param timeout
   */
  function notify(
    message: string,
    icon: Icon = Icon.INFO,
    color: NotifyColor = NotifyColor.INFO,
    multiLine = false,
    position:
      | 'top-left'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-right'
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'center' = 'top',
    timeout = 4000
  ): void {
    const textColor = 'white'

    $quasar.notify({
      message,
      icon,
      color,
      textColor,
      position,
      multiLine,
      timeout,
      actions: [
        {
          label: 'Dismiss',
          color: textColor,
        },
      ],
    })
  }

  return { notify }
}
