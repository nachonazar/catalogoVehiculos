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

  useEffect(() => {
    obtenerVehiculos();
  }, [page]);

  const obtenerVehiculos = async () => {
    const respuesta = await leerVehiculosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setVehiculos(datos.vehiculos);
      setTotalPages(datos.totalPages);
    } else {
      console.info("Ocurrio un error al buscar los vehiculos");
    }
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
      <section
        className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#051125]/72 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6 flex flex-col items-center">
          <h1 className="font-display-lg text-display-lg text-white mb-3 drop-shadow-lg">
            Encontrá tu próximo vehículo
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary-container mb-8 drop-shadow-md">
            El catálogo más completo de vehículos seleccionados para vos.
          </p>
          <a
            href="#vehiculos"
            className="bg-blue-600 text-white no-underline rounded-lg px-8 py-4 text-[14px] font-semibold uppercase tracking-widest hover:bg-blue-800 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            Ver Inventario
          </a>
        </div>
      </section>

      {/* FILTROS FLOTANTES */}
      <section className="relative z-20 -mt-7 px-gutter max-w-[1100px] mx-auto">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0px_10px_30px_rgba(27,38,59,0.08)] p-4 flex flex-col md:flex-row gap-3 items-center">
          <div className="relative flex-grow w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar modelo o marca..."
              className="w-full h-12 pl-10 pr-4 rounded-lg border border-outline-variant bg-surface text-[16px] text-text-main outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
              value={terminoBusqueda}
              onChange={(e) => {
                setTerminoBusqueda(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <select
            className="w-full md:w-[200px] h-12 px-4 rounded-lg border border-outline-variant bg-surface text-[16px] text-text-main outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors"
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

      {/* VEHICULOS */}
      <main className="max-w-[1200px] mx-auto px-6 py-12" id="vehiculos">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">
          Vehículos Disponibles
        </h2>
        <p className="font-body-md text-on-surface-variant mb-8">
          Explora nuestro catálogo de vehículos
        </p>

        <div className="flex flex-wrap -mx-2">
          {vehiculosFiltrados.length > 0 ? (
            vehiculosFiltrados.map((vehiculo) => (
              <CardVehiculo key={vehiculo._id} vehiculo={vehiculo} />
            ))
          ) : (
            <p className="text-on-surface-variant px-2">
              No se encontraron vehículos para mostrar
            </p>
          )}
        </div>

        {/* PAGINACION */}
        <div className="flex justify-center items-center mt-10 gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-300 hover:text-white hover:border-blue-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-300 transition-colors bg-transparent"
          >
            &laquo;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg font-semibold text-[14px] transition-colors border ${
                page === i + 1
                  ? "bg-[#051125] text-white border-[#051125]"
                  : "border-gray-300 text-gray-600 hover:bg-blue-300 hover:text-white hover:border-blue-300 bg-transparent"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-blue-300 hover:text-white hover:border-blue-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gray-600 disabled:hover:border-gray-300 transition-colors bg-transparent"
          >
            &raquo;
          </button>
        </div>
      </main>

      <Contacto />
    </div>
  );
};

export default Inicio;
