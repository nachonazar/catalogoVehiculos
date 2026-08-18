import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemVehiculo from "./vehiculo/ItemVehiculo";
import LayoutAdmin from "./LayoutAdmin";
import { leerVehiculos } from "../../../helpers/queries.js";

const Administrador = () => {
  const [vehiculosTotales, setVehiculosTotales] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  useEffect(() => {
    obtenerTodosLosVehiculos();
  }, []);

  const obtenerTodosLosVehiculos = async () => {
    const respuesta = await leerVehiculos({ paginar: false });
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      const lista = Array.isArray(datos) ? datos : datos.vehiculos || [];
      setVehiculosTotales(lista);
    } else {
      console.info("Ocurrió un error al buscar los vehículos");
    }
  };

  const vehiculosFiltrados = vehiculosTotales.filter((vehiculo) => {
    const termino = terminoBusqueda.toLowerCase();
    return (
      (vehiculo.marca || "").toLowerCase().includes(termino) ||
      (vehiculo.modelo || "").toLowerCase().includes(termino) ||
      (vehiculo.categoria || "").toLowerCase().includes(termino)
    );
  });

  const totalPages = Math.ceil(vehiculosFiltrados.length / limit) || 1;

  const indiceUltimo = page * limit;
  const indicePrimer = indiceUltimo - limit;
  const vehiculosParaMostrar = vehiculosFiltrados.slice(
    indicePrimer,
    indiceUltimo,
  );

  const totalFlota = vehiculosTotales.length;
  const vehiculosDisponibles = vehiculosTotales.filter(
    (v) => v.disponible,
  ).length;
  const vehiculosVendidos = totalFlota - vehiculosDisponibles;
  const capitalTotalInvertido = vehiculosTotales.reduce(
    (acc, v) => acc + (Number(v.precio) || 0),
    0,
  );

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(valor);
  };

  const kpis = [
    {
      icon: "directions_car",
      label: "Totales",
      value: totalFlota,
      accent: "text-on-surface",
    },
    {
      icon: "check_circle",
      label: "Disponibles",
      value: vehiculosDisponibles,
      accent: "text-success-green",
    },
    {
      icon: "sell",
      label: "Vendidos",
      value: vehiculosVendidos,
      accent: "text-on-surface-variant",
    },
    {
      icon: "payments",
      label: "Capital",
      value: formatearMoneda(capitalTotalInvertido),
      accent: "text-secondary",
      small: true,
    },
  ];

  const headerExtra = (
    <div className="relative hidden md:block w-52">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
        search
      </span>
      <input
        type="text"
        placeholder="Buscar..."
        value={terminoBusqueda}
        onChange={(e) => {
          setTerminoBusqueda(e.target.value);
          setPage(1);
        }}
        aria-label="Buscar vehículos"
        className="input-base !h-9 !pl-9 !text-xs !rounded-xl"
      />
    </div>
  );

  return (
    <LayoutAdmin titulo="Control de inventario" headerExtra={headerExtra}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-on-surface tracking-tight">
            Inventario de vehículos
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">
            Gestiona, actualiza y monitorea tu flota actual.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="kpi-card">
            <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
              <span
                className={`material-symbols-outlined text-[22px] ${kpi.accent}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {kpi.icon}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-label !text-[10px]">{kpi.label}</p>
              <p
                className={`font-heading font-bold text-on-surface mt-0.5 truncate ${kpi.small ? "text-base" : "text-2xl"}`}
              >
                {kpi.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="table-header">
                <th className="p-4 font-medium">N° / Vehículo</th>
                <th className="p-4 font-medium">Categoría</th>
                <th className="p-4 font-medium">Año</th>
                <th className="p-4 font-medium">Precio</th>
                <th className="p-4 font-medium">Estado</th>
                <th className="p-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {vehiculosParaMostrar.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center">
                    <div className="empty-state !py-8">
                      <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-2">
                        search_off
                      </span>
                      <p className="text-sm text-on-surface-variant">
                        No se encontraron vehículos que coincidan con &ldquo;
                        {terminoBusqueda}&rdquo;.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                vehiculosParaMostrar.map((vehiculo, indice) => (
                  <ItemVehiculo
                    key={vehiculo._id}
                    vehiculo={vehiculo}
                    fila={(page - 1) * limit + indice + 1}
                    setListaVehiculos={obtenerTodosLosVehiculos}
                    page={page}
                    limit={limit}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-low/50">
            <span className="text-xs text-on-surface-variant hidden md:block">
              Página {page} de {totalPages}
            </span>
            <nav
              aria-label="Paginación"
              className="flex items-center gap-1 mx-auto md:mx-0"
            >
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                aria-label="Página anterior"
                className="pagination-btn !w-8 !h-8"
              >
                <span className="material-symbols-outlined text-[16px]">
                  chevron_left
                </span>
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  aria-label={`Página ${i + 1}`}
                  aria-current={page === i + 1 ? "page" : undefined}
                  className={`pagination-btn !w-8 !h-8 ${
                    page === i + 1
                      ? "pagination-btn-active dark:!bg-secondary dark:!text-white dark:!border-secondary"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                aria-label="Página siguiente"
                className="pagination-btn !w-8 !h-8"
              >
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};

export default Administrador;
