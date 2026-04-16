import {
  BarChart3,
  BellRing,
  Clock3,
  LayoutDashboard,
  Radar,
  ShieldCheck,
} from "lucide-react";
import CallToAction from "@/components/ui/cta";
import HowItWorks from "@/components/root/howitworks";
import Features from "@/components/root/features";
import HeroSection from "@/components/root/herosection";

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

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features features={features} />
      <HowItWorks steps={steps} />
      <CallToAction />
    </>
  );
}
