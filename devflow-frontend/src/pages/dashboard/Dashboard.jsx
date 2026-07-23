import {
  FolderKanban,
  CheckSquare,
  Users,
  Bell,
} from "lucide-react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import WorkspaceSwitcher from "../../components/dashboard/WorkspaceSwitcher";
import StatCard from "../../components/dashboard/StatCard";
import SectionCard from "../../components/dashboard/SectionCard";
function Dashboard() {
  return (
    <>

      <DashboardHeader />

      <WorkspaceSwitcher />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Projects"
          value="0"
          icon={FolderKanban}
        />

        <StatCard
          title="Tasks"
          value="0"
          icon={CheckSquare}
          color="text-emerald-400"
        />

        <StatCard
          title="Members"
          value="0"
          icon={Users}
          color="text-purple-400"
        />

        <StatCard
          title="Notifications"
          value="0"
          icon={Bell}
          color="text-amber-400"
        />
        

      </div>

    </>
  );
}

export default Dashboard;