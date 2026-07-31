import api from "./api";

/**
 * Projects & Project Members API Services (details.md MODULE 3 & 4)
 */

export const getProjectsByWorkspace = async (workspaceId, params = {}) => {
  return await api.get(`/projects/workspace/${workspaceId}`, { params });
};

export const getProjectById = async (projectId) => {
  return await api.get(`/projects/${projectId}`);
};

export const createProject = async (data) => {
  return await api.post("/projects", data);
};

export const updateProject = async (projectId, data) => {
  return await api.put(`/projects/${projectId}`, data);
};

// Project Members Services
export const addProjectMember = async (projectId, data) => {
  return await api.post(`/projects/${projectId}/members`, data);
};

export const getProjectMembers = async (projectId) => {
  return await api.get(`/projects/${projectId}/members`);
};

export const removeProjectMember = async (projectId, userId) => {
  return await api.delete(`/projects/${projectId}/members/${userId}`);
};

