import React from "react";
import { Link } from "react-router";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const ItemVehiculo = ({ vehiculo, borrarVehiculo }) => {
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
    }).then((result) => {
      if (result.isConfirmed)
        if (borrarVehiculo(vehiculo.id)) {
          //aqui borro efectivamente el vehiculo
          Swal.fire({
            title: "Vehiculo eliminado",
            text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} fue eliminado correctamente`,
            icon: "success",
          });
        }else{
          Swal.fire({
            title: "Ocurrio un error",
            text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} no pudo ser eliminado`,
            icon: "error",
          });
        }
    });
  };

  return (
    <tr>
      <td className="text-center">
        {vehiculo.marca} {vehiculo.modelo}
      </td>
      <td className="text-center">{vehiculo.tipo}</td>
      <td className="text-center">
        <img
          src={vehiculo.imagen}
          className="img-thumbnail"
          alt={vehiculo.modelo}
        />
      </td>
      <td className="text-center">{vehiculo.año}</td>
      <td className="text-center">{vehiculo.precio}</td>
      <td className="text-center">Disponible</td>
      <td className="text-center">
        <Link className="me-lg-2 btn btn-warning" to={'/administrador/editar/'+vehiculo.id}>
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
