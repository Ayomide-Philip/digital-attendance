"use client";

import { Download, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { usePwa } from "./pwa-provider";

export default function InstallAppButton({ className, compact = false }) {
  const { canInstall, updateAvailable, promptInstall, applyUpdate } = usePwa();

  if (!canInstall && !updateAvailable) {
    return null;
  }

  const isUpdateAction = updateAvailable;
  const actionLabel = isUpdateAction ? "Update App" : "Install App";
  const Icon = isUpdateAction ? RotateCcw : Download;

  return (
    <Button
      variant={isUpdateAction ? "default" : "outline"}
      size={compact ? "icon-sm" : "sm"}
      className={cn(
        "rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]",
        !compact && "px-3 sm:px-4",
        className,
      )}
      aria-label={actionLabel}
      onClick={() => {
        if (isUpdateAction) {
          applyUpdate();
          return;
        }

        promptInstall();
      }}
    >
      <Icon className="size-4" />
      <span className={compact ? "sr-only" : "hidden sm:inline"}>{actionLabel}</span>
    </Button>
  );
}