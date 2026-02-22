import SkillsSection from "@/components/SkillsSection";
import AcademicSection from "@/components/AcademicSection";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ChapterNav from "@/components/ChapterNav";
import SmoothScroll from "@/components/SmoothScroll";
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Viraj Paradkar — AI/ML Researcher & Engineer',
  description: 'Portfolio of Viraj Paradkar — MS in AI @ Northeastern. Production-grade AI systems, deep learning research, and real-world impact.',
  path: '/',
  type: 'website',
});

export default function Home() {
  return (
    <SmoothScroll>
      <ChapterNav />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AcademicSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
