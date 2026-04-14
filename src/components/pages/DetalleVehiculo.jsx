import React from "react";
import { Container, Card, Row, Col, Carousel } from "react-bootstrap";
import { useParams } from "react-router";

const DetalleVehiculo = ({ buscarVehiculo }) => {
  const { id } = useParams();
  const vehiculoBuscado = buscarVehiculo(id);

  // 🔥 evitar errores si no existe
  if (!vehiculoBuscado) return <p>No existe el vehículo</p>;

  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            {/* 🔥 CARRUSEL CON REACT-BOOTSTRAP */}
            {vehiculoBuscado.imagenes?.length > 0 ? (
              <Carousel>
                {vehiculoBuscado.imagenes.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={img}
                      className="d-block w-100"
                      style={{ height: "400px", objectFit: "cover" }}
                      alt={`imagen-${index}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <img
                src="https://via.placeholder.com/500"
                className="w-100"
                alt="sin imagen"
              />
            )}
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