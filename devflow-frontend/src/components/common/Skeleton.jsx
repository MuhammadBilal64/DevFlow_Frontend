export default function Skeleton({ className = "h-24 w-full" }) {
  return (
    <div
      className={`animate-pulse rounded-xl border border-[#30363D] bg-[#161B22]/70 ${className}`}
    />
  );
}
