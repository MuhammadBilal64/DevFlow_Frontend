import WorkflowCanvas from "./WorkflowCanvas";
import DevFlowLogo from "../common/DevFlowLogo";

function BrandPanel() {
  return (
    <section className="relative bg-[#0D1117] hidden lg:flex flex-col justify-between p-8 xl:p-12 border-r border-[#30363D]">
      {/* Brand Topbar */}
      <div className="flex items-center justify-between relative z-10">
        <DevFlowLogo size="md" />
      </div>

      {/* Main Feature Showcase & Vector Preview */}
      <div className="my-auto py-6 relative z-10 space-y-6 max-w-lg mx-auto w-full">
        <div>
          <h2 className="text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight">
            Streamline developer workflows & team projects.
          </h2>
          <p className="mt-3 text-xs xl:text-sm text-slate-400 leading-relaxed">
            Organize workspaces, track team tasks, and configure automated rule triggers — built for modern engineering teams.
          </p>
        </div>

        {/* Self-Contained Feature Cards */}
        <WorkflowCanvas />
      </div>

      {/* Clean Footer */}
      <div className="pt-4 border-t border-[#30363D] flex items-center justify-between relative z-10 text-xs text-slate-500 font-mono">
        <span>DevFlow Platform</span>
        <span>v1.0.0</span>
      </div>
    </section>
  );
}

export default BrandPanel;