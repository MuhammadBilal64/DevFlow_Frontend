import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Plus, ChevronDown, Bell, Building2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import { getUnreadNotificationCount } from "../../services/notificationService";
import useSignalRNotification from "../../hooks/useSignalRNotification";
import { NOTIFICATION_COUNT_REFRESH } from "../../utils/notificationEvents";

const routeHeaders = {
  "/dashboard": { title: "Dashboard", subtitle: "Overview of your active workspace" },
  "/projects": { title: "Projects", subtitle: "Manage and track workspace projects" },
  "/tasks": { title: "Tasks", subtitle: "Sprint boards and issue assignments" },
  "/workflows": { title: "Workflows", subtitle: "Automate development and release flows" },
  "/notifications": { title: "Notifications", subtitle: "Workspace activity and real-time alerts" },
  "/settings": { title: "Settings", subtitle: "Workspace preferences and account configuration" },
  "/workspaces": { title: "Workspaces", subtitle: "Manage organization workspaces and teams" },
};

function Topbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { workspaces, currentWorkspace, selectWorkspace } = useWorkspace();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isWsDropdownOpen, setIsWsDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimerRef = useRef(null);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await getUnreadNotificationCount();
      const count = res?.data?.unreadCount ?? 0;
      if (typeof count === "number") {
        setUnreadCount(count);
      }
    } catch (err) {
      console.warn("Failed to fetch unread notification count:", err?.message || err);
    }
  }, []);

  useSignalRNotification((notification) => {
    setUnreadCount((prev) => prev + 1);
    setToastMessage(notification.message || "New notification received");

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimerRef.current = null;
    }, 4000);
  });

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  useEffect(() => {
    const handleRefresh = () => {
      fetchUnreadCount();
    };

    window.addEventListener(NOTIFICATION_COUNT_REFRESH, handleRefresh);
    return () => {
      window.removeEventListener(NOTIFICATION_COUNT_REFRESH, handleRefresh);
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, [fetchUnreadCount]);

  const currentRouteHeader = routeHeaders[location.pathname] || {
    title: "Dashboard",
    subtitle: "Overview of your workspace",
  };

  const workspaceName = currentWorkspace?.name || "No workspace selected";
  const userName = user?.name || (user?.email ? user.email.split("@")[0] : "User");
  const userInitial = userName.charAt(0).toUpperCase();
  const badgeLabel = unreadCount > 99 ? "99+" : String(unreadCount);

  return (
    <header className="relative flex h-16 items-center justify-between border-b border-[#30363D] bg-[#0D1117] px-6 lg:px-8 z-30 select-none">
      <div>
        <h1 className="text-base font-bold text-[#F0F6FC] tracking-tight">
          {currentRouteHeader.title}
        </h1>
        <p className="text-[11px] text-slate-400">
          {currentRouteHeader.subtitle}
        </p>
      </div>

      {toastMessage && (
        <div className="absolute top-20 right-8 flex items-center gap-2 rounded-lg border border-sky-500/30 bg-[#161B22] px-4 py-2.5 shadow-xl text-xs text-sky-400 animate-bounce z-50">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsWsDropdownOpen((prev) => !prev)}
            className="flex h-8 items-center gap-2 rounded-lg border border-[#30363D] bg-[#161B22] px-3 text-xs font-medium text-slate-200 hover:border-slate-500 transition cursor-pointer"
          >
            <Building2 size={13} className="text-slate-400" />
            <span className="max-w-[120px] truncate">{workspaceName}</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {isWsDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[#30363D] bg-[#161B22] p-2 shadow-2xl z-50">
              <div className="px-2 py-1 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Workspaces
              </div>
              {workspaces.length === 0 ? (
                <div className="px-3 py-2 text-xs text-slate-500">No workspaces available</div>
              ) : (
                workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    type="button"
                    onClick={() => {
                      selectWorkspace(ws);
                      setIsWsDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition cursor-pointer ${
                      currentWorkspace?.id === ws.id
                        ? "bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/20"
                        : "text-slate-300 hover:bg-[#0D1117]"
                    }`}
                  >
                    <span className="truncate">{ws.name}</span>
                    {currentWorkspace?.id === ws.id && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    )}
                  </button>
                ))
              )}
              <div className="mt-1 border-t border-[#30363D] pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsWsDropdownOpen(false);
                    navigate("/workspaces");
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-sky-400 hover:bg-[#0D1117] transition cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Manage Workspaces</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="flex h-8 items-center gap-1.5 rounded-lg bg-[#F0F6FC] px-3 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
        >
          <Plus size={14} />
          <span>New Project</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#30363D] bg-[#161B22] text-slate-400 hover:text-white hover:border-slate-500 transition cursor-pointer"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell size={15} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-sky-500 px-1 text-[9px] font-bold text-white ring-2 ring-[#0D1117]">
              {badgeLabel}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate("/settings")}
          title={userName}
          aria-label="Open settings"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#30363D] text-xs font-bold text-white cursor-pointer hover:ring-2 hover:ring-sky-500 transition"
        >
          {userInitial}
        </button>
      </div>
    </header>
  );
}

export default Topbar;
