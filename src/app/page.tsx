import { LanguageProvider } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { GlitchOverlay } from "@/components/GlitchOverlay";

export default function Home() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white">
        {/* Editorial subtle grid background */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

        {/* Glitch flash overlay on language switch */}
        <GlitchOverlay />

        {/* Navigation Header with Language Toggle */}
        <Header />

        {/* Main Content Area */}
        <main className="relative flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6">
          <Hero />
          <FeaturedProjects />
          <Experience />
          <Skills />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  );
}
