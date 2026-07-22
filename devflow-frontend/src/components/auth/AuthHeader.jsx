import DevFlowLogo from "../common/DevFlowLogo";

function AuthHeader({ title, subtitle }) {
  return (
    <div className="mb-7 text-left">
      <div className="mb-6 lg:hidden">
        <DevFlowLogo size="md" />
      </div>

      <h1 className="text-2xl font-bold tracking-tight text-white">
        {title}
      </h1>

      <p className="mt-1.5 text-sm text-slate-400 font-normal">
        {subtitle}
      </p>
    </div>
  );
}

export default AuthHeader;