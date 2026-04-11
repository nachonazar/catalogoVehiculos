import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";

const DetalleVehiculo = ({ buscarVehiculo }) => {
  const { id } = useParams();
  const vehiculoBuscado = buscarVehiculo(id);
  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            <Card.Img
              variant="top"
              src={vehiculoBuscado.imagen}
              alt={`${vehiculoBuscado.marca} ${vehiculoBuscado.modelo}`}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="primary-font">
                {vehiculoBuscado.marca} {vehiculoBuscado.modelo}
              </Card.Title>
              <hr />
              <Card.Text>
                {vehiculoBuscado.descripcion}
                <br />
                <span className="primary-font fw-semibold">
                  Categoria: {vehiculoBuscado.categoria}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Precio: {vehiculoBuscado.precio}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Año: {vehiculoBuscado.anio}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Kilometraje: {vehiculoBuscado.km}
                </span>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetalleVehiculo;
