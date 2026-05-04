"use client"

import { useEffect, useRef } from "react"
import Script from "next/script"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.HTMLAttributes<HTMLElement> & {
        "agent-id"?: string
        "dismissible"?: string
      }
    }
  }
}

const IDLE_TRIGGER_MS = 45_000
const EXIT_INTENT_COOLDOWN_MS = 5 * 60_000
const SESSION_KEY = "communityacre-convai-last-opened"

export function ElevenLabsConvaiWidget() {
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const shouldThrottle = () => {
      const last = Number(window.sessionStorage.getItem(SESSION_KEY) ?? "0")
      return Number.isFinite(last) && Date.now() - last < EXIT_INTENT_COOLDOWN_MS
    }

    // Best-effort: click the widget's own internal launcher via its shadow DOM
    const tryExpand = () => {
      if (shouldThrottle()) return
      window.sessionStorage.setItem(SESSION_KEY, String(Date.now()))
      const el = document.querySelector("elevenlabs-convai")
      if (el?.shadowRoot) {
        const btn = el.shadowRoot.querySelector("button") as HTMLButtonElement | null
        btn?.click()
      }
    }

    const scheduleIdle = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(tryExpand, IDLE_TRIGGER_MS)
    }

    const onActivity = () => scheduleIdle()
    const onMouseLeave = (e: MouseEvent) => { if (e.clientY <= 0) tryExpand() }
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden" && idleTimer.current) {
        clearTimeout(idleTimer.current)
      }
    }

    scheduleIdle()
    window.addEventListener("pointermove", onActivity, { passive: true })
    window.addEventListener("scroll", onActivity, { passive: true })
    window.addEventListener("keydown", onActivity)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      window.removeEventListener("pointermove", onActivity)
      window.removeEventListener("scroll", onActivity)
      window.removeEventListener("keydown", onActivity)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [])

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
      />
      {/* ElevenLabs renders its own floating orb launcher — no wrapper needed */}
      <elevenlabs-convai
        agent-id="agent_1501kqt727wmec0vsy4g7gj0hbpx"
        dismissible="true"
      />
    </>
  )
}