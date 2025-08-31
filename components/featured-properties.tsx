"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Bed, Bath, Square, TrendingUp } from "lucide-react"

const properties = [
  {
    id: 1,
    name: "Mountain Vista Retreat",
    location: "Colorado Springs, CO",
    price: 220,
    roi: "14.2%",
    rating: 4.9,
    reviews: 127,
    beds: 1,
    baths: 1,
    sqft: 400,
    image: "/tiny-home-mountain-view-exterior.png",
    tags: ["Mountain View", "Hot Tub", "Pet Friendly"],
  },
  {
    id: 2,
    name: "Lakeside Sanctuary",
    location: "Lake Tahoe, CA",
    price: 280,
    roi: "16.8%",
    rating: 4.8,
    reviews: 89,
    beds: 1,
    baths: 1,
    sqft: 450,
    image: "/tiny-home-lakeside-with-deck.png",
    tags: ["Lakefront", "Kayaks", "Fire Pit"],
  },
  {
    id: 3,
    name: "Forest Haven",
    location: "Olympic Peninsula, WA",
    price: 195,
    roi: "13.5%",
    rating: 4.9,
    reviews: 156,
    beds: 1,
    baths: 1,
    sqft: 380,
    image: "/tiny-home-forest-setting-with-trees.png",
    tags: ["Forest", "Hiking", "Stargazing"],
  },
  {
    id: 4,
    name: "Desert Oasis",
    location: "Sedona, AZ",
    price: 240,
    roi: "15.1%",
    rating: 4.7,
    reviews: 94,
    beds: 1,
    baths: 1,
    sqft: 420,
    image: "/tiny-home-desert-landscape-modern.png",
    tags: ["Desert Views", "Solar Power", "Meditation Space"],
  },
]

export function FeaturedProperties() {
  const [activeTab, setActiveTab] = useState<"book" | "invest">("book")

  return (
    <section id="properties" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Featured Properties</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">
            Discover our handpicked collection of tiny homes that offer both exceptional guest experiences and strong
            investment returns.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex bg-background border border-border rounded-lg p-1">
            <Button
              variant={activeTab === "book" ? "default" : "ghost"}
              onClick={() => setActiveTab("book")}
              className={activeTab === "book" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
            >
              Book a Stay
            </Button>
            <Button
              variant={activeTab === "invest" ? "default" : "ghost"}
              onClick={() => setActiveTab("invest")}
              className={activeTab === "invest" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
            >
              Investment View
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property, index) => (
            <Card
              key={property.id}
              className="hover-lift border-0 shadow-lg bg-card overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-accent text-accent-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    {property.rating}
                  </Badge>
                </div>
                {activeTab === "invest" && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {property.roi}
                    </Badge>
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{property.name}</CardTitle>
                <CardDescription className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Property Details */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.beds}
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.baths}
                    </span>
                    <span className="flex items-center">
                      <Square className="w-4 h-4 mr-1" />
                      {property.sqft}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {property.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Pricing and Action */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      ${property.price}
                      {activeTab === "book" && (
                        <span className="text-sm font-normal text-muted-foreground">/night</span>
                      )}
                      {activeTab === "invest" && <span className="text-sm font-normal text-muted-foreground">k</span>}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activeTab === "book" ? `${property.reviews} reviews` : `${property.roi} ROI`}
                    </div>
                  </div>

                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    {activeTab === "book" ? "Book Now" : "Invest"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  )
}
