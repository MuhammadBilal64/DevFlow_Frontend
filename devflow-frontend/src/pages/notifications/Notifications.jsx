import { Bell, Check, Trash2 } from "lucide-react";

function Notifications() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Notifications
          </h1>
          <p className="mt-1 text-sm text-[#9CA3AF]">
            Stay informed on activity, task mentions, and pipeline updates.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#121721] px-3.5 py-2 text-xs font-semibold text-white hover:border-[#374151]">
          <Check size={14} />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4">
        {[
          { title: "Task Assigned", desc: "Fatima Noor assigned you to 'Review workflow automation logic'", time: "2h ago" },
          { title: "Project Created", desc: "Ali Raza created a new project 'API Gateway'", time: "4h ago" },
          { title: "Member Joined", desc: "Sara Khan joined workspace 'Acme Corporation'", time: "6h ago" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between rounded-xl border border-[#1F2937]/60 bg-[#0B0F17]/50 p-4 transition hover:border-[#374151]"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3D2109] text-[#FBBF24]">
                <Bell size={18} />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white">{item.title}</h3>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{item.desc}</p>
              </div>
            </div>
            <span className="text-[11px] text-[#6B7280]">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
