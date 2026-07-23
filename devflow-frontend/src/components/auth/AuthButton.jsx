function AuthButton({
  children,
  type = "button",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  onClick,
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className="btn-primary mt-2 w-full rounded-lg py-2.5 px-4 text-sm font-semibold text-[#0D1117] bg-[#F0F6FC] hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer shadow-sm"
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin text-[#0D1117]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
         <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default AuthButton;