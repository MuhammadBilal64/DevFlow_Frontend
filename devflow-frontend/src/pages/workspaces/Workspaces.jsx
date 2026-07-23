import { useEffect } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";

function Workspaces() {
  const {
    workspaces,
    isLoading,
    loadWorkspaces,
  } = useWorkspace();

  useEffect(() => {
    loadWorkspaces();
  }, []);

  if (isLoading) {
    return <p>Loading workspaces...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold text-white">
        My Workspaces
      </h1>

      {workspaces.length === 0 ? (
        <p className="text-slate-400">
          No workspaces found.
        </p>
      ) : (
        <div className="space-y-3">
          {workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="rounded-lg border border-[#30363D] bg-[#161B22] p-4"
            >
              <h2 className="text-white font-semibold">
                {workspace.name}
              </h2>

              <p className="text-sm text-slate-400">
                {workspace.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workspaces;