import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mayorizacionServices } from "@/services/cuentas/mayorizacion.service";
import type { MayorizacionItem } from "@/types/mayorizacion.interface";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { ErrorScreen } from "@/components/dashboard/ErrorScreen";

interface SectionCardsProps {
  onCardClick?: (codigoCuenta: string) => void;
  haber?: boolean;
  fechaInicio: Date | undefined;
  fechaFinal: Date | undefined;
}

export function SectionCards({
  onCardClick,
  fechaInicio,
  fechaFinal,
  haber,
}: SectionCardsProps) {
  const [mayorizacionArray, setMayorizacionArray] = useState<
    MayorizacionItem[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const obtenerMayorizaciones = async () => {
    if (!fechaInicio || !fechaFinal) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const mayorizacion = await mayorizacionServices.obtenerMayorizacion(
        fechaInicio,
        fechaFinal
      );
      setMayorizacionArray(mayorizacion);
    } catch (error: any) {
      console.error("Error al obtener mayorización:", error);
      setError(error?.message || "Error al cargar la mayorización");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fechaInicio && fechaFinal) {
      obtenerMayorizaciones();
    }
  }, [fechaInicio, fechaFinal]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingScreen
          title="Cargando mayorización"
          text="Obteniendo datos de las cuentas..."
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <ErrorScreen title="Error en mayorización" error={error} />
      </div>
    );
  }

  const cardsData = mayorizacionArray

    .filter((item) => item.Movimientos.length > 0)
    .filter((item) => {
      if (haber) {
        return item.Totales.Saldo < 0;
      }
      return item.Totales.Saldo >= 0;
    })
    .map((item) => ({
      codigo: item.Codigo,
      desc: item.Cuenta,
      value: `$${item.Totales.Saldo.toFixed(2)}`,
      trend: `Debe: $${item.Totales.Debe.toFixed(
        2
      )} | Haber: $${item.Totales.Haber.toFixed(2)}`,
      up: item.Totales.Saldo >= 0,
      footer: "Saldo final",
    }));

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardsData.map((card) => (
        <Card
          key={card.codigo}
          className="@container/card cursor-pointer"
          onClick={() => onCardClick?.(card.codigo)}
        >
          <CardHeader>
            <CardDescription>{card.desc}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.up ? <IconTrendingUp /> : <IconTrendingDown />}
                {card.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footer}
              {card.up ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">{card.desc}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
