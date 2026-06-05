import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Carousel } from "react-bootstrap";
import { useParams } from "react-router";
import { leerVehiculoPorId } from "../../../helpers/queries";

const DetalleVehiculo = () => {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    obtenerVehiculo();
  }, []);

  if (!vehiculo) return <p>No existe el vehículo</p>;

  async function obtenerVehiculo(params) {
    const respuesta = await leerVehiculoPorId(id);
    if (respuesta.status === 200) {
      const vehiculoBuscado = await respuesta.json();
      setVehiculo(vehiculoBuscado);
    }
  }

  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            {vehiculo.imagenes?.length > 0 ? (
              <Carousel>
                {vehiculo.imagenes.map((img, index) => (
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
                {vehiculo.marca} {vehiculo.modelo}
              </Card.Title>
              <hr />
              <Card.Text>
                {vehiculo.descripcion}
                <br />
                <span className="primary-font fw-semibold">
                  Categoria: {vehiculo.categoria}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Precio: {vehiculo.precio}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Año: {vehiculo.anio}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Kilometraje: {vehiculo.km}
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
