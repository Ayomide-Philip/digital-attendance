"use client";
import { useTheme } from "next-themes";
export default function Toggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="bg-blue-500"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle
    </button>
  );
}
