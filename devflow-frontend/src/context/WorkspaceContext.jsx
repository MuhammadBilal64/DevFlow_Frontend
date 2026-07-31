import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getMyWorkspaces,
  createWorkspace as createWorkspaceService,
} from "../services/workspaceService";
import { useAuth } from "./AuthContext";

const WorkspaceContext = createContext(null);

const DEFAULT_WORKSPACES = [
  { id: 1, name: "Acme Corporation", description: "Default Organization Workspace" },
  { id: 2, name: "DevFlow Platform", description: "Internal engineering projects" },
];

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState(DEFAULT_WORKSPACES);
  const [currentWorkspace, setCurrentWorkspace] = useState(DEFAULT_WORKSPACES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const loadWorkspaces = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      const response = await getMyWorkspaces();
      
      // Unwrap items from ApiResponse<PagedResult<T>> or direct PagedResult/Array
      const rawData = response?.data || response;
      const items = Array.isArray(rawData)
        ? rawData
        : Array.isArray(rawData?.items)
        ? rawData.items
        : Array.isArray(response?.items)
        ? response.items
        : [];

      if (items.length > 0) {
        setWorkspaces(items);
        setCurrentWorkspace((prev) => {
          if (!prev) return items[0];
          const found = items.find((w) => w.id === prev.id);
          return found || items[0];
        });
      }
    } catch (error) {
      console.warn("Could not fetch workspaces from API, using default workspace:", error?.message || error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const createWorkspace = async (workspaceData) => {
    try {
      const response = await createWorkspaceService(workspaceData);
      const newWs = response?.data || response;
      await loadWorkspaces();
      if (newWs?.id) {
        setCurrentWorkspace(newWs);
      }
      return response;
    } catch (error) {
      console.error("Create workspace failed:", error);
      throw error;
    }
  };

  const selectWorkspace = (workspace) => {
    setCurrentWorkspace(workspace);
  };

  useEffect(() => {
    if (user) {
      loadWorkspaces();
    }
  }, [user, loadWorkspaces]);

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
    throw new Error("useWorkspace must be used within WorkspaceProvider.");
  }
  return context;
}