import { useState } from "react";
import Modal from "../common/Modal";

export default function CreateWorkspaceModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Workspace name is required.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      await onCreate({ name, description });
      setName("");
      setDescription("");
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to create workspace.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Workspace">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Workspace Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Acme Core Engineering"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#1D63ED] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Description (Optional)
          </label>
          <textarea
            placeholder="Brief details about team scope or projects"
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
            {isSubmitting ? "Creating..." : "Create Workspace"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
