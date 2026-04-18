"use client";
import Link from "next/link";
import { Mail, User } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import OAuthButtons from "@/components/auth/oauth-buttons";
import PasswordStrengthIndicator from "@/components/auth/password-strength-indicator";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  function getPasswordStrength(value) {
    if (!value) return 0;

    let strength = 0;
    if (value.length >= 8) strength += 1;
    if (value.length >= 12) strength += 1;
    if (/[a-z]/.test(value)) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[!@#$%^&*]/.test(value)) strength += 1;

    return Math.min(strength, 4);
  }

  async function handleCreateNewAccount(e) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (
      !email ||
      !name ||
      !password ||
      !confirmPassword ||
      !role ||
      !role.trim() ||
      !email.trim() ||
      !name.trim()
    ) {
      return toast.error("All fields are required. Pls fill all the fields.");
    }
    if (name.trim().length < 5) {
      return toast.error("Name must be at least 5 characters long.");
    }
    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters long.");
    }

    // if (getPasswordStrength(password) < 3) {
    //   return toast.error(
    //     "Password is too weak. Use uppercase, lowercase, numbers, and symbols.",
    //   );
    // }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match. Please check and try again.");
    }

    setIsSubmitting(true);

    try {
      const request = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          name: name,
          password: password,
          role: role.trim(),
        }),
      });
      const response = await request.json();
      if (!request.ok || response?.error) {
        return toast.error(
          response?.error || "Failed to create account. Please try again.",
        );
      }
      toast.success(
        response?.message || "Account created successfully! Please log in.",
      );
      window.location.href = "/login";
    } catch (err) {
      toast.error(
        "An error occurred while creating your account. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-14rem)] w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/85 sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 text-white shadow-lg">
            <User className="size-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Join Digital Attendance System
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleCreateNewAccount}>
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={name}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-3 pl-10 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950"
                onChange={(e) => setName(e.target.value)}
              />
              <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-3 pl-10 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            <PasswordStrengthIndicator password={password} />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-950"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`rounded-xl cursor-pointer border-2 px-4 py-3 text-sm font-medium transition ${
                  role === "student"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`rounded-xl cursor-pointer border-2 px-4 py-3 text-sm font-medium transition ${
                  role === "teacher"
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                }`}
              >
                Teacher
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-emerald-600 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Sign up"}
          </button>

          <div className="my-2 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Or
            </span>
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          <OAuthButtons />
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
