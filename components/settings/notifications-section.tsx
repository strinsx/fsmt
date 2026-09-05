"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function NotificationsSection() {
  const [inAppNotifications, setInAppNotifications] = React.useState(true)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Choose how you want to be notified.</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <Label htmlFor="in-app-notifications">In-app Notifications</Label>
        <Switch id="in-app-notifications" checked={inAppNotifications} onCheckedChange={setInAppNotifications} />
      </div>
    </section>
  )
}
