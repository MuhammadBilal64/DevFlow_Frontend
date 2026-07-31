import api from "./api";

/**
 * Notifications API Services (details.md MODULE 7)
 */

export const getMyNotifications = async (params = {}) => {
  const response = await api.get("/notifications", { params });
  return response.data;
};

export const getUnreadNotificationCount = async () => {
  const response = await api.get("/notifications/unread-count");
  return response.data;
};

export const markNotificationAsRead = async (notificationId) => {
  const response = await api.put(`/notifications/${notificationId}/read`);
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await api.put("/notifications/read-all");
  return response.data;
};
