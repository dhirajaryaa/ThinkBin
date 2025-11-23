export default function AboutPage() {
  return (
    <main className="px-8 sm:px-12 py-12 max-w-4xl mx-auto">
      <section className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight mb-3">
          About ThinkBin
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
          ThinkBin is your personal AI-powered second brain — built to collect, connect,
          and recall everything you learn across the web. It helps developers, students,
          and creators organize scattered knowledge into one searchable memory.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          We believe learning should never be lost. Every insight, bug fix, or note
          deserves to be remembered and easily recalled. ThinkBin was created to make
          that possible — by turning information into intelligent memory using modern AI.
        </p>
      </section>

      {/* Problem Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Why We Built It</h2>
        <p className="text-muted-foreground text-base leading-relaxed mb-3">
          Most people store knowledge in too many places — bookmarks, tweets, PDFs,
          screenshots, Notion pages, and even chat history. But when they need it later,
          they can’t find it. ThinkBin solves that by understanding what you save,
          tagging it automatically, and letting you recall it by meaning — not by file names.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          Instead of wasting time searching through tabs, you just ask:{" "}
          <em>“Find my Tailwind bug fix from last week”</em>, and ThinkBin instantly
          finds the exact memory with full context.
        </p>
      </section>

      {/* Vision Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          We’re building ThinkBin to become the most intelligent personal knowledge system
          — a true AI memory layer for humans. Our long-term goal is to help people
          learn faster, remember better, and build smarter projects by connecting their
          own knowledge with AI understanding.
        </p>
      </section>

      {/* Features / Capabilities */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">What ThinkBin Can Do</h2>
        <ul className="list-disc pl-5 text-muted-foreground text-base leading-relaxed space-y-2">
          <li>Capture memories, screenshots, and PDFs in one place</li>
          <li>Automatically tag topics and detect relationships</li>
          <li>Search your saved knowledge by meaning, not keywords</li>
          <li>Visualize connections through an interactive knowledge graph</li>
          <li>Get weekly insights and reminders to revisit what you’ve learned</li>
        </ul>
      </section>

      {/* Founder Story */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Built by a Developer, for Developers</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          ThinkBin is an independent project created by{" "}
          <strong>Dhiraj Arya</strong> — a passionate web developer building
          tools that make learning and productivity simpler. The project started
          as a personal “second brain” experiment and evolved into a full platform
          for anyone who wants to think smarter, not harder.
        </p>
      </section>

      {/* Closing Section */}
      <section className="mt-12 border-t pt-6">
        <h3 className="text-xl font-semibold mb-2">What’s Next</h3>
        <p className="text-muted-foreground text-base leading-relaxed mb-3">
          The next phase of ThinkBin focuses on better visual connections, team collaboration,
          and offline-first knowledge syncing. We want to make it the most intuitive and
          open personal AI workspace.
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          You can follow the development, contribute ideas, or join early access from the dashboard.
        </p>
      </section>
    </main>
  );
}
