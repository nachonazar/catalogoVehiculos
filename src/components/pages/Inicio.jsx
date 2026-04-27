import React, { useEffect, useState } from "react";
import { Container, Row, Form } from "react-bootstrap";
import CardVehiculo from "./vehiculo/CardVehiculo";
import Contacto from "../shared/Contacto";
import { leerVehiculos } from "../../../helpers/queries.js";

const Inicio = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    obtenerVehiculos();
  }, []);

  const obtenerVehiculos = async () => {
    const respuesta = await leerVehiculos();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setVehiculos(datos);
    } else {
      console.info("Ocurrio un error al buscar los vehiculos");
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setTerminoBusqueda(e.target.value);
  };

  const vehiculosFiltrados = vehiculos
    .filter((v) => v.disponible)
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
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Buscar por marca o modelo..."
              onChange={handleInputChange}
              value={terminoBusqueda}
            />
          </Form.Group>
        </Form>
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
      </Container>
      <Contacto></Contacto>
    </div>
  );
};

export default Inicio;
