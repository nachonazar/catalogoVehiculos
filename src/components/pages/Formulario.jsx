import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"; // Asegurado react-router-dom
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

  useEffect(() => {
    obtenerVehiculo();
  }, []);

  const obtenerVehiculo = async () => {
    if (titulo === "Editar Vehiculo") {
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
      }
    }
  };

  const onSubmit = async (vehiculo) => {
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
          title: "Vehículo creado",
          text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} fue creado correctamente`,
          icon: "success",
          confirmButtonColor: "#051125"
        }).then(() => {
          reset();
          setPreview([]);
          setImagenActual([]);
          setArchivos([]);
          navegacion("/administrador");
        });
      } else {
        const datosErroneos = await respuesta.json();
        Swal.fire({
          title: "Ocurrió un error",
          text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} no pudo ser creado. ${datosErroneos.mensaje}`,
          icon: "error",
          confirmButtonColor: "#ba1a1a"
        });
      }
    } else {
      const respuesta = await editarVehiculosPorId(vehiculoCompleto, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Vehículo editado",
          text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} fue editado correctamente`,
          icon: "success",
          confirmButtonColor: "#051125"
        }).then(() => {
          navegacion("/administrador");
        });
      } else {
        const datosErroneos = await respuesta.json();
        Swal.fire({
          title: "Ocurrió un error",
          text: `El vehículo ${vehiculo.marca} ${vehiculo.modelo} no pudo ser editado. ${datosErroneos[0]?.mensaje}`,
          icon: "error",
          confirmButtonColor: "#ba1a1a"
        });
      }
    }
  };

  return (
    // Overlay oscuro con desenfoque (Modal Background)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      
      {/* Contenedor Principal del Formulario */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto my-auto relative">
        
        {/* Header Fijo */}
        <div className="sticky top-0 bg-surface-container-lowest/95 backdrop-blur z-20 px-6 py-4 border-b border-surface-variant flex justify-between items-center">
          <h2 className="font-headline-md text-[24px] text-primary">{titulo}</h2>
          <button 
            onClick={() => navegacion("/administrador")}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-surface hover:bg-error/10 hover:text-error text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Cuerpo del Formulario */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
            {/* Fila 1: Marca y Modelo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Marca*</label>
                <input
                  type="text"
                  placeholder="Ej: Toyota"
                  className={`w-full px-4 py-3 rounded-lg border bg-surface text-on-surface focus:outline-none focus:ring-1 transition-colors ${errors.marca ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-secondary focus:ring-secondary'}`}
                  {...register("marca", {
                    required: "La marca del vehiculo es un dato obligatorio",
                    minLength: { value: 2, message: "Debe tener al menos 2 caracteres" },
                    maxLength: { value: 100, message: "Máximo 100 caracteres" },
                    pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-\.()]+$/, message: "Solo letras, espacios y guiones" },
                  })}
                />
                {errors.marca && <span className="text-error font-label-sm text-xs mt-1">{errors.marca.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Modelo*</label>
                <input
                  type="text"
                  placeholder="Ej: Corolla"
                  className={`w-full px-4 py-3 rounded-lg border bg-surface text-on-surface focus:outline-none focus:ring-1 transition-colors ${errors.modelo ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-secondary focus:ring-secondary'}`}
                  {...register("modelo", {
                    required: "El modelo del vehiculo es obligatorio",
                    minLength: { value: 2, message: "Debe tener al menos 2 caracteres" },
                    maxLength: { value: 100, message: "Máximo 100 caracteres" },
                    pattern: { value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-\.()/]+$/, message: "Caracteres inválidos" },
                  })}
                />
                {errors.modelo && <span className="text-error font-label-sm text-xs mt-1">{errors.modelo.message}</span>}
              </div>
            </div>

            {/* Fila 2: Año y Categoría */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Año*</label>
                <input
                  type="number"
                  placeholder="Ej: 2025"
                  className={`w-full px-4 py-3 rounded-lg border bg-surface text-on-surface focus:outline-none focus:ring-1 transition-colors ${errors.anio ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-secondary focus:ring-secondary'}`}
                  {...register("anio", {
                    required: "El año es un dato obligatorio",
                    valueAsNumber: true,
                    min: { value: 1900, message: "Año inválido" },
                    max: { value: new Date().getFullYear() + 1, message: "No puede ser futuro" },
                  })}
                />
                {errors.anio && <span className="text-error font-label-sm text-xs mt-1">{errors.anio.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Categoría*</label>
                <select
                  className={`w-full px-4 py-3 rounded-lg border bg-surface text-on-surface focus:outline-none focus:ring-1 transition-colors cursor-pointer ${errors.categoria ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-secondary focus:ring-secondary'}`}
                  {...register("categoria", { required: "Debe seleccionar una categoria" })}
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Sedán">Sedán</option>
                  <option value="SUV">SUV</option>
                  <option value="Camioneta">Camioneta</option>
                  <option value="Deportivo">Deportivo</option>
                </select>
                {errors.categoria && <span className="text-error font-label-sm text-xs mt-1">{errors.categoria.message}</span>}
              </div>
            </div>

            {/* Fila 3: Precio y Kilometraje */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Precio ($)*</label>
                <input
                  type="number"
                  placeholder="Ej: 25000"
                  className={`w-full px-4 py-3 rounded-lg border bg-surface text-on-surface focus:outline-none focus:ring-1 transition-colors ${errors.precio ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-secondary focus:ring-secondary'}`}
                  {...register("precio", {
                    required: "El precio es obligatorio",
                    min: { value: 500000, message: "Mínimo $500.000" },
                    max: { value: 500000000, message: "Máximo $500.000.000" },
                  })}
                />
                {errors.precio && <span className="text-error font-label-sm text-xs mt-1">{errors.precio.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Kilometraje*</label>
                <input
                  type="number"
                  placeholder="Ej: 45000"
                  className={`w-full px-4 py-3 rounded-lg border bg-surface text-on-surface focus:outline-none focus:ring-1 transition-colors ${errors.km ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-secondary focus:ring-secondary'}`}
                  {...register("km", {
                    required: "El kilometraje es obligatorio",
                    min: { value: 0, message: "No puede ser negativo" },
                    max: { value: 500000, message: "Máximo 500.000" },
                  })}
                />
                {errors.km && <span className="text-error font-label-sm text-xs mt-1">{errors.km.message}</span>}
              </div>
            </div>

            {/* Fila 4: Imágenes */}
            <div className="flex flex-col gap-1 border border-outline-variant rounded-lg p-4 bg-surface/50">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Imágenes*</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary/10 file:text-secondary hover:file:bg-secondary/20 transition-colors cursor-pointer text-sm text-on-surface-variant"
                {...register("imagenes", {
                  required: titulo === "Crear Vehiculo" && archivos.length === 0 ? "La imagen es obligatoria" : false,
                  validate: {
                    fileSize: (files) => !files[0] || Array.from(files).every((f) => f.size <= 2 * 1024 * 1024) || "Alguna imagen supera los 2MB.",
                    imagenRequerida: () => {
                      if (titulo === "Editar Vehiculo" && archivos.length === 0 && imagenActual.length === 0) {
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
              {errors.imagenes && <span className="text-error font-label-sm text-xs mt-1">{errors.imagenes.message}</span>}
              
              {/* Previsualización de imágenes adaptada a Tailwind */}
              {([...imagenActual, ...preview].length > 0) && (
                <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-surface-variant">
                  {[...imagenActual, ...preview].map((src, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={src}
                        alt="Preview"
                        className="w-32 h-24 object-cover rounded-lg border border-surface-variant shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const esExistente = index < imagenActual.length;
                          if (esExistente) {
                            setImagenActual((prev) => prev.filter((_, i) => i !== index));
                          } else {
                            const previewIndex = index - imagenActual.length;
                            setPreview((prev) => prev.filter((_, i) => i !== previewIndex));
                            setArchivos((prev) => prev.filter((_, i) => i !== previewIndex));
                          }
                        }}
                        className="absolute -top-2 -right-2 bg-surface text-error border border-outline-variant w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:bg-error hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Switch de Estado (Solo al Editar) */}
            {titulo === "Editar Vehiculo" && (
              <div className="flex items-center gap-3 py-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" {...register("disponible")} />
                  <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-variant after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success-green"></div>
                  <span className={`ml-3 font-label-sm text-label-sm uppercase tracking-wider ${watch("disponible") ? 'text-success-green' : 'text-error'}`}>
                    {watch("disponible") ? "Disponible" : "Vendido"}
                  </span>
                </label>
              </div>
            )}

            {/* Fila 5: Descripción */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Descripción*</label>
              <textarea
                rows={4}
                placeholder="Ej: Vehículo en excelente estado..."
                className={`w-full px-4 py-3 rounded-lg border bg-surface text-on-surface focus:outline-none focus:ring-1 transition-colors resize-none ${errors.descripcion ? 'border-error focus:ring-error' : 'border-outline-variant focus:border-secondary focus:ring-secondary'}`}
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                  minLength: { value: 10, message: "Al menos 10 caracteres" },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              {errors.descripcion && <span className="text-error font-label-sm text-xs mt-1">{errors.descripcion.message}</span>}
            </div>

            {/* Botones de Acción */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-6 border-t border-surface-variant">
              <button 
                type="button" 
                onClick={() => navegacion("/administrador")}
                className="w-full py-3 px-4 rounded-lg bg-surface hover:bg-surface-variant text-on-surface-variant font-headline-md text-[16px] transition-colors border border-outline-variant"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-headline-md text-[16px] transition-colors shadow-sm"
              >
                Guardar Vehículo
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;