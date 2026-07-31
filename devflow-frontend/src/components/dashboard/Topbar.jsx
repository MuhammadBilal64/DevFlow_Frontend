import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Plus, ChevronDown, Bell, Building2, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import { getUnreadNotificationCount } from "../../services/notificationService";
import useSignalRNotification from "../../hooks/useSignalRNotification";

const routeHeaders = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview of your workspace" },
  "/projects": { title: "Projects", subtitle: "Manage and track workspace projects" },
  "/tasks": { title: "Tasks", subtitle: "Task boards and issue assignments" },
  "/workflows": { title: "Workflows", subtitle: "Automate development and release flows" },
  "/notifications": { title: "Notifications", subtitle: "Workspace activity and alerts" },
  "/settings": { title: "Settings", subtitle: "Workspace preferences and account configuration" },
  "/workspaces": { title: "Workspaces", subtitle: "Manage organization workspaces and teams" },
};

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { workspaces, currentWorkspace, selectWorkspace } = useWorkspace();
  const [unreadCount, setUnreadCount] = useState(3);
  const [isWsDropdownOpen, setIsWsDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Real-time SignalR Notification Hook
  useSignalRNotification((notification) => {
    setUnreadCount((prev) => prev + 1);
    setToastMessage(notification.message || "New notification received");
    setTimeout(() => setToastMessage(null), 4000);
  });

  useEffect(() => {
    getUnreadNotificationCount()
      .then((res) => {
        const count = res?.data ?? res ?? 0;
        if (typeof count === "number") setUnreadCount(count);
      })
      .catch(() => {});
  }, []);

  const currentRouteHeader = routeHeaders[location.pathname] || {
    title: "Dashboard",
    subtitle: "Overview of your workspace",
  };

  const workspaceName = currentWorkspace?.name || "Acme Corporation";
  const userName = user?.name || (user?.email ? user.email.split("@")[0] : "User");
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-[#1F2937] bg-[#0B0F17] px-8 z-30">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-lg font-bold text-white tracking-tight">
          {currentRouteHeader.title}
        </h1>
        <p className="text-xs text-[#6B7280]">
          {currentRouteHeader.subtitle}
        </p>
      </div>

      {/* Live Toast Popover */}
      {toastMessage && (
        <div className="absolute top-20 right-8 flex items-center gap-2 rounded-xl border border-[#1D63ED]/40 bg-[#0C2448] px-4 py-2.5 shadow-xl text-xs text-[#38BDF8] animate-bounce">
          <CheckCircle size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search Input with ⌘K Badge */}
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3.5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="h-9 w-60 rounded-xl border border-[#1F2937] bg-[#121721] pl-9 pr-10 text-xs text-white placeholder-[#6B7280] outline-none transition focus:border-[#1D63ED] focus:ring-1 focus:ring-[#1D63ED]"
          />
          <kbd className="absolute right-2.5 flex h-5 items-center rounded border border-[#374151] bg-[#1F2937] px-1.5 text-[10px] font-mono text-[#9CA3AF]">
            ⌘K
          </kbd>
        </div>

        {/* Workspace Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsWsDropdownOpen((prev) => !prev)}
            className="flex h-9 items-center gap-2 rounded-xl border border-[#1F2937] bg-[#121721] px-3 text-xs font-medium text-white transition hover:border-[#374151]"
          >
            <Building2 size={14} className="text-[#9CA3AF]" />
            <span className="max-w-[120px] truncate">{workspaceName}</span>
            <ChevronDown size={14} className="text-[#6B7280]" />
          </button>

          {isWsDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#1F2937] bg-[#121721] p-2 shadow-2xl z-50">
              <div className="px-2 py-1 text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider">
                Workspaces
              </div>
              {workspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    selectWorkspace(ws);
                    setIsWsDropdownOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition ${
                    currentWorkspace?.id === ws.id
                      ? "bg-[#1D63ED]/20 text-[#38BDF8] font-semibold"
                      : "text-slate-300 hover:bg-[#1F2937]"
                  }`}
                >
                  <span className="truncate">{ws.name}</span>
                  {currentWorkspace?.id === ws.id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                  )}
                </button>
              ))}
              <div className="mt-1 border-t border-[#1F2937] pt-1">
                <button
                  onClick={() => {
                    setIsWsDropdownOpen(false);
                    navigate("/workspaces");
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-[#1D63ED] hover:bg-[#1D63ED]/10 transition"
                >
                  <Plus size={14} />
                  <span>Manage Workspaces</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Primary "+ New" Button */}
        <button
          onClick={() => navigate("/projects")}
          className="flex h-9 items-center gap-1.5 rounded-xl bg-[#1D63ED] px-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1551C9] active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#1F2937] bg-[#121721] text-[#9CA3AF] transition hover:text-white hover:border-[#374151]"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#1D63ED] text-[9px] font-bold text-white ring-2 ring-[#0B0F17]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Avatar */}
        <div
          onClick={() => navigate("/settings")}
          title={userName}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2937] text-xs font-bold text-white ring-2 ring-[#374151] cursor-pointer hover:ring-[#1D63ED]"
        >
          {userInitial}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
