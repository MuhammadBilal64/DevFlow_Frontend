import {
  createContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import {
  getMyWorkspaces,
  createWorkspace as createWorkspaceService,
} from "../services/workspaceService";
import { useAuth } from "./useAuth";

const WorkspaceContext = createContext(null);

export { WorkspaceContext };

const WORKSPACE_STORAGE_KEY = "devflow:selectedWorkspaceId";

export function WorkspaceProvider({ children }) {
  const [workspaces, setWorkspaces] = useState([]);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const loadWorkspaces = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      const response = await getMyWorkspaces();

      const rawData = response?.data || response;
      const items = Array.isArray(rawData)
        ? rawData
        : Array.isArray(rawData?.items)
        ? rawData.items
        : Array.isArray(response?.items)
        ? response.items
        : [];

      setWorkspaces(items);
      setCurrentWorkspace((prev) => {
        if (items.length === 0) return null;
        if (prev) {
          const found = items.find((w) => w.id === prev.id);
          if (found) return found;
        }
        const savedId = localStorage.getItem(WORKSPACE_STORAGE_KEY);
        if (savedId) {
          const saved = items.find((w) => String(w.id) === savedId);
          if (saved) return saved;
        }
        return items[0];
      });
    } catch (error) {
      console.warn("Could not fetch workspaces from API:", error?.message || error);
      setWorkspaces([]);
      setCurrentWorkspace(null);
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
    if (workspace?.id) {
      localStorage.setItem(WORKSPACE_STORAGE_KEY, String(workspace.id));
    }
  };

  useEffect(() => {
    let ignore = false;

    const init = async () => {
      if (ignore) return;

      if (!user) {
        if (!ignore) {
          setWorkspaces([]);
          setCurrentWorkspace(null);
        }
        return;
      }

      await loadWorkspaces();
    };

    void init();
    return () => {
      ignore = true;
    };
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

