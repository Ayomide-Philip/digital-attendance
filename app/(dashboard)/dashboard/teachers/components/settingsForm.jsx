import { Plus, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SettingsCard from "./settingsCard";
export default function SettingsForm({ settings }) {
  const [rules, setRules] = useState({
    emailSuffix: settings?.rules?.emailSuffix || "",
    departmentCodes: settings?.rules?.departmentCode || [],
  });
  const [departmentInput, setDepartmentInput] = useState("");

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
    if (!rules?.emailSuffix.trim() && rules?.departmentCodes?.length === 0) {
      return toast.error(
        "No changes detected in class rules. Please modify the rules before submitting.",
      );
    }
    if (!rules?.emailSuffix && rules?.departmentCodes?.length > 0) {
      return toast.error(
        "Email suffix is required when adding department codes.",
      );
    }
    if (
      rules.emailSuffix &&
      typeof rules.emailSuffix === "string" &&
      rules.emailSuffix.trim()
    ) {
      if (
        !rules.emailSuffix.startsWith("@") ||
        !rules.emailSuffix.includes(".")
      ) {
        return toast.error("Invalid Email Suffix");
      }
    }
  }
  return (
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
  );
}
