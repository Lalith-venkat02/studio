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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockMaintenanceTickets, mockGreonUnits, mockUsers } from "@/lib/data"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    'Resolved': 'default',
    'In Progress': 'secondary',
    'Open': 'destructive'
}

export default function UserMaintenancePage() {
    const user = mockUsers[0];
    const userUnits = mockGreonUnits.filter(unit => unit.ownerId === user.id);
    const userTickets = mockMaintenanceTickets.filter(ticket => ticket.userId === user.id);

  return (
    <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Maintenance History</CardTitle>
                    <CardDescription>View the history of your maintenance requests.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Unit</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Technician</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userTickets.map(ticket => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-medium">{mockGreonUnits.find(u => u.id === ticket.unitId)?.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariantMap[ticket.status]}>{ticket.status}</Badge>
                                    </TableCell>
                                    <TableCell>{ticket.requestDate}</TableCell>
                                    <TableCell>{ticket.technician || 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Raise a Maintenance Request</CardTitle>
                    <CardDescription>
                    Experiencing an issue? Let us know.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="unit">Select Unit</Label>
                        <Select>
                            <SelectTrigger id="unit">
                                <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                            <SelectContent>
                                {userUnits.map(unit => (
                                    <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Describe the issue</Label>
                        <Textarea id="description" placeholder="e.g., The unit is making a strange noise."/>
                    </div>
                    <Button>Submit Request</Button>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
