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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SettingsCard from "./settingsCard";

export default function SettingsTab({ settings = {} }) {
  const [rules, setRules] = useState({
    emailSuffix: settings?.rules?.emailSuffix || "",
    departmentCodes: settings?.rules?.departmentCode || [],
  });
  const [departmentInput, setDepartmentInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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

  const handleDelete = () => {
    toast.success("Class deleted successfully.");
    setDeleteConfirm(false);
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
                  onClick={() => setDeleteConfirm(true)}
                >
                  <AlertTriangle className="size-4" />
                  Delete Class
                </Button>
              </div>
            </div>
          </SettingsCard>

          <SettingsCard title="Help" description="Quick support information.">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 underline-offset-4 transition hover:underline dark:text-sky-300"
            >
              Contact Admin
              <ChevronRight className="size-4" />
            </a>
          </SettingsCard>
        </div>
      </div>

      <Dialog open={deleteConfirm} onOpenChange={setDeleteConfirm}>
        <DialogContent className="border-none bg-zinc-950/95 shadow-2xl backdrop-blur-2xl rounded-3xl p-0 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-rose-500/5 to-transparent pointer-events-none" />

          <div className="relative p-8 sm:p-10">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="flex size-16 items-center justify-center rounded-full bg-rose-500/15 shadow-lg shadow-rose-500/30 ring-1 ring-rose-500/20">
                <AlertTriangle className="size-7 text-rose-400" />
              </div>

              <div className="space-y-3">
                <DialogTitle className="text-2xl font-semibold text-zinc-50">
                  Delete Class?
                </DialogTitle>
                <DialogDescription className="text-sm leading-6 text-zinc-400">
                  This action cannot be undone. All attendance records and data
                  for this class will be permanently removed from the system.
                </DialogDescription>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
              <Button
                type="button"
                variant="outline"
                className="h-11 rounded-xl border-none bg-zinc-900/50 text-zinc-300 font-medium transition-all duration-200 hover:bg-zinc-900 dark:hover:bg-zinc-800"
                onClick={() => setDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="h-11 rounded-xl border-none bg-rose-600 text-white font-semibold shadow-lg shadow-rose-600/50 transition-all duration-200 hover:bg-rose-700 hover:shadow-rose-600/70 active:scale-95"
                onClick={handleDelete}
              >
                Delete Class
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
