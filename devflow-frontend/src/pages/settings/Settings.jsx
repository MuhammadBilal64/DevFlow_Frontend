import { useState } from "react";
import {
  User,
  Building2,
  Shield,
  Bell,
  Key,
  Save,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Trash2,
  Lock,
  Smartphone,
  Globe,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";

export default function Settings() {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();

  const [activeTab, setActiveTab] = useState("profile");
  const [toastMessage, setToastMessage] = useState(null);

  // Profile Form State
  const [displayName, setDisplayName] = useState(
    user?.name || (user?.email ? user.email.split("@")[0] : "Ali Raza")
  );
  const [jobTitle, setJobTitle] = useState("Fullstack Engineer");
  const [bio, setBio] = useState("Building scalable cloud applications & automated developer pipelines.");

  // Workspace Settings State
  const [wsName, setWsName] = useState(currentWorkspace?.name || "DevFlow Workspace");
  const [wsDesc, setWsDesc] = useState(currentWorkspace?.description || "Primary organization workspace");

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification Preferences State
  const [notifPreferences, setNotifPreferences] = useState({
    taskAssigned: true,
    taskCompleted: true,
    projectUpdates: true,
    workflowExecutions: true,
    emailDigest: false,
  });

  // API Tokens State
  const [tokenName, setTokenName] = useState("");
  const [apiTokens, setApiTokens] = useState([
    { id: 1, name: "CLI Access Token", key: "df_live_98a72b3c10x...", created: "2026-07-20" },
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast("Profile settings updated successfully!");
  };

  const handleSaveWorkspace = (e) => {
    e.preventDefault();
    showToast("Workspace preferences updated successfully!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      showToast("Passwords do not match or are invalid.");
      return;
    }
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showToast("Password changed successfully!");
  };

  const handleCreateApiToken = (e) => {
    e.preventDefault();
    if (!tokenName) return;
    const newToken = {
      id: Date.now(),
      name: tokenName,
      key: `df_live_${Math.random().toString(36).substring(2, 12)}...`,
      created: new Date().toISOString().split("T")[0],
    };
    setApiTokens([newToken, ...apiTokens]);
    setTokenName("");
    showToast(`API token "${tokenName}" generated successfully!`);
  };

  const handleDeleteToken = (id) => {
    setApiTokens(apiTokens.filter((t) => t.id !== id));
    showToast("API token revoked.");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "workspace", label: "Workspace Settings", icon: Building2 },
    { id: "security", label: "Security & Access", icon: Shield },
    { id: "notifications", label: "Notifications & Alerts", icon: Bell },
    { id: "api", label: "API Keys & Tokens", icon: Key },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-[#0B3B26] border border-[#10B981]/40 px-4 py-3 text-xs font-semibold text-[#34D399] shadow-2xl animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Account & System Settings
        </h1>
        <p className="mt-1 text-sm text-[#9CA3AF]">
          Manage your personal profile, security configuration, workspace defaults, and developer tokens.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Navigation Sidebar Column (3 Cols) */}
        <div className="lg:col-span-3 space-y-1.5">
          {tabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-[#1D63ED] text-white shadow-md shadow-[#1D63ED]/20"
                    : "text-[#9CA3AF] hover:bg-[#121721] hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Body Content Column (9 Cols) */}
        <div className="lg:col-span-9 rounded-2xl border border-[#1F2937] bg-[#121721] p-6 shadow-sm">
          {/* TAB 1: PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="border-b border-[#1F2937] pb-4">
                <h2 className="text-base font-semibold text-white">Profile Settings</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Update your public display identity and developer role details.
                </p>
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1D63ED] text-lg font-bold text-white shadow-md">
                  {displayName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">{displayName}</h3>
                  <p className="text-[11px] text-[#6B7280]">{user?.email || "user@devflow.com"}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || "user@devflow.com"}
                    disabled
                    className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 px-3.5 py-2.5 text-xs text-[#6B7280] cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="max-w-xl">
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Developer Role / Job Title
                </label>
                <select
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
                >
                  <option value="Fullstack Engineer">Fullstack Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="DevOps Specialist">DevOps Specialist</option>
                  <option value="Product Lead">Product Lead</option>
                </select>
              </div>

              <div className="max-w-xl">
                <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                  Bio / Overview
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] p-3 text-xs text-white outline-none focus:border-[#1D63ED]"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1551C9] active:scale-95 transition cursor-pointer"
              >
                <Save size={14} />
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}

          {/* TAB 2: WORKSPACE SETTINGS */}
          {activeTab === "workspace" && (
            <form onSubmit={handleSaveWorkspace} className="space-y-6">
              <div className="border-b border-[#1F2937] pb-4">
                <h2 className="text-base font-semibold text-white">Workspace Preferences</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Configure settings for active workspace:{" "}
                  <span className="font-semibold text-white">{currentWorkspace?.name || "DevFlow"}</span>
                </p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    value={wsName}
                    onChange={(e) => setWsName(e.target.value)}
                    className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                    Workspace Description
                  </label>
                  <textarea
                    rows={3}
                    value={wsDesc}
                    onChange={(e) => setWsDesc(e.target.value)}
                    className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] p-3 text-xs text-white outline-none focus:border-[#1D63ED]"
                  />
                </div>

                <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Workspace Unique ID</p>
                    <p className="text-[11px] text-[#6B7280]">Used for API scoping and webhook dispatchers</p>
                  </div>
                  <span className="rounded-lg bg-[#0C2448] px-3 py-1 text-xs font-mono text-[#38BDF8]">
                    #{currentWorkspace?.id || 1}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1551C9] transition cursor-pointer"
              >
                <Save size={14} />
                <span>Save Workspace Settings</span>
              </button>
            </form>
          )}

          {/* TAB 3: SECURITY & ACCESS */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="border-b border-[#1F2937] pb-4">
                <h2 className="text-base font-semibold text-white">Security & Password</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Update your authentication credentials and manage active user sessions.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#9CA3AF] mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1551C9] transition cursor-pointer"
                >
                  <Lock size={14} />
                  <span>Update Password</span>
                </button>
              </form>

              {/* Active Sessions */}
              <div className="pt-4 border-t border-[#1F2937] space-y-3">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Active Logged In Devices
                </h3>
                <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4 text-xs">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-[#38BDF8]" />
                    <div>
                      <p className="font-semibold text-white">Windows Chrome Browser (Current Session)</p>
                      <p className="text-[11px] text-[#6B7280]">IP: 127.0.0.1 • Active Now</p>
                    </div>
                  </div>
                  <span className="rounded-lg bg-[#0B3B26] px-2.5 py-1 text-[10px] font-bold text-[#34D399]">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="border-b border-[#1F2937] pb-4">
                <h2 className="text-base font-semibold text-white">Notification Preferences</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Choose which events trigger real-time web socket and email notifications.
                </p>
              </div>

              <div className="space-y-3 max-w-xl">
                {[
                  { key: "taskAssigned", label: "Task Assignment Alerts", desc: "Notify me when a new task is assigned to me." },
                  { key: "taskCompleted", label: "Task Completed Alerts", desc: "Notify me when tasks in my project are marked completed." },
                  { key: "projectUpdates", label: "Project Status Changes", desc: "Alert when project milestone or status updates occur." },
                  { key: "workflowExecutions", label: "Workflow Automation Triggers", desc: "Notify when background rules are executed." },
                  { key: "emailDigest", label: "Weekly Email Digest", desc: "Receive weekly workspace activity summary." },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-white">{item.label}</h4>
                      <p className="text-[11px] text-[#6B7280]">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPreferences[item.key]}
                      onChange={(e) => {
                        setNotifPreferences({ ...notifPreferences, [item.key]: e.target.checked });
                        showToast("Notification settings updated.");
                      }}
                      className="h-4 w-4 rounded border-[#1F2937] accent-[#1D63ED] cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: API KEYS & TOKENS */}
          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="border-b border-[#1F2937] pb-4">
                <h2 className="text-base font-semibold text-white">Personal Access Tokens</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Generate bearer access tokens for DevFlow CLI and automated CI/CD pipelines.
                </p>
              </div>

              <form onSubmit={handleCreateApiToken} className="flex gap-2 max-w-xl">
                <input
                  type="text"
                  placeholder="Token Name (e.g. GitHub Actions Bot)"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="flex-1 rounded-xl border border-[#1F2937] bg-[#0B0F17] px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#1D63ED]"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-xl bg-[#1D63ED] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#1551C9] transition cursor-pointer"
                >
                  <Key size={14} />
                  <span>Generate Token</span>
                </button>
              </form>

              <div className="space-y-3 max-w-xl">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Active API Tokens
                </h3>
                {apiTokens.length === 0 ? (
                  <p className="text-xs text-slate-500">No active tokens generated.</p>
                ) : (
                  apiTokens.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4 text-xs"
                    >
                      <div>
                        <h4 className="font-semibold text-white">{t.name}</h4>
                        <p className="font-mono text-[11px] text-[#38BDF8] mt-0.5">{t.key}</p>
                        <p className="text-[10px] text-[#6B7280] mt-1">Created: {t.created}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteToken(t.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 transition cursor-pointer"
                        title="Revoke Token"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
