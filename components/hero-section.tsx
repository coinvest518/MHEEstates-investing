"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Gavel, BadgeCheck } from "lucide-react"

export function HeroSection() {

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Full-bleed background — real property photo */}
      <div className="absolute inset-0">
        <img
          src="/property-2-third-ave/property-1-eagle-images/Eagel Property 1.jpg"
          alt="246 Eagle St — community land acquisition project"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 pt-28">
        <div className="max-w-2xl">
          <Badge
            className="mb-5 bg-accent/90 hover:bg-accent text-accent-foreground border-0 text-xs font-semibold tracking-wide uppercase hero-enter"
            style={{ animationDelay: "80ms" }}
          >
            <BadgeCheck className="w-3.5 h-3.5 mr-1.5" />
            501(c)(3) · Tax-deductible · Fortis Proles Inc.
          </Badge>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-5 text-balance hero-enter"
            style={{ animationDelay: "200ms" }}
          >
            Buy Land Together.
            <br />
            <span className="text-accent">Build Real Assets.</span>
          </h1>

          <p
            className="text-lg sm:text-xl text-white/80 mb-8 text-pretty max-w-lg hero-enter"
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
        </div>

        {/* Stats bar */}
        <div
          className="mt-14 flex flex-wrap gap-x-10 gap-y-3 border-t border-white/20 pt-8 hero-enter"
          style={{ animationDelay: "560ms" }}
        >
          {[
            { num: "2", label: "Lots won at auction" },
            { num: "$20", label: "Minimum contribution" },
            { num: "100%", label: "Community-owned" },
            { num: "$0", label: "Platform fees (via Zeffy)" },
          ].map(({ num, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">{num}</span>
              <span className="text-sm text-white/65">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1.5 text-white/35 hero-enter"
        style={{ animationDelay: "800ms" }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-9 bg-gradient-to-b from-white/35 to-transparent" />
      </div>
    </section>
  )
}
