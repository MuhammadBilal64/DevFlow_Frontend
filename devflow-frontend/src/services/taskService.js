import api from "./api";

/**
 * Tasks API Services (details.md MODULE 4)
 */

export const getTasksByProject = async (projectId, params = {}) => {
  const response = await api.get(`/tasks/project/${projectId}`, { params });
  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (data) => {
  const response = await api.post("/tasks", data);
  return response.data;
};

export const updateTask = async (taskId, data) => {
  const response = await api.put(`/tasks/${taskId}`, data);
  return response.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const response = await api.patch(`/tasks/${taskId}/status`, { status });
  return response.data;
};

export const assignTask = async (taskId, assignedToUserId) => {
  const response = await api.patch(`/tasks/${taskId}/assign`, { assignedToUserId });
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
