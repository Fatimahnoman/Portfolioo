import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import StatsSection from "./components/StatsSection";
import Timeline from "./components/Timeline";
import Skills from "./components/Skill";
import ProjectSection from "./components/ProjectSection";
import Testimonials from "./components/Testimonials";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0a0a0f]">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <Timeline />
      <Skills />
      <ProjectSection />
      <Testimonials />
      <EmailSection />
      <Footer />
    </main>
  );
}
