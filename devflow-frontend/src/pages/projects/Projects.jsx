import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { FolderKanban, Plus, Search, Filter, RefreshCw, Eye } from "lucide-react";
import { useWorkspace } from "../../context/useWorkspace";
import { getProjectsByWorkspace, createProject } from "../../services/projectService";
import CreateProjectModal from "../../components/projects/CreateProjectModal";
import ProjectDetailsModal from "../../components/projects/ProjectDetailsModal";
import EmptyState from "../../components/common/EmptyState";
import Skeleton from "../../components/common/Skeleton";

function Projects() {
  const { currentWorkspace } = useWorkspace();
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const workspaceId = currentWorkspace?.id;

  const fetchProjects = useCallback(async () => {
    if (!workspaceId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);

    try {
      const response = await getProjectsByWorkspace(workspaceId);
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
  }, [workspaceId]);

  useEffect(() => {
    let ignore = false;

    const run = async () => {
      if (ignore) return;
      await fetchProjects();
    };

    if (workspaceId) {
      void run();
    }

    return () => {
      ignore = true;
    };
  }, [workspaceId, fetchProjects]);

  useEffect(() => {
    if (location.state?.openCreate) {
      setIsCreateOpen(true);
    }
    if (location.state?.projectId && projects.length > 0) {
      const proj = projects.find((p) => p.id === location.state.projectId);
      if (proj) setSelectedProject(proj);
    }
  }, [location.state, projects]);

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

  const handleProjectUpdated = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? { ...p, ...updatedProject } : p))
    );
    setSelectedProject((prev) =>
      prev?.id === updatedProject.id ? { ...prev, ...updatedProject } : prev
    );
  };

  const filteredProjects = projects.filter((p) =>
    (p.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-10 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#F0F6FC] flex items-center gap-2">
            <span>Projects</span>
            {isLoading && <RefreshCw size={14} className="animate-spin text-sky-400" />}
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Manage, organize, and monitor progress for workspace:{" "}
            <span className="font-semibold text-white">{currentWorkspace?.name || "Active Workspace"}</span>
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
        >
          <Plus size={14} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Header */}
      <div className="flex items-center justify-between rounded-xl border border-[#30363D] bg-[#161B22] p-4">
        <div className="relative flex items-center w-72">
          <Search size={14} className="absolute left-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-full rounded-lg border border-[#30363D] bg-[#0D1117] pl-8 pr-3 text-xs text-[#F0F6FC] placeholder:text-slate-500 outline-none focus:border-sky-500"
          />
        </div>

        <button
          onClick={fetchProjects}
          className="flex items-center gap-2 rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition cursor-pointer"
        >
          <Filter size={13} />
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
              className="group relative rounded-xl border border-[#30363D] bg-[#161B22] p-5 transition hover:border-sky-500 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <FolderKanban size={18} />
                </div>
                <span className="rounded font-mono text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                  {proj.status || "In Progress"}
                </span>
              </div>
              <h3 className="text-xs font-bold text-white group-hover:text-sky-400 transition">
                {proj.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {proj.description || "Active engineering project"}
              </p>

              <div className="mt-4 pt-3 border-t border-[#30363D] flex items-center justify-between text-xs text-slate-500">
                <span>View Details & Tasks</span>
                <Eye size={14} className="text-sky-400 opacity-0 group-hover:opacity-100 transition" />
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
        onProjectUpdated={handleProjectUpdated}
      />
    </div>
  );
}

export default Projects;
