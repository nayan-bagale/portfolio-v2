"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Logo, PulseDot } from "@/components/ui";
import { ThemeToggle } from "./ThemeToggle";
import { contactHref, nav, site } from "@/content/site";
import { cn } from "@/lib/cn";

const sectionId = (href: string) => href.split("#")[1] ?? "";

/** Reading line, as a share of the screen height. The nav section under it is the current one. */
const READ_LINE = 0.35;
/** The underline glides to the next link over this many pixels of scroll before the next section reaches the line. */
const GLIDE_PX = 360;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Fixed top bar: logo, section links, status, contact button, theme toggle and mobile menu. */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLLIElement>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());

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

  const shownId = pathname === "/" ? activeId : pathname.startsWith("/blog") ? "writing" : null;

  // One underline under the nav. On the home page its position is tied to the scroll (owner-approved
  // exception to the "no scroll listeners for animation" rule): it sits under the current section's
  // link and glides to the next one as that section nears the reading line, left to right going down
  // and right to left going up. Only transform and opacity are written, once per frame.
  useEffect(() => {
    const indicator = indicatorRef.current;
    const list = listRef.current;
    if (!indicator || !list) return;
    const ids = nav.map((item) => sectionId(item.href));
    const box = (id: string) => {
      const link = linkRefs.current.get(id);
      return link ? { x: link.offsetLeft, width: link.offsetWidth } : null;
    };
    const draw = (x: number, width: number) => {
      indicator.style.transform = `translateX(${x}px) scaleX(${width})`;
      indicator.style.opacity = "1";
    };
    const hide = () => {
      indicator.style.opacity = "0";
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      if (pathname !== "/") {
        const link = pathname.startsWith("/blog") ? box("writing") : null;
        if (link) draw(link.x, link.width);
        else hide();
        return;
      }
      const sections = ids.map((id) => document.getElementById(id));
      if (sections.some((section) => !section)) return hide();
      const tops = sections.map((section) => section!.getBoundingClientRect().top + window.scrollY);
      const end = sections.at(-1)!.getBoundingClientRect().bottom + window.scrollY;
      const line = window.scrollY + window.innerHeight * READ_LINE;
      if (line < tops[0] || line >= end) {
        hide();
        setActiveId(null);
        return;
      }
      let index = 0;
      while (index < tops.length - 1 && tops[index + 1] <= line) index++;
      const from = box(ids[index]);
      if (!from) return;
      const next = index < ids.length - 1 ? box(ids[index + 1]) : null;
      const t = next ? clamp01((line - (tops[index + 1] - GLIDE_PX)) / GLIDE_PX) : 0;
      draw(from.x + ((next?.x ?? from.x) - from.x) * t, from.width + ((next?.width ?? from.width) - from.width) * t);
      setActiveId(ids[t >= 0.5 ? index + 1 : index]);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    const observer = new ResizeObserver(schedule);
    observer.observe(list);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      observer.disconnect();
    };
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
            <ul ref={listRef} className="relative flex gap-5 min-[961px]:gap-7">
              {nav.map((item) => {
                const id = sectionId(item.href);
                const active = shownId === id;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      ref={(node) => {
                        if (node) linkRefs.current.set(id, node);
                        else linkRefs.current.delete(id);
                      }}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "text-sm transition-colors duration-300 ease-expo hover:text-ink",
                        active ? "text-ink" : "text-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li
                ref={indicatorRef}
                aria-hidden
                className="pointer-events-none absolute -bottom-1.5 left-0 h-px w-px origin-left bg-accent opacity-0 transition-opacity duration-300 ease-expo motion-reduce:transition-none"
              />
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 font-mono text-[11px] font-medium text-muted min-[961px]:flex">
              <PulseDot />
              {site.availability}
            </span>
            <span className="hidden md:block">
              <Button href={contactHref} size="sm">
                {site.headerCta}
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
