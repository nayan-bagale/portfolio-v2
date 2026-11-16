import { iconPaths, type IconName } from "@/lib/icons";

/** Decorative icon. Add new paths in src/lib/icons.ts. */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-hidden>
      <path d={iconPaths[name]} />
    </svg>
  );
}
