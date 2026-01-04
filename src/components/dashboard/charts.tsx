"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart";
import { Label, PolarGrid, RadialBar, RadialBarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts";

type LineChartComponentProps = {
  data: any[];
  title: string;
  description: string;
  dataKeys: { name: string; color: string }[];
};

export function LineChartComponent({ data, title, description, dataKeys }: LineChartComponentProps) {
    const chartConfig = dataKeys.reduce((acc, key) => {
        acc[key.name] = {
            label: key.name,
            color: `hsl(var(${key.color}))`,
        };
        return acc;
    }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <RechartsTooltip content={<ChartTooltipContent />} />
            {dataKeys.map(key => (
                 <Line key={key.name} yAxisId={key.name.toLowerCase() === 'o2' ? 'right' : 'left'} type="monotone" dataKey={key.name} stroke={`hsl(var(${key.color}))`} strokeWidth={2} dot={false} />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

type GaugeComponentProps = {
    value: number;
    label: string;
    unit: string;
}

export function GaugeComponent({ value, label, unit }: GaugeComponentProps) {
    const chartConfig = {
      value: {
        label: label,
        color: "hsl(var(--chart-1))",
      },
    } satisfies ChartConfig

    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center pb-0">
                <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-full max-h-[250px]"
                >
                <RadialBarChart
                    data={[{ name: 'value', value: value, fill: "hsl(var(--chart-1))" }]}
                    startAngle={-90}
                    endAngle={270}
                    innerRadius="80%"
                    outerRadius="110%"
                    barSize={20}
                >
                    <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    />
                    <RadialBar
                        dataKey="value"
                        background
                        cornerRadius={10}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                     <Label
                        content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                            <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-4xl font-bold"
                                >
                                {value.toFixed(1)}
                                </tspan>
                                <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                                >
                                {unit}
                                </tspan>
                            </text>
                            )
                        }
                        }}
                    />
                </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
