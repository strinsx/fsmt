"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { flushSync } from "react-dom"
import { Button } from "@/components/ui/button"

export function ThemeSection() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  const current = mounted ? (resolvedTheme === "dark" ? "dark" : "light") : "light"

  const handleToggle = React.useCallback(
    (next: "light" | "dark", anchor: HTMLElement) => {
      if (next === current) return

      const apply = () => setTheme(next)

      if (typeof document.startViewTransition !== "function") {
        apply()
        return
      }

      const rect = anchor.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const maxRadius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const toX = (v: number) => `${(v / viewportWidth) * 100}%`
      const toY = (v: number) => `${(v / viewportHeight) * 100}%`
      const point = (px: number, py: number) => `${toX(px)} ${toY(py)}`
      const toRadius = (r: number) => `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`
      const clipFrom = `circle(0% at ${point(x, y)})`
      const clipTo = `circle(${toRadius(maxRadius)} at ${point(x, y)})`
      const root = document.documentElement
      root.dataset.magicuiThemeVt = "active"
      root.style.setProperty("--magicui-theme-toggle-vt-duration", "400ms")
      root.style.setProperty("--magicui-theme-vt-clip-from", clipFrom)

      const cleanup = () => {
        delete root.dataset.magicuiThemeVt
        root.style.removeProperty("--magicui-theme-toggle-vt-duration")
        root.style.removeProperty("--magicui-theme-vt-clip-from")
      }

      const transition = document.startViewTransition(() => {
        flushSync(apply)
      })

      if (transition?.finished?.finally) {
        transition.finished.finally(cleanup).catch(() => {})
      }

      transition?.ready
        ?.then(() => {
          document.documentElement.animate(
            { clipPath: [clipFrom, clipTo] },
            { duration: 400, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
          )
        })
        .catch(() => {})
    },
    [current, setTheme]
  )

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold">Theme</h2>
        <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={current === "light" ? "default" : "outline"}
          aria-pressed={current === "light"}
          onClick={(e) => handleToggle("light", e.currentTarget)}
        >
          Light Mode
        </Button>
        <Button
          variant={current === "dark" ? "default" : "outline"}
          aria-pressed={current === "dark"}
          onClick={(e) => handleToggle("dark", e.currentTarget)}
        >
          Dark Mode
        </Button>
      </div>
    </section>
  )
}
