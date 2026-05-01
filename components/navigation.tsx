"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { href: "#deals", label: "Deals" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#education", label: "Education" },
  { href: "#about", label: "About" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0)
      setIsScrolled(scrollTop > 60)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-accent transition-[width] duration-150 ease-out z-10"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 group cursor-pointer" aria-label="CommunityAcre home">
            <img
              src="/logo-source/apple-icon-180x180.png"
              alt="CommunityAcre logo"
              className="h-8 w-8 object-contain rounded"
            />
            <div className="flex flex-col leading-tight">
              <span
                className={`text-base font-bold transition-colors duration-300 ${
                  isScrolled ? "text-foreground" : "text-white drop-shadow"
                }`}
              >
                CommunityAcre
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                  isScrolled ? "text-foreground" : "text-white/90 drop-shadow"
                }`}
                suppressHydrationWarning
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className={`text-sm transition-colors duration-300 ${
                isScrolled
                  ? "text-foreground hover:text-primary"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <a
                href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
                target="_blank"
                rel="noreferrer noopener"
              >
                Donate
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className={`text-sm font-semibold transition-all duration-300 ${
                isScrolled
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-accent hover:bg-accent/90 text-accent-foreground"
              }`}
            >
              <a href="#join">Reserve a Spot</a>
            </Button>
          </div>

          <button
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
            }`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer with smooth height transition */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border/60 bg-background/98 backdrop-blur-md">
            <div className="px-2 pt-2 pb-4 space-y-0.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-foreground hover:text-primary rounded-md hover:bg-muted/50 transition-colors"
                  suppressHydrationWarning
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 pb-1 px-3 flex flex-col gap-2">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  <a
                    href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={() => setIsOpen(false)}
                  >
                    Donate (Tax-deductible)
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a href="#join" onClick={() => setIsOpen(false)}>
                    Reserve a Spot
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
