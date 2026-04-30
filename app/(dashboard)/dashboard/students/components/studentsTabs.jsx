const tabs = ["Overview", "Attendance", "Students", "Settings"];

export default function StudentTabs({ selectedTab, onTabClick, tabs = tabs }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-2 dark:border-slate-800 dark:bg-slate-950/70">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
            selectedTab === tab
              ? "bg-sky-500/15 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
          }`}
          onClick={() => onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
