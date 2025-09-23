import { AppSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect, useState, type JSX } from "react";
import { DropzoneSimple } from "@/components/dropzone";

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


//importar iconos de lucide-react
import { Pen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CuentasService } from "@/services/cuentas/cuentas.service";
import { EditarCuentaForm } from "@/components/dashboard/modals/editar-cuenta.modal";
import { NuevoAsientoForm } from "@/components/dashboard/modals/nuevo-asiento.modal";

export default function CatalogoCuentas() {
  const [open, setOpen] = useState(false);
  const [cuentas, setCuentas] = useState<CuentaType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);


  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "ready" | "uploading" | "success" | "error"
  >("idle");

  const [cuentaSeleccionada, setCuentaSeleccionada] = useState<(CuentaType & { children?: CuentaType[] }) | null>(null);

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
    setExpanded((prev) => ({
      ...prev,
      [codigo]: !prev[codigo],
    }));
  }

  async function actualizarCuenta(id_cuenta: number, codigo: string, nombre: string) {
    try {
      const response = await CuentasService.actualizarCuenta(id_cuenta, codigo, nombre);

      await loadCuentas();
    } catch (error) {
      console.error("Error al actualizar la cuenta:", error);
    }
  }

  useEffect(() => {
    loadCuentas();
  }, []);

  const cuentaTree = buildCuentaTree(cuentas);

  function buildCuentaTree(cuentas: CuentaType[]) {
    const sorted = [...cuentas].sort(
      (a, b) => Number(a.codigo) - Number(b.codigo)
    );

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
          {cuenta.codigo.length > 2 && (

            <TableCell>


              {/* Botón para editar cuenta */}
              <Button onClick={() => {
                setCuentaSeleccionada(cuenta);
              }}><Pen></Pen></Button>


              {/* Botón para eliminar cuenta */}
              <Button>
                <Trash2></Trash2>
              </Button>
            </TableCell>
          )}
        </TableRow>,
        hasChildren && isExpanded
          ? renderCuentaRows(cuenta.children!, level + 1)
          : [],
      ];
    }) as JSX.Element[];
  }

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus("uploading");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target?.result;
      if (typeof data === "string") {
        const base64String = data.split(",")[1];

        try {
          await CuentasServices.importarCuentas(base64String);
          setUploadStatus("success");
          await loadCuentas();
        } catch (err) {
          console.error(err);
          setUploadStatus("error");
        }
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  return (

    <>

      {/* Dialog para editar cuenta */}
      <Dialog open={!!cuentaSeleccionada} onOpenChange={open => { if (!open) setCuentaSeleccionada(null) }}>
        <DialogContent>

          {/* Cuando el modal se cierra, se llama al metodo seOpen, que limpia la cuentaSeleciconada */}
          <EditarCuentaForm setOpen={() => setCuentaSeleccionada(null)} cuentaSeleccionada={cuentaSeleccionada || undefined}></EditarCuentaForm>
        </DialogContent>
      </Dialog>


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
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="bg-primary text-white w-40 rounded-full flex justify-center my-3 p-2">
                  Importar Catálogo
                </DialogTrigger>
                <DialogContent
                  className="max-w-4xl w-full h-auto p-0 overflow-auto p-6 "
                  style={{ scrollbarWidth: "none" }}
                >
                  <DialogTitle>Importar Catálogo de Cuentas</DialogTitle>

                  <DropzoneSimple
                    onFilesSelected={(files) => {
                      const file = files[0];
                      if (!file) return;
                      setSelectedFile(file);
                      setUploadStatus("ready");
                    }}
                  />

                  {selectedFile && (
                    <div className="mt-4 flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground">
                        Archivo seleccionado: <strong>{selectedFile.name}</strong>
                      </p>

                      <button
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
                        onClick={handleUpload}
                        disabled={uploadStatus === "uploading"}
                      >
                        {uploadStatus === "uploading"
                          ? "Importando..."
                          : "Confirmar Importación"}
                      </button>
                    </div>
                  )}

                  {uploadStatus === "success" && (
                    <p className="mt-4 text-green-600">
                      Archivo importado correctamente
                    </p>
                  )}
                  {uploadStatus === "error" && (
                    <p className="mt-4 text-red-600">
                      Error al importar el archivo
                    </p>
                  )}
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
                    <TableHead className="w-[200px] md:w-[300px] text-white">
                      Acciones
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
    </>
  );
}
