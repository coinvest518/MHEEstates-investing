"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { BookOpen, Download, FileText, Gavel, KeyRound, Maximize2 } from "lucide-react"

const ARTICLES = [
  {
    id: "tax-deeds",
    icon: FileText,
    badge: "Tax deeds",
    title: "Tax Deeds: How counties sell title outright",
    summary:
      "When property owners go years without paying their taxes, the county takes title and sells the deed at auction. This guide walks through the difference between liens and deeds, how the redemption period works, and what you actually walk away with after the gavel drops.",
    takeaways: [
      "When a county uses lien certificates vs. selling the deed outright",
      "Redemption-period rules — how long the prior owner has to reclaim",
      "Clearing title after sale: quiet-title actions, title insurance, and timing",
    ],
    pdf: "/pdfs/tax-deeds.pdf",
  },
  {
    id: "buying-land-under-1000",
    icon: Gavel,
    badge: "Land auctions",
    title: "Buying Land for Under $1,000",
    summary:
      "Real walkthrough of the auctions where parcels still go for triple-digits. Where to find them, how to read a parcel list, and the due-diligence checklist that separates a $0 lot from a $5K lot — using the same playbook we used to win our first two parcels for $1,075 and $1,500.",
    takeaways: [
      "Where these auctions actually happen — county sites, surplus lists, and aggregators",
      "What makes a lot worth $0 vs. worth $5K (zoning, utilities, access)",
      "Pre-bid due diligence checklist — the 6 things to verify before you raise the paddle",
    ],
    pdf: "/pdfs/buying-land-under-1000.pdf",
  },
  {
    id: "buy-a-home-programs",
    icon: KeyRound,
    badge: "First-time programs",
    title: "Buy a Home with These Free Programs",
    summary:
      "If land at auction isn't your move, there's a stack of state and federal programs designed to put first-time buyers into a home with very little down. Income caps, qualifying neighborhoods, and how to combine them with land-deal strategies for the best of both.",
    takeaways: [
      "State and federal first-time-buyer programs worth knowing in 2026",
      "Income caps and household-size rules — who actually qualifies",
      "How to stack a homeownership program on top of a land-deal strategy",
    ],
    pdf: "/pdfs/buy-a-home-programs.pdf",
  },
  {
    id: "wholesaler-contract-pack",
    icon: BookOpen,
    badge: "Contracts",
    title: "Wholesaler Contract Pack",
    summary:
      "If you want to flip a deal you don't intend to close on yourself, you need an assignment-of-contract setup. This is the contract pack — what each form does, how to structure a flip with no money down, and the legal disclosures that keep you out of trouble.",
    takeaways: [
      "What 'assignment of contract' actually means and when it's enforceable",
      "Structuring a no-money-down flip — escrow, EMD, and assignment fees",
      "Legal disclosures by state — when you have to disclose your role as wholesaler",
    ],
    pdf: "/pdfs/wholesaler-contract-pack.pdf",
  },
]

export function EducationArticles() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = ARTICLES.find((a) => a.id === openId) ?? null

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6">
        {ARTICLES.map((article, i) => {
          const Icon = article.icon
          return (
            <Card
              key={article.id}
              id={article.id}
              className="border-border bg-card hover-lift reveal flex flex-col"
              style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    {article.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl leading-snug">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 flex-1">
                <p className="text-sm text-muted-foreground text-pretty">{article.summary}</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
                    Key takeaways
                  </p>
                  <ul className="space-y-1.5">
                    {article.takeaways.map((t) => (
                      <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-auto pt-2">
                  <Button
                    onClick={() => setOpenId(article.id)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
                  >
                    <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
                    Read the full guide
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10 text-sm"
                  >
                    <a href={article.pdf} download>
                      <Download className="mr-1.5 h-3.5 w-3.5" />
                      PDF
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog open={openId !== null} onOpenChange={(v) => !v && setOpenId(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden">
          {open && (
            <>
              <DialogHeader className="px-6 pt-5 pb-3 border-b">
                <DialogTitle>{open.title}</DialogTitle>
              </DialogHeader>
              <div className="flex-1 bg-muted overflow-hidden">
                <iframe
                  src={open.pdf}
                  title={open.title}
                  className="w-full h-full"
                />
              </div>
              <div className="px-6 py-3 border-t flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={open.pdf} download>
                    <Download className="mr-1.5 h-3.5 w-3.5" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
