import { useWorkspace } from "../../context/WorkspaceContext";

function DashboardHeader() {
  const { currentWorkspace } = useWorkspace();

  return (
    <div className="mb-8">

      <p className="text-sm text-slate-400">
        Workspace
      </p>

      <h1 className="mt-1 text-3xl font-bold text-white">
        {currentWorkspace?.name ?? "Select Workspace"}
      </h1>

      <p className="mt-2 text-slate-400">
        Everything happening inside your workspace.
      </p>

    </div>
  );
}

export default DashboardHeader;