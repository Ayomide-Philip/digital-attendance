import Card from "@/components/ui/card";

export default function AuthCard({ children }) {
  return (
    <Card className="w-full max-w-md rounded-2xl border border-slate-200/70 bg-white/95 backdrop-blur-sm shadow-xl dark:border-slate-800 dark:bg-slate-900/95 sm:max-w-lg md:max-w-md">
      {children}
    </Card>
  );
}
