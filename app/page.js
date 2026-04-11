"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Compass,
  LayoutDashboard,
  LogIn,
  Menu,
  Moon,
  Radar,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  UserPlus,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";

const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    icon: ShieldCheck,
    title: "Location-Based Verification",
    description:
      "Confirm attendance only when users are inside the approved geofence.",
  },
  {
    icon: Radar,
    title: "Distance Radius Control",
    description:
      "Set precise radius rules to support flexible campuses, offices, and events.",
  },
  {
    icon: Clock3,
    title: "Real-Time Attendance Tracking",
    description:
      "Monitor every check-in as it happens with instant updates and status clarity.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description:
      "Review logs, sessions, and attendance summaries in one focused command center.",
  },
  {
    icon: BellRing,
    title: "Smart Alerts",
    description:
      "Receive instant notifications for late arrivals, denied attempts, and irregular activity.",
  },
  {
    icon: BarChart3,
    title: "Attendance Analytics",
    description:
      "Turn session data into actionable insights for teams, classes, and operations.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create a session",
    description:
      "Define a location, radius, and schedule for the attendance window.",
  },
  {
    number: "02",
    title: "Verify in real time",
    description:
      "The system checks geolocation and distance before allowing a valid check-in.",
  },
  {
    number: "03",
    title: "Review and export",
    description:
      "Track attendance outcomes instantly and keep a clean history for administrators.",
  },
];

