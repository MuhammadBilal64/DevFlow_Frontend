import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC]">
      <div className="flex">

        <Sidebar />

        <div className="flex flex-1 flex-col">

          <Topbar />

          <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </main>

        </div>

      </div>
    </div>
  );
}

export default DashboardLayout;