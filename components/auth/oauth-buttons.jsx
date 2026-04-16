"use client";

import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export default function OAuthButtons() {
  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Or continue with
      </p>
      <Button
        variant="outline"
        className="rounded-xl  border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
        onClick={() => alert("Google OAuth not implemented (frontend only)")}
      >
        <FcGoogle className="size-4" />
        <span className="ml-2 text-sm">Google</span>
      </Button>
    </div>
  );
}
