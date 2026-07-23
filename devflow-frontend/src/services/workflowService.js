import api from "./api";

/**
 * Workflows API Services (details.md MODULE 5)
 */

export const getWorkflows = async (params = {}) => {
  const response = await api.get("/workflows", { params });
  return response.data;
};

export const getWorkflowById = async (workflowId) => {
  const response = await api.get(`/workflows/${workflowId}`);
  return response.data;
};

export const createWorkflow = async (data) => {
  const response = await api.post("/workflows", data);
  return response.data;
};

export const updateWorkflow = async (workflowId, data) => {
  const response = await api.put(`/workflows/${workflowId}`, data);
  return response.data;
};

export const deleteWorkflow = async (workflowId) => {
  const response = await api.delete(`/workflows/${workflowId}`);
  return response.data;
};

export const toggleWorkflow = async (workflowId, isEnabled) => {
  const response = await api.patch(`/workflows/${workflowId}/toggle`, { isEnabled });
  return response.data;
};
