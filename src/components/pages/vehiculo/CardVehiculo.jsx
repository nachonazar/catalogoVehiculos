import React from "react";
import { Link } from "react-router";
import "./CardVehiculo.css";

const CardVehiculo = ({ vehiculo }) => {
  return (
    <div className="col-md-4 mb-4">
      <article className="card-vehiculo">
        <div className="card-vehiculo-img">
          <img
            src={vehiculo.imagenes[0]}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
          />
          <span className="card-vehiculo-badge">Disponible</span>
        </div>
        <div className="card-vehiculo-body">
          <h3 className="card-vehiculo-titulo">
            {vehiculo.marca} {vehiculo.modelo}
          </h3>
          <div className="card-vehiculo-tags">
            <span className="card-vehiculo-tag">
              <i className="bi bi-calendar"></i> {vehiculo.anio}
            </span>
            <span className="card-vehiculo-tag">
              <i className="bi bi-speedometer"></i> {vehiculo.km.toLocaleString("es-AR")} km
            </span>
            <span className="card-vehiculo-tag">
              <i className="bi bi-tag"></i> {vehiculo.categoria}
            </span>
          </div>
          <div className="card-vehiculo-footer">
            <div>
              <p className="card-vehiculo-precio-label">Precio al contado</p>
              <p className="card-vehiculo-precio">
                ${vehiculo.precio.toLocaleString("es-AR")}
              </p>
            </div>
            <Link className="card-vehiculo-btn" to={"/detalle/" + vehiculo._id}>
              Ver detalles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default CardVehiculo;