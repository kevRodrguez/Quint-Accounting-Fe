"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useEffect, useState } from "react"
import { EstadisticasService } from "@/services/estadisticas/estadisticas.service"
import { LoadingScreen } from "./LoadingScreen"

export const description = "An interactive area chart"



const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {


  // Estado para los asientos de los últimos tres meses
  const [asientosUltimosTresMeses, setAsientosUltimosTresMeses] = useState([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  useEffect(() => {

    obtenerAsientosUltimosTresMeses();
  }, [])

  const obtenerAsientosUltimosTresMeses = async () => {
    setIsLoading(true);
    try {
      const response = await EstadisticasService.totalAsientosUltimosTresMeses();
      console.log("respuesta de asientos de los ultimos 3 meses", response);
      setAsientosUltimosTresMeses(response);
    } catch (error) {

    }
    setIsLoading(false);
  }






  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  // Filtrar y mapear los datos para el gráfico
  const filteredData = React.useMemo(() => {
    // Determinar el rango de fechas
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    // Usar la fecha más reciente como referencia
    const dates = asientosUltimosTresMeses.map((item: { fecha: string | number | Date }) => new Date(item.fecha))
    const maxDate = new Date(Math.max(...dates.map((d: { getTime: () => any }) => d.getTime())))
    const startDate = new Date(maxDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    // Filtrar por rango y ordenar por fecha ascendente
    const filtered = asientosUltimosTresMeses
      .filter((item: { fecha: string | number | Date }) => {
        const date = new Date(item.fecha)
        return date >= startDate && date <= maxDate
      })
      .sort((a: { fecha: string | number | Date }, b: { fecha: string | number | Date }) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())

    // Mapear al formato requerido por recharts
    return filtered.map((item: { fecha: any; asientos: any }) => ({
      fecha: item.fecha,
      asientos: item.asientos,
    }))
  }, [timeRange])

  return (

    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total de Asientos</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Asientos registrados en los últimos 3 meses
          </span>
        </CardDescription>
        <CardAction>

        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <LoadingScreen title="Cargando gráfico" text="Por favor espera." />
        ) :
          (
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
                      stopOpacity={1.0}
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
                  dataKey="fecha"
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
                      labelFormatter={(value) => {
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
                  dataKey="asientos"
                  type="natural"
                  fill="url(#fillDesktop)"
                  stroke="var(--color-desktop)"
                  stackId="a"
                  name="Asientos"
                />
                {/* Si solo hay un tipo de dato, puedes eliminar el segundo <Area> */}
              </AreaChart>
            </ChartContainer>
          )}
      </CardContent>
    </Card>
  )
}
