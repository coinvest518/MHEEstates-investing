import { Users, Gavel, Sprout, HeartHandshake } from "lucide-react"

const STEPS = [
  {
    number: "01",
    icon: Users,
    title: "Pool with the community",
    body: "Reserve your spot starting at $20. Members pool micro-contributions toward a shared land target. No credit check, no real estate license.",
  },
  {
    number: "02",
    icon: Gavel,
    title: "We acquire undervalued land",
    body: "We bid at county tax-deed and tax-lien auctions — the same edge that won us our first two lots for under $2,000 each.",
  },
  {
    number: "03",
    icon: Sprout,
    title: "We develop it together",
    body: "Vacant lots become food gardens, gathering spaces, and community assets. Members help shape the development plan.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "You get a voice + real updates",
    body: "Real photos, real progress, real before-and-afters. You see exactly where every dollar goes and help vote on next steps.",
  },
]

export function HowItWorksSteps() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">Simple process</p>
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">How Pooling Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Four steps from $20 to community land ownership.
          </p>
        </div>

        {/* Numbered step grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border border border-border rounded-2xl overflow-hidden reveal-stagger">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative flex flex-col p-8 group hover:bg-muted/40 transition-colors duration-200 bg-card"
              >
                <span className="text-7xl font-black text-primary/8 group-hover:text-primary/14 transition-colors leading-none mb-3 select-none">
                  {step.number}
                </span>
                <div className="mb-4 p-2.5 bg-primary/10 rounded-xl w-fit group-hover:bg-primary/15 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">{step.title}</h3>
                <p className="text-sm text-muted-foreground text-pretty leading-relaxed">{step.body}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center reveal">
          <a
            href="#join"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold px-8 py-3 rounded-lg"
          >
            Reserve Your Spot — Starting at $20
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            No credit check. No real estate license.{" "}
            <a
              href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
              target="_blank"
              rel="noreferrer noopener"
              className="text-accent hover:underline"
            >
              Donate directly via Zeffy →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
