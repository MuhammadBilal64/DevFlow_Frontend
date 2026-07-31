import api from "./api";

export const getMyWorkspaces = async (params = {}) => {
  const response = await api.get("/workspaces/my", {
    params,
  });

  return response.data;
};

export const createWorkspace = async (data) => {
  const response = await api.post("/workspaces", data);

  return response.data;
};

export const getWorkspaceById = async (workspaceId) => {
  const response = await api.get(`/workspaces/${workspaceId}`);

  return response.data;
};

export const getWorkspaceMembers = async (
  workspaceId,
  params = {}
) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/members`,
    {
      params,
    }
  );

  return response.data;
};

export const addWorkspaceMember = async (
  workspaceId,
  data
) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/members`,
    data
  );

  return response.data;
};

export const removeWorkspaceMember = async (
  workspaceId,
  userId
) => {
  const response = await api.delete(
    `/workspaces/${workspaceId}/members/${userId}`
  );

  return response.data;
};