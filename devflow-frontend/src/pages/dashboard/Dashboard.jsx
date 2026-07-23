import { useState } from "react";
import {
  FolderKanban,
  CheckSquare,
  Users,
  Bell,
  CheckCircle2,
  UserPlus,
  Workflow,
  FileText,
  Calendar,
  Plus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import StatCard from "../../components/dashboard/StatCard";

const recentProjects = [
  {
    id: 1,
    name: "DevFlow Platform",
    description: "Internal platform development",
    status: "In Progress",
    statusColor: "bg-[#0C2448] text-[#38BDF8] border-[#1D63ED]/30",
    progress: 68,
    barColor: "bg-[#1D63ED]",
    time: "2h ago",
    avatar: "D",
    avatarBg: "bg-[#1D63ED]/20 text-[#38BDF8]",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "Cross-platform mobile application",
    status: "Planning",
    statusColor: "bg-[#0B3B26] text-[#34D399] border-[#10B981]/30",
    progress: 24,
    barColor: "bg-[#34D399]",
    time: "1d ago",
    avatar: "M",
    avatarBg: "bg-[#10B981]/20 text-[#34D399]",
  },
  {
    id: 3,
    name: "Website Redesign",
    description: "Marketing website overhaul",
    status: "In Progress",
    statusColor: "bg-[#0C2448] text-[#38BDF8] border-[#1D63ED]/30",
    progress: 45,
    barColor: "bg-[#A855F7]",
    time: "2d ago",
    avatar: "W",
    avatarBg: "bg-[#A855F7]/20 text-[#C084FC]",
  },
  {
    id: 4,
    name: "API Gateway",
    description: "Backend API infrastructure",
    status: "Review",
    statusColor: "bg-[#3D2109] text-[#FBBF24] border-[#F59E0B]/30",
    progress: 80,
    barColor: "bg-[#F59E0B]",
    time: "3d ago",
    avatar: "A",
    avatarBg: "bg-[#F59E0B]/20 text-[#FBBF24]",
  },
];

const activityFeed = [
  {
    id: 1,
    user: "Ali Raza",
    action: "created a new project",
    target: '"API Gateway"',
    time: "2h ago",
    icon: Users,
    iconBg: "bg-[#0C2448] text-[#38BDF8]",
  },
  {
    id: 2,
    user: "Task",
    action: '"Design dashboard UI"',
    target: "completed by Fatima Noor",
    time: "4h ago",
    icon: CheckCircle2,
    iconBg: "bg-[#0B3B26] text-[#34D399]",
  },
  {
    id: 3,
    user: "Sara Khan",
    action: "joined the workspace",
    target: "",
    time: "6h ago",
    icon: UserPlus,
    iconBg: "bg-[#2D164B] text-[#C084FC]",
  },
  {
    id: 4,
    user: "Workflow",
    action: '"Task Assignment"',
    target: "executed successfully",
    time: "8h ago",
    icon: Workflow,
    iconBg: "bg-[#3D2109] text-[#FBBF24]",
  },
  {
    id: 5,
    user: "Report",
    action: '"Weekly Summary"',
    target: "generated",
    time: "1d ago",
    icon: FileText,
    iconBg: "bg-[#0C2448] text-[#38BDF8]",
  },
];

function Dashboard() {
  const { user } = useAuth();
  const [activeTaskTab, setActiveTaskTab] = useState("Upcoming");

  const userName = user?.email
    ? user.email.split("@")[0]
    : "Bilal";
  const formattedName =
    userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <div className="space-y-8 pb-10">
      {/* Greeting Banner */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Good evening, {formattedName} 👋
        </h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Here's what's happening in your workspace today.
        </p>
      </div>

      {/* Stat Cards Grid (4 Columns) */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Projects"
          value="12"
          icon={FolderKanban}
          trend="↑ 2 this week"
          trendType="up"
          iconBg="bg-[#0C2448]"
          iconColor="text-[#38BDF8]"
        />
        <StatCard
          title="Tasks"
          value="32"
          icon={CheckSquare}
          trend="↑ 6 this week"
          trendType="up"
          iconBg="bg-[#0B3B26]"
          iconColor="text-[#34D399]"
        />
        <StatCard
          title="Members"
          value="8"
          icon={Users}
          trend="— No change"
          trendType="neutral"
          iconBg="bg-[#2D164B]"
          iconColor="text-[#C084FC]"
        />
        <StatCard
          title="Notifications"
          value="7"
          icon={Bell}
          trend="↓ 2 this week"
          trendType="down"
          iconBg="bg-[#3D2109]"
          iconColor="text-[#FBBF24]"
        />
      </div>

      {/* Middle Section: Recent Projects & Activity Feed */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Recent Projects Card (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#1F2937] bg-[#121721] p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-base font-semibold text-white">
              Recent Projects
            </h2>
            <button className="text-xs font-semibold text-[#1D63ED] hover:underline">
              View all
            </button>
          </div>

          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between rounded-xl border border-[#1F2937]/60 bg-[#0B0F17]/50 p-3.5 transition hover:border-[#374151]"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm ${project.avatarBg}`}
                  >
                    {project.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="text-xs text-[#6B7280]">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium ${project.statusColor}`}
                  >
                    {project.status}
                  </span>

                  <div className="hidden sm:flex items-center gap-2 w-28">
                    <span className="text-xs font-medium text-[#9CA3AF] w-8">
                      {project.progress}%
                    </span>
                    <div className="h-1.5 flex-1 rounded-full bg-[#1F2937] overflow-hidden">
                      <div
                        className={`h-full rounded-full ${project.barColor}`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <span className="text-xs text-[#6B7280]">
                    {project.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed Card (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-[#1F2937] bg-[#121721] p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-base font-semibold text-white">
              Activity Feed
            </h2>
            <button className="text-xs font-semibold text-[#1D63ED] hover:underline">
              View all
            </button>
          </div>

          <div className="relative space-y-4 pl-2 before:absolute before:left-[19px] before:top-3 before:bottom-3 before:w-[2px] before:bg-[#1F2937]">
            {activityFeed.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="relative flex items-start justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-[#121721] ${item.iconBg}`}
                    >
                      <Icon size={14} />
                    </div>
                    <div>
                      <p className="text-white">
                        <span className="font-semibold">{item.user}</span>{" "}
                        <span className="text-[#9CA3AF]">{item.action}</span>{" "}
                        <span className="font-semibold text-white">
                          {item.target}
                        </span>
                      </p>
                    </div>
                  </div>
                  <span className="text-[#6B7280] whitespace-nowrap text-[11px]">
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: My Tasks & Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* My Tasks Card (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#1F2937] bg-[#121721] p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1F2937] pb-3 gap-3">
            <div className="flex items-center gap-6">
              <h2 className="text-base font-semibold text-white">
                My Tasks
              </h2>
              <div className="flex gap-4 text-xs font-medium">
                {["Upcoming", "Overdue", "Completed"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTaskTab(tab)}
                    className={`pb-3 border-b-2 transition ${
                      activeTaskTab === tab
                        ? "border-[#1D63ED] text-white"
                        : "border-transparent text-[#6B7280] hover:text-[#9CA3AF]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <button className="text-xs font-semibold text-[#1D63ED] hover:underline self-end sm:self-auto">
              View all
            </button>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between rounded-xl border border-[#1F2937]/60 bg-[#0B0F17]/50 p-4 transition hover:border-[#374151]">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[#374151] bg-[#121721] text-[#1D63ED] focus:ring-0"
                />
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Review workflow automation logic
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#6B7280]">
                    <FolderKanban size={12} />
                    <span>DevFlow Platform</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="rounded-lg bg-[#2D164B] border border-[#A855F7]/30 px-2.5 py-1 text-[11px] font-semibold text-[#C084FC]">
                  High
                </span>

                <div className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                  <Calendar size={13} />
                  <span>May 24</span>
                </div>

                <div className="flex -space-x-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1D63ED] text-[10px] font-bold text-white ring-2 ring-[#121721]">
                    AR
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-white ring-2 ring-[#121721]">
                    FN
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1F2937] text-[10px] font-medium text-[#9CA3AF] ring-2 ring-[#121721]">
                    +2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Card (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-[#1F2937] bg-[#121721] p-6 shadow-sm">
          <h2 className="text-base font-semibold text-white mb-4">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex flex-col items-center justify-center rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 p-4 transition hover:border-[#374151] hover:bg-[#161B22]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0C2448] text-[#38BDF8] mb-2">
                <FolderKanban size={20} />
              </div>
              <span className="text-xs font-medium text-white">
                New Project
              </span>
            </button>

            <button className="flex flex-col items-center justify-center rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 p-4 transition hover:border-[#374151] hover:bg-[#161B22]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B3B26] text-[#34D399] mb-2">
                <CheckSquare size={20} />
              </div>
              <span className="text-xs font-medium text-white">
                New Task
              </span>
            </button>

            <button className="flex flex-col items-center justify-center rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 p-4 transition hover:border-[#374151] hover:bg-[#161B22]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2D164B] text-[#C084FC] mb-2">
                <Workflow size={20} />
              </div>
              <span className="text-xs font-medium text-white">
                New Workflow
              </span>
            </button>

            <button className="flex flex-col items-center justify-center rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 p-4 transition hover:border-[#374151] hover:bg-[#161B22]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3D2109] text-[#FBBF24] mb-2">
                <UserPlus size={20} />
              </div>
              <span className="text-xs font-medium text-white">
                Invite Member
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;