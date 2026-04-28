import Card from "@/components/ui/card";

export default function StudentSettingsTab({ settings = {}, school }) {
  const rules = {
    emailSuffix: settings?.emailSuffix || "",
    departmentCodes: settings?.departmentCode || [],
  };
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <Card className="rounded-2xl border border-slate-200/70 p-5 shadow-sm dark:border-slate-800 bg-white/80 dark:bg-slate-950/70">
          <div className="flex flex-col gap-1 border-b border-slate-200/70 pb-4 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Class Rules
              </h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Control who can join this class and which departments are
                permitted.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <form className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Allowed Email Domain
                </label>
                <input
                  value={rules.emailSuffix}
                  readOnly
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="@gmail.com"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Only students with this email suffix can join.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Department Codes
                  </label>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Read-only
                  </span>
                </div>

                <div className="mt-2">
                  {rules.departmentCodes.length ? (
                    <div className="flex flex-wrap gap-2">
                      {rules.departmentCodes.map((code, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300"
                        >
                          {code}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      No department codes added yet.
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="rounded-2xl border border-slate-200/70 p-5 shadow-sm dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                School
              </label>
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold capitalize text-slate-900 dark:text-slate-100">
                <span className="inline-flex items-center text-sky-600">
                  {school}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  (read-only)
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                This field is read-only.
              </p>
            </div>
          </Card>

          <Card className="rounded-2xl border border-slate-200/70 p-5 shadow-sm dark:border-slate-800">
            <div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Help
              </h4>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Contact your administrator for changes to class settings.
              </p>
              <a
                href="mailto:admin@oauife.edu.ng"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-sky-700 underline-offset-4 transition hover:underline dark:text-sky-300"
              >
                Contact Admin
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
