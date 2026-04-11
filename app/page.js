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
import Footer from "@/components/ui/footer";
import CallToAction from "@/components/ui/cta";
import HowItWorks from "@/components/root/howitworks";
import Features from "@/components/root/features";
import HeroSection from "@/components/root/herosection";
import Header from "@/components/root/header";

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
  return (
    <div
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-size-[72px_72px] opacity-35 dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] dark:opacity-25 animate-grid-pan mask-[linear-gradient(to_bottom,black,transparent_92%)]" />
      <Header />
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
