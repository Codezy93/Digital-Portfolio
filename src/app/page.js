import CustomSection from "@/components/CustomSection";
import SkillsSection from "@/components/SkillsSection";
import AcademicSection from "@/components/AcademicSection";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection"
import ProjectsSection from "@/components/ProjectsSection"
import ContactSection from "@/components/ContactSection"
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Viraj Paradkar',
  description: 'Selected AI/ML projects and case studies.',
  path: '/projects',
})

export default function Home() {
  return (
    <>
      <HeroSection/>
      <SkillsSection />
      <ExperienceSection/>
      <ProjectsSection/>
      <AcademicSection/>
      <ContactSection/>
    </>
  );
}
