import React, { useEffect, useState } from "react";
import CardVehiculo from "./vehiculo/CardVehiculo";
import Contacto from "../shared/Contacto";
import { leerVehiculosPaginados } from "../../../helpers/queries.js";

const Inicio = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [categoriaElegida, setCategoriaElegida] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerVehiculos();
  }, [page]);

  const obtenerVehiculos = async () => {
    setCargando(true);
    const respuesta = await leerVehiculosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setVehiculos(datos.vehiculos);
      setTotalPages(datos.totalPages);
    } else {
      console.info("Ocurrio un error al buscar los vehiculos");
    }
    setCargando(false);
  };

  const vehiculosFiltrados = vehiculos
    .filter((v) => v.disponible)
    .filter((v) => (categoriaElegida ? v.categoria === categoriaElegida : true))
    .filter(
      (v) =>
        (v.marca || "").toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        (v.modelo || "").toLowerCase().includes(terminoBusqueda.toLowerCase()),
    );

  return (
    <div className="bg-surface">
      {/* HERO */}
      <section className="relative w-full min-h-[520px] md:min-h-[600px] flex items-center justify-center overflow-hidden pt-[72px]">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-surface" />

        <div className="relative z-10 container-app text-center py-20 md:py-28 animate-slide-up">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-success-green animate-pulse" />
            Catálogo actualizado
          </p>
          <h1 className="font-display-lg text-display-lg text-white mb-4 max-w-3xl mx-auto">
            Encontrá tu próximo vehículo
          </h1>
          <p className="font-body-lg text-body-lg text-white/70 mb-10 max-w-xl mx-auto">
            El catálogo más completo de vehículos seleccionados para vos.
          </p>
          <a href="#vehiculos" className="btn-secondary !px-8 !py-3.5 no-underline shadow-float">
            Ver inventario
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </a>
        </div>
      </section>

      {/* FILTERS */}
      <section className="relative z-20 -mt-8 container-app">
        <div className="card p-4 md:p-5 flex flex-col md:flex-row gap-3 shadow-float">
          <div className="relative flex-grow">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por marca o modelo..."
              aria-label="Buscar vehículos"
              className="input-base !pl-11"
              value={terminoBusqueda}
              onChange={(e) => {
                setTerminoBusqueda(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            aria-label="Filtrar por categoría"
            className="select-base md:w-52"
            value={categoriaElegida}
            onChange={(e) => {
              setCategoriaElegida(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Todas las categorías</option>
            <option value="Sedán">Sedán</option>
            <option value="SUV">SUV</option>
            <option value="Camioneta">Camioneta</option>
            <option value="Deportivo">Deportivo</option>
          </select>
        </div>
      </section>

      {/* CATALOG */}
      <section className="container-app section-padding !pb-12" id="vehiculos">
        <div className="mb-10 md:mb-12">
          <p className="text-label mb-2">Inventario</p>
          <h2 className="font-heading text-headline-lg text-on-surface mb-2">
            Vehículos disponibles
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Explorá nuestro catálogo de vehículos seleccionados
          </p>
        </div>

        {cargando ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 -mx-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6">
                <div className="card overflow-hidden">
                  <div className="skeleton aspect-[4/3] w-full !rounded-none" />
                  <div className="p-5 space-y-3">
                    <div className="skeleton h-4 w-1/3" />
                    <div className="skeleton h-6 w-2/3" />
                    <div className="skeleton h-4 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : vehiculosFiltrados.length > 0 ? (
          <div className="flex flex-wrap -mx-2">
            {vehiculosFiltrados.map((vehiculo) => (
              <CardVehiculo key={vehiculo._id} vehiculo={vehiculo} />
            ))}
          </div>
        ) : (
          <div className="empty-state card">
            <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px] text-on-surface-variant">
                directions_car
              </span>
            </div>
            <h3 className="font-heading text-lg font-semibold text-on-surface mb-2">
              Sin resultados
            </h3>
            <p className="text-sm text-on-surface-variant max-w-sm">
              {terminoBusqueda || categoriaElegida
                ? "No encontramos vehículos con esos filtros. Probá con otra búsqueda."
                : "No hay vehículos disponibles en este momento."}
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav aria-label="Paginación" className="flex justify-center items-center mt-12 gap-1.5">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              aria-label="Página anterior"
              className="pagination-btn"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                aria-label={`Página ${i + 1}`}
                aria-current={page === i + 1 ? "page" : undefined}
                className={`pagination-btn ${page === i + 1 ? "pagination-btn-active" : ""}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              aria-label="Página siguiente"
              className="pagination-btn"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </nav>
        )}
      </section>

      <Contacto />
    </div>
  );
};

export default Inicio;
