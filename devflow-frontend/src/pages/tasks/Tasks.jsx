import { CheckSquare, Plus, Filter, Calendar, FolderKanban } from "lucide-react";

function Tasks() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Track issue status, sprint backlogs, and task assignments.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1551C9] active:scale-[0.98]">
          <Plus size={16} />
          <span>New Task</span>
        </button>
      </div>

      {/* Task Board Columns */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "To Do", count: 8, badgeBg: "bg-[#1F2937] text-[#9CA3AF]" },
          { title: "In Progress", count: 4, badgeBg: "bg-[#0C2448] text-[#38BDF8]" },
          { title: "Completed", count: 12, badgeBg: "bg-[#0B3B26] text-[#34D399]" },
        ].map((col) => (
          <div
            key={col.title}
            className="rounded-2xl border border-[#1F2937] bg-[#121721] p-5 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">{col.title}</h3>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${col.badgeBg}`}
                >
                  {col.count}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-[#1F2937]/80 bg-[#0B0F17]/60 p-4 transition hover:border-[#374151]">
                <span className="rounded-lg bg-[#2D164B] border border-[#A855F7]/30 px-2 py-0.5 text-[10px] font-semibold text-[#C084FC]">
                  High
                </span>
                <h4 className="mt-2 text-xs font-semibold text-white">
                  Review workflow automation logic
                </h4>
                <div className="mt-3 flex items-center justify-between text-[11px] text-[#6B7280]">
                  <div className="flex items-center gap-1">
                    <FolderKanban size={12} />
                    <span>DevFlow Platform</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#9CA3AF]">
                    <Calendar size={12} />
                    <span>May 24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
