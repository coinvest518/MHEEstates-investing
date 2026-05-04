"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"

const fmtMoney = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })

interface Props {
  dealId: string
  baseline: number
  target: number
}

export function LiveProgressMeter({ baseline, target }: Props) {
  const [amount, setAmount] = useState<number>(baseline)

  const pct = Math.min(100, Math.round((amount / target) * 100))

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-baseline gap-2">
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">${fmtMoney(amount)}</span> pooled
          </span>
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
        Real-time tracking · updated as contributions arrive
      </div>
    </div>
  )
}
