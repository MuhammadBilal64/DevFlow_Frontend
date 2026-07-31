import api from "./api";

/**
 * Tasks API Services (details.md MODULE 5)
 * All endpoints are scoped under /api/projects/{projectId}/tasks
 */

export const getTasksByProject = async (projectId, params = {}) => {
  const response = await api.get(`/projects/${projectId}/tasks`, { params });
  return response.data;
};

export const getTaskById = async (projectId, taskId) => {
  const response = await api.get(`/projects/${projectId}/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (projectId, data) => {
  const response = await api.post(`/projects/${projectId}/tasks`, data);
  return response.data;
};

export const updateTask = async (projectId, taskId, data) => {
  const response = await api.put(`/projects/${projectId}/tasks/${taskId}`, data);
  return response.data;
};

export const updateTaskStatus = async (projectId, taskId, status) => {
  const response = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
  return response.data;
};

export const updateTaskAssignee = async (projectId, taskId, assignedToUserId) => {
  const response = await api.patch(`/projects/${projectId}/tasks/${taskId}/assignee`, { assignedToUserId });
  return response.data;
};

export const deleteTask = async (projectId, taskId) => {
  const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
  return response.data;
};
