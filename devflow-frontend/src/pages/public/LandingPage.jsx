import { useNavigate, Link } from "react-router-dom";
import {
  FolderKanban,
  CheckSquare,
  Workflow,
  Users,
  Bell,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Layers,
  CheckCircle2,
  Lock,
  Globe,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E6EDF3] font-sans selection:bg-[#1D63ED]/30 selection:text-white">
      {/* Navbar Header */}
      <header className="sticky top-0 z-50 border-b border-[#1F2937]/80 bg-[#0B0F17]/80 backdrop-blur-xl px-6 lg:px-12 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1D63ED] text-sm font-black text-white shadow-lg shadow-[#1D63ED]/30 group-hover:scale-105 transition">
              DF
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-[#38BDF8] transition">
                DevFlow
              </span>
              <span className="text-[10px] text-[#6B7280]">Automation Engine</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#9CA3AF]">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              How It Works
            </a>
            <a href="#benefits" className="hover:text-white transition">
              Benefits
            </a>
            <a href="#automation" className="hover:text-white transition">
              Workflows
            </a>
          </nav>

          {/* Auth Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 rounded-xl bg-[#1D63ED] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#1D63ED]/20 hover:bg-[#1551C9] transition active:scale-95 cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="rounded-xl border border-[#1F2937] bg-[#121721] px-4 py-2 text-xs font-semibold text-[#E6EDF3] hover:border-[#374151] hover:text-white transition cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="flex items-center gap-1.5 rounded-xl bg-[#1D63ED] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#1D63ED]/25 hover:bg-[#1551C9] transition active:scale-95 cursor-pointer"
                >
                  <span>Get Started Free</span>
                  <ChevronRight size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 overflow-hidden">
        {/* Glow backdrop graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#1D63ED]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-5xl text-center space-y-8 relative z-10">
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1D63ED]/30 bg-[#0C2448]/60 px-4 py-1.5 text-xs font-semibold text-[#38BDF8] shadow-sm backdrop-blur-md">
            <Sparkles size={14} className="text-[#38BDF8]" />
            <span>DevFlow 2.0 — Real-Time Workflow & Sprint Engine</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
            Automate Workflows. Track Tasks. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#38BDF8] via-[#1D63ED] to-[#C084FC] bg-clip-text text-transparent">
              Accelerate Engineering Teams.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#9CA3AF] leading-relaxed">
            DevFlow unites workspace project management, real-time Kanban boards, and event-driven automation rules into one ultra-fast, developer-first platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate(user ? "/dashboard" : "/auth/register")}
              className="flex h-12 items-center gap-2 rounded-xl bg-[#1D63ED] px-7 text-sm font-bold text-white shadow-xl shadow-[#1D63ED]/30 hover:bg-[#1551C9] hover:shadow-[#1D63ED]/50 transition active:scale-95 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/auth/login")}
              className="flex h-12 items-center gap-2 rounded-xl border border-[#1F2937] bg-[#121721] px-6 text-sm font-semibold text-[#E6EDF3] hover:border-[#374151] hover:text-white transition cursor-pointer"
            >
              <span>Sign In to Workspace</span>
            </button>
          </div>

          {/* Interactive UI Showcase Frame */}
          <div className="mt-14 rounded-2xl border border-[#1F2937] bg-[#121721] p-3 sm:p-5 shadow-2xl shadow-black/80 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-[#1F2937] pb-3 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs font-mono text-[#6B7280]">
                  devflow.app/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#38BDF8] bg-[#0C2448] px-2.5 py-1 rounded-lg">
                <Zap size={12} />
                <span>SignalR Real-Time Active</span>
              </div>
            </div>

            {/* Mock Kanban Columns Preview */}
            <div className="grid gap-4 sm:grid-cols-3 text-left">
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>To Do</span>
                  <span className="rounded-full bg-[#1F2937] px-2 py-0.5 text-[10px] text-slate-400">2</span>
                </div>
                <div className="rounded-lg border border-[#1F2937] bg-[#121721] p-3 space-y-1">
                  <span className="rounded bg-[#3D2109] px-2 py-0.5 text-[10px] text-[#FBBF24]">Medium</span>
                  <p className="text-xs font-semibold text-white">Setup Microservice API Gateway</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>In Progress</span>
                  <span className="rounded-full bg-[#0C2448] px-2 py-0.5 text-[10px] text-[#38BDF8]">1</span>
                </div>
                <div className="rounded-lg border border-[#1D63ED]/50 bg-[#0C2448]/30 p-3 space-y-1">
                  <span className="rounded bg-[#2D164B] px-2 py-0.5 text-[10px] text-[#C084FC]">High</span>
                  <p className="text-xs font-semibold text-white">SignalR Hub Notification Dispatcher</p>
                </div>
              </div>

              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17] p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Completed</span>
                  <span className="rounded-full bg-[#0B3B26] px-2 py-0.5 text-[10px] text-[#34D399]">3</span>
                </div>
                <div className="rounded-lg border border-[#1F2937] bg-[#121721] p-3 space-y-1 opacity-80">
                  <span className="rounded bg-[#0B3B26] px-2 py-0.5 text-[10px] text-[#34D399]">Low</span>
                  <p className="text-xs font-semibold text-white">JWT Refresh Token Middleware</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 border-t border-[#1F2937] px-6 lg:px-12 bg-[#0E131F]">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              Powerful Capabilities
            </h2>
            <h3 className="text-3xl font-extrabold text-white">
              Everything Your Engineering Team Needs
            </h3>
            <p className="text-sm text-[#9CA3AF]">
              Designed from the ground up for high-velocity software engineering teams.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4 hover:border-[#1D63ED] transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0C2448] text-[#38BDF8]">
                <FolderKanban size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Project Management</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Organize projects under dedicated workspaces with progress tracking, milestone status, and team member assignments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4 hover:border-[#1D63ED] transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B3B26] text-[#34D399]">
                <CheckSquare size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Task & Sprint Kanban</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Interactive 3-column sprint boards (`To Do`, `In Progress`, `Completed`) with priority badges and seamless status transitions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4 hover:border-[#1D63ED] transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D164B] text-[#C084FC]">
                <Workflow size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Workflow Automation</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Define automated event triggers that execute background actions, update task assignees, and dispatch instant team alerts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4 hover:border-[#1D63ED] transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2D164B] text-[#C084FC]">
                <Users size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Team & Workspace Roles</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Granular role control (`Owner`, `Admin`, `Member`) across workspaces and projects to enforce proper authorization boundaries.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4 hover:border-[#1D63ED] transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3D2109] text-[#FBBF24]">
                <Bell size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Real-Time Notifications</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Powered by ASP.NET Core SignalR WebSockets for instant notification toasts and unread count badges without page reloads.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4 hover:border-[#1D63ED] transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0C2448] text-[#38BDF8]">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-base font-bold text-white">Secure JWT Authentication</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                JWT bearer tokens with automatic refresh token rotation (`/api/Auth/refresh`), keeping your sessions secure seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 border-t border-[#1F2937] px-6 lg:px-12 bg-[#0B0F17]">
        <div className="mx-auto max-w-6xl space-y-14">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
              Simple 3-Step Setup
            </h2>
            <h3 className="text-3xl font-extrabold text-white">
              How DevFlow Streamlines Your Output
            </h3>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="relative rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-3">
              <span className="text-3xl font-black text-[#1D63ED]">01</span>
              <h4 className="text-base font-bold text-white">Create a Workspace</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Initialize your organization workspace and invite software engineers, project managers, and team leads.
              </p>
            </div>

            <div className="relative rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-3">
              <span className="text-3xl font-black text-[#38BDF8]">02</span>
              <h4 className="text-base font-bold text-white">Add Projects & Sprint Backlogs</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Create target engineering projects and populate tasks with priority levels, descriptions, and assignees.
              </p>
            </div>

            <div className="relative rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-3">
              <span className="text-3xl font-black text-[#C084FC]">03</span>
              <h4 className="text-base font-bold text-white">Automate & Monitor</h4>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Enable automated workflow rules that fire notifications and transition status across your entire pipeline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits Section */}
      <section id="benefits" className="py-20 border-t border-[#1F2937] px-6 lg:px-12 bg-[#0E131F]">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                Product Benefits
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Designed to Increase Developer Velocity & Eliminate Repetitive Work
              </h3>
              <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                Traditional project tools are clunky and disconnected from execution. DevFlow bridges team task tracking with automated workflow execution.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Eliminate manual status updates with automated event rules",
                  "Keep remote engineering teams in sync via SignalR WebSockets",
                  "Structured role-based security & workspace data isolation",
                  "Zero distraction modern dark theme tailored for developers",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-medium text-white">
                    <CheckCircle2 size={16} className="text-[#34D399] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#1F2937] bg-[#121721] p-6 space-y-4 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-[#1F2937] pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2D164B] text-[#C084FC]">
                  <Workflow size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Workflow Automation Engine</h4>
                  <p className="text-[11px] text-[#6B7280]">Event-driven rules execution</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-[#0B0F17] p-3 border border-[#1F2937]">
                  <span className="text-white">Task Assigned → Auto-Notify Assignee</span>
                  <span className="text-[#34D399] font-semibold">Active</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#0B0F17] p-3 border border-[#1F2937]">
                  <span className="text-white">Task Completed → Trigger Release Hook</span>
                  <span className="text-[#34D399] font-semibold">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call To Action (CTA) */}
      <section className="py-24 border-t border-[#1F2937] px-6 lg:px-12 bg-gradient-to-b from-[#0B0F17] to-[#0C2448]/30 relative overflow-hidden">
        <div className="mx-auto max-w-4xl text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Build better workflows with DevFlow.
          </h2>
          <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl mx-auto">
            Join modern software engineering teams shipping features faster with automated task tracking.
          </p>
          <div className="pt-4">
            <button
              onClick={() => navigate(user ? "/dashboard" : "/auth/register")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1D63ED] px-8 py-3.5 text-sm font-bold text-white shadow-2xl shadow-[#1D63ED]/40 hover:bg-[#1551C9] transition active:scale-95 cursor-pointer"
            >
              <span>Start Building Free</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1F2937] bg-[#070A10] px-6 lg:px-12 py-10 text-xs text-[#6B7280]">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#1D63ED] text-[10px] font-black text-white">
              DF
            </span>
            <span className="font-semibold text-white">DevFlow Inc.</span>
            <span>© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[#9CA3AF]">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              Process
            </a>
            <Link to="/auth/login" className="hover:text-white transition">
              Login
            </Link>
            <Link to="/auth/register" className="hover:text-white transition">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
