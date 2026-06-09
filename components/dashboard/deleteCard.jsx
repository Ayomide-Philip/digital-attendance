"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import Card from "../ui/card";
import DeleteAccountModal from "./DeleteAccountModal";

export default function DeleteCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle account deletion (frontend only - backend integration needed)
  const handleDeleteAccount = async (password) => {
    // This is where you'd call your backend API to delete the account
    // Example:
    // const response = await fetch('/api/user/delete', {
    //   method: 'DELETE',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ password }),
    // });
    //
    // if (!response.ok) {
    //   const error = await response.json();
    //   throw new Error(error.message || 'Failed to delete account');
    // }
    //
    // On success, redirect or update UI

    // For now, we'll just close the modal after a simulated delay
    console.log("Delete account with password:", password);

    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Uncomment below to test error handling
        // reject(new Error('Incorrect password. Please try again.'));

        // On success
        resolve();
        // Then you'd typically redirect: window.location.href = '/login';
        console.log("Account deletion successful");
        setIsModalOpen(false);
      }, 2000);
    });
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
              onClick={() => setIsModalOpen(true)}
              className="mt-3 flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-50/50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50 sm:mt-0"
            >
              <Trash2 className="size-4" />
              Delete Account
            </button>
          </div>
        </div>
      </Card>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
}
