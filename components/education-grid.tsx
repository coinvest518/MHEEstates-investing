import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BookOpen, FileText, Gavel, KeyRound } from "lucide-react"

const TOPICS = [
  {
    icon: BookOpen,
    title: "Tax Liens 101",
    body: "What a tax lien certificate actually is, how interest accrues, and why it can be a low-cost way into real estate.",
  },
  {
    icon: FileText,
    title: "Tax Deeds Explained",
    body: "When a county takes title and sells the deed outright. How it differs from liens and when each one wins.",
  },
  {
    icon: Gavel,
    title: "How Land Auctions Work",
    body: "From researching the parcel list to bidding day. The same playbook we used to win our first two lots.",
  },
  {
    icon: KeyRound,
    title: "Buying with No Credit or License",
    body: "Why land at auction doesn't require financing, agents, or licenses — and what you actually need to bring.",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TOPICS.map((topic) => {
            const Icon = topic.icon
            return (
              <Card key={topic.title} className="hover-lift border border-border bg-card">
                <CardHeader className="pb-3">
                  <div className="mb-3 p-3 bg-primary/10 rounded-full w-fit">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-base">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground text-pretty">{topic.body}</p>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    Guide coming soon
                  </Badge>
                </CardContent>
              </Card>
            )
          })}
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
