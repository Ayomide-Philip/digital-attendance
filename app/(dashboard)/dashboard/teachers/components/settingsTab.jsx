import {
  AlertTriangle,
  ChevronRight,
  Plus,
  RotateCcw,
  Save,
  School,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SettingsCard from "./settingsCard";
import { createPortal } from "react-dom";

export default function SettingsTab({ settings = {}, classId }) {
  const [rules, setRules] = useState({
    emailSuffix: settings?.rules?.emailSuffix || "",
    departmentCodes: settings?.rules?.departmentCode || [],
  });
  const [departmentInput, setDepartmentInput] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const schoolName = settings?.school || "Not set";

  function handleAddDepartmentCode() {
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
  }

  function handleSave(event) {
    event.preventDefault();
    toast.success("Settings saved locally.");
  }

  async function handleDelete() {
    if (!deleteConfirm || !classId) return;
    setIsDeleting(true);
    try {
      const request = await fetch(`/api/teacher/classes/${classId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const response = await request.json();
      if (!request?.ok || response?.error) {
        setIsDeleting(false);
        return toast.error(
          response?.error || "An error occurred while deleting the class.",
        );
      }
      toast.success(response?.message || "Class deleted successfully.");
      setDeleteConfirm(false);
      window.location.href = "/dashboard/teachers/classes";
    } catch (err) {
      setIsDeleting(false);
      return toast.error(
        "An error occurred while deleting the class. Please try again.",
      );
    }
  }

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
                  className="h-10 rounded-xl px-4 cursor-pointer inline-flex items-center gap-2"
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

      {deleteConfirm &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center sm:items-center"
            aria-modal="true"
            role="dialog"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setDeleteConfirm(false)}
            />

            <div className="relative z-10 w-full max-w-sm mx-4 mb-4 sm:mb-0 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="p-6 pb-5 flex flex-col gap-5">
                <div className="flex size-11 items-center justify-center rounded-xl bg-rose-50 border border-rose-200 dark:bg-rose-950/30 dark:border-rose-900/50">
                  <Trash2 className="size-5 text-rose-600 dark:text-rose-400" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    Delete this class?
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    All attendance records and student data will be permanently
                    removed. This cannot be reversed.
                  </p>
                </div>

                <div className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 dark:border-rose-900/50 dark:bg-rose-950/30">
                  <AlertTriangle className="size-3 text-rose-600 dark:text-rose-400" />
                  <span className="text-xs font-medium text-rose-600 dark:text-rose-400">
                    Permanent action
                  </span>
                </div>
              </div>
              <div className="h-px bg-slate-100 dark:bg-slate-800" />{" "}
              <div className="p-4 flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="h-11 flex-1 rounded-xl border cursor-pointer border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="h-11 flex-1 rounded-xl border cursor-pointer border-rose-200 bg-rose-50 text-sm font-medium text-rose-600 transition hover:bg-rose-100 active:scale-[0.98] dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-950/60 inline-flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <div className="size-3.5 border-2 border-rose-300 border-t-rose-600 rounded-full animate-spin dark:border-rose-700 dark:border-t-rose-400" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="size-3.5" />
                      Delete class
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
