"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Eye, EyeOff, Loader2 } from "lucide-react";

export default function DeleteAccountModal({
  isOpen,
  onClose,
  password,
  onPasswordChange,
  showPassword,
  onShowPasswordChange,
  error,
  isLoading,
  onSubmit,
}) {
  const passwordInputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        passwordInputRef.current?.focus();
      }, 100);

      const handleTabKey = (e) => {
        if (e.key !== "Tab" || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
          'button, input[type="text"], input[type="password"], [tabindex]',
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      window.addEventListener("keydown", handleTabKey);
      return () => window.removeEventListener("keydown", handleTabKey);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePasswordInputChange = (e) => {
    const value = e.target.value;
    onPasswordChange(value);
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-md transform rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-slate-900 animate-in fade-in zoom-in-95"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div className="flex justify-center pt-8 pb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <div className="px-8 pb-8 text-center">
          <h2
            id="delete-modal-title"
            className="text-2xl font-bold text-slate-900 dark:text-white"
          >
            Delete Account
          </h2>

          <p
            id="delete-modal-description"
            className="mt-3 text-sm text-slate-600 dark:text-slate-400"
          >
            This action is permanent and cannot be undone. All your data,
            including attendance records, classes, and profile information, will
            be permanently deleted.
          </p>

          <div className="mt-6 space-y-2 text-left">
            <label
              htmlFor="delete-password"
              className="block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Confirm Password
            </label>

            <div className="relative">
              <input
                ref={passwordInputRef}
                id="delete-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordInputChange}
                placeholder="Enter your password"
                disabled={isLoading}
                className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm transition-colors focus:outline-none focus:ring-2 disabled:bg-slate-50 dark:disabled:bg-slate-800 ${
                  error
                    ? "border-red-500/50 bg-red-50/30 focus:ring-red-500/20 dark:border-red-900/50 dark:bg-red-950/20 dark:focus:ring-red-500/20"
                    : "border-slate-200 bg-white focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-blue-500/20"
                }`}
              />

              <button
                type="button"
                onClick={() => onShowPasswordChange(!showPassword)}
                disabled={isLoading || !password}
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-700 disabled:text-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:disabled:text-slate-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {error ? (
              <p className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
                <span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-600 dark:bg-red-400" />
                {error}
              </p>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your password to confirm account deletion.
              </p>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 rounded-lg border cursor-pointer border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:bg-slate-50 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:disabled:bg-slate-800 dark:disabled:text-slate-600"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isLoading || !password.trim()}
              className="flex-1 flex items-center justify-center cursor-pointer gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:bg-red-600/50 disabled:cursor-not-allowed dark:bg-red-700 dark:hover:bg-red-800 dark:disabled:bg-red-900/40"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              <span>{isLoading ? "Deleting..." : "Delete Account"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
