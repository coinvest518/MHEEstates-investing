import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { InvestorInquiryModal } from "@/components/investor-inquiry-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DEALS } from "@/lib/deals"
import { Building2, Hammer, TrendingUp, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Investors — CommunityAcre",
  description:
    "For investors and sponsors who want a deeper conversation than the $20 community pool. Sponsorship, in-kind partnership, and the future MHE Estates LLC track.",
}

const PILLARS = [
  {
    icon: Building2,
    title: "Land acquisition",
    body: "We bid at county tax-deed and tax-lien auctions. The pipeline keeps growing — 2 lots won, 6 more on our research list for Spring/Fall 2026.",
  },
  {
    icon: Hammer,
    title: "Build-out",
    body: "Soil, raised beds, fencing, water infrastructure, and tool sheds. Small-batch, neighborhood-scale projects with community labor and oversight.",
  },
  {
    icon: TrendingUp,
    title: "MHE Estates LLC track",
    body: "A separate, for-profit entity is in formation for buy-and-hold and rental tracks. CommunityAcre supporters get a first look when it structures its first equity round.",
  },
]

const TRACKS = [
  {
    name: "Sponsor a lot",
    range: "$5K–$25K",
    body: "Cover the acquisition + build-out for a specific lot. Named sponsor on the parcel signage, dedicated reporting, and right-of-first-refusal on the next lot in that neighborhood.",
  },
  {
    name: "In-kind partner",
    range: "Materials & services",
    body: "Donate lumber, soil, landscaping services, or skilled trade time. Same recognition as a sponsor, deductible at fair market value via Fortis Proles Inc. (501(c)(3)).",
  },
  {
    name: "For-profit interest",
    range: "TBD per round",
    body: "Be on the list when MHE Estates LLC structures its first equity round. Buy-and-hold rental properties, financed through a more conventional structure than the impact pool.",
  },
]

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="relative">
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              For investors & sponsors
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance mb-6">
              For investors who want more than $20 in.
            </h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
              The community pool is at $20 a head. This is the page for everyone else — sponsors,
              in-kind partners, and the people watching the for-profit track.
            </p>
            <InvestorInquiryModal
              trigger={
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Express interest <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              }
            />
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10 reveal">What we&apos;re building</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {PILLARS.map(({ icon: Icon, title, body }, i) => (
                <Card
                  key={title}
                  className="border-border bg-card reveal"
                  style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                >
                  <CardHeader>
                    <div className="p-3 bg-primary/10 rounded-full w-fit mb-2">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground text-pretty">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 reveal">
              <h2 className="text-4xl font-bold text-foreground mb-3 text-balance">Deal-flow so far</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Two parcels won in our first auction cycle. Both well below assessed value.
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-border bg-card reveal">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">Property</th>
                    <th className="text-left px-5 py-3 font-semibold">Tax map #</th>
                    <th className="text-right px-5 py-3 font-semibold">Purchase</th>
                    <th className="text-right px-5 py-3 font-semibold">Assessed value</th>
                    <th className="text-right px-5 py-3 font-semibold">Target raise</th>
                    <th className="text-left px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {DEALS.map((d) => (
                    <tr key={d.id} className="hover:bg-muted/20">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-foreground">{d.location}</div>
                        <div className="text-xs text-muted-foreground">{d.timeline}</div>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{d.parcelDetails?.taxMapNumber ?? "—"}</td>
                      <td className="px-5 py-4 text-right font-bold text-foreground">
                        ${d.purchasePrice.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 text-right text-muted-foreground">
                        {d.parcelDetails ? `$${d.parcelDetails.fullMarketValue.toLocaleString()}` : "—"}
                      </td>
                      <td className="px-5 py-4 text-right font-medium text-foreground">
                        ${d.targetRaise.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <Badge className="bg-primary/15 text-primary border border-primary/30 capitalize">
                          {d.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-10 text-balance text-center reveal">
              Three ways to get involved
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {TRACKS.map((t, i) => (
                <div
                  key={t.name}
                  className="bg-secondary-foreground/5 border border-secondary-foreground/15 rounded-2xl p-6 reveal"
                  style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">{t.range}</p>
                  <h3 className="text-2xl font-bold mb-3">{t.name}</h3>
                  <p className="text-sm text-secondary-foreground/80 text-pretty">{t.body}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12 reveal">
              <InvestorInquiryModal
                trigger={
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    Express interest <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                }
              />
            </div>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-xs text-muted-foreground text-pretty space-y-2">
            <p>
              <strong>Disclosures.</strong> CommunityAcre is a community impact pool, not an investment
              offering. Tax-deductible contributions are routed through Fortis Proles Inc., a 501(c)(3)
              public charity, via Zeffy. No financial returns are promised on charitable contributions.
            </p>
            <p>
              This page is informational. Nothing on it constitutes an offer to sell or a solicitation to
              buy any security. Any future for-profit equity offering (e.g., MHE Estates LLC) will be
              made only by formal offering documents, with all required disclosures, to qualified
              participants.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
