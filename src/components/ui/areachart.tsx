"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

// Datos de usuarios de Quint Accounting (ejemplo, más variados para una curva atractiva)
const chartData = [
    { date: "2024-04-01", desktop: 120, mobile: 80 },
    { date: "2024-04-02", desktop: 115, mobile: 95 },
    { date: "2024-04-03", desktop: 140, mobile: 70 },
    { date: "2024-04-04", desktop: 130, mobile: 110 },
    { date: "2024-04-05", desktop: 160, mobile: 90 },
    { date: "2024-04-06", desktop: 150, mobile: 130 },
    { date: "2024-04-07", desktop: 170, mobile: 100 },
    { date: "2024-04-08", desktop: 145, mobile: 120 },
    { date: "2024-04-09", desktop: 180, mobile: 140 },
    { date: "2024-04-10", desktop: 155, mobile: 105 },
    { date: "2024-04-11", desktop: 200, mobile: 160 },
    { date: "2024-04-12", desktop: 170, mobile: 150 },
    { date: "2024-04-13", desktop: 210, mobile: 130 },
    { date: "2024-04-14", desktop: 190, mobile: 170 },
    { date: "2024-04-15", desktop: 220, mobile: 120 },
    { date: "2024-04-16", desktop: 185, mobile: 180 },
    { date: "2024-04-17", desktop: 230, mobile: 140 },
    { date: "2024-04-18", desktop: 210, mobile: 190 },
    { date: "2024-04-19", desktop: 250, mobile: 160 },
    { date: "2024-04-20", desktop: 205, mobile: 200 },
    { date: "2024-04-21", desktop: 260, mobile: 170 },
    { date: "2024-04-22", desktop: 215, mobile: 210 },
    { date: "2024-04-23", desktop: 270, mobile: 180 },
    { date: "2024-04-24", desktop: 225, mobile: 220 },
    { date: "2024-04-25", desktop: 280, mobile: 190 },
    { date: "2024-04-26", desktop: 235, mobile: 230 },
    { date: "2024-04-27", desktop: 290, mobile: 200 },
    { date: "2024-04-28", desktop: 245, mobile: 240 },
    { date: "2024-04-29", desktop: 300, mobile: 210 },
    { date: "2024-04-30", desktop: 255, mobile: 250 },
    { date: "2024-05-01", desktop: 310, mobile: 220 },
    { date: "2024-05-02", desktop: 265, mobile: 260 },
    { date: "2024-05-03", desktop: 320, mobile: 230 },
    { date: "2024-05-04", desktop: 275, mobile: 270 },
    { date: "2024-05-05", desktop: 330, mobile: 240 },
    { date: "2024-05-06", desktop: 285, mobile: 280 },
    { date: "2024-05-07", desktop: 340, mobile: 250 },
    { date: "2024-05-08", desktop: 295, mobile: 290 },
    { date: "2024-05-09", desktop: 350, mobile: 260 },
    { date: "2024-05-10", desktop: 305, mobile: 300 },
    { date: "2024-05-11", desktop: 360, mobile: 270 },
    { date: "2024-05-12", desktop: 315, mobile: 310 },
    { date: "2024-05-13", desktop: 370, mobile: 280 },
    { date: "2024-05-14", desktop: 325, mobile: 320 },
    { date: "2024-05-15", desktop: 380, mobile: 290 },
    { date: "2024-05-16", desktop: 335, mobile: 330 },
    { date: "2024-05-17", desktop: 390, mobile: 300 },
    { date: "2024-05-18", desktop: 345, mobile: 340 },
    { date: "2024-05-19", desktop: 400, mobile: 310 },
    { date: "2024-05-20", desktop: 355, mobile: 350 },
    { date: "2024-05-21", desktop: 410, mobile: 320 },
    { date: "2024-05-22", desktop: 365, mobile: 360 },
    { date: "2024-05-23", desktop: 420, mobile: 330 },
    { date: "2024-05-24", desktop: 375, mobile: 370 },
    { date: "2024-05-25", desktop: 430, mobile: 340 },
    { date: "2024-05-26", desktop: 385, mobile: 380 },
    { date: "2024-05-27", desktop: 440, mobile: 350 },
    { date: "2024-05-28", desktop: 395, mobile: 390 },
    { date: "2024-05-29", desktop: 450, mobile: 360 },
    { date: "2024-05-30", desktop: 405, mobile: 400 },
    { date: "2024-05-31", desktop: 460, mobile: 370 },
    { date: "2024-06-01", desktop: 415, mobile: 410 },
    { date: "2024-06-02", desktop: 470, mobile: 380 },
    { date: "2024-06-03", desktop: 425, mobile: 420 },
    { date: "2024-06-04", desktop: 480, mobile: 390 },
    { date: "2024-06-05", desktop: 435, mobile: 430 },
    { date: "2024-06-06", desktop: 490, mobile: 400 },
    { date: "2024-06-07", desktop: 445, mobile: 440 },
    { date: "2024-06-08", desktop: 500, mobile: 410 },
    { date: "2024-06-09", desktop: 455, mobile: 450 },
    { date: "2024-06-10", desktop: 510, mobile: 420 },
    { date: "2024-06-11", desktop: 465, mobile: 460 },
    { date: "2024-06-12", desktop: 520, mobile: 430 },
    { date: "2024-06-13", desktop: 475, mobile: 470 },
    { date: "2024-06-14", desktop: 530, mobile: 440 },
    { date: "2024-06-15", desktop: 485, mobile: 480 },
    { date: "2024-06-16", desktop: 540, mobile: 450 },
    { date: "2024-06-17", desktop: 495, mobile: 490 },
    { date: "2024-06-18", desktop: 550, mobile: 460 },
    { date: "2024-06-19", desktop: 505, mobile: 500 },
    { date: "2024-06-20", desktop: 560, mobile: 470 },
    { date: "2024-06-21", desktop: 515, mobile: 510 },
    { date: "2024-06-22", desktop: 570, mobile: 480 },
    { date: "2024-06-23", desktop: 525, mobile: 520 },
    { date: "2024-06-24", desktop: 580, mobile: 490 },
    { date: "2024-06-25", desktop: 535, mobile: 530 },
    { date: "2024-06-26", desktop: 590, mobile: 500 },
    { date: "2024-06-27", desktop: 545, mobile: 540 },
    { date: "2024-06-28", desktop: 600, mobile: 510 },
    { date: "2024-06-29", desktop: 555, mobile: 550 },
    { date: "2024-06-30", desktop: 610, mobile: 520 },
]

const chartConfig = {
    visitors: {
        label: "Usuarios",
    },
    desktop: {
        label: "Web",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig

export function ChartAreaInteractive() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const referenceDate = new Date("2024-06-30")
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        const startDate = new Date(referenceDate)
        startDate.setDate(startDate.getDate() - daysToSubtract)
        return date >= startDate
    })

    return (
        <Card className="pt-0" style={{ backgroundColor: '#0a0a0a' }}>
            <CardHeader style={{ backgroundColor: '#0a0a0a', color: 'white' }} className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1" >
                    <CardTitle>Usuarios Quint Accounting</CardTitle>
                    <CardDescription>
                        Usuarios web y mobile de Quint Accounting en los últimos 3 meses
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Últimos 3 meses" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Últimos 3 meses
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Últimos 30 días
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Últimos 7 días
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("es-ES", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value: string | number | Date) => {
                                        return new Date(value).toLocaleDateString("es-ES", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="mobile"
                            type="natural"
                            fill="#a3a3a3"
                            stroke="#fafafa"
                            stackId="a"
                        />
                        <Area
                            dataKey="desktop"
                            type="natural"
                            fill="#525252"
                            stroke="#525252"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
