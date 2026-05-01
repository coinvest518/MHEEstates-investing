import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { DonorBanner } from "@/components/donor-banner"
import { HowItWorksSteps } from "@/components/how-it-works-steps"
import { LiveDeals } from "@/components/live-deals"
import { BeforeAfterShowcase } from "@/components/before-after-showcase"
import { EducationGrid } from "@/components/education-grid"
import { FoundersStory } from "@/components/founders-story"
import { JoinReserveForm } from "@/components/join-reserve-form"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative">
        <HeroSection />
        <DonorBanner />
        <HowItWorksSteps />
        <LiveDeals />
        <BeforeAfterShowcase />
        <EducationGrid />
        <FoundersStory />
        <JoinReserveForm />
      </main>
      <SiteFooter />
    </div>
  )
}
