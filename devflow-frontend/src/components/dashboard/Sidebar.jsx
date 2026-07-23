import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Workflow,
  Bell,
  Settings,
  ChevronDown,
  MoreVertical,
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
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();

  const userName = user?.email
    ? user.email.split("@")[0]
    : "Muhammad Bilal";
  const formattedName =
    userName.charAt(0).toUpperCase() + userName.slice(1);
  const userEmail = user?.email || "bilal@example.com";
  const workspaceName = currentWorkspace?.name || "Acme Corporation";

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[#1F2937] bg-[#0B0F17] text-[#9CA3AF]">
      {/* Brand Header */}
      <div className="flex flex-col px-6 py-5">
        <h1 className="text-xl font-bold tracking-tight text-white">
          DevFlow
        </h1>
        <p className="text-xs text-[#6B7280]">Workflow Automation</p>
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
                `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#1D63ED] text-white shadow-sm"
                    : "text-[#9CA3AF] hover:bg-[#161B22] hover:text-white"
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
      <div className="px-3 py-2">
        <button className="flex w-full items-center justify-between rounded-xl border border-[#1F2937] bg-[#121721] p-3 text-left transition hover:border-[#374151]">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1D63ED] text-xs font-bold text-white">
              {workspaceName.substring(0, 2).toUpperCase()}
            </div>
            <div className="truncate">
              <p className="truncate text-xs font-semibold text-white">
                {workspaceName}
              </p>
              <p className="text-[11px] text-[#6B7280]">Workspace</p>
            </div>
          </div>
          <ChevronDown size={16} className="text-[#6B7280]" />
        </button>
      </div>

      {/* User Profile Footer */}
      <div className="border-t border-[#1F2937] p-3">
        <div className="flex items-center justify-between rounded-xl p-2 transition hover:bg-[#161B22]">
          <div className="flex items-center gap-3 truncate">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2937] text-xs font-bold text-white ring-2 ring-[#374151]">
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
          <button className="text-[#6B7280] hover:text-white">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;