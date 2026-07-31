import { useState } from "react";
import Modal from "../common/Modal";

export default function CreateProjectModal({ isOpen, onClose, onCreate, workspaceId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project title is required.");
      return;
    }
    if (!workspaceId) {
      setError("No workspace selected. Please select a workspace first.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      await onCreate({
        name: name.trim(),
        description: description.trim(),
        workspaceId,
      });
      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Project Name *
          </label>
          <input
            type="text"
            placeholder="e.g. API Infrastructure Redesign"
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
          <textarea
            placeholder="Describe the objectives and scope of this project"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#1D63ED] outline-none resize-none"
          />
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
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
