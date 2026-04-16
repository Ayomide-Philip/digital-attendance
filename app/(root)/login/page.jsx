"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock } from "lucide-react";

import AuthCard from "@/components/auth/auth-card";
import AuthShell from "@/components/auth/auth-shell";
import OAuthButtons from "@/components/auth/oauth-buttons";
import PasswordInput from "@/components/auth/password-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setSuccessMessage("");

    // Simulate API call
    setTimeout(() => {
      setSuccessMessage(`Welcome back! Logged in as ${email}`);
      setIsLoading(false);
      // Reset form
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }, 1000);
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage classes, track attendance records, and stay connected with your academic dashboard."
      accent="sky"
    >
      <AuthCard>
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-sky-500 to-sky-600 text-white shadow-lg">
                <Lock className="size-6" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  placeholder="name@example.com"
                  className={`rounded-xl pl-10 ${
                    errors.email ? "border-rose-500 dark:border-rose-500" : ""
                  }`}
                />
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-600 dark:text-rose-400">
                  {errors.email}
                </p>
              )}
            </div>

            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              error={errors.password}
              showPassword={showPassword}
              onToggleShow={() => setShowPassword(!showPassword)}
              placeholder="Enter your password"
            />

            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-slate-700 dark:text-slate-300">
                  Remember me
                </span>
              </label>
              <Link
                href="#"
                className="font-medium text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition"
              >
                Forgot password?
              </Link>
            </div>

            {Object.keys(errors).length > 0 && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-400">
                Please fix the errors above before submitting.
              </div>
            )}

            {successMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400">
                {successMessage}
              </div>
            )}

            <Button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-sky-500 to-sky-600 py-3 font-semibold text-white hover:from-sky-600 hover:to-sky-700 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign in
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Or
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <OAuthButtons />

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition"
            >
              Sign up
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
