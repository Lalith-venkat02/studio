"use client";

import { StatCard } from "@/components/dashboard/stat-card";
import { Leaf, Wind, BarChart, Clock } from "lucide-react";
import { generateSensorData, getTotalCO2Absorbed, generateDailyAbsorption, mockGreonUnits, type SensorDataPoint, type DailyAbsorption } from "@/lib/data";
import { LineChartComponent, GaugeComponent } from "@/components/dashboard/charts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart as BarChartRecharts, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";

export default function DashboardPage() {
    const [sensorData, setSensorData] = useState<SensorDataPoint[]>([]);
    const [dailyAbsorption, setDailyAbsorption] = useState<DailyAbsorption[]>([]);
    const [totalCo2Absorbed, setTotalCo2Absorbed] = useState<number>(0);
    const [purifiedAir, setPurifiedAir] = useState<string>('0');
    const [treeEquivalent, setTreeEquivalent] = useState<string>('0');
    
    const currentUnit = mockGreonUnits[0];

    useEffect(() => {
        const sData = generateSensorData(1);
        const dAbsorption = generateDailyAbsorption(30);
        const totalAbsorption = getTotalCO2Absorbed(currentUnit.installationDate);
        const totalCo2AbsorbedAllTime = (new Date().getTime() - new Date(currentUnit.installationDate).getTime()) / (1000 * 3600 * 24 * 7) * totalAbsorption / 1000;
        
        setSensorData(sData);
        setDailyAbsorption(dAbsorption);
        setTotalCo2Absorbed(totalAbsorption);
        setPurifiedAir((totalCo2AbsorbedAllTime * 1000 * 509).toLocaleString(undefined, { maximumFractionDigits: 0 }));
        setTreeEquivalent((totalCo2AbsorbedAllTime / (21/52)).toFixed(0)); // 21kg per year -> per week

    }, [currentUnit.installationDate]);
    
    const latestData = sensorData.length > 0 ? sensorData[sensorData.length - 1] : { co2: 0, o2: 0 };
    const latestDailyAbsorption = dailyAbsorption.length > 0 ? dailyAbsorption[dailyAbsorption.length - 1] : { absorbedGrams: 0 };

    const barChartConfig = {
      absorbedGrams: {
        label: "CO₂ Absorbed (g)",
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig

    if (sensorData.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p>Loading dashboard data...</p>
            </div>
        )
    }

    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <StatCard title="CO₂ Concentration" value={`${latestData.co2} ppm`} icon={Leaf} description="Live Reading" />
                <StatCard title="Oxygen Level" value={`${latestData.o2} %`} icon={Wind} description="Live Reading" />
                <StatCard title="CO₂ Absorbed Today" value={`${latestDailyAbsorption.absorbedGrams} g`} icon={BarChart} description="Total for Today" />
                <StatCard title="Total CO₂ Absorbed" value={`${totalCo2Absorbed} kg`} icon={Clock} description="In the last 7 days" />
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
                                <p className="text-2xl font-bold">{treeEquivalent} Trees</p>
                                <p className="text-xs text-muted-foreground">(based on an average tree absorbing 21kg CO₂/year)</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
