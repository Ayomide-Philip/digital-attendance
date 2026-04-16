import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/components/theme-providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Attendify | Digital Attendance System",
  description:
    "A modern digital attendance system powered by geolocation and distance verification.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        <Toaster
          position="top-center"
          duration={4000}
          theme="system"
          richColors
          closeButton
          toastOptions={{
            classNames: {
              toast:
                "!w-[94vw] sm:!w-auto sm:!max-w-[640px] !rounded-2xl !border !border-emerald-200/80 dark:!border-emerald-900/70 !bg-white/90 dark:!bg-slate-900/90 !backdrop-blur-md !px-4 sm:!px-5 !py-3.5 !shadow-[0_10px_30px_-12px_rgba(15,23,42,0.45)] dark:!shadow-[0_12px_30px_-14px_rgba(0,0,0,0.7)]",
              title:
                "!text-[13px] sm:!text-sm !font-semibold !tracking-tight !text-slate-900 dark:!text-slate-100",
              description:
                "!mt-1 !text-xs sm:!text-sm !leading-relaxed !text-slate-600 dark:!text-slate-300",
              actionButton:
                "!rounded-lg !bg-emerald-600 !text-white !font-medium hover:!bg-emerald-700",
              cancelButton:
                "!rounded-lg !bg-slate-200 !text-slate-700 !font-medium hover:!bg-slate-300 dark:!bg-slate-700 dark:!text-slate-100 dark:hover:!bg-slate-600",
              closeButton:
                "!border !border-slate-200 !bg-white/85 !text-slate-600 hover:!bg-slate-100 dark:!border-slate-700 dark:!bg-slate-800/80 dark:!text-slate-300 dark:hover:!bg-slate-700",
            },
          }}
        />
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
