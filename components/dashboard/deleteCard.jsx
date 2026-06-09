"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import Card from "../ui/card";
import DeleteAccountModal from "./DeleteAccountModal";
import { signOut } from "next-auth/react";

export default function DeleteCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOpenModal = () => {
    setPassword("");
    setError("");
    setShowPassword(false);
    setIsLoading(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setPassword("");
    setError("");
    setShowPassword(false);
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (error) {
      setError("");
    }
  };

  const handleDeleteAccount = async () => {
    if (!password.trim()) {
      setError("Password is required to confirm account deletion.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const request = await fetch(`/api/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      const response = await request.json();

      if (!request?.ok || response?.error) {
        setError(
          response?.error || "Failed to delete account. Please try again.",
        );
        return;
      }
      handleCloseModal();
      await signOut({ callbackUrl: "/login" });
    } catch (err) {
      setError(
        "An error occurred while deleting the account. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="rounded-2xl border border-red-200/30 bg-red-50/20 p-6 shadow-sm dark:border-red-900/30 dark:bg-red-950/10">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-red-700 dark:text-red-400">
            Danger Zone
          </h2>
          <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
            Irreversible and destructive actions
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-start justify-between rounded-xl border border-red-200/50 bg-white/50 p-4 dark:border-red-900/50 dark:bg-slate-900/40 sm:flex-row sm:items-center">
            <div>
              <p className="font-medium text-red-700 dark:text-red-400">
                Delete Account
              </p>
              <p className="mt-1 text-sm text-red-600/80 dark:text-red-400/80">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button
              onClick={handleOpenModal}
              className="mt-3 flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-50/50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50 sm:mt-0"
            >
              <Trash2 className="size-4" />
              Delete Account
            </button>
          </div>
        </div>
      </Card>

      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        password={password}
        onPasswordChange={handlePasswordChange}
        showPassword={showPassword}
        onShowPasswordChange={setShowPassword}
        error={error}
        isLoading={isLoading}
        onSubmit={handleDeleteAccount}
      />
    </>
  );
}
