import { Plus } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#30363D] bg-[#161B22] p-10 text-center space-y-4 shadow-sm">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0D1117] border border-[#30363D] text-sky-400">
          <Icon size={26} />
        </div>
      )}

      <div className="space-y-1 max-w-sm">
        <h3 className="text-base font-bold text-[#F0F6FC]">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-2 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
        >
          <Plus size={14} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
