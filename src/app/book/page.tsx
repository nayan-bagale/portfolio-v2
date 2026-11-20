import type { Metadata } from "next";
import { Accent, Container, Kicker, SectionTitle } from "@/components/ui";
import { BookingEmbed } from "@/modules/book";
import { booking } from "@/content/site";

export const metadata: Metadata = {
  title: booking.metaTitle,
  description: booking.metaDescription,
};

export default function BookPage() {
  return (
    <section className="pt-40 pb-16">
      <Container>
        <Kicker>{booking.kicker}</Kicker>
        <SectionTitle as="h1">
          {booking.title.before}
          <Accent>{booking.title.accent}</Accent>
        </SectionTitle>
        <p className="mt-6 max-w-[560px] text-lg leading-[30px] text-body">{booking.intro}</p>
        <div className="mt-14">
          <BookingEmbed />
        </div>
      </Container>
    </section>
  );
}
