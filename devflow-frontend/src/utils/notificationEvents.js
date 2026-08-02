export const NOTIFICATION_COUNT_REFRESH = "devflow:notification-count-refresh";
export const NOTIFICATION_RECEIVED = "devflow:notification-received";

export function dispatchNotificationCountRefresh() {
  window.dispatchEvent(new CustomEvent(NOTIFICATION_COUNT_REFRESH));
}

export function dispatchNotificationReceived(notification) {
  window.dispatchEvent(new CustomEvent(NOTIFICATION_RECEIVED, { detail: notification }));
}
