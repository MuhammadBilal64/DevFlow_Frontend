function AuthCard({ children }) {
  return (
    <div className="w-full max-w-[420px] rounded-xl border border-[#30363D] bg-[#161B22] p-8 sm:p-10 shadow-2xl">
      {children}
    </div>
  );
}

export default AuthCard;