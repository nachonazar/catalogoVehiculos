import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link } from "react-router";

const Administrador = () => {
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2>Panel de Administración</h2>
          <p>Gestiona el inventario de vehículos</p>
        </div>
        <Link className="btn btn-primary" to={"/administrador/crear"}>+ Agregar Vehículo</Link>
      </div>
      <Table responsive striped bordered hover>
      <thead>
          <tr className="text-center">
            <th>VEHICULO</th>
            <th>TIPO</th>
            <th>AÑO</th>
            <th>PRECIO</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody></tbody>
        </Table>
    </Container>
  );
};

export default Administrador;
