import { Container, Kicker } from "@/components/atoms";
import { WordReveal } from "@/components/motion";
import { tagline } from "@/content/home";

/** Large statement whose words light up while scrolling. */
export function TaglineSection() {
  return (
    <section aria-label={tagline.kicker} className="pt-24 pb-8">
      <Container>
        <Kicker>{tagline.kicker}</Kicker>
        <WordReveal
          text={tagline.text}
          className="max-w-[980px] font-head text-[32px] leading-[38px] font-semibold tracking-[-0.03em] text-balance md:text-[50px] md:leading-[54px]"
        />
      </Container>
    </section>
  );
}
