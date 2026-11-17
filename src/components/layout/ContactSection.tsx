import Image from "next/image";
import { Accent, Button, Kicker } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { contact } from "@/content/home";
import { contactHref, site } from "@/content/site";

/** Dark closing block with the portrait and the contact buttons. */
export function ContactSection() {
  return (
    <section id="contact" className="px-4 md:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] bg-ink px-6 py-24 text-center text-bg min-[900px]:px-16 min-[900px]:text-left">
          <div
            className="pointer-events-none absolute -inset-[40%]"
            style={{
              background:
                "radial-gradient(40% 40% at 50% 50%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative mx-auto grid max-w-[1040px] justify-items-center gap-8 min-[900px]:grid-cols-[minmax(0,360px)_1fr] min-[900px]:items-center min-[900px]:justify-items-start min-[900px]:gap-[72px]">
            <Image
              src={contact.photo.src}
              alt={contact.photo.alt}
              width={800}
              height={1000}
              sizes="(min-width: 900px) 360px, 200px"
              className="size-[200px] rounded-full border-[3px] border-accent object-cover object-[50%_20%] shadow-[0_0_0_10px_color-mix(in_srgb,var(--accent)_18%,transparent)] min-[900px]:aspect-[4/5] min-[900px]:h-auto min-[900px]:w-full min-[900px]:rounded-[28px] min-[900px]:object-top"
            />
            <div>
              <Kicker className="justify-center text-bg/60 min-[900px]:justify-start">{contact.kicker}</Kicker>
              <h2 className="font-head text-[38px] leading-[42px] font-semibold tracking-[-0.03em] min-[900px]:text-[60px] min-[900px]:leading-[62px]">
                {contact.title.before}
                <Accent>{contact.title.accent}</Accent>
              </h2>
              <p className="mx-auto mt-6 max-w-[560px] text-bg/70 min-[900px]:mx-0 min-[900px]:text-lg min-[900px]:leading-[30px]">
                {contact.text}
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3 min-[900px]:justify-start">
                <Button href={contactHref} tone="inverse">
                  {contact.primaryCta}
                </Button>
                {site.cvUrl && (
                  <Button href={site.cvUrl} variant="ghost" tone="inverse" arrow="down">
                    {contact.cvCta}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
