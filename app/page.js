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
import Toggle from "@/components/toggle";
import Footer from "@/components/ui/footer";
import CallToAction from "@/components/ui/cta";
import Card from "@/components/ui/card";
import SectionHeader from "@/components/ui/section-header";
import HowItWorks from "@/components/root/howitworks";
import Features from "@/components/root/features";
import HeroSection from "@/components/root/herosection";

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
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
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

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
          <a
            href="#home"
            className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-slate-950 sm:gap-3 sm:text-lg dark:text-white"
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
            <Toggle />
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

          <div className="flex items-center gap-1.5 lg:hidden">
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
          <div className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-slate-200 bg-white p-5 sm:p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
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

            <div className="mt-8 space-y-2 sm:mt-10">
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

            <div className="mt-7 grid gap-3 sm:mt-8">
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

      <main className="pt-20 sm:pt-24 lg:pt-28">
        <HeroSection />

        <Features features={features} />
        <HowItWorks steps={steps} />
        <CallToAction />
        <Footer />
      </main>
    </div>
  );
}
