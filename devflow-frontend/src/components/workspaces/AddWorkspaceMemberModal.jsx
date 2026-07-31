import { useState } from "react";
import Modal from "../common/Modal";

export default function AddWorkspaceMemberModal({ isOpen, onClose, onAddMember }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(2); // 2 = Member
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      await onAddMember({ email, role: parseInt(role, 10) });
      setEmail("");
      setRole(2);
      onClose();
    } catch (err) {
      setError(err?.message || "Failed to add member to workspace.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Member to Workspace">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Member Email Address *
          </label>
          <input
            type="email"
            placeholder="colleague@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#1D63ED] outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Workspace Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
          >
            <option value={2}>Member (Standard User)</option>
            <option value={1}>Admin (Manage projects & members)</option>
            <option value={0}>Owner (Full Access)</option>
          </select>
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
            {isSubmitting ? "Adding..." : "Add Member"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
