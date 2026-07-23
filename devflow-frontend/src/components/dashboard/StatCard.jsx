function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType = "neutral", // "up", "down", "neutral"
  iconBg = "bg-[#0B1E3B]",
  iconColor = "text-[#38BDF8]",
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#121721] p-5 shadow-sm transition hover:border-[#374151]">
      <div className="space-y-1">
        <p className="text-xs font-medium text-[#9CA3AF]">{title}</p>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        {trend && (
          <p
            className={`text-xs font-medium ${
              trendType === "up"
                ? "text-[#34D399]"
                : trendType === "down"
                ? "text-[#F87171]"
                : "text-[#6B7280]"
            }`}
          >
            {trend}
          </p>
        )}
      </div>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        <Icon size={22} />
      </div>
    </div>
  );
}

export default StatCard;