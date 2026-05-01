import { LiveDealCard } from "@/components/live-deal-card"
import { DEALS } from "@/lib/deals"

export function LiveDeals() {
  return (
    <section id="deals" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Real properties</p>
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Live Deals</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Real lots, real numbers, real progress. Two parcels won at auction — plus the next deal we&apos;re tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {DEALS.map((deal, i) => (
            <LiveDealCard key={deal.id} deal={deal} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground reveal">
          Contributions are tax-deductible via{" "}
          <a
            href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
            target="_blank"
            rel="noreferrer noopener"
            className="text-accent hover:underline font-medium"
          >
            Zeffy
          </a>{" "}
          · Fiscal sponsor: Fortis Proles Inc. (501(c)(3))
        </p>
      </div>
    </section>
  )
}
