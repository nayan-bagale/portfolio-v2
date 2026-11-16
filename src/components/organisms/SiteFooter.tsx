import Link from "next/link";
import { Container } from "@/components/atoms";
import { SocialLinks } from "@/components/molecules";
import { site, socials } from "@/content/site";

/** Footer with social links and the large outlined wordmark. */
export function SiteFooter() {
  return (
    <footer className="pt-[72px] pb-8">
      <Container>
        <div className="flex flex-wrap justify-between gap-6 text-sm leading-[22px] text-muted">
          <span>
            {site.footerNote[0]}
            <br />
            {site.footerNote[1]}
          </span>
          <SocialLinks links={socials} />
        </div>
        <div
          className="wordmark mt-12 font-head text-[clamp(64px,18vw,240px)] leading-[0.85] font-semibold tracking-[-0.06em] whitespace-nowrap select-none"
          aria-hidden
        >
          {site.firstName.toUpperCase()}
          <sup className="align-top text-[0.22em]">®</sup>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <Link href="#top" className="transition-colors duration-300 hover:text-accent">
            Back to top ↑
          </Link>
        </div>
      </Container>
    </footer>
  );
}
