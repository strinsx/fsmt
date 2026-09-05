import { Separator } from "@/components/ui/separator"
import { NotificationsSection } from "@/components/settings/notifications-section"
import { PersonalInfoSection } from "@/components/settings/personal-info-section"
import { ProfileSection, type SettingsUser } from "@/components/settings/profile-section"
import { SettingsHeader } from "@/components/settings/settings-header"
import { ThemeSection } from "@/components/settings/theme-section"

const mockUser: SettingsUser = {
  fullName: "Alex Morgan",
  firstName: "Alex",
  lastName: "Morgan",
  email: "alex.morgan@example.com",
  accountId: "FSMT-928341",
}

export function SettingsPage({ user = mockUser }: { user?: SettingsUser }) {
  return (
    <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
      <div className="flex flex-col gap-6">
        <SettingsHeader />
        <Separator />
        <ProfileSection user={user} />
        <Separator />
        <PersonalInfoSection user={user} />
        <Separator />
        <NotificationsSection />
        <Separator />
        <ThemeSection />
      </div>
    </div>
  )
}
