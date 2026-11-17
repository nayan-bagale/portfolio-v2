"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Floating button that appears after scrolling down. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed right-5 bottom-5 z-50 grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-[var(--header-blur)] backdrop-blur-[10px] transition duration-[400ms] ease-expo hover:border-accent hover:bg-accent hover:text-on-accent",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      ↑
    </button>
  );
}
