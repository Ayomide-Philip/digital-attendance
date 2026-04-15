"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

import AuthCard from "@/components/auth/auth-card";
import AuthShell from "@/components/auth/auth-shell";
import OAuthButtons from "@/components/auth/oauth-buttons";
import PasswordInput from "@/components/auth/password-input";
import PasswordStrengthIndicator from "@/components/auth/password-strength-indicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
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
      setSuccessMessage(`Account created successfully! Welcome ${fullName}!`);
      setIsLoading(false);
      // Reset form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }, 1000);
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your attendance journey with a modern portal built for students and teachers in one place."
      accent="emerald"
    >
      <AuthCard>
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
                <User className="size-6" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Join Digital Attendance System today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: "" });
                  }}
                  placeholder="John Doe"
                  className={`rounded-xl pl-10 ${
                    errors.fullName
                      ? "border-rose-500 dark:border-rose-500"
                      : ""
                  }`}
                />
                <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              </div>
              {errors.fullName && (
                <p className="text-xs text-rose-600 dark:text-rose-400">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="signupEmail"
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id="signupEmail"
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

            {/* Password */}
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
              placeholder="Create a strong password"
            />

            {/* Password Strength Indicator */}
            {password && <PasswordStrengthIndicator password={password} />}

            {/* Confirm Password */}
            <PasswordInput
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword)
                  setErrors({ ...errors, confirmPassword: "" });
              }}
              error={errors.confirmPassword}
              showPassword={showConfirmPassword}
              onToggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
              placeholder="Re-enter your password"
            />

            {/* Error Message */}
            {Object.keys(errors).length > 0 && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900/50 dark:bg-rose-900/20 dark:text-rose-400">
                Please fix the errors above before submitting.
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-400">
                {successMessage}
              </div>
            )}

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 py-2.5 font-semibold text-white hover:from-emerald-600 hover:to-emerald-700 transition"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Sign up
                  <ArrowRight className="size-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Or
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* OAuth */}
          <OAuthButtons />

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </AuthShell>
  );
}
