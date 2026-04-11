import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviders from "@/components/theme-providers";

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
    >
      <body className="min-h-full bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
