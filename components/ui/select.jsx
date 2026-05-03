import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const Select = forwardRef(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100",
      className,
    )}
    {...props}
  />
));

Select.displayName = "Select";

export default Select;
