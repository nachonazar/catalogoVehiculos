import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router";
import ItemVehiculo from "./vehiculo/ItemVehiculo";
import { leerVehiculosPaginados } from "../../../helpers/queries.js";

const Administrador = () => {
  const [listaVehiculos, setListaVehiculos] = useState([]);
  const [page, setPage] = useState(1); //número de página actual
  const [limit] = useState(4); //cantidad de productos por página (fijo en 10).
  const [totalPages, setTotalPages] = useState(1); //total de páginas disponibles (lo devuelve el backend).

  useEffect(() => {
    obtenerVehiculos();
  }, [page]);

  const obtenerVehiculos = async () => {
    const respuesta = await leerVehiculosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaVehiculos(datos.vehiculos);
      setTotalPages(datos.totalPages);
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
            <th>COD</th>
            <th>VEHICULO</th>
            <th>CATEGORIA</th>
            <th>IMAGENES</th>
            <th>AÑO</th>
            <th>PRECIO</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {listaVehiculos.map((vehiculo, indice) => (
            <ItemVehiculo
              key={vehiculo._id}
              vehiculo={vehiculo}
              fila={(page - 1) * limit + indice + 1}
              setListaVehiculos={setListaVehiculos}
              page={page}
              limit={limit}
            ></ItemVehiculo>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center my-3 gap-2">
        <Button
          variant="outline-secondary"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          &laquo;
        </Button>

        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i + 1}
            variant={page === i + 1 ? "primary" : "outline-secondary"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outline-secondary"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          &raquo;
        </Button>
      </div>
    </Container>
  );
};

export default Administrador;
