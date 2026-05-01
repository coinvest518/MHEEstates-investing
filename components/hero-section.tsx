"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Gavel, BadgeCheck, Sprout } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary/40 text-white">
      {/* Subtle pattern accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <Badge
              className="mb-5 bg-accent/90 hover:bg-accent text-accent-foreground border-0 text-xs font-semibold tracking-wide uppercase hero-enter"
              style={{ animationDelay: "80ms" }}
            >
              <BadgeCheck className="w-3.5 h-3.5 mr-1.5" />
              501(c)(3) · Tax-deductible · Fortis Proles Inc.
            </Badge>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-5 text-balance hero-enter"
              style={{ animationDelay: "200ms" }}
            >
              Buy Land Together.
              <br />
              <span className="text-accent">Build Real Assets.</span>
            </h1>

            <p
              className="text-lg text-white/80 mb-8 text-pretty max-w-xl hero-enter"
              style={{ animationDelay: "320ms" }}
            >
              We pool micro-contributions from neighbors to acquire undervalued land at tax auctions
              and turn it into food gardens and community assets. Start with just $20.
            </p>

            <div
              className="flex flex-wrap gap-3 hero-enter"
              style={{ animationDelay: "440ms" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 hover-lift"
              >
                <a href="#join">
                  Reserve a Spot
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-8 hover-lift"
              >
                <a href="#deals">
                  <Gavel className="mr-2 h-5 w-5" />
                  See Live Deals
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-white/75 hover:text-white hover:bg-white/10 px-6"
              >
                <a
                  href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Donate via Zeffy ↗
                </a>
              </Button>
            </div>

            {/* Stats bar */}
            <div
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 border-t border-white/15 pt-8 hero-enter"
              style={{ animationDelay: "560ms" }}
            >
              {[
                { num: "2", label: "Lots won at auction" },
                { num: "$20", label: "Minimum contribution" },
                { num: "100%", label: "Community-owned" },
                { num: "$0", label: "Platform fees" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-accent leading-none">{num}</div>
                  <div className="text-xs text-white/65 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: brand image card */}
          <div
            className="lg:col-span-5 hero-enter"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-accent/30 to-primary/30 rounded-3xl blur-xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-card hover-lift">
                <img
                  src="/imagesnew/buy-land-build-hope.png"
                  alt="Buy Land. Build Hope. — Crowdfund. Win auctions. Change lives."
                  className="w-full h-auto block"
                />
              </div>

              {/* Floating mini-stat card */}
              <div className="absolute -bottom-5 -left-5 bg-background border border-border rounded-xl shadow-xl p-3 flex items-center gap-2.5 max-w-[220px]">
                <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                  <Sprout className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground leading-tight">First lot won</div>
                  <div className="text-[11px] text-muted-foreground">$1,075 · Albany County</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
