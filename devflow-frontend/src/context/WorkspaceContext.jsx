import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMyWorkspaces,
  createWorkspace as createWorkspaceService,
} from "../services/workspaceService";

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadWorkspaces = async () => {
  setIsLoading(true);

  try {
    const response = await getMyWorkspaces();

    console.log(response);

    const items = response.data?.items ?? [];

    setWorkspaces(items);

    if (items.length > 0) {
      setCurrentWorkspace((previous) => {
        if (!previous) return items[0];

        const existing = items.find(
          (workspace) => workspace.id === previous.id
        );

        return existing ?? items[0];
      });
    } else {
      setCurrentWorkspace(null);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
  const createWorkspace = async (workspace) => {
    const response = await createWorkspaceService(workspace);

    await loadWorkspaces();

    return response.data;
  };

  const selectWorkspace = (workspace) => {
    setCurrentWorkspace(workspace);
  };

  useEffect(() => {
    loadWorkspaces();
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        isLoading,
        loadWorkspaces,
        createWorkspace,
        selectWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used within WorkspaceProvider."
    );
  }

  return context;
}