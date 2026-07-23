import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Workflow,
  Bell,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    active: true,
  },
  {
    title: "Projects",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    icon: CheckSquare,
  },
  {
    title: "Workflows",
    icon: Workflow,
  },
  {
    title: "Notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-[#30363D] bg-[#161B22]">

      {/* Logo */}
      <div className="border-b border-[#30363D] px-6 py-5">
        <h1 className="text-xl font-bold text-white">
          DevFlow
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Workflow Automation
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                item.active
                  ? "bg-sky-500 text-white"
                  : "text-slate-400 hover:bg-[#21262D] hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.title}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-[#30363D] p-4">
        <div className="rounded-lg bg-[#0D1117] p-3">
          <p className="text-sm font-medium text-white">
                Logged in User
          </p>

          <p className="text-xs text-slate-400">
                  Workspace Member
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;