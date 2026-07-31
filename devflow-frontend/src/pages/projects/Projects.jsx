import { FolderKanban, Plus, Search, Filter } from "lucide-react";

function Projects() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Projects
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Manage, organize, and monitor progress across your workspace projects.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1551C9] active:scale-[0.98]">
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Header */}
      <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#121721] p-4">
        <div className="relative flex items-center w-72">
          <Search size={15} className="absolute left-3.5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Filter projects..."
            className="h-9 w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] pl-9 pr-3 text-xs text-white placeholder-[#6B7280] outline-none focus:border-[#1D63ED]"
          />
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2 text-xs font-medium text-[#9CA3AF] hover:text-white">
          <Filter size={14} />
          <span>Filter</span>
        </button>
      </div>

      {/* Placeholder Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: "DevFlow Platform", key: "Internal platform development", status: "In Progress", progress: 68 },
          { name: "Mobile App", key: "Cross-platform mobile application", status: "Planning", progress: 24 },
          { name: "Website Redesign", key: "Marketing website overhaul", status: "In Progress", progress: 45 },
          { name: "API Gateway", key: "Backend API infrastructure", status: "Review", progress: 80 },
        ].map((proj) => (
          <div
            key={proj.name}
            className="rounded-2xl border border-[#1F2937] bg-[#121721] p-5 shadow-sm transition hover:border-[#374151]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0C2448] text-[#38BDF8]">
                <FolderKanban size={20} />
              </div>
              <span className="rounded-lg bg-[#0C2448] border border-[#1D63ED]/30 px-2.5 py-1 text-[11px] font-semibold text-[#38BDF8]">
                {proj.status}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white">{proj.name}</h3>
            <p className="text-xs text-[#6B7280] mt-1">{proj.key}</p>

            <div className="mt-4 pt-3 border-t border-[#1F2937]">
              <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-1.5">
                <span>Progress</span>
                <span className="font-semibold text-white">{proj.progress}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#1F2937] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1D63ED]"
                  style={{ width: `${proj.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
