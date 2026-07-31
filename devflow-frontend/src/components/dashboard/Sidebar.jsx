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
  User,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    title: "Tasks",
    icon: CheckSquare,
    path: "/tasks",
  },
  {
    title: "Workflows",
    icon: Workflow,
    path: "/workflows",
  },
  {
    title: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

function Sidebar() {
  const { user, logout } = useAuth();
  const { workspaces, currentWorkspace, selectWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const wsMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close menus on click outside
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

  const userName = user?.email
    ? user.email.split("@")[0]
    : "User";
  const formattedName =
    userName.charAt(0).toUpperCase() + userName.slice(1);
  const userEmail = user?.email || "user@example.com";
  const workspaceName = currentWorkspace?.name || "DevFlow Workspace";

  const handleLogout = async () => {
    setIsProfileMenuOpen(false);
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.warn("Logout error:", err);
      navigate("/login");
    }
  };

  return (
    <aside className="relative flex h-screen w-64 flex-col border-r border-[#1F2937] bg-[#0B0F17] text-[#9CA3AF]">
      {/* Brand Header */}
      <div className="flex flex-col px-6 py-5 border-b border-[#1F2937]/50">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1D63ED] text-xs font-black text-white">
            DF
          </span>
          <span>DevFlow</span>
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5">Workflow Automation Engine</p>
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
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1D63ED] text-white shadow-md shadow-[#1D63ED]/20"
                    : "text-[#9CA3AF] hover:bg-[#121721] hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Workspace Selector Card */}
      <div className="relative px-3 py-2" ref={wsMenuRef}>
        {/* Workspace Switcher Popover Menu */}
        {isWorkspaceMenuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 rounded-2xl border border-[#1F2937] bg-[#121721] p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="px-3 py-2 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider border-b border-[#1F2937]">
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
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs transition ${
                      isSelected
                        ? "bg-[#0C2448] text-[#38BDF8] font-semibold"
                        : "text-[#9CA3AF] hover:bg-[#0B0F17] hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Building2 size={14} />
                      <span className="truncate">{ws.name}</span>
                    </div>
                    {isSelected && <Check size={14} className="text-[#38BDF8]" />}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-[#1F2937] pt-1 mt-1">
              <button
                onClick={() => {
                  setIsWorkspaceMenuOpen(false);
                  navigate("/workspaces");
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs text-[#1D63ED] hover:bg-[#0B0F17] transition font-medium"
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
          className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
            isWorkspaceMenuOpen
              ? "border-[#1D63ED] bg-[#0C2448]/40"
              : "border-[#1F2937] bg-[#121721] hover:border-[#374151]"
          }`}
        >
          <div className="flex items-center gap-3 truncate">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#1D63ED] text-xs font-bold text-white shadow-sm">
              {workspaceName.substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="truncate text-xs font-semibold text-white">
                {workspaceName}
              </p>
              <p className="text-[11px] text-[#6B7280]">Workspace</p>
            </div>
          </div>
          <ChevronDown
            size={16}
            className={`text-[#6B7280] transition-transform duration-200 ${
              isWorkspaceMenuOpen ? "rotate-180 text-[#38BDF8]" : ""
            }`}
          />
        </button>
      </div>

      {/* User Profile Footer */}
      <div className="relative border-t border-[#1F2937] p-3" ref={profileMenuRef}>
        {/* User Account Popover Menu */}
        {isProfileMenuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 rounded-2xl border border-[#1F2937] bg-[#121721] p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="px-3 py-2 border-b border-[#1F2937]">
              <p className="text-xs font-semibold text-white truncate">{formattedName}</p>
              <p className="text-[11px] text-[#6B7280] truncate">{userEmail}</p>
            </div>

            <div className="py-1 space-y-1">
              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate("/settings");
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-[#9CA3AF] hover:bg-[#0B0F17] hover:text-white transition"
              >
                <Settings size={14} />
                <span>Account Settings</span>
              </button>

              <button
                onClick={() => {
                  setIsProfileMenuOpen(false);
                  navigate("/workspaces");
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-[#9CA3AF] hover:bg-[#0B0F17] hover:text-white transition"
              >
                <Building2 size={14} />
                <span>Workspaces</span>
              </button>
            </div>

            <div className="border-t border-[#1F2937] pt-1 mt-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 transition font-medium"
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
          className={`flex items-center justify-between rounded-xl p-2 transition cursor-pointer ${
            isProfileMenuOpen ? "bg-[#121721] ring-1 ring-[#1D63ED]" : "hover:bg-[#121721]"
          }`}
        >
          <div className="flex items-center gap-3 truncate">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#1F2937] text-xs font-bold text-white ring-2 ring-[#374151]">
              {formattedName.substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="truncate text-xs font-semibold text-white">
                {formattedName}
              </p>
              <p className="truncate text-[11px] text-[#6B7280]">
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
            className="p-1 text-[#6B7280] hover:text-white transition rounded-lg hover:bg-[#1F2937]"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
