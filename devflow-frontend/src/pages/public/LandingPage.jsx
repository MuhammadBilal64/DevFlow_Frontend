import { useNavigate } from "react-router-dom";
import DevFlowLogo from "../../components/common/DevFlowLogo";
import {
  ArrowRight,
  CheckSquare,
  FolderKanban,
  GitBranch,
  Layers,
  ListChecks,
  Plus,
  Search,
  Shield,
  Sparkles,
  Workflow,
  Home,
  Zap,
} from "lucide-react";
import { useAuth } from "../../context/useAuth";

const stats = [
  { value: "3x", label: "faster sprint handoffs" },
  { value: "12k+", label: "tasks shipped weekly" },
  { value: "40%", label: "less status-meeting time" },
  { value: "99.9%", label: "uptime on every board" },
];

const features = [
  {
    icon: FolderKanban,
    title: "Projects that stay readable",
    body: "Group work into projects with owners, milestones and a single source of truth — no more hunting across five tools.",
  },
  {
    icon: ListChecks,
    title: "Tasks with real context",
    body: "Priority, assignee, due date and dependencies live on the card, so nobody has to ask what's next.",
  },
  {
    icon: Workflow,
    title: "Flows you actually control",
    body: "Design your own stages, drag work across them, and let DevFlow keep the history for you.",
  },
  {
    icon: Search,
    title: "Find anything instantly",
    body: "One search bar across projects, tasks and people. Type three letters, get the right card.",
  },
  {
    icon: Zap,
    title: "Built for speed",
    body: "Keyboard-first navigation and optimistic updates — the board reacts before the network does.",
  },
  {
    icon: Shield,
    title: "Private by default",
    body: "Every workspace is scoped to your team. Your roadmap never leaks into someone else's dashboard.",
  },
];

const steps = [
  {
    step: "01",
    title: "Create your workspace",
    body: "Sign up in seconds and get an empty, fast board — no setup wizard, no 20-field forms.",
  },
  {
    step: "02",
    title: "Break work into projects",
    body: "Spin up a project per initiative, invite the people who matter and set the stages you use.",
  },
  {
    step: "03",
    title: "Ship, then review",
    body: "Move tasks across the flow, watch progress roll up automatically and close the sprint with clarity.",
  },
];

