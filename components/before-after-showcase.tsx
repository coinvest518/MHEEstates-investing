import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export function BeforeAfterShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">The transformation</p>
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            From Vacant Lot to Food Garden
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            246 Eagle St — bought at county auction. Here&apos;s the before, and what we&apos;re building toward.
          </p>
        </div>

        {/* Cinematic split before/after */}
        <div
          className="relative rounded-2xl overflow-hidden border border-border shadow-xl reveal"
          style={{ aspectRatio: "21/9" }}
        >
          <div className="grid grid-cols-2 h-full">
            {/* Before */}
            <div className="relative overflow-hidden">
              <img
                src="/property-2-third-ave/property-1-eagle-images/Eagel Property 1.jpg"
                alt="246 Eagle St — the lot as it stands today"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4">
                <p className="text-white font-semibold text-sm drop-shadow">246 Eagle St · Albany County, NY</p>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 border border-white/30 rounded px-2 py-1 backdrop-blur-sm bg-black/20">
                  Before
                </span>
              </div>
            </div>

            {/* After */}
            <div className="relative overflow-hidden">
              <img
                src="/imagesnew/before-and-after.jpg"
                alt="Vision: community food garden transformation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent pointer-events-none" />
              <div className="absolute top-4 right-4">
                <p className="text-white font-semibold text-sm drop-shadow text-right">Community food garden · The vision</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80 border border-white/30 rounded px-2 py-1 backdrop-blur-sm bg-black/20">
                  After
                </span>
              </div>
            </div>
          </div>

          {/* Center divider + pill */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-px w-0.5 bg-white/50 z-10 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <span className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-[11px] font-bold text-foreground uppercase tracking-wider shadow-lg">
              Before / After
            </span>
          </div>
        </div>

        {/* Description cards */}
        <div className="grid md:grid-cols-2 gap-5 mt-6 reveal-stagger">
          <div className="p-5 bg-card rounded-xl border border-border">
            <h3 className="font-semibold text-card-foreground mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-muted-foreground inline-block" />
              Today — won at auction
            </h3>
            <p className="text-sm text-muted-foreground text-pretty">
              A vacant parcel acquired through a county tax-deed sale for $1,075. Currently overgrown, waiting to be transformed.
            </p>
          </div>
          <div className="p-5 bg-card rounded-xl border border-primary/30 ring-1 ring-primary/10">
            <h3 className="font-semibold text-card-foreground mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              The plan — community food garden
            </h3>
            <p className="text-sm text-muted-foreground text-pretty">
              Raised beds, a tool shed, composting stations, and a shared harvest program open to the whole neighborhood.
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center reveal">
          <a
            href="#deals"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            See the live deal <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
