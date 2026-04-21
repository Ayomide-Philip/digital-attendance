import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/components/theme-providers";
import { Toaster } from "sonner";
import { PwaProvider } from "@/components/pwa/pwa-provider";

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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="application-name" content="Attendify" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.svg" />
      </head>
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
                "!w-[94vw] sm:!w-auto sm:!max-w-[560px] !rounded-2xl !border !border-slate-200/90 dark:!border-slate-800 !bg-gradient-to-b !from-white/95 !to-slate-50/95 dark:!from-slate-900/96 dark:!to-slate-950/96 !backdrop-blur-xl !px-4 sm:!px-5 !py-3.5 !shadow-[0_18px_40px_-22px_rgba(15,23,42,0.6)] dark:!shadow-[0_18px_40px_-20px_rgba(2,6,23,0.85)]",
              title:
                "!text-[13px] sm:!text-sm !font-semibold !tracking-tight !text-slate-900 dark:!text-slate-100",
              description:
                "!mt-1 !text-xs sm:!text-sm !leading-relaxed !text-slate-600 dark:!text-slate-300",
              icon: "!text-slate-700 dark:!text-slate-200",
              success:
                "!border-emerald-200 dark:!border-emerald-900/70 !from-emerald-50/95 !to-white/95 dark:!from-emerald-950/35 dark:!to-slate-950/96",
              error:
                "!border-rose-200 dark:!border-rose-900/70 !from-rose-50/95 !to-white/95 dark:!from-rose-950/35 dark:!to-slate-950/96",
              warning:
                "!border-amber-200 dark:!border-amber-900/70 !from-amber-50/95 !to-white/95 dark:!from-amber-950/35 dark:!to-slate-950/96",
              info: "!border-sky-200 dark:!border-sky-900/70 !from-sky-50/95 !to-white/95 dark:!from-sky-950/35 dark:!to-slate-950/96",
              actionButton:
                "!rounded-lg !bg-emerald-600 !text-white !font-medium !shadow-sm hover:!bg-emerald-700",
              cancelButton:
                "!rounded-lg !bg-slate-200 !text-slate-700 !font-medium hover:!bg-slate-300 dark:!bg-slate-700 dark:!text-slate-100 dark:hover:!bg-slate-600",
              closeButton:
                "!border !border-slate-200 !bg-white/90 !text-slate-600 hover:!bg-slate-100 dark:!border-slate-700 dark:!bg-slate-800/85 dark:!text-slate-300 dark:hover:!bg-slate-700",
            },
          }}
        />
        <PwaProvider>
          <ThemeProviders>{children}</ThemeProviders>
        </PwaProvider>
      </body>
    </html>
  );
}
