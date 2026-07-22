import { Outlet } from "react-router-dom";
import BrandPanel from "../components/auth/BrandPanel";

function AuthLayout() {
  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden bg-[#0D1117] text-[#E6EDF3] antialiased">
      <div className="grid min-h-screen lg:h-screen lg:grid-cols-[1.1fr_0.9fr] relative">
        {/* Left Branding Showcase */}
        <BrandPanel />

        {/* Right Form Container */}
        <div className="relative flex items-center justify-center p-6 sm:p-10 bg-[#0D1117] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;