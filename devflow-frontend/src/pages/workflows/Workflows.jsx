import { useState, useEffect, useCallback } from "react";
import { Workflow, Plus, Zap, Play, CheckCircle2, XCircle, FolderKanban } from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { getWorkflowsByProject, createWorkflow, enableWorkflow, disableWorkflow } from "../../services/workflowService";
import { getProjectsByWorkspace } from "../../services/projectService";
import CreateWorkflowModal from "../../components/workflows/CreateWorkflowModal";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";

const triggerLabels = {
  0: "Task Assigned Event",
  1: "Task Marked Completed",
  2: "New Project Created",
};

function Workflows() {
  const { currentWorkspace } = useWorkspace();
  const [workflows, setWorkflows] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          setWorkflows([]);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setProjects([]);
        setSelectedProjectId(null);
        setWorkflows([]);
        setIsLoading(false);
      });
  }, [currentWorkspace?.id]);

  const fetchWorkflows = useCallback(async () => {
    if (!selectedProjectId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const response = await getWorkflowsByProject(selectedProjectId);
      const raw = response?.data || response;
      const items = Array.isArray(raw) ? raw : raw?.items ?? [];
      setWorkflows(items);
    } catch (err) {
      console.warn("Could not fetch workflows:", err?.message || err);
      setWorkflows([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProjectId]);

  useEffect(() => {
    if (selectedProjectId) {
      fetchWorkflows();
    }
  }, [selectedProjectId, fetchWorkflows]);

  const handleToggleEnable = async (workflow) => {
    const nextState = !workflow.isEnabled;

    setWorkflows((prev) =>
      prev.map((w) => (w.id === workflow.id ? { ...w, isEnabled: nextState } : w))
    );

    try {
      if (selectedProjectId) {
        if (nextState) {
          await enableWorkflow(selectedProjectId, workflow.id);
        } else {
          await disableWorkflow(selectedProjectId, workflow.id);
        }
      }
    } catch (err) {
      console.warn("Toggled workflow state locally:", err?.message || err);
    }
  };

  const handleCreateWorkflow = async (data) => {
    if (!selectedProjectId) return;
    try {
      const response = await createWorkflow(selectedProjectId, data);
      const newW = response?.data || response;
      if (newW && newW.id) {
        setWorkflows((prev) => [newW, ...prev]);
      } else {
        await fetchWorkflows();
      }
    } catch (err) {
      console.error("Workflow creation failed:", err);
      throw err;
    }
  };

  const selectedProjectObj = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Workflows & Automations
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Automate event triggers, notifications, and workspace actions.
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
              <span>New Workflow</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Body: Skeleton / Empty State / Workflow Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((n) => (
            <Skeleton key={n} className="h-44 w-full" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No Projects Available"
          description={`Workspace "${currentWorkspace?.name || "Current Workspace"}" has no projects yet. Create a project to start configuring workflows.`}
        />
      ) : workflows.length === 0 ? (
        <EmptyState
          icon={Workflow}
          title={`No Workflow Rules in "${selectedProjectObj?.name || "Selected Project"}"`}
          description="Automate tasks and team notifications by creating your first workflow rule."
          actionLabel="Create First Workflow"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {workflows.map((flow) => (
            <div
              key={flow.id}
              className="rounded-2xl border border-[#1F2937] bg-[#121721] p-5 space-y-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2D164B] text-[#C084FC]">
                  <Workflow size={20} />
                </div>
                <button
                  onClick={() => handleToggleEnable(flow)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition ${
                    flow.isEnabled
                      ? "bg-[#0B3B26] border-[#10B981]/30 text-[#34D399]"
                      : "bg-[#1F2937] border-slate-700 text-slate-400"
                  }`}
                >
                  {flow.isEnabled ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                  <span>{flow.isEnabled ? "Active" : "Disabled"}</span>
                </button>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">{flow.name}</h3>
                {flow.description && (
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{flow.description}</p>
                )}
                <div className="flex items-center gap-1.5 mt-2 text-xs text-[#6B7280]">
                  <Zap size={12} className="text-[#FBBF24]" />
                  <span>{triggerLabels[flow.trigger ?? 0] || "Event Triggered"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#1F2937] pt-3 text-xs text-[#9CA3AF]">
                <span>{flow.executions ?? 0} Executions</span>
                <button className="flex items-center gap-1 text-[#1D63ED] hover:underline font-semibold">
                  <Play size={12} />
                  <span>Trigger Rule</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Workflow Modal */}
      <CreateWorkflowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateWorkflow}
        projectId={selectedProjectId}
      />
    </div>
  );
}

export default Workflows;


