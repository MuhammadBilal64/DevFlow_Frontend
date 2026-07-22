import WorkflowCanvas from "./WorkflowCanvas";
import DevFlowLogo from "../common/DevFlowLogo";

function BrandPanel() {
  return (
    <section className="relative overflow-hidden bg-[#0D1117] hidden lg:flex flex-col justify-between p-12 xl:p-16 border-r border-[#30363D]">
      {/* Brand Topbar */}
      <div className="flex items-center justify-between relative z-10">
        <DevFlowLogo size="lg" />
      </div>

      {/* Main Feature Showcase & Vector Preview */}
      <div className="my-auto py-8 relative z-10 space-y-8 max-w-xl mx-auto w-full">
        <div>
          <h2 className="text-4xl xl:text-5xl font-bold tracking-tight text-white leading-tight">
            Streamline developer workflows & team projects.
          </h2>
          <p className="mt-4 text-sm xl:text-base text-slate-400 leading-relaxed">
            Organize workspaces, track team tasks, and configure automated rule triggers — built for modern engineering teams.
          </p>
        </div>

        {/* Realistic Product Vector Mockup */}
        <WorkflowCanvas />
      </div>

      {/* Clean Footer */}
      <div className="pt-6 border-t border-[#30363D] flex items-center justify-between relative z-10 text-xs text-slate-500 font-mono">
        <span>DevFlow Management Platform</span>
        <span>v1.0.0</span>
      </div>
    </section>
  );
}

export default BrandPanel;