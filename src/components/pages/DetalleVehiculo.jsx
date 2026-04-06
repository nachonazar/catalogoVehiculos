import React from 'react';
import { Container, Card, Row, Col } from "react-bootstrap";

const DetalleVehiculo = () => {
    return (
        <Container className="my-3 mainSection">
  <Card>
    <Row>
      <Col md={6}>
        <Card.Img
          variant="top"
          src="https://placehold.co/600x400"
          alt="Imagen del producto"
        />
      </Col>
      <Col md={6}>
        <Card.Body>
          <Card.Title className="primary-font">
            Toyota Corolla
          </Card.Title>
          <hr />
          <Card.Text>
            Vehículo en excelente estado, único dueño, service al día.
            <br />
            <span className="primary-font fw-semibold">
              Categoria:
            </span>{" "}
            Sedan
            <br className="mb-3" />
            <span className="primary-font fw-semibold">
              Precio: $25.000
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