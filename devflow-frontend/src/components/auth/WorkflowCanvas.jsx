import React from "react";

export default function WorkflowCanvas() {
  return (
    <div className="relative w-full max-w-md mx-auto select-none pointer-events-none">
      {/* Clean UI Container Mockup */}
      <div className="rounded-xl surface-panel border border-[#30363D] overflow-hidden shadow-2xl bg-[#161B22]">
        {/* Mock Window Topbar */}
        <div className="px-4 py-2.5 bg-[#0D1117] border-b border-[#30363D] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
          </div>
          <span className="text-[11px] font-mono text-slate-400">devflow.internal/workspace</span>
          <div className="w-8" />
        </div>

        {/* Product Workflow Mock Canvas */}
        <div className="p-4 sm:p-5 bg-[#0D1117]/90 space-y-3">
          {/* Card 1: Workspace Node */}
          <div className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Engineering Workspace</h4>
                <p className="text-[10px] font-mono text-slate-400">Main Production Team</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">Active</span>
          </div>

          {/* Connection Line */}
          <div className="h-4 w-[2px] bg-[#30363D] ml-6" />

          {/* Card 2: Task Automation Trigger */}
          <div className="p-3 rounded-lg bg-[#161B22] border border-[#30363D] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white">Task Event Automation</h4>
                <p className="text-[10px] font-mono text-slate-400">OnTaskAssigned ➔ Auto Notify</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20">Synced</span>
          </div>
        </div>
      </div>
    </div>
  );
}