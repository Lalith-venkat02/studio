import { StatCard } from "@/components/dashboard/stat-card";
import { Leaf, Users, Package, Wrench } from "lucide-react";
import { mockGreonUnits, mockUsers } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    'Active': 'default',
    'Maintenance': 'secondary',
    'Offline': 'destructive'
}

export default function AdminDashboardPage() {
    const totalUnits = mockGreonUnits.length;
    const activeUnits = mockGreonUnits.filter(u => u.status === 'Active').length;
    const maintenanceUnits = mockGreonUnits.filter(u => u.status === 'Maintenance').length;
    const totalUsers = mockUsers.length;

    const averageEfficiency = mockGreonUnits.reduce((acc, u) => acc + u.efficiency, 0) / totalUnits;
    
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <StatCard title="Total Units" value={totalUnits.toString()} icon={Package} description={`${activeUnits} active`} />
                <StatCard title="Total Users" value={totalUsers.toString()} icon={Users} description="Registered customers" />
                <StatCard title="Avg. Efficiency" value={`${averageEfficiency.toFixed(1)}%`} icon={Leaf} description="Across all active units" />
                <StatCard title="Maintenance Queue" value={maintenanceUnits.toString()} icon={Wrench} description="Units needing attention" />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>All GREON Units</CardTitle>
                    <CardDescription>A complete overview of all deployed units.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Unit ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Efficiency</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockGreonUnits.map(unit => {
                                const owner = mockUsers.find(u => u.id === unit.ownerId);
                                return (
                                <TableRow key={unit.id}>
                                    <TableCell className="font-mono text-xs">{unit.id}</TableCell>
                                    <TableCell className="font-medium">{unit.name}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariantMap[unit.status]}>{unit.status}</Badge>
                                    </TableCell>
                                    <TableCell>{owner?.name || 'Unassigned'}</TableCell>
                                    <TableCell>{unit.location}</TableCell>
                                    <TableCell className="text-right">{unit.efficiency}%</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                                )}
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
