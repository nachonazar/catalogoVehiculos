import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Carousel, Modal } from "react-bootstrap";
import { useParams } from "react-router";
import { leerVehiculoPorId } from "../../../helpers/queries";
import "./vehiculo/CardVehiculo.css";
import "./vehiculo/Modal.css";

const DetalleVehiculo = () => {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [indexFoto, setIndexFoto] = useState(0);

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

  const handleSelect = (selectedIndex) => {
    setIndexFoto(selectedIndex);
  };

  return (
    <Container className="my-3 mainSection">
      <Card>
        <Row>
          <Col md={6}>
            {vehiculo.imagenes?.length > 0 ? (
              <Carousel activeIndex={indexFoto} onSelect={handleSelect}>
                {vehiculo.imagenes.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={img}
                      className="d-block w-100"
                      style={{
                        height: "400px",
                        objectFit: "cover",
                        cursor: "zoom-in",
                      }}
                      alt={`imagen-${index}`}
                      onClick={() => setShowModal(true)}
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
              <span className="badge bg-success">Disponible</span>
              <hr />
              <Card.Text>
                <span className="primary-font fw-semibold">
                  Categoria: {vehiculo.categoria}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Precio: ${vehiculo.precio.toLocaleString("es-AR")}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Año: {vehiculo.anio}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Kilometraje: {vehiculo.km.toLocaleString("es-AR")}
                </span>
                <br className="mb-3" />
                <span className="primary-font fw-semibold">
                  Descripción:
                </span>{" "}
                <span className="card-descripcion">{vehiculo.descripcion}</span>
                <br className="mb-3" />
                <a
                  href={`https://wa.me/5493816289462?text=Hola!%20Me%20interesa%20el%20${vehiculo.marca}%20${vehiculo.modelo}%20${vehiculo.anio}%20que%20vi%20en%20el%20catálogo`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success mt-3 w-100"
                >
                  <i className="bi bi-whatsapp me-2"></i>Consultar por WhatsApp
                </a>
              </Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        fullscreen={true}
        centered
        contentClassName="bg-transparent border-0 m-0 p-0"
      >
        <button
          type="button"
          className="btn-close btn-close-white position-absolute top-0 end-0 m-4 fs-4"
          style={{ zIndex: 1050 }}
          onClick={() => setShowModal(false)}
          aria-label="Close"
        ></button>

        <div
          className="position-absolute top-0 start-0 m-4 text-light primary-font fs-5"
          style={{ zIndex: 1050 }}
        >
          {indexFoto + 1} / {vehiculo.imagenes?.length}
        </div>

        <Modal.Body
          className="p-0 vh-100 w-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(5px)",
          }}
        >
          <Carousel
            activeIndex={indexFoto}
            onSelect={handleSelect}
            interval={null}
            className="w-100 h-100"
          >
            {vehiculo.imagenes?.map((img, index) => (
              <Carousel.Item key={index} className="h-100 text-center">
                <img
                  src={img}
                  alt={`Zoom-${index}`}
                  className="img-fluid modal-imagen-ml"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default DetalleVehiculo;
