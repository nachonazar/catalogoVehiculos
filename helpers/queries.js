const urlvehiculos = import.meta.env.VITE_API_VEHICULOS;
const urlUsuarios = import.meta.env.VITE_API_USUARIOS;

//get, post, put, delete

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
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
      body: JSON.stringify(vehiculoNuevo),
    });
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
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
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
      headers: {
        "x-token": JSON.parse(sessionStorage.getItem("userKey")).token,
      },
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (datosAdmin) => {
  try {
    const respuesta = await fetch(urlUsuarios + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosAdmin),
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
