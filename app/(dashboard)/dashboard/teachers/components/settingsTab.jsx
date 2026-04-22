import {
  AlertTriangle,
  ChevronRight,
  Plus,
  RotateCcw,
  Save,
  School,
  ShieldAlert,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function SettingsTab({ settings = {} }) {
  const [rules, setRules] = useState({
    emailSuffix: settings?.rules?.emailSuffix || "",
    departmentCodes: settings?.rules?.departmentCode || [],
  });
  const [departmentInput, setDepartmentInput] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  const schoolName = settings?.school || "Not set";

  const handleAddDepartmentCode = () => {
    const nextCode = departmentInput.trim().toLowerCase();

    if (!nextCode) {
      return;
    }

    if (rules.departmentCodes.includes(nextCode)) {
      toast.error("This department code has already been added.");
      return;
    }

    setRules((current) => ({
      ...current,
      departmentCodes: [...current.departmentCodes, nextCode],
    }));
    setDepartmentInput("");
  };

  const handleSave = (event) => {
    event.preventDefault();
    toast.success("Settings saved locally.");
  };

  const handleDangerAction = () => {
    if (confirmAction === "reset") {
      setRules({ emailSuffix: "", departmentCodes: [] });
      toast.success("Class rules reset to defaults.");
    }

    if (confirmAction === "delete") {
      toast.success("Class deleted successfully.");
    }

    setConfirmAction(null);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
        <SettingsCard
          title="Class Rules"
          description="Control who can join this class and which departments are permitted."
          className="bg-white/80 dark:bg-slate-950/70"
        >
          <form className="space-y-5" onSubmit={handleSave}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Allowed Email Domain
              </label>
              <input
                value={rules.emailSuffix}
                onChange={(event) => {
                  setRules((current) => ({
                    ...current,
                    emailSuffix: event.target.value,
                  }));
                }}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="@oauife.edu.ng"
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
                  Add and remove codes as tags
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  value={departmentInput}
                  onChange={(event) => setDepartmentInput(event.target.value)}
                  className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  placeholder="CSC"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 rounded-xl px-4"
                  onClick={handleAddDepartmentCode}
                >
                  <Plus className="size-4" />
                  Add Code
                </Button>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Examples: CSC, MTH, EEE.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {rules.departmentCodes.length ? (
                  rules.departmentCodes.map((code, index) => (
                    <span
                      key={`${index}`}
                      className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/30 dark:text-sky-300"
                    >
                      {code}
                      <button
                        type="button"
                        onClick={() => {
                          setRules((current) => ({
                            ...current,
                            departmentCodes: current.departmentCodes.filter(
                              (_, currentIndex) => currentIndex !== index,
                            ),
                          }));
                        }}
                        className="rounded-full p-0.5 transition hover:bg-sky-200 dark:hover:bg-sky-900/60"
                        aria-label={`Remove ${code}`}
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    No department codes added yet.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  Save changes
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Local-only state update.
                </p>
              </div>
              <Button type="submit" className="h-10 rounded-xl px-4">
                <Save className="size-4" />
                Save Settings
              </Button>
            </div>
          </form>
        </SettingsCard>

        <div className="space-y-5">
          <SettingsCard
            title="School Info"
            description="Read-only information pulled from the class record."
          >
            <div className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/50">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                School
              </label>
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold capitalize text-slate-900 dark:text-slate-100">
                <School className="size-4 text-sky-600 dark:text-sky-300" />
                {schoolName}
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                This field is read-only.
              </p>
            </div>
          </SettingsCard>

          <SettingsCard
            title="Danger Zone"
            description="Use these actions carefully."
          >
            <div className="space-y-3 rounded-xl border border-rose-200/70 bg-rose-50/70 p-4 dark:border-rose-900/50 dark:bg-rose-950/20">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 size-5 text-rose-600 dark:text-rose-300" />
                <div className="min-w-0">
                  <p className="font-semibold text-rose-800 dark:text-rose-200">
                    Class management
                  </p>
                  <p className="mt-1 text-sm text-rose-700/90 dark:text-rose-200/90">
                    Deleting the class will remove it permanently from the
                    system.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  type="button"
                  variant="destructive"
                  className="h-10 rounded-xl px-4"
                  onClick={() => setConfirmAction("delete")}
                >
                  <AlertTriangle className="size-4" />
                  Delete Class
                </Button>
              </div>
            </div>
          </SettingsCard>

          <SettingsCard title="Help" description="Quick support information.">
            <a
              href="mailto:admin@oauife.edu.ng"
              className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 underline-offset-4 transition hover:underline dark:text-sky-300"
            >
              Contact Admin
              <ChevronRight className="size-4" />
            </a>
          </SettingsCard>
        </div>
      </div>

      {confirmAction ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <Card className="w-full max-w-lg rounded-3xl border border-slate-200/70 p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-rose-500/15 p-2 text-rose-700 dark:text-rose-300">
                <AlertTriangle className="size-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700 dark:text-rose-300">
                  Confirm Action
                </p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {confirmAction === "reset"
                    ? "Reset Class Rules"
                    : "Delete Class"}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {confirmAction === "reset"
                    ? "This will restore default rules for this class. Students will need to meet the new requirements."
                    : "This will permanently delete the class. This action cannot be undone."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl px-4"
                onClick={() => setConfirmAction(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="h-11 rounded-xl px-4"
                onClick={handleDangerAction}
              >
                Confirm
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

function SettingsCard({ title, description, children, className = "" }) {
  return (
    <Card
      className={`rounded-2xl border border-slate-200/70 p-5 shadow-sm dark:border-slate-800 ${className}`}
    >
      <div className="flex flex-col gap-1 border-b border-slate-200/70 pb-4 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="pt-4">{children}</div>
    </Card>
  );
}
