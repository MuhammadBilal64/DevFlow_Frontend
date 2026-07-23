import { Settings as SettingsIcon, User, Building2, Shield, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Settings() {
  const { user } = useAuth();
  const userName = user?.email ? user.email.split("@")[0] : "Muhammad Bilal";

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Manage your account profile, preferences, and workspace settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Navigation Column */}
        <div className="lg:col-span-3 space-y-1">
          {[
            { label: "Profile", icon: User, active: true },
            { label: "Workspace", icon: Building2 },
            { label: "Security & Access", icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                  item.active
                    ? "bg-[#1D63ED] text-white shadow-sm"
                    : "text-[#9CA3AF] hover:bg-[#121721] hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Column */}
        <div className="lg:col-span-9 rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-6">
          <h2 className="text-base font-semibold text-white border-b border-[#1F2937] pb-4">
            Profile Settings
          </h2>

          <div className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                defaultValue={userName}
                className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                defaultValue={user?.email || "bilal@example.com"}
                disabled
                className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 px-3.5 py-2.5 text-xs text-[#6B7280] cursor-not-allowed"
              />
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1551C9]">
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
