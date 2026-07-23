import { Search, Plus, ChevronDown } from "lucide-react";

function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#30363D] bg-[#161B22] px-6">

      {/* Left */}
      <div>
        <h1 className="text-lg font-semibold text-white">
          Dashboard
        </h1>

        <p className="text-xs text-slate-400">
          Manage your workspaces and projects
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Search */}
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-lg border border-[#30363D] bg-[#0D1117] py-2 pl-9 pr-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-sky-500"
          />
        </div>

        {/* Workspace */}
        <button className="flex items-center gap-2 rounded-lg border border-[#30363D] bg-[#0D1117] px-4 py-2 text-sm text-white hover:bg-[#21262D]">
          Workspace
          <ChevronDown size={16} />
        </button>

        {/* Create */}
        <button className="flex items-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-600">
          <Plus size={16} />
          New
        </button>

      </div>
    </header>
  );
}

export default Topbar;