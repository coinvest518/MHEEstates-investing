"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Star, Wifi, Car, Coffee, Waves, Shield } from "lucide-react"

export function BookingInterface() {
  const [selectedDates, setSelectedDates] = useState({ checkin: "", checkout: "" })
  const [guests, setGuests] = useState(2)
  const [step, setStep] = useState(1)

  return (
    <section id="book" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Book Your Tranquil Escape</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Experience the perfect blend of comfort and nature with our seamless booking process.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="hover-lift border-0 shadow-lg bg-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Book Your Stay</span>
                </CardTitle>
                <CardDescription>Step {step} of 3</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="checkin">Check-in</Label>
                        <Input
                          id="checkin"
                          type="date"
                          value={selectedDates.checkin}
                          onChange={(e) => setSelectedDates({ ...selectedDates, checkin: e.target.value })}
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkout">Check-out</Label>
                        <Input
                          id="checkout"
                          type="date"
                          value={selectedDates.checkout}
                          onChange={(e) => setSelectedDates({ ...selectedDates, checkout: e.target.value })}
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="guests">Guests</Label>
                      <div className="flex items-center space-x-3 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="h-8 w-8 p-0"
                        >
                          -
                        </Button>
                        <span className="text-lg font-medium w-8 text-center">{guests}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(Math.min(4, guests + 1))}
                          className="h-8 w-8 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => setStep(2)}
                    >
                      Search Properties
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-2">Selected Property</h3>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <img
                          src="/cozy-tiny-home-interior.png"
                          alt="Selected property"
                          className="w-full h-24 object-cover rounded-lg mb-3"
                        />
                        <h4 className="font-medium">Serenity Cabin</h4>
                        <p className="text-sm text-muted-foreground">Asheville, NC</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>$180 × 3 nights</span>
                        <span>$540</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>$50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>$35</span>
                      </div>
                      <hr className="border-border" />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>$625</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => setStep(3)}
                    >
                      Continue to Payment
                    </Button>

                    <Button variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
                      Back to Search
                    </Button>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-4">Payment Details</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" className="bg-background" />
                      </div>

                      <div>
                        <Label htmlFor="card">Card Number</Label>
                        <Input id="card" placeholder="1234 5678 9012 3456" className="bg-background" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry</Label>
                          <Input id="expiry" placeholder="MM/YY" className="bg-background" />
                        </div>
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" className="bg-background" />
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Complete Booking
                    </Button>

                    <Button variant="outline" className="w-full bg-transparent" onClick={() => setStep(2)}>
                      Back to Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Property Showcase */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Booking Properties */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Lakeside Serenity",
                  location: "Lake Tahoe, CA",
                  price: 280,
                  rating: 4.9,
                  reviews: 89,
                  image: "/lakeside-tiny-home-with-deck.png",
                  amenities: [
                    { icon: <Wifi className="h-4 w-4" />, name: "WiFi" },
                    { icon: <Car className="h-4 w-4" />, name: "Parking" },
                    { icon: <Coffee className="h-4 w-4" />, name: "Kitchen" },
                    { icon: <Waves className="h-4 w-4" />, name: "Lake Access" },
                  ],
                },
                {
                  name: "Mountain Retreat",
                  location: "Colorado Springs, CO",
                  price: 220,
                  rating: 4.8,
                  reviews: 127,
                  image: "/mountain-tiny-home-with-view.png",
                  amenities: [
                    { icon: <Wifi className="h-4 w-4" />, name: "WiFi" },
                    { icon: <Car className="h-4 w-4" />, name: "Parking" },
                    { icon: <Coffee className="h-4 w-4" />, name: "Kitchen" },
                    { icon: <Star className="h-4 w-4" />, name: "Hot Tub" },
                  ],
                },
              ].map((property, index) => (
                <Card
                  key={index}
                  className="hover-lift border-0 shadow-lg bg-card overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-background/90 text-foreground">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {property.rating}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{property.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.location}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, i) => (
                        <div
                          key={i}
                          className="flex items-center space-x-1 text-xs text-muted-foreground bg-muted/50 rounded-full px-2 py-1"
                        >
                          {amenity.icon}
                          <span>{amenity.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="text-xl font-bold text-primary">
                          ${property.price}
                          <span className="text-sm font-normal text-muted-foreground">/night</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{property.reviews} reviews</div>
                      </div>

                      <Button
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => setStep(2)}
                      >
                        Select
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Booking Benefits */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle>Why Book with Tranquil Homes?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Secure Booking</h3>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Your payment is protected with bank-level security and instant confirmation.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">24/7 Support</h3>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Our concierge team is available around the clock for any assistance.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                    <p className="text-sm text-muted-foreground text-pretty">
                      Every property is personally inspected and meets our high standards.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
