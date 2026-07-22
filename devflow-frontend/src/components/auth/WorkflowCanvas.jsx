import React from "react";

export default function WorkflowCanvas() {
  return (
    <div className="w-full space-y-2.5 select-none">
      {/* Feature Card 1: Workspaces */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-between hover:border-slate-600 transition">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Multi-Tenant Workspaces</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Role-based access & member management</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
      </div>

      {/* Feature Card 2: Task Tracking */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-between hover:border-slate-600 transition">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Project & Task Tracking</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Kanban boards, assignments & priorities</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">Live</span>
      </div>

      {/* Feature Card 3: Event Automation */}
      <div className="p-3 sm:p-3.5 rounded-xl bg-[#161B22] border border-[#30363D] flex items-center justify-between hover:border-slate-600 transition">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white">Workflow Automation Engine</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Configurable triggers, rules & actions</p>
          </div>
        </div>
        <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Automated</span>
      </div>
    </div>
  );
}