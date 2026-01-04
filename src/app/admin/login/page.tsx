import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GreonLogo from "@/components/greon-logo"

export default function AdminLoginForm() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-background px-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <Link href="/" className="flex items-center justify-center mb-4 gap-2">
            <GreonLogo className="h-8 w-auto text-primary" />
            <span className="text-xl font-bold text-primary font-headline">GREON</span>
          </Link>
          <CardTitle className="text-2xl">Administrator Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@greon.com"
                required
                defaultValue="admin@greon.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/admin/dashboard">Login</Link>
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Access for authorized personnel only.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
