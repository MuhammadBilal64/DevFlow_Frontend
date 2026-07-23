import WorkflowCanvas from "./WorkflowCanvas";
import DevFlowLogo from "../common/DevFlowLogo";

function BrandPanel() {
  return (
    <section className="relative hidden lg:flex flex-col justify-between bg-[#0D1117] border-r border-[#30363D] p-8 xl:p-12">
      {/* Top */}
      <div className="relative z-10">
        <DevFlowLogo size="md" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 my-auto max-w-lg mx-auto w-full space-y-8">
        <div>
          <h2 className="text-3xl xl:text-5xl font-bold tracking-tight text-white leading-tight">
            Build together.
            <br />
            Ship faster.
          </h2>

          <p className="mt-4 text-sm xl:text-base text-slate-400 leading-relaxed max-w-md">
            DevFlow brings projects, workflows, and automation into one
            collaborative workspace—built for modern engineering teams.
          </p>
        </div>

        {/* Feature Preview */}
        <WorkflowCanvas />
      </div>

      {/* Footer */}
      <div className="relative z-10 flex items-center justify-between border-t border-[#30363D] pt-4 text-xs font-mono text-slate-500">
        <span>© 2026 DevFlow</span>
        <span>v1.0.0</span>
      </div>
    </section>
  );
}

export default BrandPanel;
