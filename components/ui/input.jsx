import { cn } from "@/lib/utils";

const Input = ({ className, type = "text", ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder-slate-500 transition outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder-slate-400 dark:focus:border-sky-600 dark:focus:ring-sky-600/20",
        className,
      )}
      {...props}
    />
  );
};

export { Input };
