import { useLocation } from "react-router-dom";
import { Search, Plus, ChevronDown, Bell, Building2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";

const routeHeaders = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview of your workspace" },
  "/projects": { title: "Projects", subtitle: "Manage and track workspace projects" },
  "/tasks": { title: "Tasks", subtitle: "Task boards and issue assignments" },
  "/workflows": { title: "Workflows", subtitle: "Automate development and release flows" },
  "/notifications": { title: "Notifications", subtitle: "Workspace activity and alerts" },
  "/settings": { title: "Settings", subtitle: "Workspace preferences and account configuration" },
};

function Topbar() {
  const location = useLocation();
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();

  const currentRouteHeader = routeHeaders[location.pathname] || {
    title: "Dashboard",
    subtitle: "Overview of your workspace",
  };

  const workspaceName = currentWorkspace?.name || "Acme Corporation";
  const userName = user?.email ? user.email.split("@")[0] : "Bilal";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-[#1F2937] bg-[#0B0F17] px-8">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-lg font-bold text-white tracking-tight">
          {currentRouteHeader.title}
        </h1>
        <p className="text-xs text-[#6B7280]">
          {currentRouteHeader.subtitle}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Input with ⌘K Badge */}
        <div className="relative flex items-center">
          <Search
            size={15}
            className="absolute left-3.5 text-[#6B7280]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-60 rounded-xl border border-[#1F2937] bg-[#121721] pl-9 pr-10 text-xs text-white placeholder-[#6B7280] outline-none transition focus:border-[#1D63ED] focus:ring-1 focus:ring-[#1D63ED]"
          />
          <kbd className="absolute right-2.5 flex h-5 items-center rounded border border-[#374151] bg-[#1F2937] px-1.5 text-[10px] font-mono text-[#9CA3AF]">
            ⌘K
          </kbd>
        </div>

        {/* Workspace Switcher Button */}
        <button className="flex h-9 items-center gap-2 rounded-xl border border-[#1F2937] bg-[#121721] px-3 text-xs font-medium text-white transition hover:border-[#374151]">
          <Building2 size={14} className="text-[#9CA3AF]" />
          <span>{workspaceName}</span>
          <ChevronDown size={14} className="text-[#6B7280]" />
        </button>

        {/* Primary "+ New" Button */}
        <button className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1D63ED] px-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1551C9] active:scale-[0.98]">
          <Plus size={16} />
          <span>New</span>
        </button>

        {/* Notification Bell */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#1F2937] bg-[#121721] text-[#9CA3AF] transition hover:text-white hover:border-[#374151]">
          <Bell size={16} />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1D63ED] text-[9px] font-bold text-white ring-2 ring-[#0B0F17]">
            3
          </span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2937] text-xs font-bold text-white ring-2 ring-[#374151] cursor-pointer hover:ring-[#1D63ED]">
          {userInitial}
        </div>
      </div>
    </header>
  );
}

export default Topbar;