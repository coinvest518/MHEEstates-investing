"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TrendingUp, Users, Leaf, Shield } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProperties } from "@/components/featured-properties"
import { InvestmentDashboard } from "@/components/investment-dashboard"
import { BookingInterface } from "@/components/booking-interface"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="relative">
        <HeroSection />

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Why Choose Tranquil Investments?</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Experience the perfect blend of sustainable living and profitable investments with our curated tiny home
                communities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Leaf className="h-8 w-8 text-primary" />,
                  title: "Sustainable Living",
                  description: "Eco-friendly tiny homes designed for minimal environmental impact",
                },
                {
                  icon: <TrendingUp className="h-8 w-8 text-primary" />,
                  title: "High ROI",
                  description: "Average 12-15% annual returns on tiny home investments",
                },
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: "Secure Investment",
                  description: "Fully insured properties with comprehensive management services",
                },
                {
                  icon: <Users className="h-8 w-8 text-primary" />,
                  title: "Community Focus",
                  description: "Curated communities that foster connection and wellbeing",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className={`hover-lift border-0 shadow-lg bg-card/50 backdrop-blur-sm ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center text-pretty">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FeaturedProperties />
        <InvestmentDashboard />
        <BookingInterface />

        {/* Newsletter Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                Stay Updated on New Opportunities
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Be the first to know about new tiny home communities and exclusive investment opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input placeholder="Enter your email" className="flex-1 bg-background border-border" />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-secondary-foreground py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Tranquil Homes</h3>
                <p className="text-secondary-foreground/80 text-pretty">
                  Sustainable tiny home investments for a better tomorrow.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Invest</h4>
                <ul className="space-y-2 text-secondary-foreground/80">
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      Browse Properties
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      Investment Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      ROI Calculator
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Book</h4>
                <ul className="space-y-2 text-secondary-foreground/80">
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      Find Stays
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      Booking Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      Guest Reviews
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-secondary-foreground/80">
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-secondary-foreground transition-colors" suppressHydrationWarning>
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-secondary-foreground/60">
              <p>&copy; 2025 Tranquil Homes. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
