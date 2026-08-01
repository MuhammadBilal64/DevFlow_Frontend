import { useState, useEffect } from "react";
import Modal from "../common/Modal";
import { getTasksByProject } from "../../services/taskService";
import { getProjectMembers, addProjectMember } from "../../services/projectService";
import Skeleton from "../common/Skeleton";

export default function ProjectDetailsModal({ isOpen, onClose, project }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memberUserId, setMemberUserId] = useState("");
  const [memberRole, setMemberRole] = useState(2); // 2 = Member
  const [memberError, setMemberError] = useState("");

  useEffect(() => {
    if (!project?.id || !isOpen) return;

    let ignore = false;
    const loadProjectDetails = async () => {
      setIsLoading(true);
      setMemberError("");

      const [taskRes, memberRes] = await Promise.all([
        getTasksByProject(project.id).catch(() => ({ data: [] })),
        getProjectMembers(project.id).catch(() => ({ data: [] })),
      ]);

      if (ignore) return;

      const taskData = taskRes?.data || taskRes;
      const memberData = memberRes?.data || memberRes;
      setTasks(Array.isArray(taskData) ? taskData : taskData?.items ?? []);
      setMembers(Array.isArray(memberData) ? memberData : memberData?.items ?? []);
      setIsLoading(false);
    };

    loadProjectDetails();

    return () => {
      ignore = true;
    };
  }, [project?.id, isOpen]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberUserId || !project?.id) return;
    setMemberError("");

    try {
      await addProjectMember(project.id, {
        userId: parseInt(memberUserId, 10),
        role: parseInt(memberRole, 10),
      });
      setMembers((prev) => [
        ...prev,
        { userId: parseInt(memberUserId, 10), role: parseInt(memberRole, 10) },
      ]);
      setMemberUserId("");
    } catch (err) {
      setMemberError(err?.message || "Failed to add member.");
    }
  };

  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project.name || "Project Details"}>
      <div className="space-y-4">
        <div className="flex border-b border-[#1F2937] gap-4 text-xs font-medium">
          {["overview", "tasks", "members"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2.5 capitalize border-b-2 transition ${
                activeTab === tab
                  ? "border-[#1D63ED] text-white font-semibold"
                  : "border-transparent text-[#6B7280] hover:text-[#9CA3AF]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="space-y-4 pt-1">
            <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4">
              <span className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">
                Description
              </span>
              <p className="text-xs text-white mt-1">
                {project.description || "No description provided for this project."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17] p-3.5">
                <span className="text-[10px] text-[#6B7280]">Status</span>
                <p className="text-xs font-semibold text-[#38BDF8] mt-0.5">
                  {project.status || "In Progress"}
                </p>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17] p-3.5">
                <span className="text-[10px] text-[#6B7280]">Workspace ID</span>
                <p className="text-xs font-semibold text-white mt-0.5">
                  #{project.workspaceId || "—"}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="space-y-2 pt-1 max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2].map((n) => (
                  <Skeleton key={n} className="h-12 w-full" />
                ))}
              </div>
            ) : tasks.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No tasks found in this project.
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F17] p-3 text-xs"
                >
                  <span className="font-medium text-white">{task.title}</span>
                  <span className="rounded-lg bg-[#0C2448] px-2 py-0.5 text-[10px] text-[#38BDF8]">
                    {task.status === 0 ? "To Do" : task.status === 1 ? "In Progress" : "Completed"}
                  </span>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "members" && (
          <div className="space-y-3 pt-1">
            {memberError && (
              <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
                {memberError}
              </div>
            )}

            <form onSubmit={handleAddMember} className="grid gap-3 sm:grid-cols-[1.4fr_0.9fr_0.7fr]">
              <input
                type="number"
                placeholder="User ID (e.g. 2)"
                value={memberUserId}
                onChange={(e) => setMemberUserId(e.target.value)}
                className="rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3 py-2 text-xs text-white outline-none focus:border-[#1D63ED]"
              />
              <select
                value={memberRole}
                onChange={(e) => setMemberRole(Number(e.target.value))}
                className="rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3 py-2 text-xs text-white outline-none focus:border-[#1D63ED]"
              >
                <option value={0}>Owner</option>
                <option value={1}>Admin</option>
                <option value={2}>Member</option>
              </select>
              <button
                type="submit"
                className="rounded-xl bg-[#1D63ED] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1551C9] transition"
              >
                Add
              </button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2].map((n) => (
                    <Skeleton key={n} className="h-12 w-full" />
                  ))}
                </div>
              ) : members.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-500">
                  No explicit members assigned yet.
                </div>
              ) : (
                members.map((m, idx) => (
                  <div
                    key={m.userId || idx}
                    className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F17] p-3 text-xs"
                  >
                    <span className="text-white">User #{m.userId || m.id}</span>
                    <span className="text-slate-400">Role: {m.role === 0 ? "Owner" : m.role === 1 ? "Admin" : "Member"}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
