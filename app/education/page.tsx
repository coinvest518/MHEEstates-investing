import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { EducationArticles } from "@/components/education-articles"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Education — CommunityAcre",
  description:
    "Free guides on tax deeds, land auctions, first-time-buyer programs, and wholesale contracts. Real material from our research stack — not theory.",
}

const FAQ = [
  {
    q: "Is this an investment?",
    a: "No. CommunityAcre is a community impact pool, not an investment offering. Contributions support land acquisition and development of community assets. No financial returns are promised.",
  },
  {
    q: "What do I get for contributing?",
    a: "Access to deal updates, a voice in development decisions for the lots you back, photos and progress reports, and first look at upcoming auctions we're tracking.",
  },
  {
    q: "Where does my money actually go?",
    a: "Toward the purchase price of the parcel, county fees, and the build-out (fencing, soil, raised beds, tools). We share the breakdown publicly for every deal.",
  },
  {
    q: "Can I get my money back?",
    a: "Contributions are intent-based reservations during MVP. If a deal doesn't move forward, your reservation is cancelled and no funds change hands. We'll be explicit before any actual contribution is collected.",
  },
  {
    q: "Do I need a real estate license or credit?",
    a: "No. County tax-deed and tax-lien auctions don't require a license, and there's no financing involved — you bring the funds, you win the parcel. That's the whole point.",
  },
]

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="relative">
        <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Free guides
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance mb-6">
              Tax deeds, land auctions, getting in cheap.
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Real material from our research stack — not theory. Same playbooks we used to win our
              first two parcels.
            </p>
          </div>
        </section>

        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <EducationArticles />
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center reveal">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="bg-card border border-border rounded-2xl px-6">
              {FAQ.map((item, idx) => (
                <AccordionItem key={item.q} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-pretty">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
