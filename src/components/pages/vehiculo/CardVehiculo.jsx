import React from "react";
import { Link } from "react-router-dom";

const CardVehiculo = ({ vehiculo }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6">
      <article className="card-interactive overflow-hidden flex flex-col h-full group">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
          <img
            src={vehiculo.imagenes[0]}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 left-3 badge-success backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
            Disponible
          </span>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-3">
            <p className="text-label mb-1">{vehiculo.categoria}</p>
            <h3 className="font-heading text-lg font-semibold text-on-surface capitalize leading-snug">
              {vehiculo.marca} {vehiculo.modelo}
            </h3>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge-neutral">
              <span className="material-symbols-outlined text-[14px]">calendar_month</span>
              {vehiculo.anio}
            </span>
            <span className="badge-neutral">
              <span className="material-symbols-outlined text-[14px]">speed</span>
              {vehiculo.km.toLocaleString("es-AR")} km
            </span>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end border-t border-outline-variant/60 pt-4 mt-auto gap-3">
            <div>
              <p className="text-label !normal-case !tracking-normal mb-0.5">Precio al contado</p>
              <p className="font-heading text-xl font-bold text-on-surface">
                ${vehiculo.precio.toLocaleString("es-AR")}
              </p>
            </div>
            <Link
              to={"/detalle/" + vehiculo._id}
              className="btn-outline !px-4 !py-2 !text-xs shrink-0 no-underline group/btn"
            >
              Ver detalles
              <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-0.5">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CardVehiculo;
