import { useState, useEffect, useCallback } from "react";
import { Plus, Calendar, FolderKanban, ArrowRight, ArrowLeft, CheckCircle2, RefreshCw, CheckSquare } from "lucide-react";
import { useWorkspace } from "../../context/useWorkspace";
import { getTasksByProject, createTask, updateTaskStatus } from "../../services/taskService";
import { getProjectsByWorkspace } from "../../services/projectService";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";
import TaskDetailsModal from "../../components/tasks/TaskDetailsModal";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";
import { formatDateForDisplay } from "../../utils/dateUtils";

const normalizeStatus = (status) => {
  const value = Number(status);
  return value >= 0 && value <= 2 ? value : 0;
};

const priorityBadges = {
  0: { label: "Low", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  1: { label: "Medium", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  2: { label: "High", className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

function Tasks() {
  const { currentWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [actionError, setActionError] = useState("");

  // Fetch projects in workspace
  const workspaceId = currentWorkspace?.id;

  useEffect(() => {
    let isCancelled = false;

    const loadProjects = async () => {
      if (!workspaceId) {
        if (!isCancelled) {
          setProjects([]);
          setSelectedProjectId(null);
          setTasks([]);
          setIsLoading(false);
        }
        return;
      }

      setIsLoading(true);
      try {
        const res = await getProjectsByWorkspace(workspaceId);
        if (isCancelled) return;
        const raw = res?.data || res;
        const items = Array.isArray(raw) ? raw : raw?.items ?? [];
        setProjects(items);
        if (items.length > 0) {
          setSelectedProjectId(items[0].id);
        } else {
          setSelectedProjectId(null);
          setTasks([]);
          setIsLoading(false);
        }
      } catch {
        if (isCancelled) return;
        setProjects([]);
        setSelectedProjectId(null);
        setTasks([]);
        setIsLoading(false);
      }
    };

    loadProjects();

    return () => {
      isCancelled = true;
    };
  }, [workspaceId]);

  // Fetch tasks for selected project
  const fetchTasks = useCallback(async () => {
    if (!selectedProjectId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const response = await getTasksByProject(selectedProjectId);
      const raw = response?.data || response;
      const items = Array.isArray(raw) ? raw : raw?.items ?? [];
      setTasks(items);
    } catch (err) {
      console.warn("Could not fetch tasks from API:", err?.message || err);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      if (ignore || !selectedProjectId) return;
      await fetchTasks();
    };

    void run();
    return () => {
      ignore = true;
    };
  }, [selectedProjectId, fetchTasks]);

  // Status Change Handler (Kanban status transition)
  const handleStatusChange = async (taskId, newStatus, e) => {
    e.stopPropagation();
    const previousTasks = tasks;
    setActionError("");
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      if (selectedProjectId) {
        await updateTaskStatus(selectedProjectId, taskId, newStatus);
      }
    } catch (err) {
      setTasks(previousTasks);
      setActionError(err?.message || "Failed to update task status.");
    }
  };

  const handleCreateTask = async (taskData) => {
    if (!selectedProjectId) return;
    try {
      const response = await createTask(selectedProjectId, taskData);
      const newT = response?.data || response;
      if (newT && newT.id) {
        setTasks((prev) => [newT, ...prev]);
      } else {
        await fetchTasks();
      }
    } catch (err) {
      console.error("Task creation failed:", err);
      throw err;
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const columns = [
    { title: "To Do", statusVal: 0, badgeBg: "bg-[#0D1117] text-slate-400 border border-[#30363D]" },
    { title: "In Progress", statusVal: 1, badgeBg: "bg-sky-500/10 text-sky-400 border border-sky-500/20" },
    { title: "Completed", statusVal: 2, badgeBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
  ];

  const selectedProjectObj = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="space-y-6 pb-10 select-none">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#F0F6FC] flex items-center gap-2">
            <span>Tasks & Kanban</span>
            {isLoading && <RefreshCw size={14} className="animate-spin text-sky-400" />}
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Track issue status, sprint backlogs, and task assignments across workspace projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {projects.length > 0 && (
            <select
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              className="rounded-lg border border-[#30363D] bg-[#161B22] px-3.5 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500 cursor-pointer"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}

          {projects.length > 0 && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
            >
              <Plus size={14} />
              <span>New Task</span>
            </button>
          )}
        </div>
      </div>

      {actionError && (
        <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
          {actionError}
        </div>
      )}

      {/* Main Body State: Loading / No Projects / Kanban Board */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-96 w-full" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No Projects Available"
          description={`Workspace "${currentWorkspace?.name || "Current Workspace"}" has no projects yet. Create a project to start adding tasks.`}
        />
      ) : tasks.length === 0 ? (
        <EmptyState
          icon={CheckSquare}
          title={`No Tasks in Project "${selectedProjectObj?.name || "Selected Project"}"`}
          description="This project currently has no open or completed tasks. Create a task to start tracking work on the Kanban board."
          actionLabel="Create First Task"
          onAction={() => setIsCreateModalOpen(true)}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => normalizeStatus(t.status) === col.statusVal);

            return (
              <div
                key={col.title}
                className="rounded-xl border border-[#30363D] bg-[#161B22] p-4 space-y-3 min-h-[450px]"
              >
                <div className="flex items-center justify-between border-b border-[#30363D] pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">{col.title}</h3>
                    <span
                      className={`flex h-4 px-2 items-center justify-center rounded-full text-[10px] font-mono font-bold ${col.badgeBg}`}
                    >
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {colTasks.length === 0 ? (
                    <div className="py-12 text-center text-xs text-slate-500 font-mono">
                      No tasks in {col.title}
                    </div>
                  ) : (
                    colTasks.map((task) => {
                      const priorityInfo = priorityBadges[task.priority ?? 1] || priorityBadges[1];
                      const formattedDate = formatDateForDisplay(task.dueDate);

                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className="group relative rounded-lg border border-[#30363D] bg-[#0D1117] p-3.5 space-y-2 transition hover:border-sky-500 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`rounded border px-1.5 py-0.5 text-[10px] font-mono font-semibold ${priorityInfo.className}`}
                            >
                              {priorityInfo.label}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">#{task.id}</span>
                          </div>

                          <h4 className="text-xs font-semibold text-white leading-snug group-hover:text-sky-400 transition">
                            {task.title}
                          </h4>

                          {task.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-2">
                              {task.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-[#30363D]">
                            <div className="flex items-center gap-1 text-slate-400">
                              <FolderKanban size={11} />
                              <span className="max-w-[80px] truncate">{selectedProjectObj?.name || "Project"}</span>
                            </div>
                            <div className="flex items-center gap-1 text-slate-400">
                              <Calendar size={11} />
                              <span>{formattedDate}</span>
                            </div>
                          </div>

                          {/* Interactive Status Transition Controls */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#30363D]/60 text-[10px]">
                            {col.statusVal > 0 ? (
                              <button
                                onClick={(e) => handleStatusChange(task.id, col.statusVal - 1, e)}
                                className="flex items-center gap-1 text-slate-400 hover:text-white transition cursor-pointer"
                                title="Move left"
                              >
                                <ArrowLeft size={12} />
                                <span>Back</span>
                              </button>
                            ) : (
                              <div />
                            )}

                            {col.statusVal < 2 ? (
                              <button
                                onClick={(e) => handleStatusChange(task.id, col.statusVal + 1, e)}
                                className="flex items-center gap-1 text-sky-400 hover:underline font-semibold cursor-pointer"
                                title="Move right"
                              >
                                <span>Next</span>
                                <ArrowRight size={12} />
                              </button>
                            ) : (
                              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                                <CheckCircle2 size={12} />
                                <span>Done</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTask}
        projectId={selectedProjectId}
      />

      {/* Task Details & Edit Modal */}
      <TaskDetailsModal
        isOpen={Boolean(selectedTask)}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        projectId={selectedProjectId}
        onTaskUpdated={handleTaskUpdated}
        onTaskDeleted={handleTaskDeleted}
      />
    </div>
  );
}

export default Tasks;



