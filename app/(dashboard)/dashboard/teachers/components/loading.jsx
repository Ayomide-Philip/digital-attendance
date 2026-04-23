export default function LoadingComponent() {
  return (
    <div className="flex min-h-55 w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-500 dark:border-slate-700 dark:border-t-sky-400"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Loading...
        </p>
      </div>
    </div>
  );
}
