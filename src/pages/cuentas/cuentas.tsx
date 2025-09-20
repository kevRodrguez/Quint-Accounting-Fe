import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { NuevoAsientoForm } from "@/components/dashboard/modals/nuevo-asiento.modal";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect, useState, type JSX } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardTitle } from "@/components/ui/card";

import type { Cuenta as CuentaType } from "@/types/libroDiario.interface";

import { LoadingScreen } from "@/components/dashboard/LoadingScreen";
import { ErrorScreen } from "@/components/dashboard/ErrorScreen";
import { CuentasServices } from "@/services/cuentas/cuentas.services";

export default function CatalogoCuentas() {
  const [open, setOpen] = useState(false);
  const [cuentas, setCuentas] = useState<CuentaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});


  const loadCuentas = async () => {
    try {
      const data = await CuentasServices.obtenerCuentas();
      if (data) setCuentas(data);
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e?.message || "No se pudo cargar el catálogo de cuentas");
    } finally {
      setLoading(false);
    }
  };

  function toggleExpand(codigo: string) {
  setExpanded(prev => ({
    ...prev,
    [codigo]: !prev[codigo],
  }));
}

  useEffect(() => {
    loadCuentas();
  }, []);

  const cuentaTree = buildCuentaTree(cuentas);

  function buildCuentaTree(cuentas: CuentaType[]) {
  const sorted = [...cuentas].sort((a, b) => Number(a.codigo) - Number(b.codigo));

  const lookup: Record<string, CuentaType & { children?: CuentaType[] }> = {};
  const tree: (CuentaType & { children?: CuentaType[] })[] = [];

  sorted.forEach((cuenta) => {
    const code = cuenta.codigo;
    lookup[code] = { ...cuenta, children: [] };

    let parentCode: string | null = null;

    if (code.length === 2) {
      parentCode = code.slice(0, 1); // Ej: "11" → padre "1"
    } else if (code.length === 4) {
      parentCode = code.slice(0, 2); // Ej: "1101" → padre "11"
    } else if (code.length === 6) {
      parentCode = code.slice(0, 4); // Ej: "110101" → padre "1101"
    }

    if (parentCode && lookup[parentCode]) {
      lookup[parentCode].children!.push(lookup[code]);
    } else if (code.length === 1) {
      tree.push(lookup[code]);
    }
  });

  return tree;
}


  // Función para renderizar filas con indentación según nivel de la cuenta
function renderCuentaRows(
  cuentas: (CuentaType & { children?: CuentaType[] })[],
  level = 0
): JSX.Element[] {
  return cuentas.flatMap((cuenta) => {
    const isExpanded = expanded[cuenta.codigo] ?? false;
    const hasChildren = cuenta.children && cuenta.children.length > 0;

    return [
      <TableRow key={cuenta.codigo}>
        <TableCell style={{ paddingLeft: `${level * 20}px` }}>
          {hasChildren && (
            <button
              onClick={() => toggleExpand(cuenta.codigo)}
              className="mr-2 focus:outline-none"
            >
              {isExpanded ? "▼" : "►"}
            </button>
          )}
          {cuenta.codigo}
        </TableCell>
        <TableCell>{cuenta.nombre_cuenta}</TableCell>
      </TableRow>,
      hasChildren && isExpanded
        ? renderCuentaRows(cuenta.children!, level + 1)
        : [],
    ];
  }) as JSX.Element[];
}



  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Catálogo de Cuentas" />

        <CardTitle className="justify-center flex text-3xl my-4">
          Catálogo de Cuentas
        </CardTitle>

        <div className="w-full max-w-[1400px] mx-auto px-4 overflow-x-auto">
          <div className="py-4">
            {/* Botón para añadir nuevo asiento/cuenta */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="bg-primary text-white w-32 rounded-full flex justify-center my-3 p-2">
                Nuevo Asiento
              </DialogTrigger>
              <DialogContent
                className="max-w-4xl w-full h-[90vh] p-0 overflow-auto"
                style={{ scrollbarWidth: "none" }}
              >
                <NuevoAsientoForm setOpen={setOpen} onCreated={loadCuentas} />
              </DialogContent>
            </Dialog>

            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-primary">
                  <TableHead className="w-[100px] md:w-[120px] text-white">
                    Código
                  </TableHead>
                  <TableHead className="w-[200px] md:w-[300px] text-white">
                    Nombre de la cuenta
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center py-6">
                      <LoadingScreen title="Cargando cuentas..." text="" />
                    </TableCell>
                  </TableRow>
                )}

                {!loading && !error && renderCuentaRows(cuentaTree)}

                {!loading && error && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-red-600 py-6">
                      <ErrorScreen title="Error al cargar cuentas" error={error} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
