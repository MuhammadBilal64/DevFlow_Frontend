import { ChevronDown } from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext";

function WorkspaceSwitcher() {
  const {
    workspaces,
    currentWorkspace,
    selectWorkspace,
  } = useWorkspace();

  return (
    <div className="mb-8">

      <label className="mb-2 block text-sm text-slate-400">
        Active Workspace
      </label>

      <div className="relative">

        <select
          value={currentWorkspace?.id ?? ""}
          onChange={(e) => {
            const workspace = workspaces.find(
              (w) => w.id === Number(e.target.value)
            );

            selectWorkspace(workspace);
          }}
          className="w-72 appearance-none rounded-lg border border-[#30363D] bg-[#161B22] px-4 py-3 text-white outline-none"
        >
          {workspaces.map((workspace) => (
            <option
              key={workspace.id}
              value={workspace.id}
            >
              {workspace.name}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

      </div>

    </div>
  );
}

export default WorkspaceSwitcher;