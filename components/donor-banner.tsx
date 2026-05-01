import { Button } from "@/components/ui/button"
import { BadgeCheck, ExternalLink, Receipt } from "lucide-react"

export function DonorBanner() {
  return (
    <section className="bg-secondary text-secondary-foreground border-y border-secondary-foreground/10 reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4 flex-1">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center mt-0.5 sm:mt-0">
              <Receipt className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="font-bold">Your contribution is tax-deductible.</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider bg-accent/20 text-accent border border-accent/30 rounded px-2 py-0.5">
                  <BadgeCheck className="h-3 w-3" />
                  501(c)(3)
                </span>
              </div>
              <p className="text-sm text-secondary-foreground/75 max-w-xl text-pretty">
                Fiscal sponsor:{" "}
                <span className="font-semibold text-secondary-foreground">Fortis Proles Inc.</span>
                {" "}— you receive an official receipt automatically.
                Powered by <span className="font-medium">Zeffy</span> · 0% platform fees.
              </p>
            </div>
          </div>
          <Button
            asChild
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold flex-shrink-0"
          >
            <a
              href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
              target="_blank"
              rel="noreferrer noopener"
            >
              Donate &amp; Get Receipt
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
