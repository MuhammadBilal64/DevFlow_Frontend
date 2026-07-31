import api from "./api";

/**
 * Workflows API Services (details.md MODULE 6)
 * All endpoints are scoped under /api/projects/{projectId}/workflows
 */

export const getWorkflowsByProject = async (projectId, params = {}) => {
  return await api.get(`/projects/${projectId}/workflows`, { params });
};

export const getWorkflowById = async (projectId, workflowId) => {
  return await api.get(`/projects/${projectId}/workflows/${workflowId}`);
};

export const createWorkflow = async (projectId, data) => {
  return await api.post(`/projects/${projectId}/workflows`, data);
};

export const updateWorkflow = async (projectId, workflowId, data) => {
  return await api.put(`/projects/${projectId}/workflows/${workflowId}`, data);
};

export const enableWorkflow = async (projectId, workflowId) => {
  return await api.patch(`/projects/${projectId}/workflows/${workflowId}/enable`);
};

export const disableWorkflow = async (projectId, workflowId) => {
  return await api.patch(`/projects/${projectId}/workflows/${workflowId}/disable`);
};

