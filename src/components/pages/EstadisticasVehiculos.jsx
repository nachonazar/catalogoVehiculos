import React, { useEffect, useState, useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import { leerVehiculos } from "../../../helpers/queries.js";
import LayoutAdmin from "./LayoutAdmin";

const AZUL_OSCURO = "#051125";
const COLORES_CATEGORIA = [
  "#051125",
  "#1e3a5f",
  "#3b82f6",
  "#93c5fd",
  "#94a3b8",
];
const COLOR_DISPONIBLE = "#16a34a";
const COLOR_VENDIDO = "#051125";

const MESES = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

const EstadisticasVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  const obtenerVehiculos = async () => {
    setCargando(true);
    try {
      const respuesta = await leerVehiculos();
      if (respuesta && respuesta.status === 200) {
        const datos = await respuesta.json();
        const lista = Array.isArray(datos) ? datos : datos.vehiculos || [];
        setVehiculos(lista);
      } else {
        console.info("Ocurrió un error al buscar los vehículos");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  // KPIs / Tarjetas de Resumen
  const totalVehiculos = vehiculos.length;
  const vehiculosDisponibles = vehiculos.filter((v) => v.disponible).length;
  const vehiculosVendidos = totalVehiculos - vehiculosDisponibles;
  const capitalTotalInvertido = vehiculos.reduce(
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

  // 1. Vehículos por categoría
  const datosPorCategoria = useMemo(() => {
    const conteo = {};
    vehiculos.forEach((v) => {
      const categoria = v.categoria || "Otros";
      conteo[categoria] = (conteo[categoria] || 0) + 1;
    });
    return Object.entries(conteo).map(([categoria, total]) => ({
      name: categoria,
      value: total,
    }));
  }, [vehiculos]);

  const formatearPesosCorte = (valor) => {
    if (valor >= 1000000) return `$${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `$${Math.round(valor / 1000)}k`;
    return `$${valor}`;
  };

  // 2. Rango de precios
  const datosPorRangoPrecio = useMemo(() => {
    if (vehiculos.length === 0) return [];
    const precios = vehiculos.map((v) => Number(v.precio) || 0);
    const min = Math.min(...precios);
    const max = Math.max(...precios);
    const CANTIDAD_BUCKETS = 5;
    const ancho = max > min ? (max - min) / CANTIDAD_BUCKETS : 1;

    const rangos = Array.from({ length: CANTIDAD_BUCKETS }, (_, i) => {
      const desde = min + ancho * i;
      const hasta =
        i === CANTIDAD_BUCKETS - 1 ? max + 1 : min + ancho * (i + 1);
      return {
        rango: `${formatearPesosCorte(desde)} - ${formatearPesosCorte(hasta)}`,
        min: desde,
        max: hasta,
        total: 0,
      };
    });

    precios.forEach((precio) => {
      const bucket =
        rangos.find((r) => precio >= r.min && precio < r.max) ||
        rangos[rangos.length - 1];
      bucket.total += 1;
    });

    return rangos;
  }, [vehiculos]);

  // 3. Disponibles vs Vendidos
  const datosDisponibilidad = useMemo(() => {
    return [
      { name: "Disponibles", value: vehiculosDisponibles },
      { name: "Vendidos", value: vehiculosVendidos },
    ];
  }, [vehiculosDisponibles, vehiculosVendidos]);

  const fechaDesdeObjectId = (id) => {
    if (!id || typeof id !== "string" || id.length < 8) return null;
    const segundosUnix = parseInt(id.substring(0, 8), 16);
    if (isNaN(segundosUnix)) return null;
    return new Date(segundosUnix * 1000);
  };

  // 4. Evolución mensual
  const datosEvolucionMensual = useMemo(() => {
    const hoy = new Date();
    const meses = [];
    for (let i = 5; i >= 0; i--) {
      const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - i, 1);
      meses.push({
        key: `${fecha.getFullYear()}-${fecha.getMonth()}`,
        mes: `${MESES[fecha.getMonth()]}`,
        total: 0,
      });
    }
    vehiculos.forEach((v) => {
      const fechaOrigen =
        v.createdAt || v.fechaCreacion || fechaDesdeObjectId(v._id);
      if (!fechaOrigen) return;
      const fecha = new Date(fechaOrigen);
      if (isNaN(fecha)) return;
      const key = `${fecha.getFullYear()}-${fecha.getMonth()}`;
      const mesEncontrado = meses.find((m) => m.key === key);
      if (mesEncontrado) mesEncontrado.total += 1;
    });
    return meses;
  }, [vehiculos]);

  return (
    <LayoutAdmin titulo="Panel de Estadísticas">
      {cargando ? (
        <div className="flex items-center justify-center py-20 text-on-surface-variant">
          Cargando estadísticas...
        </div>
      ) : (
        <div className="flex flex-col gap-6 pb-12">
          {/* Tarjetas de Resumen Superior (4 KPIs idénticos a Admin) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest border border-surface-variant p-6 rounded-xl flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  directions_car
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                  Flota Total
                </p>
                <p className="font-headline-lg text-headline-lg text-primary mt-1">
                  {totalVehiculos}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant p-6 rounded-xl flex items-center gap-4 border-l-4 border-l-success-green shadow-sm">
              <div className="w-12 h-12 rounded-full bg-success-green/10 flex items-center justify-center text-success-green">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                  Disponibles
                </p>
                <p className="font-headline-lg text-headline-lg text-primary mt-1">
                  {vehiculosDisponibles}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant p-6 rounded-xl flex items-center gap-4 border-l-4 border-l-surface-tint shadow-sm">
              <div className="w-12 h-12 rounded-full bg-surface-tint/10 flex items-center justify-center text-surface-tint">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sell
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                  Vendidos
                </p>
                <p className="font-headline-lg text-headline-lg text-primary mt-1">
                  {vehiculosVendidos}
                </p>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-surface-variant p-6 rounded-xl flex items-center gap-4 border-l-4 border-l-secondary shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  payments
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                  Capital
                </p>
                <p className="font-headline-md text-[16px] text-primary mt-1">
                  {formatearMoneda(capitalTotalInvertido)}
                </p>
              </div>
            </div>
          </div>

          {/* Grillas de Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-variant h-full">
              <h3 className="text-lg font-bold text-primary mb-1">
                Vehículos por Categoría
              </h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Distribución del inventario según tipo de vehículo
              </p>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={datosPorCategoria}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                    >
                      {datosPorCategoria.map((entry, index) => (
                        <Cell
                          key={`cell-categoria-${index}`}
                          fill={
                            COLORES_CATEGORIA[index % COLORES_CATEGORIA.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-variant h-full">
              <h3 className="text-lg font-bold text-primary mb-1">
                Rango de Precios
              </h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Cantidad de vehículos por franja de precio
              </p>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={datosPorRangoPrecio} barSize={30}>
                    <XAxis
                      dataKey="rango"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 11 }}
                      dy={10}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Bar
                      dataKey="total"
                      name="Vehículos"
                      radius={[6, 6, 0, 0]}
                      fill={AZUL_OSCURO}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-variant h-full">
              <h3 className="text-lg font-bold text-primary mb-1">
                Disponibles vs Vendidos
              </h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Estado actual de la flota
              </p>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={datosDisponibilidad}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={2}
                    >
                      {datosDisponibilidad.map((entry, index) => (
                        <Cell
                          key={`cell-disponibilidad-${index}`}
                          fill={
                            entry.name === "Disponibles"
                              ? COLOR_DISPONIBLE
                              : COLOR_VENDIDO
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-surface-variant h-full">
              <h3 className="text-lg font-bold text-primary mb-1">
                Evolución del Inventario
              </h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Vehículos agregados por mes (últimos 6 meses)
              </p>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={datosEvolucionMensual}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />
                    <XAxis
                      dataKey="mes"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 11 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#9ca3af", fontSize: 11 }}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="Vehículos agregados"
                      stroke={AZUL_OSCURO}
                      strokeWidth={3}
                      dot={{ r: 4, fill: AZUL_OSCURO }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default EstadisticasVehiculos;
