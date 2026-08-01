import { useState } from "react";
import {
  User,
  Building2,
  Bell,
  Key,
  Save,
  CheckCircle2,
  Trash2,
  Lock,
  Globe,
  Shield,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useWorkspace } from "../../context/useWorkspace";

export default function Settings() {
  const { user } = useAuth();
  const { currentWorkspace } = useWorkspace();

  const [activeTab, setActiveTab] = useState("profile");
  const [toastMessage, setToastMessage] = useState(null);

  // Profile Form State
  const [displayName, setDisplayName] = useState(
    user?.name || (user?.email ? user.email.split("@")[0] : "")
  );
  const [jobTitle, setJobTitle] = useState(user?.jobTitle || "");
  const [bio, setBio] = useState(user?.bio || "");

  const [wsName, setWsName] = useState(currentWorkspace?.name || "");
  const [wsDesc, setWsDesc] = useState(currentWorkspace?.description || "");

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
      key: `df_live_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}...`,
      created: new Date().toISOString().split("T")[0],
    };
    setApiTokens([newToken, ...apiTokens]);
    setTokenName("");
    showToast(`API token "${tokenName}" generated successfully!`);
  };

  const handleDeleteToken = (id) => {
    setApiTokens((prev) => prev.filter((t) => t.id !== id));
    showToast("API token revoked.");
  };

  const tabs = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "workspace", label: "Workspace Settings", icon: Building2 },
    { id: "security", label: "Security & Access", icon: Shield },
    { id: "notifications", label: "Notifications & Alerts", icon: Bell },
    { id: "api", label: "API Keys & Tokens", icon: Key },
  ];

  return (
    <div key={currentWorkspace?.id || "settings"} className="space-y-6 pb-12 select-none">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-lg bg-[#161B22] border border-emerald-500/30 px-4 py-3 text-xs font-semibold text-emerald-400 shadow-2xl animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#F0F6FC]">
          Settings & Account Preferences
        </h1>
        <p className="mt-1 text-xs text-slate-400">
          Manage your personal identity, security credentials, workspace configuration, and developer access keys.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Navigation Sidebar Column (3 Cols) */}
        <div className="lg:col-span-3 space-y-1">
          {tabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-[#161B22] text-white border border-[#30363D] font-semibold"
                    : "text-slate-400 hover:bg-[#161B22]/50 hover:text-white"
                }`}
              >
                <Icon size={16} className={isActive ? "text-sky-400" : "text-slate-500"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Column (9 Cols) */}
        <div className="lg:col-span-9 rounded-xl border border-[#30363D] bg-[#161B22] p-6 space-y-6">
          {/* TAB 1: PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="border-b border-[#30363D] pb-3">
                <h2 className="text-sm font-bold text-white">Profile Settings</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your public display identity and role in the workspace.
                </p>
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#30363D] text-base font-bold text-white">
                  {displayName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">{displayName}</h3>
                  <p className="text-[11px] text-slate-400">{user?.email || "user@devflow.com"}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 max-w-xl">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user?.email || "user@devflow.com"}
                    disabled
                    className="w-full rounded-lg border border-[#30363D] bg-[#0D1117]/60 px-3.5 py-2 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="max-w-xl">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Developer Role / Job Title
                </label>
                <select
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500 cursor-pointer"
                >
                  <option value="Fullstack Engineer">Fullstack Engineer</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Engineer">Backend Engineer</option>
                  <option value="DevOps Specialist">DevOps Specialist</option>
                  <option value="Product Lead">Product Lead</option>
                </select>
              </div>

              <div className="max-w-xl">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Bio / Overview
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] p-3 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
              >
                <Save size={14} />
                <span>Save Profile Changes</span>
              </button>
            </form>
          )}

          {/* TAB 2: WORKSPACE SETTINGS */}
          {activeTab === "workspace" && (
            <form onSubmit={handleSaveWorkspace} className="space-y-6">
              <div className="border-b border-[#30363D] pb-3">
                <h2 className="text-sm font-bold text-white">Workspace Preferences</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure settings for active workspace:{" "}
                  <span className="font-semibold text-white">{currentWorkspace?.name || "DevFlow"}</span>
                </p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    value={wsName}
                    onChange={(e) => setWsName(e.target.value)}
                    className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Workspace Description
                  </label>
                  <textarea
                    rows={3}
                    value={wsDesc}
                    onChange={(e) => setWsDesc(e.target.value)}
                    className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] p-3 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
                  />
                </div>

                <div className="rounded-lg border border-[#30363D] bg-[#0D1117] p-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">Workspace Unique ID</p>
                    <p className="text-[11px] text-slate-500">Used for API scoping and webhook dispatchers</p>
                  </div>
                  <span className="rounded font-mono text-xs text-sky-400 bg-sky-500/10 px-2.5 py-1 border border-sky-500/20">
                    #{currentWorkspace?.id ?? "—"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
              >
                <Save size={14} />
                <span>Save Workspace Settings</span>
              </button>
            </form>
          )}

          {/* TAB 3: SECURITY & ACCESS */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="border-b border-[#30363D] pb-3">
                <h2 className="text-sm font-bold text-white">Security & Password</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your authentication credentials and inspect active browser sessions.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
                >
                  <Lock size={14} />
                  <span>Update Password</span>
                </button>
              </form>

              {/* Active Sessions */}
              <div className="pt-4 border-t border-[#30363D] space-y-3">
                <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                  Active Logged In Devices
                </h3>
                <div className="flex items-center justify-between rounded-lg border border-[#30363D] bg-[#0D1117] p-3.5 text-xs">
                  <div className="flex items-center gap-3">
                    <Globe size={18} className="text-sky-400" />
                    <div>
                      <p className="font-semibold text-white">Windows Chrome Browser (Current Session)</p>
                      <p className="text-[11px] text-slate-500 font-mono">IP: 127.0.0.1 • Active Now</p>
                    </div>
                  </div>
                  <span className="rounded font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="border-b border-[#30363D] pb-3">
                <h2 className="text-sm font-bold text-white">Notification Preferences</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Choose which events trigger real-time web socket alerts and notifications.
                </p>
              </div>

              <div className="space-y-2.5 max-w-xl">
                {[
                  { key: "taskAssigned", label: "Task Assignment Alerts", desc: "Notify me when a new task is assigned to me." },
                  { key: "taskCompleted", label: "Task Completed Alerts", desc: "Notify me when tasks in my project are marked completed." },
                  { key: "projectUpdates", label: "Project Status Changes", desc: "Alert when project milestone or status updates occur." },
                  { key: "workflowExecutions", label: "Workflow Automation Triggers", desc: "Notify when background rules are executed." },
                  { key: "emailDigest", label: "Weekly Email Digest", desc: "Receive weekly workspace activity summary." },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between rounded-lg border border-[#30363D] bg-[#0D1117] p-3.5"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-white">{item.label}</h4>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifPreferences[item.key]}
                      onChange={(e) => {
                        setNotifPreferences({ ...notifPreferences, [item.key]: e.target.checked });
                        showToast("Notification settings updated.");
                      }}
                      className="h-4 w-4 rounded border-[#30363D] bg-[#161B22] accent-sky-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: API KEYS & TOKENS */}
          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="border-b border-[#30363D] pb-3">
                <h2 className="text-sm font-bold text-white">Personal Access Tokens</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Generate bearer access tokens for DevFlow CLI and automated CI/CD pipelines.
                </p>
              </div>

              <form onSubmit={handleCreateApiToken} className="flex gap-2 max-w-xl">
                <input
                  type="text"
                  placeholder="Token Name (e.g. GitHub Actions Bot)"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                  className="flex-1 rounded-lg border border-[#30363D] bg-[#0D1117] px-3.5 py-2 text-xs text-[#F0F6FC] outline-none focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
                >
                  <Key size={14} />
                  <span>Generate Token</span>
                </button>
              </form>

              <div className="space-y-2.5 max-w-xl">
                <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                  Active API Tokens
                </h3>
                {apiTokens.length === 0 ? (
                  <p className="text-xs text-slate-500">No active tokens generated.</p>
                ) : (
                  apiTokens.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-lg border border-[#30363D] bg-[#0D1117] p-3.5 text-xs"
                    >
                      <div>
                        <h4 className="font-semibold text-white">{t.name}</h4>
                        <p className="font-mono text-[11px] text-sky-400 mt-0.5">{t.key}</p>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">Created: {t.created}</p>
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
