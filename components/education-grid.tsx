import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BookOpen, FileText, Gavel, KeyRound, ArrowRight } from "lucide-react"

const TOPICS = [
  {
    icon: FileText,
    title: "Tax Deeds Explained",
    body: "When a county takes title and sells the deed outright. How it differs from liens and when each one wins.",
    href: "/education#tax-deeds",
  },
  {
    icon: Gavel,
    title: "Buying Land for Under $1,000",
    body: "Real walkthrough of where these auctions happen, what makes a lot worth $0 vs $5K, and our pre-bid checklist.",
    href: "/education#buying-land-under-1000",
  },
  {
    icon: KeyRound,
    title: "Free Buy-a-Home Programs",
    body: "State and federal programs that put first-time buyers in a home with very little down. Income caps and how to stack them.",
    href: "/education#buy-a-home-programs",
  },
  {
    icon: BookOpen,
    title: "Wholesaler Contract Pack",
    body: "Assignment-of-contract setup. How to structure a flip with no money down, plus the legal disclosures by state.",
    href: "/education#wholesaler-contract-pack",
  },
]

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

export function EducationGrid() {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Learn the Basics</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Free guides on how land auctions, tax liens, and tax deeds actually work — written
            from real bidding experience, not theory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {TOPICS.map((topic) => {
            const Icon = topic.icon
            return (
              <Card key={topic.title} className="hover-lift border border-border bg-card flex flex-col">
                <CardHeader className="pb-3">
                  <div className="mb-3 p-3 bg-primary/10 rounded-full w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground text-pretty flex-1">{topic.body}</p>
                  <a
                    href={topic.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Read the guide <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mb-16">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
            <a href="/education">
              Browse all education <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="bg-card border border-border rounded-2xl px-6">
            {FAQ.map((item, idx) => (
              <AccordionItem key={item.q} value={`item-${idx}`}>
                <AccordionTrigger className="text-left">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-pretty">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
