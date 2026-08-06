const urlvehiculos = import.meta.env.VITE_API_VEHICULOS;
const urlUsuarios = import.meta.env.VITE_API_USUARIOS;

const obtenerToken = () => {
  try {
    const sesion = JSON.parse(sessionStorage.getItem("userKey"));
    return sesion?.token || null;
  } catch {
    return null;
  }
};

const respuestaSinSesion = () => ({
  status: 401,
  json: async () => ({ mensaje: "No hay una sesión activa" }),
});

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
  const token = obtenerToken();
  if (!token) return respuestaSinSesion();

  try {
    const formData = new FormData();
    formData.append("marca", vehiculoNuevo.marca);
    formData.append("modelo", vehiculoNuevo.modelo);
    formData.append("anio", vehiculoNuevo.anio);
    formData.append("categoria", vehiculoNuevo.categoria);
    formData.append("precio", vehiculoNuevo.precio);
    formData.append("km", vehiculoNuevo.km);
    formData.append("disponible", vehiculoNuevo.disponible);
    formData.append("descripcion", vehiculoNuevo.descripcion);
    Array.from(vehiculoNuevo.imagenes).forEach((img) => {
      formData.append("imagenes", img);
    });

    const respuesta = await fetch(urlvehiculos, {
      method: "POST",
      headers: {
        "x-token": token,
      },
      body: formData,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
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
  const token = obtenerToken();
  if (!token) return respuestaSinSesion();

  try {
    const formData = new FormData();
    formData.append("marca", vehiculoEditado.marca);
    formData.append("modelo", vehiculoEditado.modelo);
    formData.append("anio", vehiculoEditado.anio);
    formData.append("categoria", vehiculoEditado.categoria);
    formData.append("precio", vehiculoEditado.precio);
    formData.append("km", vehiculoEditado.km);
    formData.append("disponible", vehiculoEditado.disponible);
    formData.append("descripcion", vehiculoEditado.descripcion);
    if (Array.isArray(vehiculoEditado.imagenes)) {
      if (vehiculoEditado.imagenes[0] instanceof File) {
        vehiculoEditado.imagenes.forEach((img) =>
          formData.append("imagenes", img),
        );
      } else {
        vehiculoEditado.imagenes.forEach((url) =>
          formData.append("imagenesExistentes", url),
        );
      }
    } else if (
      vehiculoEditado.imagenes?.nuevas ||
      vehiculoEditado.imagenes?.existentes
    ) {
      vehiculoEditado.imagenes.nuevas?.forEach((img) =>
        formData.append("imagenes", img),
      );
      vehiculoEditado.imagenes.existentes?.forEach((url) =>
        formData.append("imagenesExistentes", url),
      );
    }

    const respuesta = await fetch(urlvehiculos + `/${id}`, {
      method: "PUT",
      headers: {
        "x-token": token,
      },
      body: formData,
    });
    return respuesta;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const borrarVehiculosPorId = async (id) => {
  const token = obtenerToken();
  if (!token) return respuestaSinSesion();

  try {
    const respuesta = await fetch(urlvehiculos + `/${id}`, {
      method: "DELETE",
      headers: {
        "x-token": token,
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

export const leerVehiculosPaginados = async (page, limit) => {
  try {
    const respuesta = await fetch(
      `${urlvehiculos}?page=${page}&limit=${limit}`,
    );
    return respuesta;
  } catch (error) {
    console.error(error);
    return null;
  }
};
