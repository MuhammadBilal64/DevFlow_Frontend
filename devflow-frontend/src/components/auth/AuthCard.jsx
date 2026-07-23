function AuthCard({ children }) {
  return (
    <div className="w-full max-w-[420px] rounded-xl surface-panel p-8 sm:p-10 border border-[#30363D] bg-[#161B22] shadow-2xl">
      {children}
    </div>
  );
}

export default AuthCard;