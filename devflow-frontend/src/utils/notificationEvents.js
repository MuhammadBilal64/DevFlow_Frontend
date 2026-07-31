export const NOTIFICATION_COUNT_REFRESH = "devflow:notification-count-refresh";

export function dispatchNotificationCountRefresh() {
  window.dispatchEvent(new CustomEvent(NOTIFICATION_COUNT_REFRESH));
}
