"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, MapPin, TrendingUp, Users } from "lucide-react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-primary/5">
        <div className="absolute inset-0 bg-[url('/serene-landscape-with-tiny-homes-in-nature.png')] bg-cover bg-center opacity-10"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-12 h-12 bg-primary/20 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <TrendingUp className="w-4 h-4 mr-2" />
                15% Average ROI
              </Badge>

              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
                Invest in
                <span className="text-primary block">Tranquil Living</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-lg text-pretty">
                Discover sustainable tiny home investments that offer both financial returns and a connection to nature.
                Book your stay or invest in the future of mindful living.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg hover-lift"
              >
                Start Investing
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg hover-lift bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Tour
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">250+</div>
                <div className="text-sm text-muted-foreground">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$2.5M+</div>
                <div className="text-sm text-muted-foreground">Invested</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1,200+</div>
                <div className="text-sm text-muted-foreground">Happy Guests</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Property */}
          <div
            className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative bg-card rounded-3xl shadow-2xl overflow-hidden hover-lift">
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 relative">
                <img src="/luxury-tiny-home-interior-with-large-windows-and-n.png" alt="Featured Tiny Home" className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/80 text-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    Asheville, NC
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">Serenity Cabin</h3>
                <p className="text-muted-foreground mb-4 text-pretty">
                  A peaceful retreat nestled in the Blue Ridge Mountains, perfect for digital nomads and nature lovers.
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">$180</div>
                      <div className="text-xs text-muted-foreground">per night</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">12.5%</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                  </div>

                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">View Details</Button>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 bg-background border border-border rounded-2xl p-4 shadow-lg animate-pulse-soft">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold">95% Occupancy</div>
                  <div className="text-xs text-muted-foreground">This month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
