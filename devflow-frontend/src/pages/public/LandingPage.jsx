import { useNavigate, Link } from "react-router-dom";
import DevFlowLogo from "../../components/common/DevFlowLogo";
import {
  FolderKanban,
  CheckSquare,
  Workflow,
  Users,
  Bell,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#F0F6FC] font-sans antialiased selection:bg-sky-500/20 selection:text-sky-200">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#30363D] bg-[#0D1117]/90 backdrop-blur-md px-6 lg:px-12 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <DevFlowLogo size="md" />

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-400">
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
              Automation
            </a>
          </nav>

          {/* Auth CTAs */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
              >
                <span>Go to Dashboard</span>
                <ArrowRight size={14} />
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="rounded-lg border border-[#30363D] bg-[#161B22] px-4 py-2 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white transition cursor-pointer"
                >
                  Sign in
                </button>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="flex items-center gap-1.5 rounded-lg bg-[#F0F6FC] px-4 py-2 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
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
      <section className="pt-16 pb-20 px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-md border border-sky-500/20 bg-sky-500/10 px-3.5 py-1 text-xs font-mono text-sky-400">
            <Zap size={14} />
            <span>DevFlow v2.0 — Engineering Workflow Platform</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Build together. <br />
            <span className="text-sky-400">Ship faster with automated workflows.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-400 leading-relaxed">
            DevFlow brings project management, real-time Kanban sprint boards, and event-driven automation rules into one collaborative workspace—built for modern engineering teams.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate(user ? "/dashboard" : "/auth/register")}
              className="flex h-11 items-center gap-2 rounded-lg bg-[#F0F6FC] px-6 text-sm font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/auth/login")}
              className="flex h-11 items-center gap-2 rounded-lg border border-[#30363D] bg-[#161B22] px-6 text-sm font-medium text-slate-300 hover:border-slate-500 hover:text-white transition cursor-pointer"
            >
              <span>Sign In to Workspace</span>
            </button>
          </div>

          {/* Feature Preview Canvas */}
          <div className="mt-12 rounded-xl border border-[#30363D] bg-[#161B22] p-4 sm:p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-[#30363D] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#30363D]" />
                <span className="h-3 w-3 rounded-full bg-[#30363D]" />
                <span className="h-3 w-3 rounded-full bg-[#30363D]" />
                <span className="ml-2 text-xs font-mono text-slate-500">devflow.internal / sprint-board</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                ● Live SignalR Hub
              </span>
            </div>

            {/* Kanban Column Preview */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-[#30363D] bg-[#0D1117] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>To Do</span>
                  <span className="text-[10px] font-mono text-slate-400">2</span>
                </div>
                <div className="rounded border border-[#30363D] bg-[#161B22] p-2.5 space-y-1">
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">Medium</span>
                  <p className="text-xs font-medium text-slate-200">Configure Auth Middleware</p>
                </div>
              </div>

              <div className="rounded-lg border border-[#30363D] bg-[#0D1117] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>In Progress</span>
                  <span className="text-[10px] font-mono text-sky-400">1</span>
                </div>
                <div className="rounded border border-sky-500/30 bg-sky-500/5 p-2.5 space-y-1">
                  <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">High</span>
                  <p className="text-xs font-medium text-white">SignalR Realtime Notification Listener</p>
                </div>
              </div>

              <div className="rounded-lg border border-[#30363D] bg-[#0D1117] p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Completed</span>
                  <span className="text-[10px] font-mono text-emerald-400">3</span>
                </div>
                <div className="rounded border border-[#30363D] bg-[#161B22] p-2.5 space-y-1 opacity-75">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Low</span>
                  <p className="text-xs font-medium text-slate-300">JWT Token Rotation API</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 border-t border-[#30363D] px-6 lg:px-12 bg-[#0D1117]">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400">
              Capabilities
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Built for Engineering Workspaces
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit">
                <FolderKanban size={20} />
              </div>
              <h4 className="text-sm font-semibold text-white">Project Management</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Organize work under scoped workspace projects with status tracking, milestones, and assigned members.
              </p>
            </div>

            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                <CheckSquare size={20} />
              </div>
              <h4 className="text-sm font-semibold text-white">Task & Sprint Kanban</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Interactive 3-column sprint boards with status transitions (`To Do`, `In Progress`, `Completed`) and priority badges.
              </p>
            </div>

            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
                <Workflow size={20} />
              </div>
              <h4 className="text-sm font-semibold text-white">Workflow Automation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure rule triggers that automatically reassign tasks, notify developers, and execute background tasks.
              </p>
            </div>

            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
                <Users size={20} />
              </div>
              <h4 className="text-sm font-semibold text-white">Team Collaboration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manage workspace members with granular access controls (`Owner`, `Admin`, `Member`).
              </p>
            </div>

            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 w-fit">
                <Bell size={20} />
              </div>
              <h4 className="text-sm font-semibold text-white">SignalR Notifications</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Real-time WebSocket alerts for task assignments, project status updates, and automation rule executions.
              </p>
            </div>

            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-3">
              <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-sm font-semibold text-white">JWT Bearer Security</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Secure token validation with automatic refresh token rotation (`/api/Auth/refresh`).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="how-it-works" className="py-16 border-t border-[#30363D] px-6 lg:px-12 bg-[#0D1117]">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400">
              How It Works
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Get Up and Running in 3 Steps
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-2">
              <span className="text-2xl font-mono font-bold text-sky-400">01</span>
              <h4 className="text-sm font-semibold text-white">Create Workspace</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Setup your organization workspace and add developers or project managers.
              </p>
            </div>

            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-2">
              <span className="text-2xl font-mono font-bold text-emerald-400">02</span>
              <h4 className="text-sm font-semibold text-white">Add Projects & Backlog</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Define engineering projects and create task backlogs with priority badges and due dates.
              </p>
            </div>

            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-2">
              <span className="text-2xl font-mono font-bold text-amber-400">03</span>
              <h4 className="text-sm font-semibold text-white">Automate & Monitor</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure workflow rules to trigger automated notifications and move tasks seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Automation Section */}
      <section id="benefits" className="py-16 border-t border-[#30363D] px-6 lg:px-12 bg-[#0D1117]">
        <div id="automation" className="mx-auto max-w-5xl space-y-8 scroll-mt-24">

          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400">
                Benefits
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Increase Output and Reduce Manual Overhead
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                DevFlow integrates task boards with automated execution rules so engineers spend less time updating status and more time shipping code.
              </p>

              <div className="space-y-2.5 pt-1 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Automated event triggers for instant task updates</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Real-time SignalR WebSockets sync across team members</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Scoped workspace data isolation & JWT authentication</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#30363D] bg-[#161B22] p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#30363D] pb-3 text-xs">
                <span className="font-semibold text-white">Workflow Rule Engine</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Automated
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between rounded bg-[#0D1117] p-2.5 border border-[#30363D]">
                  <span className="text-slate-300">Task Created → Notify Assignee</span>
                  <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                </div>
                <div className="flex items-center justify-between rounded bg-[#0D1117] p-2.5 border border-[#30363D]">
                  <span className="text-slate-300">Task Completed → Trigger Event</span>
                  <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-[#30363D] px-6 lg:px-12 bg-[#161B22] text-center">
        <div className="mx-auto max-w-3xl space-y-5">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Build better workflows with DevFlow.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Join engineering teams shipping faster with automated task tracking and real-time workspace boards.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate(user ? "/dashboard" : "/auth/register")}
              className="inline-flex items-center gap-2 rounded-lg bg-[#F0F6FC] px-6 py-3 text-xs font-semibold text-[#0D1117] hover:bg-white transition cursor-pointer"
            >
              <span>Start Building Free</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#30363D] bg-[#0D1117] px-6 lg:px-12 py-8 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <DevFlowLogo size="sm" linkToHome={false} />

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white transition">
              Process
            </a>
            <Link to="/auth/login" className="hover:text-white transition">
              Sign in
            </Link>
            <Link to="/auth/register" className="hover:text-white transition">
              Register
            </Link>
          </div>

          <span className="font-mono text-[11px]">© 2026 DevFlow</span>
        </div>
      </footer>
    </div>
  );
}
