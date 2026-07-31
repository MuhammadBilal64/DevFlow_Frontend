import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  CheckSquare,
  Users,
  Bell,
  Plus,
  ArrowRight,
  Workflow,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import StatCard from "../../components/dashboard/StatCard";
import CreateProjectModal from "../../components/projects/CreateProjectModal";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";
import CreateWorkflowModal from "../../components/workflows/CreateWorkflowModal";
import AddWorkspaceMemberModal from "../../components/workspaces/AddWorkspaceMemberModal";
import { createProject, getProjectsByWorkspace } from "../../services/projectService";
import { createTask } from "../../services/taskService";
import { createWorkflow } from "../../services/workflowService";
import { addWorkspaceMember, getWorkspaceMembers } from "../../services/workspaceService";
import { getUnreadNotificationCount } from "../../services/notificationService";

function Dashboard() {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null); // 'project', 'task', 'workflow', 'member'

  const [stats, setStats] = useState({
    projectsCount: 0,
    membersCount: 0,
    notificationsCount: 0,
  });

  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    if (!currentWorkspace?.id) return;

    Promise.all([
      getProjectsByWorkspace(currentWorkspace.id).catch(() => ({ data: [] })),
      getWorkspaceMembers(currentWorkspace.id).catch(() => ({ data: [] })),
      getUnreadNotificationCount().catch(() => ({ data: 0 })),
    ]).then(([projRes, memberRes, notifRes]) => {
      const projs = projRes?.data || projRes;
      const members = memberRes?.data || memberRes;
      const notifs = notifRes?.data ?? notifRes ?? 0;

      const pItems = Array.isArray(projs) ? projs : projs?.items ?? [];
      const mItems = Array.isArray(members) ? members : members?.items ?? [];
      const nCount = typeof notifs === "number" ? notifs : 0;

      setStats({
        projectsCount: pItems.length,
        membersCount: mItems.length,
        notificationsCount: nCount,
      });

      setRecentProjects(pItems.slice(0, 4));
    });
  }, [currentWorkspace?.id]);

  const userName = user?.name || (user?.email ? user.email.split("@")[0] : "Developer");
  const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

  return (
    <div className="space-y-8 pb-10">
      {/* Greeting Banner */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back, {formattedName} 👋
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-400">
          Overview and pipeline metrics for active workspace:{" "}
          <span className="font-semibold text-[#F0F6FC]">{currentWorkspace?.name || "Active Workspace"}</span>
        </p>
      </div>

      {/* Stat Cards Grid (4 Columns) */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Projects"
          value={String(stats.projectsCount)}
          icon={FolderKanban}
          trend="Workspace active"
          trendType="up"
          iconBg="bg-sky-500/10"
          iconColor="text-sky-400"
        />
        <StatCard
          title="Tasks"
          value="--"
          icon={CheckSquare}
          trend="Sprint active"
          trendType="up"
          iconBg="bg-emerald-500/10"
          iconColor="text-emerald-400"
        />
        <StatCard
          title="Members"
          value={String(stats.membersCount)}
          icon={Users}
          trend="Team roster"
          trendType="neutral"
          iconBg="bg-purple-500/10"
          iconColor="text-purple-400"
        />
        <StatCard
          title="Notifications"
          value={String(stats.notificationsCount)}
          icon={Bell}
          trend="Unread alerts"
          trendType="down"
          iconBg="bg-amber-500/10"
          iconColor="text-amber-400"
        />
      </div>

      {/* Quick Action Controls */}
      <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-3">
        <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
          Quick Workstation Actions
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setModalType("project")}
            className="flex items-center gap-2 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
          >
            <Plus size={14} />
            <span>Create Project</span>
          </button>

          <button
            onClick={() => setModalType("task")}
            className="flex items-center gap-2 rounded-lg border border-[#30363D] bg-[#0D1117] px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 transition cursor-pointer"
          >
            <CheckSquare size={14} className="text-sky-400" />
            <span>Add Task</span>
          </button>

          <button
            onClick={() => setModalType("workflow")}
            className="flex items-center gap-2 rounded-lg border border-[#30363D] bg-[#0D1117] px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 transition cursor-pointer"
          >
            <Workflow size={14} className="text-amber-400" />
            <span>New Workflow</span>
          </button>

          <button
            onClick={() => setModalType("member")}
            className="flex items-center gap-2 rounded-lg border border-[#30363D] bg-[#0D1117] px-4 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 transition cursor-pointer"
          >
            <UserPlus size={14} className="text-purple-400" />
            <span>Invite Member</span>
          </button>
        </div>
      </div>

      {/* Middle Section: Active Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Active Projects</h3>
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-1.5 text-xs text-sky-400 hover:underline font-medium cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {recentProjects.length === 0 ? (
          <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-8 text-center text-xs text-slate-400">
            No active projects found in this workspace. Click "Create Project" to get started.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate("/projects")}
                className="rounded-xl border border-[#30363D] bg-[#161B22] p-4 space-y-2 hover:border-sky-500 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    <FolderKanban size={16} />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {p.status || "Active"}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{p.name}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {p.description || "Workspace project"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateProjectModal
        isOpen={modalType === "project"}
        onClose={() => setModalType(null)}
        onCreate={async (data) => {
          await createProject(data);
          setModalType(null);
        }}
        workspaceId={currentWorkspace?.id}
      />

      <CreateTaskModal
        isOpen={modalType === "task"}
        onClose={() => setModalType(null)}
        onCreate={async () => {
          setModalType(null);
        }}
      />

      <CreateWorkflowModal
        isOpen={modalType === "workflow"}
        onClose={() => setModalType(null)}
        onCreate={async () => {
          setModalType(null);
        }}
      />

      <AddWorkspaceMemberModal
        isOpen={modalType === "member"}
        onClose={() => setModalType(null)}
        onAddMember={async (data) => {
          if (currentWorkspace?.id) {
            await addWorkspaceMember(currentWorkspace.id, data);
          }
          setModalType(null);
        }}
      />
    </div>
  );
}

export default Dashboard;