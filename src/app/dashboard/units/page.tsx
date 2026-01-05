
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockGreonUnits, mockUsers } from "@/lib/data"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { RegisterUnitForm } from "@/components/dashboard/register-unit-form";
import { useState } from "react";
import type { GreonUnit } from "@/lib/types";
import { format, addMonths } from "date-fns";


const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    'Active': 'default',
    'Maintenance': 'secondary',
    'Offline': 'destructive'
}

export default function UserUnitsPage() {
    const user = mockUsers[0];
    // Use state to manage units so we can update it
    const [userUnits, setUserUnits] = useState(() => mockGreonUnits.filter(unit => unit.ownerId === user.id));

    const unitImages: { [key: string]: string } = {
      'Living Room Purifier': 'unit-living-room',
      'Bedroom Purifier': 'unit-bedroom',
      'Office Unit': 'unit-office',
    }

    const handleRegisterUnit = (data: { unitId: string; name: string; location: string }) => {
      const newUnit: GreonUnit = {
        id: data.unitId,
        name: data.name,
        location: data.location,
        status: 'Active',
        installationDate: format(new Date(), 'yyyy-MM-dd'),
        nextAlgaeReplacement: format(addMonths(new Date(), 6), 'yyyy-MM-dd'),
        efficiency: 100,
        uptime: 100,
        ownerId: user.id,
      };

      // In a real app, this would be an API call.
      // Here, we just update the local state.
      setUserUnits(prevUnits => [...prevUnits, newUnit]);
      mockGreonUnits.push(newUnit); // Also push to mock data if other pages need it
    };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My GREON Units</h1>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {userUnits.map(unit => {
          const imageId = unitImages[unit.name] || 'unit-office'; // fallback image
          const image = PlaceHolderImages.find(p => p.id === imageId);

          return (
            <Card key={unit.id} className="overflow-hidden flex flex-row">
                {image && (
                    <div className="relative w-1/3">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            data-ai-hint={image.imageHint}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
              <div className="flex flex-col w-2/3">
                <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                        <CardTitle>{unit.name}</CardTitle>
                        <CardDescription>{unit.location}</CardDescription>
                    </div>
                    <Badge variant={statusVariantMap[unit.status]}>{unit.status}</Badge>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Efficiency</span>
                        <span>{unit.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Uptime</span>
                        <span>{unit.uptime}%</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Installation Date</span>
                        <span>{unit.installationDate}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Replacement</span>
                        <span>{unit.nextAlgaeReplacement}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                        View Details
                    </Button>
                </CardFooter>
              </div>
            </Card>
          )
        })}
        <Card className="border-dashed min-h-[280px]">
            <CardHeader>
                <CardTitle>Add New Unit</CardTitle>
                <CardDescription>Register a new GREON unit to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterUnitForm onRegister={handleRegisterUnit} />
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
