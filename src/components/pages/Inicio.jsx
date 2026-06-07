import React, { useEffect, useState } from "react";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import CardVehiculo from "./vehiculo/CardVehiculo";
import Contacto from "../shared/Contacto";
import { leerVehiculosPaginados } from "../../../helpers/queries.js";

const Inicio = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [page, setPage] = useState(1); //número de página actual
  const [limit] = useState(3); //cantidad de productos por página (fijo en 10).
  const [totalPages, setTotalPages] = useState(1); //total de páginas disponibles (lo devuelve el backend).
  const [categoriaElegida, setCategoriaElegida] = useState("");

  useEffect(() => {
    obtenerVehiculos();
  }, [page]);

  const obtenerVehiculos = async () => {
    const respuesta = await leerVehiculosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setVehiculos(datos.vehiculos);
      setTotalPages(datos.totalPages);
    } else {
      console.info("Ocurrio un error al buscar los vehiculos");
    }
  };

  const handleInputChange = (e) => {
    setTerminoBusqueda(e.target.value);
  };

  const vehiculosFiltrados = vehiculos
    .filter((v) => v.disponible)
    .filter((vehiculo) =>
      categoriaElegida ? vehiculo.categoria === categoriaElegida : true,
    )
    .filter(
      (vehiculo) =>
        (vehiculo.marca || "")
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        (vehiculo.modelo || "")
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()),
    );

  return (
    <div>
      <Container className="mt-5">
        <h2>Vehiculos Disponibles</h2>
        <p>Explora nuestro catálogo de vehículos</p>
        <Row className="mb-3">
          <Col md={8}>
            <Form.Control
              type="text"
              placeholder="Buscar por marca o modelo..."
              onChange={handleInputChange}
              value={terminoBusqueda}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={categoriaElegida}
              onChange={(e) => {
                setCategoriaElegida(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Todas las categorías</option>
              <option value="Sedán">Sedán</option>
              <option value="SUV">SUV</option>
              <option value="Camioneta">Camioneta</option>
              <option value="Deportivo">Deportivo</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          {vehiculosFiltrados.length > 0 ? (
            vehiculosFiltrados.map((vehiculo) => (
              <CardVehiculo
                key={vehiculo._id}
                vehiculo={vehiculo}
              ></CardVehiculo>
            ))
          ) : (
            <p>No se encontraron vehiculos para mostrar</p>
          )}
        </Row>
        <div className="d-flex justify-content-center align-items-center my-3">
          <Button
            variant="secondary"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <span className="mx-3">
            Página {page} de {totalPages}
          </span>
          <Button
            variant="secondary"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Siguiente
          </Button>
        </div>
      </Container>
      <Contacto></Contacto>
    </div>
  );
};

export default Inicio;
