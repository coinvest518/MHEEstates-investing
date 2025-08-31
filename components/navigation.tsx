"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Home } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Home className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Tranquil Homes</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#properties" className="text-foreground hover:text-primary transition-colors" suppressHydrationWarning>
              Properties
            </a>
            <a href="#invest" className="text-foreground hover:text-primary transition-colors" suppressHydrationWarning>
              Invest
            </a>
            <a href="#book" className="text-foreground hover:text-primary transition-colors" suppressHydrationWarning>
              Book
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors" suppressHydrationWarning>
              About
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#properties" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" suppressHydrationWarning>
                Properties
              </a>
              <a href="#invest" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" suppressHydrationWarning>
                Invest
              </a>
              <a href="#book" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" suppressHydrationWarning>
                Book
              </a>
              <a href="#about" className="block px-3 py-2 text-foreground hover:text-primary transition-colors" suppressHydrationWarning>
                About
              </a>
              <div className="pt-4 pb-2 space-y-2">
                <Button variant="ghost" className="w-full justify-start text-foreground">
                  Sign In
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
