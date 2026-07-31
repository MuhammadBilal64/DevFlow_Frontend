function SectionCard({
  title,
  children,
}) {
  return (
    <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-6">

      <h2 className="mb-5 text-lg font-semibold text-white">
        {title}
      </h2>

      {children}

    </div>
  );
}

export default SectionCard;