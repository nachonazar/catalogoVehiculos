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

// Reemplazamos los colores fijos por las variables CSS del Design System
const COLORES_CATEGORIA = [
  "var(--color-secondary)",
  "var(--color-primary)",
  "var(--color-surface-tint)",
  "var(--color-outline)",
  "var(--color-on-surface-variant)",
];
const COLOR_DISPONIBLE = "var(--color-success-green)";
const COLOR_VENDIDO = "var(--color-on-surface-variant)";
const COLOR_BARRAS = "var(--color-secondary)";

const COLOR_TEXTO = "var(--color-on-surface-variant)";
const COLOR_GRILLA = "var(--color-outline-variant)";
const COLOR_FONDO_TOOLTIP = "var(--color-surface-container-lowest)";

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

  const kpis = [
    {
      icon: "directions_car",
      label: "Totales",
      value: totalVehiculos,
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

  // Estilo reutilizable para los Tooltips de Recharts
  const tooltipStyle = {
    backgroundColor: COLOR_FONDO_TOOLTIP,
    borderColor: COLOR_GRILLA,
    color: "var(--color-on-surface)",
    borderRadius: "12px",
    boxShadow: "var(--shadow-elevated)",
    padding: "8px 12px",
  };

  return (
    <LayoutAdmin titulo="Panel de Estadísticas">
      {cargando ? (
        <div className="flex flex-col gap-6 pb-12 w-full animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="kpi-card !bg-surface-container-high h-[92px] border-transparent"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-[380px] rounded-xl bg-surface-container-high border-transparent"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 pb-12">
          {/* Tarjetas de Resumen Superior */}
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

          {/* Grillas de Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Pie Chart - Categorías */}
            <div className="card p-6 h-full">
              <h3 className="font-heading text-lg font-bold text-on-surface mb-1">
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
                      stroke={COLOR_FONDO_TOOLTIP}
                      strokeWidth={2}
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
                      contentStyle={tooltipStyle}
                      itemStyle={{
                        color: "var(--color-on-surface)",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        paddingTop: "10px",
                        color: COLOR_TEXTO,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 2. Bar Chart - Precios (Optimizado con YAxis y márgenes holgados) */}
            <div className="card p-6 h-full">
              <h3 className="font-heading text-lg font-bold text-on-surface mb-1">
                Rango de Precios
              </h3>
              <p className="text-xs text-on-surface-variant mb-6">
                Cantidad de vehículos por franja de precio
              </p>
              <div className="w-full">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart
                    data={datosPorRangoPrecio}
                    barSize={28}
                    margin={{ bottom: 40, top: 10, right: 15, left: -20 }}
                  >
                    <XAxis
                      dataKey="rango"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: COLOR_TEXTO, fontSize: 9.5 }}
                      dy={12}
                      angle={-25}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: COLOR_TEXTO, fontSize: 10 }}
                      allowDecimals={false}
                      dx={-5}
                    />
                    <Tooltip
                      cursor={{
                        fill: "var(--color-surface-container-high)",
                        opacity: 0.4,
                      }}
                      contentStyle={tooltipStyle}
                      itemStyle={{ color: "var(--color-on-surface)" }}
                      labelStyle={{
                        color: COLOR_TEXTO,
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    />
                    <Bar
                      dataKey="total"
                      name="Vehículos"
                      radius={[6, 6, 0, 0]}
                      fill={COLOR_BARRAS}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 3. Pie Chart - Disponibilidad */}
            <div className="card p-6 h-full">
              <h3 className="font-heading text-lg font-bold text-on-surface mb-1">
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
                      paddingAngle={4}
                      stroke="none"
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
                      contentStyle={tooltipStyle}
                      itemStyle={{
                        color: "var(--color-on-surface)",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        paddingTop: "10px",
                        color: COLOR_TEXTO,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 4. Line Chart - Evolución */}
            <div className="card p-6 h-full">
              <h3 className="font-heading text-lg font-bold text-on-surface mb-1">
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
                      stroke={COLOR_GRILLA}
                    />
                    <XAxis
                      dataKey="mes"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: COLOR_TEXTO, fontSize: 11 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: COLOR_TEXTO, fontSize: 11 }}
                      allowDecimals={false}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      itemStyle={{
                        color: "var(--color-on-surface)",
                        fontWeight: "500",
                      }}
                      labelStyle={{
                        color: COLOR_TEXTO,
                        fontWeight: 600,
                        marginBottom: "4px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="Vehículos agregados"
                      stroke={COLOR_BARRAS}
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: COLOR_FONDO_TOOLTIP,
                        stroke: COLOR_BARRAS,
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 6,
                        fill: COLOR_BARRAS,
                        stroke: COLOR_FONDO_TOOLTIP,
                      }}
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
