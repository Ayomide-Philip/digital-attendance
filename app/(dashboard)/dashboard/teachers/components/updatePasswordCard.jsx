import { Button } from "@/components/ui/button";
import getPasswordStrength from "@/lib/utility/getPasswordStrength";
import { Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdatePasswordCard() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handlePasswordChange(e) {
    const { name, value } = e?.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleUpdatePassword() {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    if (
      !currentPassword?.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      return toast.error(
        "All fields are required, please fill in all fields and try again.",
      );
    }

    if (
      currentPassword?.trim().length < 8 ||
      newPassword.length < 8 ||
      confirmPassword.trim().length < 8
    ) {
      return toast.error("Password must be at least 8 characters long.");
    }

    if (currentPassword === newPassword) {
      return toast.error(
        "New password cannot be the same as the current password.",
      );
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirmation do not match.");
    }

    if (
      getPasswordStrength(newPassword.trim()) < 3 ||
      getPasswordStrength(confirmPassword.trim()) < 3
    ) {
      return toast.error(
        "New password is too weak. Please choose a stronger password.",
      );
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          value={passwordData?.currentPassword}
          onChange={handlePasswordChange}
          placeholder="Enter your current password"
          className="mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={passwordData?.newPassword}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
          className="mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={passwordData?.confirmPassword}
          onChange={handlePasswordChange}
          placeholder="Confirm new password"
          className="mt-2 w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
        />
      </div>

      <div className="pt-4">
        <Button
          onClick={handleUpdatePassword}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          <Lock className="size-4" />
          Update Password
        </Button>
      </div>
    </div>
  );
}
