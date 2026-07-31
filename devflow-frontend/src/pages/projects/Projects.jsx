import { useState, useEffect, useCallback } from "react";
import { FolderKanban, Plus, Search, Filter, RefreshCw, Eye } from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { getProjectsByWorkspace, createProject } from "../../services/projectService";
import CreateProjectModal from "../../components/projects/CreateProjectModal";
import ProjectDetailsModal from "../../components/projects/ProjectDetailsModal";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";

function Projects() {
  const { currentWorkspace } = useWorkspace();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const fetchProjects = useCallback(async () => {
    if (!currentWorkspace?.id) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const response = await getProjectsByWorkspace(currentWorkspace.id);
      const raw = response?.data || response;
      const items = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.items)
        ? raw.items
        : Array.isArray(response?.items)
        ? response.items
        : [];

      setProjects(items);
    } catch (err) {
      console.warn("Could not fetch projects from API:", err?.message || err);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentWorkspace?.id]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCreateProject = async (data) => {
    try {
      const response = await createProject(data);
      const newProj = response?.data || response;
      if (newProj && (newProj.id || newProj.name)) {
        setProjects((prev) => [newProj, ...prev]);
      } else {
        await fetchProjects();
      }
    } catch (err) {
      console.error("Failed to create project:", err);
      throw err;
    }
  };

  const filteredProjects = projects.filter((p) =>
    (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Projects</span>
            {isLoading && <RefreshCw size={16} className="animate-spin text-[#1D63ED]" />}
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Manage, organize, and monitor progress for workspace:{" "}
            <span className="font-semibold text-white">{currentWorkspace?.name || "Active Workspace"}</span>
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1551C9] active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Header */}
      <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#121721] p-4">
        <div className="relative flex items-center w-72">
          <Search size={15} className="absolute left-3.5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-9 w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] pl-9 pr-3 text-xs text-white placeholder-[#6B7280] outline-none focus:border-[#1D63ED]"
          />
        </div>

        <button
          onClick={fetchProjects}
          className="flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2 text-xs font-medium text-[#9CA3AF] hover:text-white transition"
        >
          <Filter size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Body Content: Skeleton / Empty State / Project Grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Skeleton key={n} className="h-44 w-full" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No Projects Found"
          description={
            searchTerm
              ? `No projects matched search filter "${searchTerm}".`
              : `Workspace "${currentWorkspace?.name || "Current Workspace"}" does not have any active projects.`
          }
          actionLabel="Create First Project"
          onAction={() => setIsCreateOpen(true)}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id || proj.name}
              onClick={() => setSelectedProject(proj)}
              className="group relative rounded-2xl border border-[#1F2937] bg-[#121721] p-5 shadow-sm transition hover:border-[#1D63ED] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0C2448] text-[#38BDF8]">
                  <FolderKanban size={20} />
                </div>
                <span className="rounded-lg bg-[#0C2448] border border-[#1D63ED]/30 px-2.5 py-1 text-[11px] font-semibold text-[#38BDF8]">
                  {proj.status || "In Progress"}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-[#38BDF8] transition">
                {proj.name}
              </h3>
              <p className="text-xs text-[#6B7280] mt-1 line-clamp-2">
                {proj.description || "Active engineering project"}
              </p>

              <div className="mt-4 pt-3 border-t border-[#1F2937] flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>View Details & Tasks</span>
                <Eye size={14} className="text-[#1D63ED] opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateProject}
        workspaceId={currentWorkspace?.id}
      />

      <ProjectDetailsModal
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </div>
  );
}

export default Projects;


