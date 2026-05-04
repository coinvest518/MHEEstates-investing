const EXPLORE_LINKS = [
  { href: "#deals", label: "Live Deals" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
  { href: "#join", label: "Reserve a Spot" },
]

const LEARN_LINKS = [
  { href: "#education", label: "Tax Liens 101" },
  { href: "#education", label: "Tax Deeds Explained" },
  { href: "#education", label: "How Land Auctions Work" },
  { href: "#education", label: "Buying Land with No Credit" },
]

export function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/logo-source/apple-icon-180x180.png"
                alt="CommunityAcre logo"
                className="h-7 w-7 object-contain rounded"
              />
              <span className="text-xl font-bold">CommunityAcre</span>
            </div>
            <p className="text-secondary-foreground/80 text-pretty mb-3">
              Buy land together. Build real assets.
            </p>
            <span className="text-sm text-secondary-foreground/70 uppercase tracking-wider">
              A project of MHE Gardens
            </span>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-secondary-foreground transition-colors"
                    suppressHydrationWarning
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              {LEARN_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-secondary-foreground transition-colors"
                    suppressHydrationWarning
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>
                <a
                  href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  Donate via Zeffy
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@mhegardens.com"
                  className="hover:text-secondary-foreground transition-colors"
                >
                  hello@mhegardens.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 space-y-3 text-secondary-foreground/70 text-sm">
          <p className="text-pretty max-w-3xl">
            CommunityAcre is a community impact pool, not an investment offering. Contributions support
            land acquisition and development of community assets. No financial returns are promised.
            Tax-deductible donations handled by Fortis Proles Inc. (501(c)(3)) via Zeffy.
          </p>
          <p>&copy; 2026 CommunityAcre — a project of MHE Gardens.</p>
        </div>
      </div>
    </footer>
  )
}