function Button({
  className = "",
  variant = "primary",
  as: Component = "button",
  children,
  ...props
}) {
  const variants = {
    primary:
      "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
    secondary:
      "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900",
    ghost:
      "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
  };

  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description, align = "center" }) {
  return (
    <div
      className={`mx-auto max-w-3xl ${align === "left" ? "text-left" : "text-center"}`}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-700 dark:text-sky-300">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentTheme = resolvedTheme ?? theme ?? "light";
  const isDark = currentTheme === "dark";

  return (
    <div
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-size-[72px_72px] opacity-35 dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] dark:opacity-25 animate-grid-pan mask-[linear-gradient(to_bottom,black,transparent_92%)]" />

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/20 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-3 text-lg font-semibold tracking-tight text-slate-950 dark:text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white shadow-lg shadow-sky-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span>Attendify</span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              as="button"
              variant="ghost"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="h-10 w-10 px-0"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button as="a" href="#contact" variant="ghost">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
            <Button as="a" href="#contact" variant="secondary">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Button>
            <Button as="a" href="#contact" variant="primary">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              as="button"
              variant="ghost"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="h-10 w-10 px-0"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button
              as="button"
              variant="ghost"
              onClick={() => setMobileMenuOpen(true)}
              className="h-10 w-10 px-0"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                Attendify
              </div>
              <Button
                as="button"
                variant="ghost"
                onClick={() => setMobileMenuOpen(false)}
                className="h-10 w-10 px-0"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-10 space-y-2">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-8 grid gap-3">
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
              <Button
                as="a"
                href="#contact"
                variant="primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <main className="pt-24 sm:pt-28">
        <section className="relative min-h-screen overflow-hidden">
          <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid w-full items-center gap-14 lg:grid-cols-2 lg:gap-12">
              <div className="max-w-2xl animate-fade-up">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-700 dark:text-sky-300">
                  <Compass className="h-4 w-4" />
                  Geolocation and distance validation for modern attendance
                  workflows
                </div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl dark:text-white">
                  Smart Attendance, Powered by Location
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                  Eliminate proxy attendance with real-time geolocation and
                  distance verification.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button
                    as="a"
                    href="#contact"
                    variant="primary"
                    className="h-12 px-6 text-base"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    as="a"
                    href="#features"
                    variant="secondary"
                    className="h-12 px-6 text-base"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Geofencing ready
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Real-time attendance insights
                  </div>
                </div>
              </div>

              <div className="relative animate-fade-up [animation-delay:120ms] lg:justify-self-end">
                <div className="absolute -left-8 top-6 h-28 w-28 rounded-full bg-sky-400/20 blur-3xl dark:bg-sky-500/20" />
                <div className="absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl dark:bg-indigo-500/20" />
                <Card className="relative overflow-hidden p-0 shadow-[0_30px_90px_rgba(15,23,42,0.18)] dark:shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
                  <div className="border-b border-slate-200/80 bg-white/90 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/90">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      Live session monitor
                    </div>
                  </div>
                  <div className="grid gap-4 p-6">
                    <div className="rounded-3xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-sky-50 p-5 dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Session status
                          </p>
                          <h3 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">
                            Engineering Campus Morning Shift
                          </h3>
                        </div>
                        <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                          Active
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {[
                          ["Radius", "120m"],
                          ["Checked in", "186"],
                          ["Denied", "7"],
                          ["Accuracy", "98.4%"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-2xl border border-white/70 bg-white/80 p-3 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900/80"
                          >
                            <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              {label}
                            </div>
                            <div className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                            <Target className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Validation
                            </p>
                            <p className="font-medium text-slate-950 dark:text-white">
                              Inside approved radius
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Status
                            </p>
                            <p className="font-medium text-slate-950 dark:text-white">
                              Attendance confirmed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="border-t border-slate-200/70 py-24 dark:border-slate-800"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Features"
              title="Everything you need to prevent proxy attendance"
              description="A focused product experience built for campuses, offices, and events that need reliable presence verification."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card
                    key={feature.title}
                    className={`group transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/30 hover:shadow-xl ${index === 0 ? "sm:col-span-2 xl:col-span-1" : ""}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500/15 to-indigo-500/15 text-sky-600 transition group-hover:scale-105 dark:text-sky-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-slate-950 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-slate-200/70 py-24 dark:border-slate-800"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="How It Works"
              title="Attendance verification in three simple steps"
              description="The flow is intentionally simple so administrators can set it up quickly and users can check in without friction."
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {steps.map((step) => (
                <Card key={step.number} className="relative overflow-hidden">
                  <div className="absolute right-4 top-4 text-5xl font-semibold text-slate-100 dark:text-slate-900">
                    {step.number}
                  </div>
                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 to-indigo-500 text-base font-semibold text-white shadow-lg shadow-sky-500/20">
                      {step.number}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-slate-950 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {step.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200/70 py-24 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="relative overflow-hidden border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 px-8 py-14 text-center text-white shadow-[0_35px_100px_rgba(2,6,23,0.35)] dark:border-slate-800">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.22),transparent_30%)]" />
              <div className="relative mx-auto max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-300">
                  Start now
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Start Managing Attendance the Smart Way
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-300">
                  Launch a cleaner, more reliable attendance workflow that
                  validates presence through location data instead of trust
                  alone.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button
                    as="a"
                    href="#contact"
                    variant="secondary"
                    className="h-12 bg-white px-6 text-base text-slate-950 hover:bg-slate-100 dark:bg-white dark:text-slate-950"
                  >
                    Create Your First Session
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <footer
          id="contact"
          className="border-t border-slate-200/70 py-12 dark:border-slate-800"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <div className="flex items-center gap-3 text-lg font-semibold text-slate-950 dark:text-white">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                Attendify
              </div>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                A modern digital attendance system that combines geolocation
                validation, distance control, and clean administration.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 dark:text-white">
                  Links
                </h3>
                <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <a
                    href="#home"
                    className="transition hover:text-slate-950 dark:hover:text-white"
                  >
                    Home
                  </a>
                  <a
                    href="#features"
                    className="transition hover:text-slate-950 dark:hover:text-white"
                  >
                    Features
                  </a>
                  <a
                    href="#contact"
                    className="transition hover:text-slate-950 dark:hover:text-white"
                  >
                    Contact
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-950 dark:text-white">
                  Get Started
                </h3>
                <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <a
                    href="#contact"
                    className="transition hover:text-slate-950 dark:hover:text-white"
                  >
                    Create Your First Session
                  </a>
                  <a
                    href="#contact"
                    className="transition hover:text-slate-950 dark:hover:text-white"
                  >
                    Request a Demo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-500">
              © 2026 Attendify. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
