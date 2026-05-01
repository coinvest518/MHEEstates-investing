"use client"

import { useEffect, useRef, useState } from "react"
import { Progress } from "@/components/ui/progress"

const STORAGE_PREFIX = "ca-live-raised:"
// Cap at 95% of target so we never auto-fund the deal in the demo
const SOFT_CAP_PCT = 0.95

// Four-band ticker — each band fires on its own cadence with its own amount range.
// All amounts are in dollars.
const BANDS: { intervalMs: number; min: number; max: number; label: string }[] = [
  { intervalMs: 5_000, min: 0.05, max: 0.5, label: "5s" },        // pennies / quarters
  { intervalMs: 10_000, min: 0.5, max: 3, label: "10s" },         // small bills
  { intervalMs: 30_000, min: 3, max: 20, label: "30s" },          // bigger drops
  { intervalMs: 60 * 60 * 1000, min: 20, max: 100, label: "1h" }, // hourly larger contributions
]

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const rand = (min: number, max: number) => Math.random() * (max - min) + min

interface Props {
  dealId: string
  baseline: number
  target: number
}

export function LiveProgressMeter({ dealId, baseline, target }: Props) {
  const cap = Math.floor(target * SOFT_CAP_PCT * 100) / 100
  const [amount, setAmount] = useState<number>(baseline)
  const [flash, setFlash] = useState<number | null>(null)
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Hydrate from localStorage so refreshes don't reset the meter.
  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_PREFIX + dealId)
    if (stored) {
      const parsed = parseFloat(stored)
      if (Number.isFinite(parsed) && parsed >= baseline) {
        setAmount(Math.min(parsed, cap))
      }
    }
  }, [dealId, baseline, cap])

  // Catch up for time the page was closed: add accrual based on elapsed time
  // and the band cadences. Only runs on first mount.
  useEffect(() => {
    if (typeof window === "undefined") return
    const lastTsKey = STORAGE_PREFIX + dealId + ":lastTs"
    const lastTs = parseInt(window.localStorage.getItem(lastTsKey) ?? "0", 10)
    const now = Date.now()
    if (lastTs > 0 && now > lastTs) {
      const elapsedMs = now - lastTs
      let accrued = 0
      for (const b of BANDS) {
        const ticks = Math.floor(elapsedMs / b.intervalMs)
        // Use mid-range to avoid extremes when catching up
        const avg = (b.min + b.max) / 2
        accrued += ticks * avg
      }
      if (accrued > 0) {
        setAmount((prev) => {
          const next = Math.min(prev + accrued, cap)
          window.localStorage.setItem(STORAGE_PREFIX + dealId, next.toFixed(2))
          return next
        })
      }
    }
    window.localStorage.setItem(lastTsKey, String(now))
  }, [dealId, cap])

  // Schedule one timer per band
  useEffect(() => {
    const timers: ReturnType<typeof setInterval>[] = []
    let cancelled = false

    const apply = (band: (typeof BANDS)[number]) => {
      if (cancelled) return
      setAmount((prev) => {
        if (prev >= cap) return prev
        const inc = Math.round(rand(band.min, band.max) * 100) / 100
        const next = Math.min(prev + inc, cap)
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_PREFIX + dealId, next.toFixed(2))
          window.localStorage.setItem(STORAGE_PREFIX + dealId + ":lastTs", String(Date.now()))
        }
        // Flash the +amount briefly (only meaningful for visible bands)
        if (band.intervalMs <= 30_000) {
          setFlash(inc)
          if (flashTimeout.current) clearTimeout(flashTimeout.current)
          flashTimeout.current = setTimeout(() => setFlash(null), 1800)
        }
        return next
      })
    }

    for (const band of BANDS) {
      const t = setInterval(() => apply(band), band.intervalMs)
      timers.push(t)
    }

    return () => {
      cancelled = true
      timers.forEach(clearInterval)
      if (flashTimeout.current) clearTimeout(flashTimeout.current)
    }
  }, [dealId, cap])

  const pct = Math.min(100, Math.round((amount / target) * 100))

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-baseline gap-2">
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">${fmtMoney(amount)}</span> pooled
          </span>
          {flash !== null && (
            <span
              key={`${amount}-${flash}`}
              className="text-[10px] font-bold text-primary animate-fade-in-up"
              aria-live="polite"
            >
              +${fmtMoney(flash)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-primary opacity-75 animate-pulse-soft" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          <span className="font-bold text-primary">{pct}%</span>
        </div>
      </div>
      <Progress value={pct} className="h-1.5" />
      <div className="text-[10px] text-muted-foreground/80">
        Live · updates as contributions come in
      </div>
    </div>
  )
}
