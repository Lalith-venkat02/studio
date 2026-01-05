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


const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
    'Active': 'default',
    'Maintenance': 'secondary',
    'Offline': 'destructive'
}

export default function UserUnitsPage() {
    const user = mockUsers[0];
    const userUnits = mockGreonUnits.filter(unit => unit.ownerId === user.id);

    const unitImages: { [key: string]: string } = {
      'Living Room Purifier': 'unit-living-room',
      'Bedroom Purifier': 'unit-bedroom',
      'Office Unit': 'unit-office',
    }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My GREON Units</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userUnits.map(unit => {
          const imageId = unitImages[unit.name];
          const image = PlaceHolderImages.find(p => p.id === imageId);

          return (
            <Card key={unit.id} className="overflow-hidden">
                {image && (
                    <div className="relative aspect-[1.618/1]">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            data-ai-hint={image.imageHint}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
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
            </Card>
          )
        })}
        <Card className="border-dashed">
            <CardHeader>
                <CardTitle>Add New Unit</CardTitle>
                <CardDescription>Register a new GREON unit to your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button className="w-full">Register Unit</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
