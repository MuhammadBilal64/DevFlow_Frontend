import api from "./api";

/**
 * Workspace API Services (details.md MODULE 2)
 */

export const getMyWorkspaces = async (params = {}) => {
  return await api.get("/workspaces/my", { params });
};

export const createWorkspace = async (data) => {
  return await api.post("/workspaces", data);
};

export const getWorkspaceById = async (workspaceId) => {
  return await api.get(`/workspaces/${workspaceId}`);
};

export const getWorkspaceMembers = async (workspaceId, params = {}) => {
  return await api.get(`/workspaces/${workspaceId}/members`, { params });
};

export const addWorkspaceMember = async (workspaceId, data) => {
  return await api.post(`/workspaces/${workspaceId}/members`, data);
};

export const removeWorkspaceMember = async (workspaceId, userId) => {
  return await api.delete(`/workspaces/${workspaceId}/members/${userId}`);
};