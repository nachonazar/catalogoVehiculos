import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemVehiculo from "./vehiculo/ItemVehiculo";
import logo from "../../assets/logo.png";
import {
  leerVehiculosPaginados,
  leerVehiculos,
} from "../../../helpers/queries.js";

const Administrador = () => {
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [vehiculosTotales, setVehiculosTotales] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(4);
  const [totalPages, setTotalPages] = useState(1);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};

  useEffect(() => {
    obtenerVehiculosPaginados();
    obtenerTodosLosVehiculos();
  }, [page]);

  const obtenerVehiculosPaginados = async () => {
    const respuesta = await leerVehiculosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaVehiculos(datos.vehiculos);
      setTotalPages(datos.totalPages);
    } else {
      console.info("Ocurrió un error al buscar los vehículos paginados");
    }
  };

  const obtenerTodosLosVehiculos = async () => {
    const respuesta = await leerVehiculos();
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      const lista = Array.isArray(datos) ? datos : datos.vehiculos || [];
      setVehiculosTotales(lista);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("userKey");
    window.location.href = "/";
  };

  const vehiculosFiltrados = listaVehiculos.filter((vehiculo) => {
    const termino = terminoBusqueda.toLowerCase();
    return (
      vehiculo.marca.toLowerCase().includes(termino) ||
      vehiculo.modelo.toLowerCase().includes(termino) ||
      vehiculo.categoria.toLowerCase().includes(termino)
    );
  });

  // Métricas globales de toda la flota
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

  return (
    <div className="bg-neutral-bg text-on-surface font-body-md min-h-screen flex">
      {/* PANEL LATERAL IZQUIERDO */}
      <nav className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-black shadow-lg z-50 p-4 text-on-primary font-body-md transition-all duration-300">
        <div className="mb-8 px-4 py-2">
          <Link
            to="/"
            className="font-headline-md text-headline-md font-bold text-on-primary tracking-tight hover:text-secondary-fixed transition-colors no-underline"
          >
            <img
              src={logo}
              alt="Logo Catalogo de Vehiculos"
              className="w-[150px] h-auto mb-stack-sm invert object-contain"
            />
          </Link>
          <p className="text-on-primary/70 text-sm mt-1">
            Panel de Administración
          </p>
        </div>

        <ul className="flex flex-col gap-2 flex-grow list-none p-0">
          <li>
            <Link
              to="/administrador"
              className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg shadow-sm no-underline"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                directions_car
              </span>
              <span className="font-semibold">Inventario</span>
            </Link>
          </li>
          <li>
            <Link
              to="/administrador/estadisticas"
              className="flex items-center gap-3 px-4 py-3 text-on-primary/70 hover:text-on-primary hover:bg-primary-container transition-colors duration-200 rounded-lg group no-underline"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                dashboard
              </span>
              <span>Estadísticas</span>
            </Link>
          </li>
        </ul>

        <div className="mt-auto border-t border-primary-container pt-4">
          <Link
            to="/administrador/crear"
            className="w-full mb-4 bg-secondary text-white py-2 px-4 rounded-lg font-semibold shadow-sm hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 no-underline"
          >
            <span className="material-symbols-outlined text-sm">add</span> Nuevo
            Vehículo
          </Link>
          <ul className="flex flex-col gap-1 list-none p-0">
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-on-primary/70 hover:text-on-primary hover:text-error-container transition-colors bg-transparent border-0 text-left"
              >
                <span className="material-symbols-outlined text-[20px]">
                  logout
                </span>
                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* BARRA SUPERIOR */}
        <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-surface shadow-sm z-40 flex justify-between items-center px-4 md:px-gutter transition-all">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-md text-[20px] text-primary font-semibold tracking-tight">
              Control de Inventario
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block w-64">
              <input
                type="text"
                placeholder="Buscar vehículo..."
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                className="w-full bg-surface-container-low border border-surface-variant rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
              />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                search
              </span>
            </div>

            <div className="flex items-center gap-4 border-l border-surface-variant pl-6">
              <span className="hidden sm:block font-label-sm text-on-surface-variant capitalize">
                Hola, {usuarioLogueado?.nombreAdmin || "Admin"}
              </span>
              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center overflow-hidden border border-surface-variant">
                <span className="material-symbols-outlined text-sm">
                  person
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENIDO DEL INVENTARIO */}
        <main className="flex-1 mt-16 p-4 md:p-gutter w-full max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-stack-lg gap-4 pt-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">
                Inventario de Vehículos
              </h2>
              <p className="text-on-surface-variant mt-1 font-body-md">
                Gestiona, actualiza y monitorea tu flota actual.
              </p>
            </div>
            <Link
              to="/administrador/crear"
              className="lg:hidden bg-primary text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-primary/90 transition-all flex items-center gap-2 no-underline"
            >
              <span className="material-symbols-outlined">add</span> Agregar
            </Link>
          </div>

          {/* Estadísticas / 4 Cards Globales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-stack-lg">
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
                  Totales
                </p>
                <p className="font-headline-lg text-headline-lg text-primary mt-1">
                  {totalFlota}
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

          {/* Tabla de Inventario */}
          <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-surface-variant">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-surface-container-low border-b border-surface-variant text-xs uppercase tracking-wider font-semibold text-on-surface-variant">
                    <th className="p-4 font-medium">N° / Vehículo</th>
                    <th className="p-4 font-medium">Categoría</th>
                    <th className="p-4 font-medium">Año</th>
                    <th className="p-4 font-medium">Precio</th>
                    <th className="p-4 font-medium">Estado</th>
                    <th className="p-4 font-medium text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant bg-surface-container-lowest">
                  {vehiculosFiltrados.length === 0 ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-8 text-center text-on-surface-variant font-body-md"
                      >
                        No se encontraron vehículos que coincidan con "
                        {terminoBusqueda}".
                      </td>
                    </tr>
                  ) : (
                    vehiculosFiltrados.map((vehiculo, indice) => (
                      <ItemVehiculo
                        key={vehiculo._id}
                        vehiculo={vehiculo}
                        fila={(page - 1) * limit + indice + 1}
                        setListaVehiculos={setListaVehiculos}
                        page={page}
                        limit={limit}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="p-4 border-t border-surface-variant bg-surface/50 flex justify-between items-center">
              <span className="text-sm text-on-surface-variant hidden md:block">
                Página {page} de {totalPages}
              </span>
              <nav className="flex items-center gap-1 mx-auto md:mx-0">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="w-8 h-8 flex items-center justify-center rounded border border-surface-variant text-on-surface-variant hover:bg-surface-variant disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_left
                  </span>
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded font-medium transition-colors ${
                      page === i + 1
                        ? "bg-primary text-white shadow-sm border-primary"
                        : "border border-surface-variant text-on-surface-variant hover:bg-surface-variant"
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
                  className="w-8 h-8 flex items-center justify-center rounded border border-surface-variant text-on-surface-variant hover:bg-surface-variant disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    chevron_right
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Administrador;
