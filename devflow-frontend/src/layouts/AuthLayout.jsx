import { Outlet } from "react-router-dom";
import BrandPanel from "../components/auth/BrandPanel";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] antialiased">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr] relative">
        {/* Left Branding Showcase */}
        <BrandPanel />

        {/* Right Form Container */}
        <div className="relative flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-[#0D1117]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;