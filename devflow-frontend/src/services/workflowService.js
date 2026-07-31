import api from "./api";

/**
 * Workflows API Services (details.md MODULE 6)
 * All endpoints are scoped under /api/projects/{projectId}/workflows
 */

export const getWorkflowsByProject = async (projectId, params = {}) => {
  const response = await api.get(`/projects/${projectId}/workflows`, { params });
  return response.data;
};

export const getWorkflowById = async (projectId, workflowId) => {
  const response = await api.get(`/projects/${projectId}/workflows/${workflowId}`);
  return response.data;
};

export const createWorkflow = async (projectId, data) => {
  const response = await api.post(`/projects/${projectId}/workflows`, data);
  return response.data;
};

export const updateWorkflow = async (projectId, workflowId, data) => {
  const response = await api.put(`/projects/${projectId}/workflows/${workflowId}`, data);
  return response.data;
};

export const enableWorkflow = async (projectId, workflowId) => {
  const response = await api.patch(`/projects/${projectId}/workflows/${workflowId}/enable`);
  return response.data;
};

export const disableWorkflow = async (projectId, workflowId) => {
  const response = await api.patch(`/projects/${projectId}/workflows/${workflowId}/disable`);
  return response.data;
};
