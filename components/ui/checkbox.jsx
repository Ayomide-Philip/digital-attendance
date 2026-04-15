import { cn } from "@/lib/utils";

const Checkbox = ({ className, ...props }) => (
  <input
    type="checkbox"
    className={cn(
      "h-4 w-4 cursor-pointer rounded border border-slate-300 bg-white checked:bg-sky-600 checked:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-950 dark:checked:bg-sky-600 dark:checked:border-sky-600",
      className,
    )}
    {...props}
  />
);

export { Checkbox };
