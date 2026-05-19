import { Button } from "@/components/ui/button";
import getPasswordStrength from "@/lib/utility/getPasswordStrength";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdatePasswordCard() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  function handlePasswordChange(e) {
    const { name, value } = e?.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  }

  function togglePasswordVisibility(field) {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
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

    setIsLoading(true);
    try {
      const request = await fetch(`/api/user/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim(),
          confirmPassword: confirmPassword.trim(),
        }),
      });
      const response = await request.json();
      if (!request.ok || response?.error) {
        setIsLoading(false);
        return toast.error(
          response?.error || "Failed to update password. Please try again.",
        );
      }
      toast.success(response?.message || "Password updated successfully.");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsLoading(false);
      window.location.reload();
    } catch (err) {
      setIsLoading(false);
      return toast.error(
        "An error occurred while updating the password. Please try again.",
      );
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
          Current Password
        </label>
        <div className="relative mt-2">
          <input
            type={showPasswords.currentPassword ? "text" : "password"}
            name="currentPassword"
            value={passwordData?.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Enter your current password"
            className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 pr-10 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("currentPassword")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            {showPasswords.currentPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
          New Password
        </label>
        <div className="relative mt-2">
          <input
            type={showPasswords.newPassword ? "text" : "password"}
            name="newPassword"
            value={passwordData?.newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter new password"
            className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 pr-10 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("newPassword")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            {showPasswords.newPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-slate-100">
          Confirm Password
        </label>
        <div className="relative mt-2">
          <input
            type={showPasswords.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={passwordData?.confirmPassword}
            onChange={handlePasswordChange}
            placeholder="Confirm new password"
            className="w-full rounded-xl border border-slate-200/70 bg-slate-50/50 px-4 py-2 pr-10 text-slate-900 placeholder-slate-400 transition-colors focus:border-sky-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:bg-slate-900"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirmPassword")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            {showPasswords.confirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleUpdatePassword}
          disabled={isLoading}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-emerald-700 dark:hover:bg-emerald-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Lock className="size-4" />
              Update Password
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
