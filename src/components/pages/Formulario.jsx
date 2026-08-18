import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  crearVehiculo,
  leerVehiculoPorId,
  editarVehiculosPorId,
} from "../../../helpers/queries.js";

const Formulario = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { id } = useParams();
  const navegacion = useNavigate();

  const [imagenActual, setImagenActual] = useState([]);
  const [preview, setPreview] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorCarga, setErrorCarga] = useState(false);

  useEffect(() => {
    if (titulo === "Editar Vehiculo") {
      obtenerVehiculo();
    }
  }, [id]);

  const obtenerVehiculo = async () => {
    const respuesta = await leerVehiculoPorId(id);
    if (respuesta.status === 200) {
      const vehiculoBuscado = await respuesta.json();
      setValue("marca", vehiculoBuscado.marca);
      setValue("modelo", vehiculoBuscado.modelo);
      setValue("anio", vehiculoBuscado.anio);
      setValue("categoria", vehiculoBuscado.categoria);
      setValue("precio", vehiculoBuscado.precio);
      setValue("km", vehiculoBuscado.km);
      setValue("disponible", vehiculoBuscado.disponible);
      setValue("descripcion", vehiculoBuscado.descripcion);
      setImagenActual(vehiculoBuscado.imagenes);
    } else {
      setErrorCarga(true);
      Swal.fire({
        title: "Error",
        text: "No se encontró el vehículo a editar.",
        icon: "error",
      }).then(() => {
        navegacion("/administrador");
      });
    }
  };

  const swalStyles = {
    customClass: {
      popup:
        "bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-elevated",
      title: "text-heading text-xl text-on-surface",
      htmlContainer: "text-body-md text-on-surface-variant",
      confirmButton: "btn-primary",
    },
    buttonsStyling: false,
  };

  const onSubmit = async (vehiculo) => {
    setIsSubmitting(true);

    const vehiculoCompleto = {
      ...vehiculo,
      imagenes:
        titulo === "Crear Vehiculo"
          ? archivos
          : { nuevas: archivos, existentes: imagenActual },
      disponible: titulo === "Crear Vehiculo" ? true : vehiculo.disponible,
    };

    if (titulo === "Crear Vehiculo") {
      const respuesta = await crearVehiculo(vehiculoCompleto);
      if (respuesta.status === 201) {
        Swal.fire({
          ...swalStyles,
          title: "Vehículo creado",
          text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} fue creado correctamente`,
          icon: "success",
        }).then(() => {
          reset();
          setPreview([]);
          setImagenActual([]);
          setArchivos([]);
          navegacion("/administrador");
        });
      } else {
        const datosErroneos = await respuesta.json();
        const mensajeError = datosErroneos.errores
          ? datosErroneos.errores[0].mensaje
          : datosErroneos.mensaje || "Error desconocido";

        Swal.fire({
          ...swalStyles,
          customClass: {
            ...swalStyles.customClass,
            confirmButton: "btn-danger",
          },
          title: "Ocurrió un error",
          text: `El vehículo no pudo ser creado. ${mensajeError}`,
          icon: "error",
        });
        setIsSubmitting(false);
      }
    } else {
      const respuesta = await editarVehiculosPorId(vehiculoCompleto, id);
      if (respuesta.status === 200) {
        Swal.fire({
          ...swalStyles,
          title: "Vehículo editado",
          text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} fue editado correctamente`,
          icon: "success",
        }).then(() => {
          navegacion("/administrador");
        });
      } else {
        const datosErroneos = await respuesta.json();
        const mensajeError = datosErroneos.errores
          ? datosErroneos.errores[0].mensaje
          : datosErroneos.mensaje || "Error desconocido";

        Swal.fire({
          ...swalStyles,
          customClass: {
            ...swalStyles.customClass,
            confirmButton: "btn-danger",
          },
          title: "Ocurrió un error",
          text: `El vehículo no pudo ser editado. ${mensajeError}`,
          icon: "error",
        });
        setIsSubmitting(false);
      }
    }
  };

  if (errorCarga) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6">
      <div className="bg-surface-container-lowest rounded-2xl shadow-elevated w-full max-w-4xl max-h-full flex flex-col relative overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center shrink-0 bg-surface-container-lowest">
          <h2 className="text-heading text-xl text-primary">{titulo}</h2>
          <button
            onClick={() => navegacion("/administrador")}
            aria-label="Cerrar modal"
            className="btn-icon"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-label">Marca*</label>
                <input
                  type="text"
                  placeholder="Ej: Toyota"
                  className={`input-base ${errors.marca ? "input-error" : ""}`}
                  {...register("marca", {
                    required: "La marca del vehiculo es obligatoria",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    maxLength: { value: 100, message: "Máximo 100 caracteres" },
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-\.()]+$/,
                      message: "Solo letras, espacios y guiones",
                    },
                  })}
                />
                {errors.marca && (
                  <span className="text-error text-xs font-medium">
                    {errors.marca.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label">Modelo*</label>
                <input
                  type="text"
                  placeholder="Ej: Corolla"
                  className={`input-base ${errors.modelo ? "input-error" : ""}`}
                  {...register("modelo", {
                    required: "El modelo del vehiculo es obligatorio",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    maxLength: { value: 100, message: "Máximo 100 caracteres" },
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-\.()/]+$/,
                      message: "Caracteres inválidos",
                    },
                  })}
                />
                {errors.modelo && (
                  <span className="text-error text-xs font-medium">
                    {errors.modelo.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-label">Año*</label>
                <input
                  type="number"
                  placeholder="Ej: 2025"
                  className={`input-base ${errors.anio ? "input-error" : ""}`}
                  {...register("anio", {
                    required: "El año es obligatorio",
                    valueAsNumber: true,
                    min: { value: 1900, message: "Año inválido" },
                    max: {
                      value: new Date().getFullYear() + 1,
                      message: "No puede ser futuro",
                    },
                  })}
                />
                {errors.anio && (
                  <span className="text-error text-xs font-medium">
                    {errors.anio.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label">Categoría*</label>
                <div className="relative">
                  <select
                    className={`select-base ${errors.categoria ? "input-error" : ""}`}
                    {...register("categoria", {
                      required: "Debe seleccionar una categoría",
                    })}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Sedán">Sedán</option>
                    <option value="SUV">SUV</option>
                    <option value="Camioneta">Camioneta</option>
                    <option value="Deportivo">Deportivo</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                    expand_more
                  </span>
                </div>
                {errors.categoria && (
                  <span className="text-error text-xs font-medium">
                    {errors.categoria.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-label">Precio ($)*</label>
                <input
                  type="number"
                  placeholder="Ej: 25000"
                  className={`input-base ${errors.precio ? "input-error" : ""}`}
                  {...register("precio", {
                    required: "El precio es obligatorio",
                    valueAsNumber: true,
                    min: { value: 500000, message: "Mínimo $500.000" },
                    max: { value: 500000000, message: "Máximo $500.000.000" },
                  })}
                />
                {errors.precio && (
                  <span className="text-error text-xs font-medium">
                    {errors.precio.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-label">Kilometraje*</label>
                <input
                  type="number"
                  placeholder="Ej: 45000"
                  className={`input-base ${errors.km ? "input-error" : ""}`}
                  {...register("km", {
                    required: "El kilometraje es obligatorio",
                    valueAsNumber: true,
                    min: { value: 0, message: "No puede ser negativo" },
                    max: { value: 500000, message: "Máximo 500.000" },
                  })}
                />
                {errors.km && (
                  <span className="text-error text-xs font-medium">
                    {errors.km.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 border border-outline-variant rounded-xl p-4 md:p-5 bg-surface-container-low/50">
              <label className="text-label mb-1">Imágenes*</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 transition-colors cursor-pointer text-sm text-on-surface-variant"
                {...register("imagenes", {
                  required:
                    titulo === "Crear Vehiculo" &&
                    archivos.length === 0 &&
                    imagenActual.length === 0
                      ? "La imagen es obligatoria"
                      : false,
                  validate: {
                    imagenRequerida: () => {
                      if (
                        titulo === "Editar Vehiculo" &&
                        archivos.length === 0 &&
                        imagenActual.length === 0
                      ) {
                        return "Debe tener al menos una imagen";
                      }
                      return true;
                    },
                  },
                })}
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 0) {
                    setArchivos((prev) => [...prev, ...files]);
                    setPreview((prev) => [
                      ...prev,
                      ...files.map((file) => URL.createObjectURL(file)),
                    ]);
                  }
                }}
              />
              {errors.imagenes && (
                <span className="text-error text-xs font-medium mt-1">
                  {errors.imagenes.message}
                </span>
              )}

              {[...imagenActual, ...preview].length > 0 && (
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-outline-variant">
                  {[...imagenActual, ...preview].map((src, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={src}
                        alt="Preview"
                        className="w-32 h-24 object-cover rounded-lg border border-outline-variant shadow-sm"
                        loading="lazy"
                      />
                      <button
                        type="button"
                        aria-label="Eliminar imagen"
                        onClick={() => {
                          const esExistente = index < imagenActual.length;
                          if (esExistente) {
                            setImagenActual((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          } else {
                            const previewIndex = index - imagenActual.length;
                            setPreview((prev) =>
                              prev.filter((_, i) => i !== previewIndex),
                            );
                            setArchivos((prev) =>
                              prev.filter((_, i) => i !== previewIndex),
                            );
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-error text-white border-2 border-surface-container-lowest w-7 h-7 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          close
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {titulo === "Editar Vehiculo" && (
              <div className="flex items-center gap-3 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...register("disponible")}
                  />
                  <div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-green"></div>
                  <span
                    className={`ml-3 text-label ${watch("disponible") ? "text-success-green" : "text-error"}`}
                  >
                    {watch("disponible") ? "Disponible" : "Vendido"}
                  </span>
                </label>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-label">Descripción*</label>
              <textarea
                rows={4}
                placeholder="Ej: Vehículo en excelente estado..."
                className={`textarea-base ${errors.descripcion ? "input-error" : ""}`}
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              {errors.descripcion && (
                <span className="text-error text-xs font-medium">
                  {errors.descripcion.message}
                </span>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-4 pt-6 border-t border-outline-variant">
              <button
                type="button"
                onClick={() => navegacion("/administrador")}
                disabled={isSubmitting}
                className="btn-outline w-full sm:w-auto"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full sm:w-auto"
              >
                {isSubmitting ? "Guardando..." : "Guardar Vehículo"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
