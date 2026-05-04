import { Badge } from "@/components/ui/badge"
import { ArrowRight, Quote } from "lucide-react"

export function FoundersStory() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden border border-secondary-foreground/20 shadow-xl reveal hover-lift">
            <div className="aspect-[4/3]">
              <img
                src="/property-2-third-ave/property-1-eagle-images/Eagel Property 1.jpg"
                alt="246 Eagle St — the lot that started it all"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-4 left-4">
              <Badge className="bg-accent text-accent-foreground">Real Story</Badge>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-5">
              <p className="text-white text-sm font-medium">246 Eagle St · Albany County, NY</p>
              <p className="text-white/70 text-xs">Acquired at tax auction for $1,075</p>
            </div>
          </div>

          <div className="space-y-6 reveal" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">Our story</p>
            <h2 className="text-4xl font-bold text-balance">
              We Started by Showing Up at the Auction.
            </h2>

            <div className="space-y-4 text-secondary-foreground/85 text-pretty">
              <p>
                I got into land almost by accident — clicking through county auction listings and noticing
                how cheap some parcels were going for. So I showed up. And won two of them.
              </p>
              <p>
                Now those vacant lots are becoming food gardens. CommunityAcre is how I scale that with
                neighbors who want a piece of it without needing credit, a real estate license, or a
                six-figure check.
              </p>
            </div>

            <div className="relative pl-6 border-l-2 border-accent">
              <Quote className="absolute -top-1 -left-3 h-6 w-6 text-accent bg-secondary p-1 rounded-full" />
              <p className="italic text-secondary-foreground/95">
                &ldquo;Most people just talk. We have real deals. $1,075 for a parcel — and a community
                growing food on it.&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap gap-5 pt-2">
              <a
                href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                Donate via Zeffy (tax-deductible) <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
