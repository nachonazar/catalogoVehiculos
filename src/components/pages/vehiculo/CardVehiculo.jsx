import React from "react";
import { Col, Card, CardFooter } from "react-bootstrap";
import { Link } from "react-router";
import "./CardVehiculo.css";

const CardVehiculo = ({ vehiculo }) => {
  return (
    <Col md={4} className="mb-3">
      <Card className="h-100">
        <div>
          <img
            src={vehiculo.imagenes[0]}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            className="img-fluid img-card"
          />
        </div>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <Card.Title className="primary-font card-titulo">
              {vehiculo.marca} {vehiculo.modelo}
            </Card.Title>
            <span className="badge bg-success">Disponible</span>
          </div>
          <p>{vehiculo.categoria}</p>
          <p>
            <i className="bi bi-calendar"></i>Año {vehiculo.anio}
          </p>
          <p>
            <i className="bi bi-speedometer"></i>
            {vehiculo.km.toLocaleString("es-AR")} km
          </p>
          <Card.Text>
            <span>Descripción:</span>{" "}
            <span className="card-descripcion">{vehiculo.descripcion}</span>
            <br className="mb-2" />
            <span className="fw-bold">
              Precio: ${vehiculo.precio.toLocaleString("es-AR")}
            </span>
          </Card.Text>
        </Card.Body>
        <CardFooter className="text-end">
          <Link
            variant="primary"
            className="me-2 btn btn-primary"
            to={"/detalle/" + vehiculo._id}
          >
            Ver detalles
          </Link>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default CardVehiculo;
