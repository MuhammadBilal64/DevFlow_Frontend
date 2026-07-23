import api from "./api";

/**
 * Projects API Services (details.md MODULE 3)
 */

export const getProjectsByWorkspace = async (workspaceId, params = {}) => {
  const response = await api.get(`/projects/workspace/${workspaceId}`, { params });
  return response.data;
};

export const getProjectById = async (projectId) => {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post("/projects", data);
  return response.data;
};

export const updateProject = async (projectId, data) => {
  const response = await api.put(`/projects/${projectId}`, data);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
};
