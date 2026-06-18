import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de usar react-router-dom
import Swal from "sweetalert2";
import {
  borrarVehiculosPorId,
  leerVehiculosPaginados,
} from "../../../../helpers/queries.js";

const ItemVehiculo = ({ vehiculo, setListaVehiculos, fila, page, limit }) => {
  const eliminarVehiculo = () => {
    Swal.fire({
      title: "Eliminar Vehículo",
      text: "No puedes revertir este paso",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ba1a1a", // Color Error de Stich
      cancelButtonColor: "#545e76", // Color Surface-tint
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
            confirmButtonColor: "#051125", // Color Primary
          });
          const respuestaVehiculos = await leerVehiculosPaginados(page, limit);
          const vehiculosActualizados = await respuestaVehiculos.json();
          setListaVehiculos(vehiculosActualizados.vehiculos);
        } else {
          Swal.fire({
            title: "Ocurrió un error",
            text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} no pudo ser eliminado`,
            icon: "error",
            confirmButtonColor: "#ba1a1a",
          });
        }
      }
    });
  };

  return (
    <tr className="bg-white hover:bg-surface-container-low hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 group">
      {/* Columna 1: ID, Imagen y Nombre */}
      <td className="p-4">
        <div className="flex items-center gap-4">
          {/* El número de fila funciona como un mini badge */}
          <span className="font-label-sm text-on-surface-variant bg-surface-variant px-2 py-1 rounded-md text-xs">
            #{fila}
          </span>
          <div className="w-20 h-14 rounded-lg overflow-hidden bg-surface-variant border border-surface-variant shrink-0">
            <img
              src={vehiculo.imagenes[0] || "https://via.placeholder.com/150"}
              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-headline-sm text-[15px] font-semibold text-primary capitalize">
              {vehiculo.marca} {vehiculo.modelo}
            </p>
          </div>
        </div>
      </td>

      {/* Columna 2: Categoría */}
      <td className="p-4 font-body-md text-sm text-on-surface-variant capitalize">
        {vehiculo.categoria}
      </td>

      {/* Columna 3: Año */}
      <td className="p-4 font-body-md text-sm text-on-surface-variant">
        {vehiculo.anio}
      </td>

      {/* Columna 4: Precio */}
      <td className="p-4 font-headline-sm text-[15px] font-semibold text-primary">
        ${vehiculo.precio.toLocaleString("es-AR")}
      </td>

      {/* Columna 5: Estado (Badge) */}
      <td className="p-4">
        {vehiculo.disponible ? (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-green/10 text-success-green border border-success-green/20">
            Disponible
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-error/10 text-error border border-error/20">
            Vendido
          </span>
        )}
      </td>

      {/* Columna 6: Acciones */}
      <td className="p-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/administrador/editar/${vehiculo._id}`}
            title="Editar"
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </Link>
          <button
            onClick={eliminarVehiculo}
            title="Eliminar"
            className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-error hover:bg-error hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemVehiculo;
