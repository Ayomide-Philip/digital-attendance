import Header from "@/components/root/header";
import Footer from "@/components/ui/footer";
export default function Layout({ children }) {
  return (
    <div
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_bottom,rgba(15,23,42,0.08),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.05),transparent_45%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.14)_1px,transparent_1px)] bg-size-[72px_72px] opacity-35 dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] dark:opacity-25 animate-grid-pan mask-[linear-gradient(to_bottom,black,transparent_92%)]" />
      <Header />
      <main className="pt-20 sm:pt-24 lg:pt-28">
        {children}
        <Footer />
      </main>
    </div>
  );
}
