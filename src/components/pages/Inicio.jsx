import React from "react";
import { Container, Row, Form } from "react-bootstrap";

const Inicio = () => {
  return (
    <div>
      <Container className="mt-5">
        <h2>Vehiculos Disponibles</h2>
        <p>Explora nuestro catálogo de vehículos</p>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Buscar por marca o modelo..."
          />
        </Form.Group>
      </Form>
      </Container>
    </div>
  );
};

export default Inicio;
