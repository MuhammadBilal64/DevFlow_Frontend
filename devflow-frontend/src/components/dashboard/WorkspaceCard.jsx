import { FolderKanban, Users } from "lucide-react";

function WorkspaceCard({ workspace, onClick }) {
  return (
    <button
      onClick={() => onClick(workspace)}
      className="w-full rounded-xl border border-[#30363D] bg-[#161B22] p-5 text-left transition hover:border-sky-500 hover:bg-[#1B222C]"
    >
      <h2 className="text-lg font-semibold text-white">
        {workspace.name}
      </h2>

      <p className="mt-2 line-clamp-2 text-sm text-slate-400">
        {workspace.description || "No description"}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-2 text-slate-400">
          <Users size={16} />
          <span className="text-xs">
            Members
          </span>
        </div>

        <div className="flex items-center gap-2 text-sky-400">
          <FolderKanban size={16} />
          <span className="text-xs">
            Open
          </span>
        </div>

      </div>
    </button>
  );
}

export default WorkspaceCard;