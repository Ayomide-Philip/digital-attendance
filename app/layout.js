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
      <Toaster
        position="top-center"
        duration={4000}
        theme="system"
        richColors
        closeButton
        toastOptions={{
          className:
            "!w-[94vw] sm:!w-auto sm:!max-w-[700px] !rounded-xl !px-3 sm:!px-4 !py-2.5 sm:!py-3 !text-xs sm:!text-sm !font-semibold !leading-relaxed !shadow-lg !border !border-slate-200 dark:!border-slate-700 !break-words sm:!whitespace-nowrap",
        }}
      />
      <body className="min-h-full bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
