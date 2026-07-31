import { useState, useEffect, useCallback } from "react";
import { Plus, Calendar, FolderKanban, ArrowRight, ArrowLeft, CheckCircle2, RefreshCw, CheckSquare } from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { getTasksByProject, createTask, updateTaskStatus } from "../../services/taskService";
import { getProjectsByWorkspace } from "../../services/projectService";
import CreateTaskModal from "../../components/tasks/CreateTaskModal";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";

const priorityBadges = {
  0: { label: "Low", className: "bg-[#0B3B26] text-[#34D399] border-[#10B981]/30" },
  1: { label: "Medium", className: "bg-[#3D2109] text-[#FBBF24] border-[#F59E0B]/30" },
  2: { label: "High", className: "bg-[#2D164B] text-[#C084FC] border-[#A855F7]/30" },
};

function Tasks() {
  const { currentWorkspace } = useWorkspace();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects in workspace
  useEffect(() => {
    if (!currentWorkspace?.id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    getProjectsByWorkspace(currentWorkspace.id)
      .then((res) => {
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
      })
      .catch(() => {
        setProjects([]);
        setSelectedProjectId(null);
        setTasks([]);
        setIsLoading(false);
      });
  }, [currentWorkspace?.id]);

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
    if (selectedProjectId) {
      fetchTasks();
    }
  }, [selectedProjectId, fetchTasks]);

  // Status Change Handler (Kanban status transition)
  const handleStatusChange = async (taskId, newStatus) => {
    // Optimistic UI Update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      if (selectedProjectId) {
        await updateTaskStatus(selectedProjectId, taskId, newStatus);
      }
    } catch (err) {
      console.warn("Updated status locally:", err?.message || err);
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

  const columns = [
    { title: "To Do", statusVal: 0, badgeBg: "bg-[#1F2937] text-[#9CA3AF]" },
    { title: "In Progress", statusVal: 1, badgeBg: "bg-[#0C2448] text-[#38BDF8]" },
    { title: "Completed", statusVal: 2, badgeBg: "bg-[#0B3B26] text-[#34D399]" },
  ];

  const selectedProjectObj = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="space-y-6 pb-10">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Tasks & Kanban</span>
            {isLoading && <RefreshCw size={16} className="animate-spin text-[#1D63ED]" />}
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Track issue status, sprint backlogs, and task assignments across workspace projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {projects.length > 0 && (
            <select
              value={selectedProjectId || ""}
              onChange={(e) => setSelectedProjectId(Number(e.target.value))}
              className="rounded-xl border border-[#1F2937] bg-[#121721] px-3.5 py-2 text-xs text-white outline-none focus:border-[#1D63ED]"
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
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1551C9] active:scale-[0.98]"
            >
              <Plus size={16} />
              <span>New Task</span>
            </button>
          )}
        </div>
      </div>

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
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => Number(t.status) === col.statusVal);

            return (
              <div
                key={col.title}
                className="rounded-2xl border border-[#1F2937] bg-[#121721] p-5 space-y-4 shadow-sm min-h-[450px]"
              >
                <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                    <span
                      className={`flex h-5 px-2 items-center justify-center rounded-full text-[11px] font-bold ${col.badgeBg}`}
                    >
                      {colTasks.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {colTasks.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#6B7280]">
                      No tasks in {col.title}
                    </div>
                  ) : (
                    colTasks.map((task) => {
                      const priorityInfo = priorityBadges[task.priority ?? 1] || priorityBadges[1];
                      const formattedDate = task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        : "No due date";

                      return (
                        <div
                          key={task.id}
                          className="group relative rounded-xl border border-[#1F2937]/80 bg-[#0B0F17]/70 p-4 transition hover:border-[#374151]"
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`rounded-lg border px-2 py-0.5 text-[10px] font-semibold ${priorityInfo.className}`}
                            >
                              {priorityInfo.label}
                            </span>
                            <span className="text-[10px] text-[#6B7280]">#{task.id}</span>
                          </div>

                          <h4 className="mt-2 text-xs font-semibold text-white leading-snug">
                            {task.title}
                          </h4>

                          {task.description && (
                            <p className="mt-1 text-[11px] text-[#9CA3AF] line-clamp-2">
                              {task.description}
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between text-[11px] text-[#6B7280] pt-2 border-t border-[#1F2937]">
                            <div className="flex items-center gap-1 text-[#9CA3AF]">
                              <FolderKanban size={12} />
                              <span className="max-w-[90px] truncate">{selectedProjectObj?.name || "Project"}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#9CA3AF]">
                              <Calendar size={12} />
                              <span>{formattedDate}</span>
                            </div>
                          </div>

                          {/* Interactive Status Transition Controls */}
                          <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#1F2937]/50">
                            {col.statusVal > 0 ? (
                              <button
                                onClick={() => handleStatusChange(task.id, col.statusVal - 1)}
                                className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition"
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
                                onClick={() => handleStatusChange(task.id, col.statusVal + 1)}
                                className="flex items-center gap-1 text-[10px] text-[#1D63ED] hover:text-[#38BDF8] transition font-medium"
                                title="Move right"
                              >
                                <span>Next</span>
                                <ArrowRight size={12} />
                              </button>
                            ) : (
                              <div className="flex items-center gap-1 text-[10px] text-[#34D399]">
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateTask}
        projectId={selectedProjectId}
      />
    </div>
  );
}

export default Tasks;


