"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Calendar, Sprout, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import type { Deal } from "@/lib/deals"
import { progressPct } from "@/lib/deals"

const STATUS_LABEL: Record<Deal["status"], string> = {
  active: "Active",
  "coming-soon": "Our Vision",
  funded: "Funded",
}

const STATUS_CLASSES: Record<Deal["status"], string> = {
  active: "bg-primary text-primary-foreground",
  "coming-soon": "bg-accent/20 text-accent border border-accent/40",
  funded: "bg-secondary text-secondary-foreground",
}

function ImageGallery({ images, title }: { images: Deal["images"]; title: string }) {
  const [idx, setIdx] = useState(0)
  const hasMany = images.length > 1
  const current = images[idx] ?? images[0]

  return (
    <div className="aspect-[4/3] bg-muted relative overflow-hidden">
      <img
        key={current.src}
        src={current.src}
        alt={current.alt ?? title}
        className="w-full h-full object-cover transition-opacity duration-300"
      />
      {hasMany && (
        <>
          <button
            onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === idx ? "bg-white scale-125" : "bg-white/50"
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function LiveDealCard({ deal, index = 0 }: { deal: Deal; index?: number }) {
  const pct = progressPct(deal)
  const isComingSoon = deal.status === "coming-soon"

  return (
    <Card
      className="overflow-hidden deal-card-glow border border-border bg-card flex flex-col reveal"
      style={{ "--reveal-delay": `${index * 110}ms` } as React.CSSProperties}
    >
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img
          src={deal.images[0]?.src ?? "/placeholder.jpg"}
          alt={deal.images[0]?.alt ?? deal.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
        <div className="absolute top-2.5 left-2.5">
          <Badge className={STATUS_CLASSES[deal.status]}>{STATUS_LABEL[deal.status]}</Badge>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <Badge variant="secondary" className="bg-background/85 text-foreground backdrop-blur-sm text-[11px]">
            <MapPin className="w-3 h-3 mr-1" />
            {deal.location}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 flex flex-col flex-1 gap-3">
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold text-card-foreground leading-snug">{deal.title}</h3>
          <p className="text-sm text-muted-foreground text-pretty line-clamp-3">{deal.developmentPlan}</p>
        </div>

        {!isComingSoon && (
          <>
            <div className="grid grid-cols-2 gap-3 text-sm bg-muted/40 rounded-lg p-3">
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Purchase price</div>
                <div className="font-bold text-foreground">${deal.purchasePrice.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-0.5">Target raise</div>
                <div className="font-bold text-foreground">${deal.targetRaise.toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">${deal.raisedSoFar.toLocaleString()} pooled</span>
                <span className="font-bold text-primary">{pct}%</span>
              </div>
              <Progress value={pct} className="h-1.5" />
            </div>
          </>
        )}

        {deal.timeline && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            <span>Target: {deal.timeline}</span>
          </div>
        )}

        <div className="flex gap-2 mt-auto pt-1">
          <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
            <a href="#join">
              <Sprout className="mr-1.5 h-3.5 w-3.5" />
              {isComingSoon ? "Join the Vision" : "Contribute"}
            </a>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 text-sm">
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{deal.title}</DialogTitle>
                <DialogDescription>
                  {deal.location}
                  {deal.parcelId ? ` · Parcel ${deal.parcelId}` : ""}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-5">
                <div className="rounded-xl overflow-hidden border border-border">
                  <ImageGallery images={deal.images} title={deal.title} />
                </div>
                <p className="text-sm text-foreground text-pretty">{deal.developmentPlan}</p>
                {!isComingSoon && (
                  <div className="grid grid-cols-2 gap-4 text-sm border border-border rounded-xl p-4 bg-muted/30">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Purchase price</div>
                      <div className="font-bold text-lg">${deal.purchasePrice.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Target raise</div>
                      <div className="font-bold text-lg">${deal.targetRaise.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Pooled so far</div>
                      <div className="font-bold">${deal.raisedSoFar.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Progress</div>
                      <div className="font-bold text-primary">{pct}%</div>
                    </div>
                  </div>
                )}
                {deal.highlights.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Highlights</h4>
                    <ul className="space-y-2">
                      {deal.highlights.map((h) => (
                        <li key={h} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href="#join">
                      {isComingSoon ? "Join the Vision" : "Contribute Now"}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
                    <a
                      href="https://www.zeffy.com/en-US/peer-to-peer/buy-land-together"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Zeffy
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
