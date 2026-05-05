export default function LoadingArray() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl bg-slate-200 p-5 dark:bg-slate-800"
          style={{ height: "280px" }}
        />
      ))}
    </div>
  );
}
