import api from "./api";

/**
 * Notifications API Services (details.md MODULE 7)
 */

export const getMyNotifications = async (params = {}) => {
  return await api.get("/notifications", { params });
};

export const getUnreadNotificationCount = async () => {
  return await api.get("/notifications/unread-count");
};

export const markNotificationAsRead = async (notificationId) => {
  return await api.put(`/notifications/${notificationId}/read`);
};

export const markAllNotificationsAsRead = async () => {
  return await api.put("/notifications/read-all");
};

