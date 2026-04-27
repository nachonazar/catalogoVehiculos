const urlvehiculos = import.meta.env.VITE_API_VEHICULOS;

//get, post, put, delete
console.log(urlvehiculos);

export const leerVehiculos = async () => {
  try {
    const respuesta = await fetch(urlvehiculos);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const crearVehiculo = async (vehiculoNuevo) => {
  try {
    const respuesta = await fetch(urlvehiculos, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehiculoNuevo),
    });
    console.log(respuesta)
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const leerVehiculoPorId = async (id) => {
  try {
    const respuesta = await fetch(urlvehiculos + `/${id}`);
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editarVehiculosPorId = async (vehiculoEditado, id) => {
  try {
    const respuesta = await fetch(urlvehiculos + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehiculoEditado),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const borrarVehiculosPorId = async (id) => {
  try {
    const respuesta = await fetch(urlvehiculos + `/${id}`, {
      method: "DELETE",
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
