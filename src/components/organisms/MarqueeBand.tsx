import { Marquee } from "@/components/molecules";
import { marquee } from "@/content/home";

/** Two strips scrolling in opposite directions: tech stack, then companies. */
export function MarqueeBand() {
  return (
    <div>
      <Marquee items={marquee.tech} className="border-y bg-card py-[22px]" />
      <Marquee items={marquee.companies} separator="◆" size="sm" reverse className="border-b py-4" />
    </div>
  );
}
