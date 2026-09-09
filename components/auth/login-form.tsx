"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get("email") ?? "")
    const password = String(fd.get("password") ?? "")
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success("Logged in")
    router.push("/")
    router.refresh()
  }

  return (
    <div className={`flex flex-col gap-6 ${className ?? ""}`} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="m@example.com" autoComplete="email" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" required className="pr-10" />
                  <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </Field>
              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
