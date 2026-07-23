function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-sky-400",
}) {
  return (
    <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {value}
          </h2>
        </div>

        <div
          className={`rounded-lg bg-[#0D1117] p-3 ${color}`}
        >
          <Icon size={22} />
        </div>

      </div>

    </div>
  );
}

export default StatCard;