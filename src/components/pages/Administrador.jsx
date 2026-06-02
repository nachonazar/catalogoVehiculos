import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router";
import ItemVehiculo from "./vehiculo/ItemVehiculo";
import { leerVehiculosPaginados } from "../../../helpers/queries.js";

const Administrador = () => {
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [page, setPage] = useState(1); //número de página actual
  const [limit] = useState(3); //cantidad de productos por página (fijo en 10).
  const [totalPages, setTotalPages] = useState(1); //total de páginas disponibles (lo devuelve el backend).

  useEffect(() => {
    obtenerVehiculos();
  }, [page]);

  const obtenerVehiculos = async () => {
    const respuesta = await leerVehiculosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaVehiculos(datos.vehiculos);
      setTotalPages(datos.totalPages)
    } else {
      console.info("Ocurrio un error al buscar los vehiculos");
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>Panel de Administración</h2>
          <p>Gestiona el inventario de vehículos</p>
        </div>
        <Link className="btn btn-primary" to={"/administrador/crear"}>
          + Agregar Vehículo
        </Link>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>VEHICULO</th>
            <th>CATEGORIA</th>
            <th>URL de imagen</th>
            <th>AÑO</th>
            <th>PRECIO</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {listaVehiculos.map((vehiculo) => (
            <ItemVehiculo
              key={vehiculo._id}
              vehiculo={vehiculo}
              setListaVehiculos={setListaVehiculos}
            ></ItemVehiculo>
          ))}
        </tbody>
      </Table>
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
  );
};

export default Administrador;
