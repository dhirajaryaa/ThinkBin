import FAQ from "@/components/landing/FAQ";
import Feature from "@/components/landing/Feature";
import Hero from "@/components/landing/Hero";

export default function Page() {
  return (
    <main className="px-8 sm:px-12">
      <Hero />
      <Feature />
      <FAQ />
    </main>
  );
}
