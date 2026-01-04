import { StatCard } from "@/components/dashboard/stat-card";
import { Leaf, Wind, BarChart, Clock, Droplets, Thermometer } from "lucide-react";
import { generateSensorData, getTotalCO2Absorbed, generateDailyAbsorption, mockGreonUnits } from "@/lib/data";
import { LineChartComponent, GaugeComponent } from "@/components/dashboard/charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart as BarChartRecharts, XAxis, YAxis } from "recharts";

export default function DashboardPage() {
    const sensorData = generateSensorData(1); // Last 24 hours
    const dailyAbsorption = generateDailyAbsorption(30); // Last 30 days
    const currentUnit = mockGreonUnits[0];
    const latestData = sensorData[sensorData.length - 1];
    
    const totalCo2Absorbed = getTotalCO2Absorbed(currentUnit.installationDate);
    const purifiedAir = (totalCo2Absorbed * 509).toLocaleString(); // 1g CO2 is approx 509 liters volume

    const barChartConfig = {
      absorbedGrams: {
        label: "CO₂ Absorbed (g)",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <StatCard title="CO₂ Concentration" value={`${latestData.co2} ppm`} icon={Leaf} description="Live Reading" />
                <StatCard title="Oxygen Level" value={`${latestData.o2} %`} icon={Wind} description="Live Reading" />
                <StatCard title="CO₂ Absorbed Today" value={`${dailyAbsorption[dailyAbsorption.length - 1].absorbedGrams} g`} icon={BarChart} description="Total for Today" />
                <StatCard title="Total CO₂ Absorbed" value={`${totalCo2Absorbed} kg`} icon={Clock} description={`Since ${currentUnit.installationDate}`} />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="lg:col-span-5">
                    <LineChartComponent 
                        data={sensorData}
                        title="Live Air Quality Trends"
                        description="CO₂ and O₂ levels over the last 24 hours."
                        dataKeys={[
                            { name: 'co2', color: '--chart-1' },
                            { name: 'o2', color: '--chart-2' },
                        ]}
                    />
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    <GaugeComponent value={currentUnit.efficiency} label="Unit Efficiency" unit="%" />
                    <GaugeComponent value={currentUnit.uptime} label="Unit Uptime" unit="%" />
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Daily CO₂ Absorption</CardTitle>
                        <CardDescription>Grams of CO₂ absorbed per day over the last 30 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={barChartConfig} className="h-[300px] w-full">
                            <BarChartRecharts accessibilityLayer data={dailyAbsorption} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="date"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                />
                                <YAxis />
                                <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Bar dataKey="absorbedGrams" fill="var(--color-absorbedGrams)" radius={4} />
                            </BarChartRecharts>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Your Environmental Impact</CardTitle>
                        <CardDescription>The positive change you've made with GREON.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center p-4 bg-accent/20 rounded-lg">
                            <div className="bg-accent rounded-full p-3 mr-4">
                                <Wind className="h-6 w-6 text-accent-foreground" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">You have helped purify</p>
                                <p className="text-2xl font-bold">{purifiedAir} Liters of air</p>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-primary/10 rounded-lg">
                             <div className="bg-primary rounded-full p-3 mr-4">
                                <Leaf className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Equivalent to planting</p>
                                <p className="text-2xl font-bold">{(totalCo2Absorbed / 21).toFixed(0)} Trees</p>
                                <p className="text-xs text-muted-foreground">(based on an average tree absorbing 21kg CO₂/year)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
