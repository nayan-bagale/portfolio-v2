"use client";

import { Icon } from "@/components/ui";

/** Switches between light and dark, and remembers the choice. */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      className="grid size-10 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors duration-300 ease-expo hover:border-line-strong hover:bg-card"
    >
      <Icon name="moon" className="theme-moon size-4" />
      <Icon name="sun" className="theme-sun size-4" />
    </button>
  );
}
