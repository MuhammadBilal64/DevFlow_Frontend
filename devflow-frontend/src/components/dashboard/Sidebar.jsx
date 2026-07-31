import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Workflow,
  Bell,
  Settings,
  ChevronDown,
  MoreVertical,
  LogOut,
  Building2,
  Plus,
  Check,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import DevFlowLogo from "../common/DevFlowLogo";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { title: "Projects", icon: FolderKanban, path: "/projects" },
  { title: "Tasks", icon: CheckSquare, path: "/tasks" },
  { title: "Workflows", icon: Workflow, path: "/workflows" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

function Sidebar() {
  const { user, logout } = useAuth();
  const { workspaces, currentWorkspace, selectWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const wsMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wsMenuRef.current && !wsMenuRef.current.contains(event.target)) {
        setIsWorkspaceMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userName = user?.email ? user.email.split("@")[0] : "User";
  const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);
  const userEmail = user?.email || "user@example.com";
  const workspaceName = currentWorkspace?.name || "DevFlow Workspace";

  const handleLogout = async () => {
    setIsProfileMenuOpen(false);
    try {
      await logout();
      navigate("/auth/login");
    } catch (err) {
      console.warn("Logout error:", err);
      navigate("/auth/login");
    }
  };

  return (
    <aside className="relative flex h-screen w-64 flex-col border-r border-[#30363D] bg-[#0D1117] text-slate-400 select-none">
      {/* Brand Header */}
      <div className="flex items-center px-6 py-5 border-b border-[#30363D]/60">
        <DevFlowLogo size="md" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#161B22] text-white border border-[#30363D] font-semibold"
                    : "text-slate-400 hover:bg-[#161B22]/50 hover:text-white"
                }`
              }
            >
              <Icon size={16} className="shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Workspace Selector Card */}
      <div className="relative px-3 py-2" ref={wsMenuRef}>
        {isWorkspaceMenuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl border border-[#30363D] bg-[#161B22] p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="px-3 py-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-wider border-b border-[#30363D] mb-1">
              Switch Workspace
            </div>
            <div className="py-1 max-h-48 overflow-y-auto space-y-1">
              {workspaces.map((ws) => {
                const isSelected = currentWorkspace?.id === ws.id;
                return (
                  <button
                    key={ws.id}
                    onClick={() => {
                      selectWorkspace(ws);
                      setIsWorkspaceMenuOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs transition cursor-pointer ${
                      isSelected
                        ? "bg-sky-500/10 text-sky-400 font-semibold border border-sky-500/20"
                        : "text-slate-300 hover:bg-[#0D1117] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Building2 size={14} />
                      <span className="truncate">{ws.name}</span>
                    </div>
                    {isSelected && <Check size={14} className="text-sky-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#30363D] pt-1 mt-1">
              <button
                onClick={() => {
                  setIsWorkspaceMenuOpen(false);
                  navigate("/workspaces");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-sky-400 hover:bg-[#0D1117] transition font-medium cursor-pointer"
              >
                <Plus size={14} />
                <span>Manage Workspaces</span>
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setIsWorkspaceMenuOpen((prev) => !prev);
            setIsProfileMenuOpen(false);
          }}
          className={`flex w-full items-center justify-between rounded-lg border p-2.5 text-left transition cursor-pointer ${
            isWorkspaceMenuOpen
              ? "border-sky-500/40 bg-sky-500/10"
              : "border-[#30363D] bg-[#161B22] hover:border-slate-500"
          }`}
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#30363D] text-[11px] font-bold text-white">
              {workspaceName.substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="truncate text-xs font-semibold text-white">
                {workspaceName}
              </p>
              <p className="text-[10px] text-slate-500">Workspace</p>
            </div>
          </div>
          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform duration-200 ${
              isWorkspaceMenuOpen ? "rotate-180 text-sky-400" : ""
            }`}
          />
        </button>
      </div>

      {/* User Profile Footer */}
      <div className="relative border-t border-[#30363D] p-3" ref={profileMenuRef}>
        {isProfileMenuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl border border-[#30363D] bg-[#161B22] p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="px-3 py-2 border-b border-[#30363D]">
              <p className="text-xs font-semibold text-white truncate">{formattedName}</p>
              <p className="text-[11px] text-slate-400 truncate">{userEmail}</p>
            </div>

            <div className="py-1 space-y-1">
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-300 hover:bg-[#0D1117] hover:text-white transition cursor-pointer"
              >
                <Settings size={14} />
                <span>Account Settings</span>
              </button>
            </div>

            <div className="border-t border-[#30363D] pt-1 mt-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 transition font-medium cursor-pointer"
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        <div
          onClick={() => {
            setIsProfileMenuOpen((prev) => !prev);
            setIsWorkspaceMenuOpen(false);
          }}
          className={`flex items-center justify-between rounded-lg p-2 transition cursor-pointer ${
            isProfileMenuOpen ? "bg-[#161B22] border border-[#30363D]" : "hover:bg-[#161B22]"
          }`}
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#30363D] text-xs font-bold text-white">
              {formattedName.substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="truncate text-xs font-semibold text-white">
                {formattedName}
              </p>
              <p className="truncate text-[11px] text-slate-500">
                {userEmail}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsProfileMenuOpen((prev) => !prev);
              setIsWorkspaceMenuOpen(false);
            }}
            className="p-1 text-slate-400 hover:text-white transition rounded cursor-pointer"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;