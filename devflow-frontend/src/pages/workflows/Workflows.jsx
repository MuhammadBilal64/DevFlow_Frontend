import { Workflow, Plus, Zap, Play } from "lucide-react";

function Workflows() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Workflows
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Automate CI/CD triggers, issue assignments, and workspace actions.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1551C9] active:scale-[0.98]">
          <Plus size={16} />
          <span>New Workflow</span>
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { name: "Task Assignment Automation", trigger: "On Issue Created", executions: 142, status: "Active" },
          { name: "Build & Deploy Pipeline", trigger: "On Push to Main", executions: 89, status: "Active" },
        ].map((flow) => (
          <div
            key={flow.name}
            className="rounded-2xl border border-[#1F2937] bg-[#121721] p-5 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2D164B] text-[#C084FC]">
                <Workflow size={20} />
              </div>
              <span className="rounded-lg bg-[#0B3B26] border border-[#10B981]/30 px-2.5 py-1 text-[11px] font-semibold text-[#34D399]">
                {flow.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">{flow.name}</h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-[#6B7280]">
                <Zap size={12} className="text-[#FBBF24]" />
                <span>{flow.trigger}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#1F2937] pt-3 text-xs text-[#9CA3AF]">
              <span>{flow.executions} Executions</span>
              <button className="flex items-center gap-1 text-[#1D63ED] hover:underline font-semibold">
                <Play size={12} />
                <span>Run Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workflows;