const faqs = [
  {
    q: "Is DevFlow free to start?",
    a: "Yes. Create a workspace, add projects and invite your team without entering a card.",
  },
  {
    q: "Can I customise the workflow stages?",
    a: "Every project ships with sensible defaults, and you can rename, reorder or add stages at any time.",
  },
  {
    q: "Does it work for solo developers?",
    a: "Absolutely. Solo boards stay lightweight — the collaboration features simply stay out of your way.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
const primaryAction = () =>
  navigate(user ? "/dashboard" : "/auth/register");
  const primaryLabel = user ? "Open the dashboard" : "Create your free workspace";

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-200 antialiased selection:bg-[#2563EB]/30">
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#30363D]/70 bg-[#0D1117]/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <DevFlowLogo />
          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a className="transition hover:text-slate-100" href="#features">Features</a>
            <a className="transition hover:text-slate-100" href="#how-it-works">How it works</a>
            <a className="transition hover:text-slate-100" href="#faq">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            {!user && (
              <button
            onClick={() => navigate("/auth/login")}
                className="hidden rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white sm:inline-flex"
              >
                Sign in
              </button>
            )}
            <button
              onClick={primaryAction}
              className="inline-flex items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/20 transition hover:bg-[#1D4ED8]"
            >
              {user ? "Dashboard" : "Get started"}
              <ArrowRight size={15} />
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(#30363D 1px, transparent 1px), linear-gradient(90deg, #30363D 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-12rem] h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-[#2563EB]/20 blur-[140px]"
          />

          <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 text-center sm:pt-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#30363D] bg-[#161B22]/80 px-4 py-1.5 text-xs font-medium text-slate-300">
              <Sparkles size={13} className="text-[#2563EB]" />
              Project tracking built for developers
            </span>

            <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
              Plan the work.
              <span className="block bg-gradient-to-r from-[#60A5FA] via-white to-[#60A5FA] bg-clip-text text-transparent">
                Then actually ship it.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              DevFlow keeps projects, tasks and progress in one fast workspace — so
              your team spends its time building instead of reporting.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                onClick={primaryAction}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2563EB] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/25 transition hover:bg-[#1D4ED8] sm:w-auto"
              >
                {primaryLabel}
                <ArrowRight size={16} />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#30363D] bg-[#161B22] px-7 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-600 hover:text-white sm:w-auto"
              >
                See how it works
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-500">
              Free to start · No credit card · Set up in under a minute
            </p>

            {/* App preview */}
            <div className="relative mx-auto mt-16 max-w-5xl">
              <div className="rounded-2xl border border-[#30363D] bg-[#161B22] p-2 shadow-2xl shadow-black/60">
                <div className="rounded-xl border border-[#30363D]/80 bg-[#0D1117]">
                  <div className="flex items-center gap-2 border-b border-[#30363D]/80 px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#30363D]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#30363D]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#30363D]" />
                    <div className="ml-3 flex items-center gap-2 rounded-md border border-[#30363D] px-3 py-1 text-[11px] text-slate-500">
                      <Search size={11} /> Search projects and tasks…
                    </div>
                    <div className="ml-auto inline-flex items-center gap-1 rounded-md bg-[#2563EB] px-2.5 py-1 text-[11px] font-medium text-white">
                      <Plus size={11} /> New task
                    </div>
                  </div>

                  <div className="grid gap-4 p-4 text-left sm:grid-cols-3">
                    {[
                      { name: "Backlog", tone: "text-slate-400", items: ["Auth rate limiting", "Audit log schema"] },
                      { name: "In progress", tone: "text-[#60A5FA]", items: ["Board drag & drop", "Task filters"] },
                      { name: "Done", tone: "text-emerald-400", items: ["Workspace invites", "Dark theme pass"] },
                    ].map((col) => (
                      <div key={col.name} className="rounded-lg border border-[#30363D]/80 bg-[#161B22]/60 p-3">
                        <div className={`flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider ${col.tone}`}>
                          {col.name}
                          <span className="text-slate-600">{col.items.length}</span>
                        </div>
                        <div className="mt-3 space-y-2">
                          {col.items.map((item) => (
                            <div
                              key={item}
                              className="rounded-md border border-[#30363D]/70 bg-[#0D1117] px-3 py-2.5 text-xs text-slate-300"
                            >
                              <div className="flex items-center gap-2">
                                <CheckSquare size={12} className="text-slate-600" />
                                {item}
                              </div>
                              <div className="mt-2 flex items-center gap-1.5">
                                <span className="rounded-full bg-[#2563EB]/15 px-2 py-0.5 text-[10px] text-[#60A5FA]">
                                  frontend
                                </span>
                                <span className="rounded-full bg-[#30363D]/60 px-2 py-0.5 text-[10px] text-slate-400">
                                  P2
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-8 -bottom-6 h-24 bg-gradient-to-t from-[#0D1117] to-transparent"
              />
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────── */}
        <section className="border-y border-[#30363D]/70 bg-[#0D1117]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-[#30363D]/70 px-6 sm:grid-cols-4 sm:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-8 text-center">
                <div className="text-2xl font-semibold text-white sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-xs text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ──────────────────────────────────── */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-24">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#60A5FA]">
              Features
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Everything a small team needs. Nothing it doesn't.
            </h2>
            <p className="mt-4 text-slate-400">
              DevFlow trims the bloat of enterprise trackers and keeps the six things
              that actually move work forward.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-xl border border-[#30363D] bg-[#161B22] p-6 transition duration-200 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-xl hover:shadow-[#2563EB]/5"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#30363D] bg-[#0D1117] text-[#60A5FA] transition group-hover:border-[#2563EB]/50">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ──────────────────────────────── */}
        <section id="how-it-works" className="border-t border-[#30363D]/70 bg-[#0D1117]/60">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#60A5FA]">
                  How it works
                </span>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  From empty board to shipped sprint in three moves.
                </h2>
                <p className="mt-4 text-slate-400">
                  No onboarding calls. No migration project. Open DevFlow, create a
                  project and start moving cards.
                </p>
                <button
                  onClick={primaryAction}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#30363D] bg-[#161B22] px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-[#2563EB]/60"
                >
                  {primaryLabel}
                  <ArrowRight size={15} />
                </button>
              </div>

              <ol className="relative space-y-4 border-l border-[#30363D] pl-6">
                {steps.map(({ step, title, body }) => (
                  <li key={step} className="relative rounded-xl border border-[#30363D] bg-[#161B22] p-6">
                    <span className="absolute -left-[2.15rem] top-7 flex h-6 w-6 items-center justify-center rounded-full border border-[#30363D] bg-[#0D1117] text-[10px] font-semibold text-[#60A5FA]">
                      {step}
                    </span>
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── Built for devs strip ──────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Layers, title: "Sprint rollups", body: "Progress per project, calculated automatically." },
              { icon: GitBranch, title: "Branch-style flows", body: "Model review, QA and release as first-class stages." },
              { icon: Zap, title: "Keyboard first", body: "Create, assign and move tasks without touching the mouse." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3 rounded-xl border border-[#30363D]/70 bg-[#161B22]/50 p-5">
                <Icon size={18} className="mt-0.5 shrink-0 text-[#60A5FA]" />
                <div>
                  <div className="text-sm font-semibold text-white">{title}</div>
                  <p className="mt-1 text-sm text-slate-400">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────── */}
        <section id="faq" className="border-t border-[#30363D]/70">
          <div className="mx-auto max-w-3xl px-6 py-24">
            <h2 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Questions, answered
            </h2>
            <div className="mt-10 divide-y divide-[#30363D]/70 rounded-xl border border-[#30363D] bg-[#161B22]">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group px-6 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-white">
                    {q}
                    <Plus
                      size={16}
                      className="shrink-0 text-slate-500 transition group-open:rotate-45"
                    />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ─────────────────────────────────── */}
        <section className="px-6 pb-24">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-[#30363D] bg-[#161B22] px-8 py-16 text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[#2563EB]/20 blur-[120px]"
            />
            <div className="relative">
              <Home size={20} className="mx-auto text-[#60A5FA]" />
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Your next sprint deserves a better home.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-slate-400">
                Set up your workspace today and see how much calmer shipping feels
                when everything lives in one place.
              </p>
              <button
                onClick={primaryAction}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#2563EB] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2563EB]/25 transition hover:bg-[#1D4ED8]"
              >
                {primaryLabel}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-[#30363D]/70">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <DevFlowLogo />
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} DevFlow. Built for teams that ship.
          </p>
          <div className="flex items-center gap-5 text-xs text-slate-500">
            <a className="transition hover:text-slate-300" href="#features">Features</a>
            <a className="transition hover:text-slate-300" href="#faq">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
