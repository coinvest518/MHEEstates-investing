import type { Metadata } from "next"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { RentALotForm } from "@/components/rent-a-lot-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Droplet, Wrench, Sprout, Apple, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Rent a Lot — CommunityAcre",
  description:
    "Rent a garden plot on a real Albany lot. Starter (4×8), Family (8×12), or Communal Share. Soil, water, and tools included. Harvest is yours.",
}

const TIERS = [
  {
    id: "starter",
    name: "Starter Plot",
    size: "4 ft × 8 ft raised bed",
    price: "$15/mo",
    season: "or $120 / season",
    blurb: "Solo gardener pace. Plenty of room for tomatoes, herbs, leafy greens, and a couple of climbers.",
    accent: "border-primary/40",
  },
  {
    id: "family",
    name: "Family Plot",
    size: "8 ft × 12 ft raised bed",
    price: "$30/mo",
    season: "or $240 / season",
    blurb: "Feeds a household. Room for a real mix — root crops, salad rotation, peppers, and a small berry corner.",
    accent: "border-accent",
  },
  {
    id: "communal",
    name: "Communal Share",
    size: "Shared bed access",
    price: "$5/mo",
    season: "suggested",
    blurb: "No dedicated bed. You join community workdays, learn alongside neighbors, and split the harvest.",
    accent: "border-secondary-foreground/30",
  },
]

const INCLUDED = [
  { icon: Droplet, label: "Water access", body: "On-site spigots — no hauling jugs." },
  { icon: Sprout, label: "Soil + raised bed", body: "Living soil mix, ready to plant from day one." },
  { icon: Wrench, label: "Tools & shed access", body: "Shared tools, hand-truck, and a locked shed." },
  { icon: Apple, label: "Harvest is yours", body: "Whatever you grow goes home with you." },
]

const FAQ = [
  {
    q: "How long is a season?",
    a: "We define season as April 1 through October 31 in Albany. You can rent month-to-month or pay for a full season up front.",
  },
  {
    q: "What if I don't have any tools?",
    a: "Tools are provided. We have a shared shed with hand tools, watering cans, and a wheelbarrow. Just bring gloves if you have a preferred pair.",
  },
  {
    q: "Can I bring my kids?",
    a: "Absolutely. The lots are family-friendly. Communal workdays are a good time to bring kids — there's always weeding, mulching, and harvest tasks they can help with.",
  },
  {
    q: "What about water on hot days?",
    a: "Public water is at the curb on both lots. We run drip irrigation on raised beds during peak summer, included in your rent.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Month-to-month is no-commitment. Season payments are pro-rated minus a $20 admin fee if you cancel mid-season.",
  },
]

export default function RentALotPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="relative">
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25"
            style={{
              backgroundImage:
                "url(/property-2-third-ave/property-1-eagle-images/eagek%20stree%203%20live%20image%20.jpg)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" aria-hidden />
          <div className="relative max-w-5xl mx-auto text-center reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Garden plot rental — Albany, NY
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance mb-6">
              Rent a Lot. Grow on real land.
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              Pick a plot on one of our two Albany lots. Soil, water, and tools are already there.
              Whatever you grow, you keep.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="#waitlist">
                <Sprout className="mr-2 h-4 w-4" /> Join the waitlist
              </a>
            </Button>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-10 reveal">What&apos;s included</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INCLUDED.map(({ icon: Icon, label, body }, i) => (
                <Card key={label} className="border-border bg-card reveal" style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                  <CardHeader className="pb-2">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">{label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 reveal">
              <h2 className="text-4xl font-bold text-foreground mb-3 text-balance">Pick your plot tier</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Three tiers. No commitment beyond the month you&apos;re in.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {TIERS.map((tier, i) => (
                <Card
                  key={tier.id}
                  className={`border-2 ${tier.accent} bg-card hover-lift reveal`}
                  style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tier.size}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-3xl font-bold text-foreground">{tier.price}</div>
                      <div className="text-xs text-muted-foreground">{tier.season}</div>
                    </div>
                    <p className="text-sm text-muted-foreground text-pretty">{tier.blurb}</p>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <a href={`/rent-a-lot?tier=${tier.id}#waitlist`}>Join waitlist for {tier.name}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 reveal">Two locations in Albany</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary-foreground/5 rounded-2xl p-6 reveal">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-widest">Property #001</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">246 Eagle St</h3>
                <p className="text-sm text-secondary-foreground/80 mb-3">
                  11 ft × 66 ft. Smaller, intimate footprint. Walking distance to MHE Gardens&apos; existing garden.
                  Public water and sewer at the curb. Best for solo gardeners and small families who want a quiet spot.
                </p>
                <p className="text-xs text-secondary-foreground/60">Tax Map # 76.56-4-60 · City of Albany</p>
              </div>
              <div className="bg-secondary-foreground/5 rounded-2xl p-6 reveal" style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
                <div className="flex items-center gap-2 text-accent mb-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-widest">Property #002</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">181 Third Ave</h3>
                <p className="text-sm text-secondary-foreground/80 mb-3">
                  21 ft × 105.48 ft — over 2,200 sq ft. Larger lot with room for a communal gathering corner
                  alongside individual beds. Public utilities present. Best for family plots and community workdays.
                </p>
                <p className="text-xs text-secondary-foreground/60">Tax Map # 76.56-4-38 · City of Albany</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 reveal">FAQ</h2>
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

        <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 reveal">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Reserve your spot</p>
              <h2 className="text-4xl font-bold text-foreground mb-3 text-balance">Join the waitlist</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-xl mx-auto">
                Tell us which lot, which tier, and a bit about your gardening experience. We&apos;ll reach out
                as soon as a plot opens.
              </p>
            </div>
            <Suspense fallback={<div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">Loading form...</div>}>
              <RentALotForm />
            </Suspense>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
