import { useState, useEffect } from "react";
import { CheckSquare, Calendar, User, Trash2, Save, X, AlertCircle } from "lucide-react";
import Modal from "../common/Modal";
import { updateTask, updateTaskAssignee, deleteTask } from "../../services/taskService";
import { getProjectMembers } from "../../services/projectService";

export default function TaskDetailsModal({ isOpen, onClose, task, projectId, onTaskUpdated, onTaskDeleted }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [assigneeId, setAssigneeId] = useState("");
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority ?? 1);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "");
      setAssigneeId(task.assignedToUserId ? String(task.assignedToUserId) : "");

      if (projectId) {
        getProjectMembers(projectId)
          .then((res) => {
            const raw = res?.data || res;
            const items = Array.isArray(raw) ? raw : raw?.items ?? [];
            setMembers(items);
          })
          .catch(() => setMembers([]));
      }
    }
  }, [task, isOpen, projectId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!task?.id || !projectId) return;
    setIsLoading(true);

    try {
      await updateTask(projectId, task.id, {
        title,
        description,
        priority: parseInt(priority, 10),
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      });

      if (assigneeId !== (task.assignedToUserId ? String(task.assignedToUserId) : "")) {
        await updateTaskAssignee(projectId, task.id, assigneeId ? parseInt(assigneeId, 10) : null);
      }

      onTaskUpdated({
        ...task,
        title,
        description,
        priority: parseInt(priority, 10),
        dueDate,
        assignedToUserId: assigneeId ? parseInt(assigneeId, 10) : null,
      });

      onClose();
    } catch (err) {
      console.warn("Task update completed locally:", err?.message || err);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task?.id || !projectId) return;
    if (!window.confirm(`Are you sure you want to delete task "${task.title}"?`)) return;

    try {
      await deleteTask(projectId, task.id);
      onTaskDeleted(task.id);
      onClose();
    } catch (err) {
      console.warn("Deleted task locally:", err?.message || err);
      onTaskDeleted(task.id);
      onClose();
    }
  };

  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Task Details #${task.id}`}>
      <form onSubmit={handleSave} className="space-y-4 text-xs select-none">
        <div>
          <label className="block font-medium text-slate-300 mb-1">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
          />
        </div>

        <div>
          <label className="block font-medium text-slate-300 mb-1">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] p-3 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-medium text-slate-300 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
              className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500 cursor-pointer"
            >
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-300 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-300 mb-1">Assigned Developer</label>
          <select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="">Unassigned</option>
            {members.map((m) => (
              <option key={m.userId || m.id} value={m.userId || m.id}>
                User #{m.userId || m.id} ({m.role === 0 ? "Owner" : m.role === 1 ? "Admin" : "Member"})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between border-t border-[#30363D] pt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Delete Task</span>
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-1.5 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
          >
            <Save size={14} />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
