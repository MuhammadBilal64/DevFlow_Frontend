import { useNavigate } from "react-router-dom";
import DevFlowLogo from "../../components/common/DevFlowLogo";
import {
  ArrowRight,
  CheckSquare,
  FolderKanban,
  Home,
  Layers,
  ListChecks,
  Plus,
  Search,
  Workflow,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#E6EDF3] font-sans antialiased selection:bg-sky-500/20 selection:text-sky-200">
      <header className="sticky top-0 z-50 border-b border-[#30363D] bg-[#0B0F17]/95 backdrop-blur-sm px-6 lg:px-12 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <DevFlowLogo size="md" />

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#workflow" className="transition hover:text-white">
              Workflow
            </a>
            <a href="#cta" className="transition hover:text-white">
              Start
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/auth/login")}
              className="rounded-full border border-[#30363D] bg-[#161B22] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
            >
              Log in
            </button>
            <button
              onClick={() => navigate(user ? "/dashboard" : "/auth/register")}
              className="rounded-full bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-[#1D4ED8]"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-6 py-24 lg:px-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_35%)]" />
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="space-y-8 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                <Zap size={14} />
                Designed for dev, product, and ops teams
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl font-bold tracking-[-0.05em] text-white sm:text-6xl">
                  Build better workflows across every team.
                  <span className="block bg-gradient-to-r from-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent">
                    Calm, clear, and ready for fast delivery.
                  </span>
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
                  DevFlow brings projects, tasks, workflows, and team context together in a polished workspace that feels like part of your process—not another tool to manage.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  onClick={() => navigate(user ? "/dashboard" : "/auth/register")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-[#1D4ED8]"
                >
                  Start free
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#30363D] bg-[#161B22] px-8 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:text-white"
                >
                  View demo
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#30363D] bg-[#161B22] px-4 py-3 text-center text-xs text-slate-300">
                  No credit card needed
                </div>
                <div className="rounded-2xl border border-[#30363D] bg-[#161B22] px-4 py-3 text-center text-xs text-slate-300">
                  Quick onboarding
                </div>
                <div className="rounded-2xl border border-[#30363D] bg-[#161B22] px-4 py-3 text-center text-xs text-slate-300">
                  Built for engineering teams
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 top-20 h-52 w-52 rounded-full bg-[#2563EB]/15 blur-3xl" />
              <div className="surface-panel relative overflow-hidden rounded-[2rem] border border-[#30363D] bg-[#121721] p-6 shadow-2xl shadow-black/30">
                <div className="grid gap-5 xl:grid-cols-[0.38fr_0.62fr]">
                  <div className="rounded-[1.75rem] border border-[#30363D] bg-[#161B22] p-5">
                    <div className="flex items-center gap-3 border-b border-[#30363D] pb-4">
                      <div className="h-11 w-11 rounded-3xl bg-[#0D1117] flex items-center justify-center text-sky-400">
                        <Zap size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">DevFlow</p>
                        <p className="mt-1 text-sm font-semibold text-white">Workspace overview</p>
                      </div>
                    </div>
                    <nav className="mt-5 space-y-3 text-sm text-slate-300">
                      <button className="flex w-full items-center gap-3 rounded-2xl bg-[#0E1728] px-4 py-3 text-left text-white transition hover:bg-[#181f33]">
                        <Home size={16} />
                        <span>Overview</span>
                      </button>
                      <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-[#181f33]">
                        <ListChecks size={16} />
                        <span>Projects</span>
                      </button>
                      <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-[#181f33]">
                        <CheckSquare size={16} />
                        <span>Tasks</span>
                      </button>
                      <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition hover:bg-[#181f33]">
                        <Layers size={16} />
                        <span>Workflows</span>
                      </button>
                    </nav>
                  </div>

                  <div className="rounded-[1.75rem] border border-[#30363D] bg-[#161B22] p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">Good morning, Bilal</p>
                        <h2 className="mt-2 text-xl font-semibold text-white">Everything your team needs in one place.</h2>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3 rounded-3xl border border-[#30363D] bg-[#0D1117] px-4 py-2 text-sm text-slate-300">
                          <Search size={16} />
                          <span>Search project...</span>
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-sky-500/15 transition hover:bg-[#1D4ED8]">
                          <Plus size={14} />
                          New project
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      {[
                        { label: "Projects", value: "12", delta: "+20%" },
                        { label: "Tasks", value: "56", delta: "+15%" },
                        { label: "Done", value: "23", delta: "+10%" },
                        { label: "Team", value: "8", delta: "+5%" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-3xl border border-[#30363D] bg-[#0F172A] p-4">
                          <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                          <p className="mt-3 text-3xl font-semibold text-white">{item.value}</p>
                          <p className="mt-2 text-[11px] text-emerald-400">{item.delta} MoM</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                      <div className="rounded-3xl border border-[#30363D] bg-[#0F172A] p-4">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>Active workstreams</span>
                          <span className="text-slate-300">Backend</span>
                        </div>
                        <div className="mt-4 space-y-3">
                          {[
                            { title: "API release", value: "75%", color: "bg-sky-400", width: "75%" },
                            { title: "Mobile UI", value: "45%", color: "bg-violet-400", width: "45%" },
                            { title: "Marketing", value: "90%", color: "bg-emerald-400", width: "90%" },
                          ].map((item) => (
                            <div key={item.title} className="rounded-2xl bg-[#0D1117] p-3">
                              <div className="flex items-center justify-between text-xs text-slate-400">
                                <span>{item.title}</span>
                                <span>{item.value}</span>
                              </div>
                              <div className="mt-2 h-2 rounded-full bg-white/10">
                                <div className={`h-2 rounded-full ${item.color}`} style={{ width: item.width }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-3xl border border-[#30363D] bg-[#0F172A] p-4">
                        <div className="flex items-center justify-between text-sm text-white">
                          <p>Task pulse</p>
                          <span className="rounded-full border border-[#30363D] bg-[#161B22] px-2 py-1 text-[11px] text-slate-300">56 total</span>
                        </div>
                        <div className="mt-6 flex items-center justify-center">
                          <div className="relative h-40 w-40 rounded-full border border-[#30363D] bg-[#0B1221]">
                            <div className="absolute inset-0 rounded-full border-[10px] border-transparent border-l-sky-400 border-t-sky-400 border-b-transparent border-r-transparent animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">56</div>
                          </div>
                        </div>
                        <div className="mt-5 space-y-3 text-xs text-slate-400">
                          <div className="flex items-center justify-between">
                            <span>Completed</span>
                            <span>23 (41%)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>In progress</span>
                            <span>20 (36%)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>To do</span>
                            <span>13 (23%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-[#0B0F17] px-6 py-24 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-sky-400">Trusted by engineering teams</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              One workspace for every delivery step
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Ship with clarity using task boards, approvals, reports, and automation designed to keep your team aligned.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {[
              { title: "Clear planning", description: "See roadmaps, milestones, and ownership in a single view.", icon: FolderKanban },
              { title: "Smart execution", description: "Turn work into action with tasks, priorities, and team updates.", icon: CheckSquare },
              { title: "Reliable delivery", description: "Automate workflows, approvals, and releases without noise.", icon: Workflow },
            ].map((feature) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={feature.title} className="rounded-[1.75rem] border border-[#30363D] bg-[#161B22] p-6 text-white shadow-sm">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D1117] text-sky-400">
                    <FeatureIcon size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-16 max-w-4xl text-center text-xs uppercase tracking-[0.3em] text-slate-500">
            Trusted by teams at
            <div className="mt-6 flex flex-wrap items-center justify-center gap-8 text-slate-400">
              <span>Acme Corp</span>
              <span>Summit Labs</span>
              <span>TechFlow</span>
              <span>DevStudio</span>
              <span>CloudX</span>
            </div>
          </div>
        </section>

        <section id="cta" className="bg-[#0B0F17] px-6 py-20 lg:px-12">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#30363D] bg-[#161B22] px-8 py-14 text-center shadow-2xl shadow-black/30">
            <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
              Launch your next sprint with less noise and more clarity.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
              Start with a workspace that helps your team move faster, stay aligned, and own delivery across every project.
            </p>
            <button
              onClick={() => navigate(user ? "/dashboard" : "/auth/register")}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-[#1D4ED8]"
            >
              {user ? "Open the dashboard" : "Create your free workspace"}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
