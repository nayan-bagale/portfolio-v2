import { Accent, Button, Container, Kicker, SectionTitle } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="pt-40 pb-28">
      <Container>
        <Kicker>404</Kicker>
        <SectionTitle as="h1">
          This page is <Accent>not here.</Accent>
        </SectionTitle>
        <p className="mt-6 max-w-[560px] text-lg leading-[30px] text-body">
          The link may be old, or the page may have moved.
        </p>
        <Button href="/" className="mt-9">
          Back to home
        </Button>
      </Container>
    </section>
  );
}
