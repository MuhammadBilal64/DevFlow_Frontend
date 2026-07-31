import { useState, useEffect, useCallback } from "react";
import { Building2, Plus, UserPlus, Users, Trash2, CheckCircle2, Shield } from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { getWorkspaceMembers, addWorkspaceMember, removeWorkspaceMember } from "../../services/workspaceService";
import CreateWorkspaceModal from "../../components/workspaces/CreateWorkspaceModal";
import AddWorkspaceMemberModal from "../../components/workspaces/AddWorkspaceMemberModal";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";

const roleLabels = {
  0: { label: "Owner", color: "bg-[#2D164B] text-[#C084FC] border-[#A855F7]/30" },
  1: { label: "Admin", color: "bg-[#0C2448] text-[#38BDF8] border-[#1D63ED]/30" },
  2: { label: "Member", color: "bg-[#0B3B26] text-[#34D399] border-[#10B981]/30" },
};

function Workspaces() {
  const { workspaces, currentWorkspace, selectWorkspace, createWorkspace, isLoading: isWsLoading } = useWorkspace();
  const [members, setMembers] = useState([]);
  const [isCreateWsOpen, setIsCreateWsOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [membersLoading, setMembersLoading] = useState(true);

  const fetchMembers = useCallback(async () => {
    if (!currentWorkspace?.id) {
      setMembersLoading(false);
      return;
    }
    setMembersLoading(true);
    try {
      const response = await getWorkspaceMembers(currentWorkspace.id);
      const raw = response?.data || response;
      const items = Array.isArray(raw) ? raw : raw?.items ?? [];
      setMembers(items);
    } catch (err) {
      console.warn("Could not fetch workspace members:", err?.message || err);
      setMembers([]);
    } finally {
      setMembersLoading(false);
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleAddMember = async (memberData) => {
    try {
      if (currentWorkspace?.id) {
        await addWorkspaceMember(currentWorkspace.id, memberData);
        await fetchMembers();
      }
    } catch (err) {
      console.error("Failed to add member:", err);
      throw err;
    }
  };

  const handleRemoveMember = async (memberId) => {
    setMembers((prev) => prev.filter((m) => m.id !== memberId && m.userId !== memberId));
    try {
      if (currentWorkspace?.id) {
        await removeWorkspaceMember(currentWorkspace.id, memberId);
      }
    } catch (err) {
      console.warn("Removed member locally:", err?.message || err);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Workspace Management
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Organize organization workspaces, switch active teams, and manage members.
          </p>
        </div>

        <button
          onClick={() => setIsCreateWsOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1551C9] active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>New Workspace</span>
        </button>
      </div>

      {/* Workspaces Grid */}
      <div>
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">
          Your Workspaces
        </h2>

        {isWsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2].map((n) => (
              <Skeleton key={n} className="h-32 w-full" />
            ))}
          </div>
        ) : workspaces.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No Workspaces Created"
            description="You don't belong to any workspaces yet. Create your first workspace to start collaborating."
            actionLabel="Create Workspace"
            onAction={() => setIsCreateWsOpen(true)}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workspaces.map((ws) => {
              const isSelected = currentWorkspace?.id === ws.id;

              return (
                <div
                  key={ws.id}
                  onClick={() => selectWorkspace(ws)}
                  className={`group relative rounded-2xl border p-5 transition cursor-pointer ${
                    isSelected
                      ? "border-[#1D63ED] bg-[#0C2448]/30 shadow-lg shadow-[#1D63ED]/10"
                      : "border-[#1F2937] bg-[#121721] hover:border-[#374151]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0C2448] text-[#38BDF8]">
                      <Building2 size={20} />
                    </div>
                    {isSelected && (
                      <span className="flex items-center gap-1 rounded-lg bg-[#1D63ED] px-2.5 py-1 text-[10px] font-bold text-white">
                        <CheckCircle2 size={12} />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-white">{ws.name}</h3>
                  <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">
                    {ws.description || "Organization workspace"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Workspace Members Section */}
      <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[#1F2937] pb-4">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Users size={16} className="text-[#38BDF8]" />
              <span>Workspace Members ({currentWorkspace?.name || "Active Workspace"})</span>
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              People who have access to projects within this workspace.
            </p>
          </div>

          <button
            onClick={() => setIsAddMemberOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2 text-xs font-semibold text-white hover:border-[#374151] transition"
          >
            <UserPlus size={14} className="text-[#38BDF8]" />
            <span>Add Member</span>
          </button>
        </div>

        {membersLoading ? (
          <div className="space-y-3">
            {[1, 2].map((n) => (
              <Skeleton key={n} className="h-16 w-full" />
            ))}
          </div>
        ) : members.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No Members Found"
            description={`Workspace "${currentWorkspace?.name || "Active Workspace"}" does not have any additional members assigned.`}
            actionLabel="Add Member"
            onAction={() => setIsAddMemberOpen(true)}
          />
        ) : (
          <div className="space-y-3">
            {members.map((m) => {
              const roleStyle = roleLabels[m.role ?? 2] || roleLabels[2];

              return (
                <div
                  key={m.id || m.userId}
                  className="flex items-center justify-between rounded-xl border border-[#1F2937]/60 bg-[#0B0F17]/50 p-4 transition hover:border-[#374151]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F2937] text-xs font-bold text-white">
                      {(m.name || m.email || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">{m.name || m.email || "Workspace Member"}</h4>
                      <p className="text-xs text-[#6B7280]">{m.email || `User #${m.userId || m.id}`}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${roleStyle.color}`}>
                      {roleStyle.label}
                    </span>

                    {m.role !== 0 && (
                      <button
                        onClick={() => handleRemoveMember(m.id || m.userId)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                        title="Remove member"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateWorkspaceModal
        isOpen={isCreateWsOpen}
        onClose={() => setIsCreateWsOpen(false)}
        onCreate={createWorkspace}
      />

      <AddWorkspaceMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
}

export default Workspaces;
