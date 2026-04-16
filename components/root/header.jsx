"use client";
import { useState, useEffect } from "react";
import { ChevronRight, Menu, ShieldCheck, UserPlus, X } from "lucide-react";
import { useTheme } from "next-themes";
import Toggle from "@/components/toggle";
import Link from "next/link";
const navigationLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/20 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-base font-semibold tracking-tight text-slate-950 sm:gap-3 sm:text-lg dark:text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white shadow-lg shadow-sky-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span>Attendify</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Toggle />
            <Button
              as="a"
              variant="primary"
              href="/login"
              className="cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              Get Started
            </Button>
          </div>

          <div className="flex items-center gap-0.5 lg:hidden">
            <Toggle />
            <Button
              as="button"
              variant="ghost"
              onClick={() => setMobileMenuOpen(true)}
              className="cursor-pointer rounded-full p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm border-l border-slate-200 bg-white p-5 sm:p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-indigo-500 to-violet-500 text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                Attendify
              </div>
              <Button
                as="button"
                variant="ghost"
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer rounded-full p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-8 space-y-2 sm:mt-10">
              {navigationLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:mt-8">
              <Button
                as="a"
                href="/login"
                variant="primary"
                className="cursor-pointer w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserPlus className="h-4 w-4" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Button({
  className = "",
  variant = "primary",
  as: Component = "button",
  children,
  ...props
}) {
  const variants = {
    primary:
      "bg-slate-950 text-white shadow-lg shadow-slate-950/15 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200",
    secondary:
      "border border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900",
    ghost:
      "text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white",
  };

  return (
    <Component
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
