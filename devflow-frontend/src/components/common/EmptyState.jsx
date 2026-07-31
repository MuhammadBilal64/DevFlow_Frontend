import { Plus } from "lucide-react";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#1F2937] bg-[#121721]/50 p-12 text-center animate-fadeIn">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D63ED]/10 text-[#38BDF8] mb-4 border border-[#1D63ED]/20 shadow-inner">
          <Icon size={28} />
        </div>
      )}
      <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs text-[#9CA3AF] leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#1551C9] active:scale-95"
        >
          <Plus size={16} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
