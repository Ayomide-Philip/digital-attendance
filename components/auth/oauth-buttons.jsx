"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function OAuthButtons() {
  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Or continue with
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
          onClick={() => alert("Google OAuth not implemented (frontend only)")}
        >
          <FaGoogle className="size-4" />
          <span className="ml-2 text-sm">Google</span>
        </Button>
        <Button
          variant="outline"
          className="rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
          onClick={() => alert("GitHub OAuth not implemented (frontend only)")}
        >
          <FaGithub className="size-4" />
          <span className="ml-2 text-sm">GitHub</span>
        </Button>
      </div>
    </div>
  );
}
