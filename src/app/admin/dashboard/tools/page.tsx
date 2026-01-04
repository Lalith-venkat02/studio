import { ContentSuggestionClient } from "@/components/admin/content-suggestion-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminToolsPage() {
  return (
    <div className="space-y-6">
        <ContentSuggestionClient />

        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Advertising Panel Allocation</CardTitle>
                    <CardDescription>Manage branding on physical unit displays.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">This feature is coming soon.</p>
                    <Button disabled>Manage Ad Panels</Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Partner Impact Reports</CardTitle>
                    <CardDescription>Generate and export environmental impact reports for corporate partners.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">This feature is coming soon.</p>
                    <Button disabled>Export Reports</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
