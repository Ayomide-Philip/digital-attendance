"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export default function Toggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="bg-blue-500"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
