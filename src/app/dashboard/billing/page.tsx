import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { mockBillingHistory } from "@/lib/data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, FileText } from "lucide-react"

export default function UserBillingPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              Review your past payments and download invoices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBillingHistory.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" asChild>
                        <a href={invoice.invoiceUrl}>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">GREON Standard Plan</p>
            <p className="text-muted-foreground">$49.99 / month</p>
            <p className="text-sm mt-2">
              Renews on: July 30, 2024
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Manage Subscription</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Impact Reports</CardTitle>
            <CardDescription>Download your environmental impact reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4"/>
              Download Q2 2024 Report (PDF)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
