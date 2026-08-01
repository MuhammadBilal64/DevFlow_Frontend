import { useState } from "react";
import Modal from "../common/Modal";

export default function CreateWorkflowModal({ isOpen, onClose, onCreate, projectId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [trigger, setTrigger] = useState(0); // 0 = TaskAssigned, 1 = TaskCompleted, 2 = ProjectCreated
  const [field, setField] = useState("Priority");
  const [operator, setOperator] = useState(0); // 0 = Equals
  const [value, setValue] = useState("2"); // 2 = High
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Workflow rule name is required.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      await onCreate({
        name,
        description,
        trigger: parseInt(trigger, 10),
        isEnabled: true,
        conditions: [
          {
            field,
            operator: parseInt(operator, 10),
            value,
          },
        ],
        actions: [
          {
            actionType: 0, // NotifyUser
            parameters: JSON.stringify({
              Recipient: 0,
              Message: `Triggered by ${name}`,
            }),
            order: 1,
          },
        ],
      });
      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to create workflow rule.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Automation Workflow Rule">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Rule Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Auto-Notify Assignee on High Priority Task"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#1D63ED] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Description
          </label>
          <input
            type="text"
            placeholder="Sends notification when a urgent task is assigned"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#1D63ED] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Event Trigger
          </label>
          <select
            value={trigger}
            onChange={(e) => setTrigger(Number(e.target.value))}
            className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
          >
            <option value={0}>Task Assigned</option>
            <option value={1}>Task Marked Completed</option>
            <option value={2}>New Project Created</option>
          </select>
        </div>

        <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17] p-3 space-y-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            If Condition Matches
          </span>

          <div className="grid grid-cols-3 gap-2">
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="rounded-lg border border-[#1F2937] bg-[#121721] px-2 py-1.5 text-xs text-white outline-none"
            >
              <option value="Priority">Priority</option>
              <option value="Status">Status</option>
              <option value="Title">Title</option>
            </select>

            <select
              value={operator}
              onChange={(e) => setOperator(Number(e.target.value))}
              className="rounded-lg border border-[#1F2937] bg-[#121721] px-2 py-1.5 text-xs text-white outline-none"
            >
              <option value={0}>Equals (==)</option>
              <option value={1}>Not Equals (!=)</option>
              <option value={6}>Contains</option>
            </select>

            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Value (e.g. 2)"
              className="rounded-lg border border-[#1F2937] bg-[#121721] px-2 py-1.5 text-xs text-white outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-[#1F2937]">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#1F2937] px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1F2937] hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#1D63ED] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1551C9] disabled:opacity-50 transition"
          >
            {isSubmitting ? "Creating..." : "Save Rule"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
