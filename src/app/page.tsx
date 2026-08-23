import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import StatsSection from "./components/StatsSection";
import Timeline from "./components/Timeline";
import Skills from "./components/Skill";
import ProjectSection from "./components/ProjectSection";
import HackathonHighlights from "./components/HackathonHighlights";
import CertificatesSection from "./components/CertificatesSection";
import WhatIWorkWith from "./components/WhatIWorkWith";
import EmailSection from "./components/EmailSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Preloader from "./components/Preloader";
import Marquee from "./components/Marquee";

export default function Home() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col bg-[#070512]">
      <Preloader />
      <Navbar />
      <HeroSection />
      <Marquee />
      <StatsSection />
      <AboutSection />
      <Timeline />
      <Skills />
      <ProjectSection />
      <HackathonHighlights />
      <CertificatesSection />
      <WhatIWorkWith />
      <Marquee reverse />
      <EmailSection />
      <CTASection />
      <Footer />
      <ChatBot />
    </main>
  );
}
