export default function Tabs({ activeTab, setActiveTab, tabs = [] }) {
  return (
    <div className="sticky top-4 z-30 rounded-2xl border border-slate-200/70 bg-white/85 p-2 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/75">
      <div className="flex flex-wrap gap-2 px-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === tab
                ? "bg-sky-500/15 text-sky-700 shadow-sm dark:bg-sky-400/15 dark:text-sky-300"
                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
