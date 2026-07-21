import React from "react";
import { Link } from "react-router-dom";

const CardVehiculo = ({ vehiculo }) => {
  return (
    <div className="w-full md:w-1/3 px-2 mb-4">
      <article className="bg-surface-container-lowest rounded-xl border border-surface-container-highest overflow-hidden flex flex-col h-full shadow-[0px_5px_15px_rgba(27,38,59,0.03)] hover:shadow-[0px_15px_35px_rgba(27,38,59,0.08)] hover:-translate-y-1 transition-all duration-300">
        
        {/* Imagen */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-surface-container">
          <img
            src={vehiculo.imagenes[0]}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 bg-success-green/90 text-white px-3 py-1 rounded-full text-[12px] font-semibold tracking-[0.05em] backdrop-blur-sm">
            Disponible
          </span>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-headline-md text-[20px] font-semibold text-primary capitalize mb-3">
            {vehiculo.marca} {vehiculo.modelo}
          </h3>

          {/* Tags con Material Symbols */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-surface-container px-3 py-1 rounded-full text-[12px] font-semibold text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calendar_month</span> {vehiculo.anio}
            </span>
            <span className="bg-surface-container px-3 py-1 rounded-full text-[12px] font-semibold text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">speed</span>{" "}
              {vehiculo.km.toLocaleString("es-AR")} km
            </span>
            <span className="bg-surface-container px-3 py-1 rounded-full text-[12px] font-semibold text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">category</span> {vehiculo.categoria}
            </span>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end border-t border-surface-container-highest pt-3 mt-auto">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.05em] text-outline mb-0.5">
                Precio al contado
              </p>
              <p className="font-headline-md text-[22px] font-bold text-text-main mb-0">
                ${vehiculo.precio.toLocaleString("es-AR")}
              </p>
            </div>
            <Link
              className="border-2 border-primary text-primary bg-transparent rounded-lg px-4 py-2 text-[12px] font-semibold tracking-[0.05em] uppercase no-underline hover:bg-primary hover:text-white transition-all whitespace-nowrap"
              to={"/detalle/" + vehiculo._id}
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CardVehiculo;