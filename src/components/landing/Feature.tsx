import { Brain, Clock, File, Link, Search, Tag } from "lucide-react";

function Feature() {
  const features = [
    {
      icon: Search,
      title: "Semantic Search",
      text: "Find what you mean — not just what you type. Ask in plain language and get precise answers.",
    },
    {
      icon: Tag,
      title: "Auto Tagging",
      text: "AI adds tags like 'Next.js', 'UI', 'bugfix' so you never organize manually.",
    },
    {
      icon: Link,
      title: "Context Linking",
      text: "See relationships between your memories and ideas — like a living knowledge graph.",
    },
    {
      icon: File,
      title: "OCR + PDF Parsing",
      text: "Extracts text from screenshots and documents automatically.",
    },
    {
      icon: Brain,
      title: "Knowledge Graph",
      text: "Visualize how your ideas connect across projects and topics.",
    },
    {
      icon: Clock,
      title: "Spaced Recall",
      text: "Smart reminders help you revisit and retain what matters most.",
    },
  ];

  return (
    <section className="mt-12 sm:mt-32 mb-8 w-full" id="feature">
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center capitalize">
        your knowledge, organized by AI.
      </h2>
      <p className="text-sm sm:text-base font-normal my-4 text-center text-muted-foreground">
        ThinkBin transforms scattered memories into connected, searchable
        intelligence.
      </p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 mt-16">
        {features?.map((item) => (
          <div
            key={item.title}
            className="
              relative p-6 rounded-xl border border-foreground/10
              backdrop-blur-md shadow-sm
              hover:scale-[1.03] bg-gradient-to-b from-background via-background to-muted
              transition-all duration-300
            "
          >
            <div
              className="
              border rounded-xl flex items-center justify-center w-12 h-12
              transition-all duration-300
             bg-muted
            "
            >
              <item.icon className="size-6 text-muted-foreground" />
            </div>

            <h4 className="text-xl font-semibold mt-4">{item.title}</h4>
            <p className="text-muted-foreground text-sm mt-1 font-light">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Feature;
