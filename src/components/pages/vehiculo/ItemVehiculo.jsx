import React from "react";
import { Link } from "react-router";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import {
  borrarVehiculosPorId,
  leerVehiculosPaginados,
} from "../../../../helpers/queries.js";
import "./ItemVehiculo.css"

const ItemVehiculo = ({ vehiculo, setListaVehiculos, fila, page, limit }) => {

  const eliminarVehiculo = () => {
    Swal.fire({
      title: "Eliminar Vehiculo",
      text: "No puedes revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "rgb(108, 117, 125)",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarVehiculosPorId(vehiculo._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Vehiculo eliminado",
            text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} fue eliminado correctamente`,
            icon: "success",
          });
          const respuestaVehiculos = await leerVehiculosPaginados(page, limit);
          const vehiculosActualizados = await respuestaVehiculos.json();
          setListaVehiculos(vehiculosActualizados.vehiculos);
        } else {
          Swal.fire({
            title: "Ocurrio un error",
            text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} no pudo ser eliminado`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <tr>
      <td className="text-center">
        {fila}
      </td>
      <td className="text-center">
        {vehiculo.marca} {vehiculo.modelo}
      </td>
      <td className="text-center">{vehiculo.categoria}</td>
      <td className="text-center">
        <img
          src={vehiculo.imagenes[0]}
          className="img-thumbnail img-item"
          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
        />
      </td>
      <td className="text-center">{vehiculo.anio}</td>
      <td className="text-center">${vehiculo.precio.toLocaleString("es-AR")}</td>
      <td className="text-center">
        <span
          className={`badge ${
            vehiculo.disponible ? "bg-success" : "bg-danger"
          }`}
        >
          {vehiculo.disponible ? "Disponible" : "Vendido"}
        </span>
      </td>
      <td className="text-center">
        <Link
          className="me-lg-2 btn btn-warning"
          to={"/administrador/editar/" + vehiculo._id}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={eliminarVehiculo}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemVehiculo;
