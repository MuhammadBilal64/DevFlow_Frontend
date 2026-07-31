import api from "./api";

/**
 * Tasks API Services (details.md MODULE 5)
 * All endpoints are scoped under /api/projects/{projectId}/tasks
 */

export const getTasksByProject = async (projectId, params = {}) => {
  return await api.get(`/projects/${projectId}/tasks`, { params });
};

export const getTaskById = async (projectId, taskId) => {
  return await api.get(`/projects/${projectId}/tasks/${taskId}`);
};

export const createTask = async (projectId, data) => {
  return await api.post(`/projects/${projectId}/tasks`, data);
};

export const updateTask = async (projectId, taskId, data) => {
  return await api.put(`/projects/${projectId}/tasks/${taskId}`, data);
};

export const updateTaskStatus = async (projectId, taskId, status) => {
  return await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
};

export const updateTaskAssignee = async (projectId, taskId, assignedToUserId) => {
  return await api.patch(`/projects/${projectId}/tasks/${taskId}/assignee`, { assignedToUserId });
};

export const deleteTask = async (projectId, taskId) => {
  return await api.delete(`/projects/${projectId}/tasks/${taskId}`);
};

