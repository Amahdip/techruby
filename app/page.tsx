import { BentoGrid } from "@/components/bento-grid";
import { CaseStudies } from "@/components/case-studies";
import { ContactCta } from "@/components/contact-cta";
import { Footer } from "@/components/footer";
import { HashScrollHandler } from "@/components/anchor-link";
import { Hero } from "@/components/hero";
import { MainNav } from "@/components/main-nav";
import { PipelineVisual } from "@/components/pipeline-visual";
import { ProcessTimeline } from "@/components/process-timeline";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <MainNav />
      <main>
        <Hero />
        <BentoGrid />
        <PipelineVisual />
        <CaseStudies />
        <ProcessTimeline />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
