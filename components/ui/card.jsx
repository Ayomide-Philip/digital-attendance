export default function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-white/70 bg-white/55 p-5 ring-1 ring-white/40 shadow-[0_14px_40px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl backdrop-saturate-150 sm:rounded-3xl sm:p-6 dark:border-slate-700/65 dark:bg-slate-900/45 dark:ring-white/10 dark:shadow-[0_12px_30px_rgba(2,6,23,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}
