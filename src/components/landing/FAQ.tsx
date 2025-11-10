import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FAQ() {
  const faqs = [
    {
      q: "What is ThinkBin?",
      a: "ThinkBin is an AI-powered workspace that turns scattered notes into a connected knowledge graph — so you can search, recall and create faster.",
    },
    {
      q: "Do I need to tag notes manually?",
      a: "No. ThinkBin automatically extracts topics from your notes so tags generate themselves.",
    },
    {
      q: "How does Semantic Search work?",
      a: "We embed your content into vectors so search returns results by meaning — not exact keywords.",
    },
    {
      q: "Can I upload screenshots / PDFs?",
      a: "Yes. OCR parses text inside images and PDFs — everything becomes searchable instantly.",
    },
    {
      q: "How does spaced recall help memory?",
      a: "We use spaced repetition (SM-2 algorithm) to remind you exactly when a memory starts fading.",
    },
    {
      q: "Is my data private?",
      a: "Your data is yours — encrypted in storage and never used to train any model.",
    },
  ];

  return (
    <section className="mt-12 sm:mt-32 mb-16 w-full " id="faq">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center capitalize">
        Frequently Asked Questions
      </h2>
      <p className="text-sm sm:text-base font-normal my-4 text-center text-muted-foreground">
        common questions about ThinkBin
      </p>

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl mx-auto mt-10"
      >
        {faqs.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border-b border-foreground/10 py-3"
          >
            <AccordionTrigger className="text-left text-base font-medium">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export default FAQ;