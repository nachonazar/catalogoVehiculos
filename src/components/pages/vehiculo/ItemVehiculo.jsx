import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { borrarVehiculosPorId } from "../../../../helpers/queries.js";

const ItemVehiculo = ({ vehiculo, setListaVehiculos, fila }) => {
  const navegacion = useNavigate();

  const eliminarVehiculo = () => {
    Swal.fire({
      title: "Eliminar Vehículo",
      text: "No puedes revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#71717a",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarVehiculosPorId(vehiculo._id);
        if (respuesta.status === 200) {
          Swal.fire({
            title: "Vehículo eliminado",
            text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} fue eliminado correctamente`,
            icon: "success",
            confirmButtonColor: "#09090b",
          });

          setListaVehiculos();
        } else if (respuesta.status === 401) {
          Swal.fire({
            title: "Sesión expirada",
            text: "Tu sesión venció o no es válida. Volvé a iniciar sesión para continuar.",
            icon: "warning",
            confirmButtonColor: "#09090b",
          }).then(() => {
            sessionStorage.removeItem("userKey");
            navegacion("/login");
          });
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} no pudo ser eliminado`,
            icon: "error",
            confirmButtonColor: "#dc2626",
          });
        }
      }
    });
  };

  return (
    <tr className="table-row">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2 py-1 rounded-lg">
            #{fila}
          </span>
          <div className="w-16 h-11 rounded-xl overflow-hidden bg-surface-container border border-outline-variant shrink-0">
            <img
              src={vehiculo.imagenes[0] || "https://via.placeholder.com/150"}
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-semibold text-on-surface capitalize truncate">
            {vehiculo.marca} {vehiculo.modelo}
          </p>
        </div>
      </td>

      <td className="p-4 text-sm text-on-surface-variant capitalize">
        {vehiculo.categoria}
      </td>

      <td className="p-4 text-sm text-on-surface-variant">{vehiculo.anio}</td>

      <td className="p-4 text-sm font-semibold text-on-surface">
        ${vehiculo.precio.toLocaleString("es-AR")}
      </td>

      <td className="p-4">
        {vehiculo.disponible ? (
          <span className="badge-success">Disponible</span>
        ) : (
          <span className="badge-error">Vendido</span>
        )}
      </td>

      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Link
            to={`/administrador/editar/${vehiculo._id}`}
            title="Editar"
            aria-label={`Editar ${vehiculo.marca} ${vehiculo.modelo}`}
            className="btn-icon no-underline hover:!bg-secondary hover:!text-white"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
          </Link>
          <button
            type="button"
            onClick={eliminarVehiculo}
            title="Eliminar"
            aria-label={`Eliminar ${vehiculo.marca} ${vehiculo.modelo}`}
            className="btn-icon hover:!bg-error hover:!text-white"
          >
            <span className="material-symbols-outlined text-[16px]">
              delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemVehiculo;
