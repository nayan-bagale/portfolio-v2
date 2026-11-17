import type { CSSProperties } from "react";
import { Accent, Button, Container, PulseDot } from "@/components/ui";
import { SocialLinks } from "@/components/ui";
import { CodeCard } from "./CodeCard";
import { FloatingChip } from "./FloatingChip";
import { hero } from "@/content/home";
import { contactHref, socials } from "@/content/site";

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Opening section: headline, intro, calls to action and the code card. */
export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 80% 10%, var(--accent-soft), transparent 70%)" }}
        aria-hidden
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <span className="fade-up mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-2 font-mono text-[10px] leading-4 font-medium tracking-[0.25em] text-muted uppercase">
            <PulseDot />
            {hero.eyebrow}
          </span>
          <h1 className="font-head text-[46px] leading-none font-semibold tracking-[-0.035em] md:text-[72px] md:leading-[0.98] lg:text-[84px]">
            {hero.headline.map((line, index) => (
              <span key={index} className="line-mask">
                <span className="line-rise" style={{ "--i": index } as CSSProperties}>
                  {line.map((segment, part) =>
                    segment.accent ? <Accent key={part}>{segment.text}</Accent> : <span key={part}>{segment.text}</span>,
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p className="fade-up mt-7 max-w-[560px] text-lg leading-[30px] text-body" style={delay(550)}>
            {hero.intro}
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-3" style={delay(700)}>
            <Button href={contactHref}>{hero.primaryCta}</Button>
            <Button href={hero.secondaryCta.href} variant="ghost" arrow="down">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <SocialLinks links={socials} className="fade-up mt-7" />
        </div>

        <div className="fade-up relative mx-2 mt-4 mb-12 md:mx-0 md:my-0" style={delay(400)} aria-hidden>
          <CodeCard {...hero.codeCard} />
          <FloatingChip
            icon={<PulseDot />}
            label={hero.chips.current.label}
            value={hero.chips.current.value}
            className="-top-7 -right-1 [animation-delay:-3s] md:-right-3"
          />
          <FloatingChip
            icon={<span className="text-lg text-accent">✦</span>}
            label={hero.chips.openSource.label}
            value={hero.chips.openSource.value}
            className="-bottom-7 -left-1 md:-left-4"
          />
        </div>
      </Container>
    </section>
  );
}
