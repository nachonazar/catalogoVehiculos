import React from "react";
import { Col, Card, CardFooter } from "react-bootstrap";
import { Link } from "react-router";

const CardVehiculo = ({ vehiculo }) => {
  return (
    <Col md={4} lg={3} className="mb-3">
      <Card className="h-100">
        <div>
          <img
            src={vehiculo.imagen}
            alt={vehiculo.modelo}
            className="img-fluid"
          />
        </div>
        <Card.Body>
            <div className="d-flex justify-content-between align-items-start">
          <Card.Title className="primary-font">{vehiculo.marca} {vehiculo.modelo}</Card.Title>
          <span className="badge bg-success">Disponible</span>
          </div>
          <p>{vehiculo.tipo}</p>
          <p><i className="bi bi-calendar"></i>Año {vehiculo.anio}</p>
          <p><i className="bi bi-speedometer"></i>{vehiculo.km} km</p>
          <Card.Text>
            Descripción: {vehiculo.descripcion}
            <br className="mb-2" />
            <span className="fw-bold">Precio: ${vehiculo.precio}</span>
          </Card.Text>
        </Card.Body>
        <CardFooter className="text-end">
          <Link variant="primary" className="me-2 btn btn-primary">
            Ver detalles
          </Link>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default CardVehiculo;
