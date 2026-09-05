import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type SettingsUser = {
  fullName: string
  firstName: string
  lastName: string
  email: string
  accountId: string
  avatarUrl?: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function ProfileSection({ user }: { user: SettingsUser }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold">Profile</h2>
        <p className="text-sm text-muted-foreground">View your personal profile information.</p>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={user.avatarUrl} alt={user.fullName} />
          <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground">{user.fullName}</p>
          <p className="text-sm text-muted-foreground">Account ID: {user.accountId}</p>
        </div>
      </div>
    </section>
  )
}
