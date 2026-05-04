"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

const IDLE_OPEN_DELAY_MS = 45_000
const PROMPT_AUTO_HIDE_MS = 20_000
const EXIT_INTENT_COOLDOWN_MS = 5 * 60_000
const SESSION_KEY = "communityacre-convai-last-opened"

export function ElevenLabsConvaiWidget() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [showWidget, setShowWidget] = useState(false)
  const [isScriptReady, setIsScriptReady] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const promptHideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const clearTimers = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current)
      if (promptHideTimer.current) clearTimeout(promptHideTimer.current)
    }

    const shouldThrottle = () => {
      const lastOpened = Number(window.sessionStorage.getItem(SESSION_KEY) ?? "0")
      return Number.isFinite(lastOpened) && Date.now() - lastOpened < EXIT_INTENT_COOLDOWN_MS
    }

    const showLauncher = () => {
      if (!isScriptReady || shouldThrottle() || showWidget) return
      setShowPrompt(true)
      clearTimers()
      promptHideTimer.current = setTimeout(() => setShowPrompt(false), PROMPT_AUTO_HIDE_MS)
    }

    const scheduleIdleOpen = () => {
      if (showPrompt || showWidget) return
      if (idleTimer.current) clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(showLauncher, IDLE_OPEN_DELAY_MS)
    }

    const onActivity = () => {
      if (!showPrompt && !showWidget) scheduleIdleOpen()
    }

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) showLauncher()
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        clearTimers()
      }
    }

    scheduleIdleOpen()
    window.addEventListener("pointermove", onActivity, { passive: true })
    window.addEventListener("scroll", onActivity, { passive: true })
    window.addEventListener("keydown", onActivity)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      clearTimers()
      window.removeEventListener("pointermove", onActivity)
      window.removeEventListener("scroll", onActivity)
      window.removeEventListener("keydown", onActivity)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [showPrompt, showWidget, isScriptReady])

  const openWidget = () => {
    if (!isScriptReady) return
    window.sessionStorage.setItem(SESSION_KEY, String(Date.now()))
    setShowPrompt(false)
    setShowWidget(true)
  }

  return (
    <>
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        strategy="afterInteractive"
        onLoad={() => setIsScriptReady(true)}
      />

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3" suppressHydrationWarning>
        {showPrompt && !showWidget ? (
          <button
            type="button"
            onClick={openWidget}
            className="rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            Talk with CommunityAcre
          </button>
        ) : null}

        <div
          className={showWidget ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}
          aria-hidden={!showWidget}
        >
          <elevenlabs-convai
            agent-id="agent_1501kqt727wmec0vsy4g7gj0hbpx"
            variant="expanded"
            dismissible="true"
          />
        </div>
      </div>
    </>
  )
}