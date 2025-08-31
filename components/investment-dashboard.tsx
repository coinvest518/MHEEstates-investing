"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Home, Users, BarChart3, PieChart } from "lucide-react"

export function InvestmentDashboard() {
  return (
    <section id="invest" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Investment Performance</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Track your tiny home investments with real-time analytics and comprehensive performance metrics.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              title: "Total Portfolio Value",
              value: "$1.2M",
              change: "+12.5%",
              icon: <DollarSign className="h-6 w-6 text-primary" />,
              trend: "up",
            },
            {
              title: "Average ROI",
              value: "14.8%",
              change: "+2.1%",
              icon: <TrendingUp className="h-6 w-6 text-primary" />,
              trend: "up",
            },
            {
              title: "Properties Owned",
              value: "8",
              change: "+2",
              icon: <Home className="h-6 w-6 text-primary" />,
              trend: "up",
            },
            {
              title: "Occupancy Rate",
              value: "92%",
              change: "+5%",
              icon: <Users className="h-6 w-6 text-primary" />,
              trend: "up",
            },
          ].map((metric, index) => (
            <Card
              key={index}
              className="hover-lift border-0 shadow-lg bg-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-card-foreground">{metric.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  <Badge
                    variant="secondary"
                    className={`${metric.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {metric.change}
                  </Badge>
                  <span className="text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Revenue Chart */}
          <Card className="hover-lift border-0 shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Monthly Revenue</span>
              </CardTitle>
              <CardDescription>Revenue trends over the past 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive chart would be here</p>
                  <p className="text-sm text-muted-foreground">Showing steady 15% growth</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Distribution */}
          <Card className="hover-lift border-0 shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-primary" />
                <span>Portfolio Distribution</span>
              </CardTitle>
              <CardDescription>Investment allocation by property type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Portfolio breakdown chart</p>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                        Mountain Retreats
                      </span>
                      <span>45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
                        Lakeside Homes
                      </span>
                      <span>35%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div className="w-3 h-3 bg-chart-3 rounded-full mr-2"></div>
                        Forest Cabins
                      </span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Investment Opportunities */}
        <Card className="hover-lift border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="text-2xl">New Investment Opportunities</CardTitle>
            <CardDescription>Exclusive deals for existing investors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Coastal Retreat Development",
                  location: "Big Sur, CA",
                  minInvestment: "$50k",
                  expectedROI: "18-22%",
                  timeline: "Q2 2025",
                },
                {
                  name: "Mountain Village Expansion",
                  location: "Aspen, CO",
                  minInvestment: "$75k",
                  expectedROI: "16-20%",
                  timeline: "Q3 2025",
                },
                {
                  name: "Desert Wellness Community",
                  location: "Joshua Tree, CA",
                  minInvestment: "$40k",
                  expectedROI: "15-19%",
                  timeline: "Q4 2025",
                },
              ].map((opportunity, index) => (
                <div key={index} className="bg-background rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{opportunity.name}</h3>
                    <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min. Investment:</span>
                      <span className="font-medium">{opportunity.minInvestment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expected ROI:</span>
                      <span className="font-medium text-primary">{opportunity.expectedROI}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Timeline:</span>
                      <span className="font-medium">{opportunity.timeline}</span>
                    </div>
                  </div>

                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
