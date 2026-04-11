import { Sparkles } from "lucide-react";
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  return (
    <div
      className={`mx-auto max-w-3xl ${align === "left" ? "text-left" : "text-center"}`}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-700 sm:px-4 sm:py-2 sm:text-sm dark:text-sky-300">
        <Sparkles className="h-4 w-4" />
        {eyebrow}
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}
