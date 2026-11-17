"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Logo, PulseDot } from "@/components/ui";
import { ThemeToggle } from "./ThemeToggle";
import { contactHref, nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

const sectionId = (href: string) => href.split("#")[1] ?? "";

/** Fixed top bar: logo, section links, status, contact button, theme toggle and mobile menu. */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Frosted background once the page has scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Highlight the link of the section currently in view (home page only).
  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const item of nav) {
      const section = document.getElementById(sectionId(item.href));
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [pathname]);

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => {
    const id = sectionId(href);
    if (pathname === "/") return activeId === id;
    return id === "writing" && pathname.startsWith("/blog");
  };

  const menuLinks = [...nav, { label: "Contact", href: "/#contact" }];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] border-b transition-colors duration-[400ms] ease-expo",
          scrolled ? "border-line bg-[var(--header-blur)] backdrop-blur-[14px]" : "border-transparent",
        )}
      >
        <div className="mx-auto flex max-w-[1200px] items-center gap-6 px-6 py-3.5">
          <Logo />
          <nav aria-label="Primary" className="mx-auto hidden md:block">
            <ul className="flex gap-5 min-[961px]:gap-7">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "relative text-sm transition-colors duration-300 ease-expo after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:bg-accent after:transition-transform after:duration-[400ms] after:ease-expo hover:text-ink hover:after:origin-left hover:after:scale-x-100",
                        active
                          ? "text-ink after:origin-left after:scale-x-100"
                          : "text-muted after:origin-right after:scale-x-0",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[11px] font-medium text-muted min-[961px]:flex">
              <PulseDot />
              {site.availability}
            </span>
            <span className="hidden md:block">
              <Button href={contactHref} size="sm">
                Get in touch
              </Button>
            </span>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-10 cursor-pointer place-items-center rounded-full border border-line text-ink transition-colors duration-300 ease-expo hover:border-line-strong hover:bg-card md:hidden"
            >
              <span
                className={cn(
                  "absolute inset-x-3 top-4 h-[1.5px] bg-current transition-transform duration-500 ease-expo",
                  open && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-3 top-[22px] h-[1.5px] bg-current transition-transform duration-500 ease-expo",
                  open && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[55] flex flex-col justify-center gap-3 bg-bg p-6 transition-[opacity,visibility] duration-500 ease-expo md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        {menuLinks.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${index * 70}ms` : "0ms" }}
            className={cn(
              "font-head text-[44px] leading-[52px] font-semibold tracking-[-0.03em] transition-[opacity,translate] duration-[600ms] ease-expo",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
          >
            <span className="mr-3 align-middle font-mono text-xs tracking-normal text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
