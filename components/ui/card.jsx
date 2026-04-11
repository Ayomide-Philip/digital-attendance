export default function Card({ className = "", children }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl sm:rounded-3xl sm:p-6 dark:border-slate-800 dark:bg-slate-950/70 ${className}`}
    >
      {children}
    </div>
  );
}
