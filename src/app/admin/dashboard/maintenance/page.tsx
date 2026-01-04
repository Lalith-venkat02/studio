import { mockMaintenanceTickets, mockGreonUnits, mockUsers } from "@/lib/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    'Resolved': 'default',
    'In Progress': 'secondary',
    'Open': 'destructive'
}

const technicians = ["John Doe", "Jane Smith", "Peter Jones"];

export default function AdminMaintenancePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Schedule</CardTitle>
        <CardDescription>
          Manage and assign maintenance tickets.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMaintenanceTickets.map(ticket => {
              const unit = mockGreonUnits.find(u => u.id === ticket.unitId);
              const user = mockUsers.find(u => u.id === ticket.userId);
              return (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{unit?.name}</TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[ticket.status]}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.requestDate}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{ticket.description}</TableCell>
                  <TableCell>{ticket.technician || "Unassigned"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Ticket</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Assign Technician</DropdownMenuLabel>
                        {technicians.map(tech => (
                           <DropdownMenuItem key={tech}>Assign to {tech}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
