import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { leerVehiculoPorId } from "../../../helpers/queries";
import { optimizarImagenCloudinary } from "../../../helpers/optimizarImagen.js";

const DetalleVehiculo = () => {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [errorMensaje, setErrorMensaje] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [indexFoto, setIndexFoto] = useState(0);

  const modalRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerVehiculo();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        return;
      }

      if (e.key === "Tab" && showModal && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (showModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll("button");
          if (focusable.length > 0) focusable[0].focus();
        }
      }, 10);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  async function obtenerVehiculo() {
    setCargando(true);
    setErrorMensaje(null);
    try {
      const respuesta = await leerVehiculoPorId(id);
      if (respuesta.status === 200) {
        const vehiculoBuscado = await respuesta.json();
        setVehiculo(vehiculoBuscado);
      } else {
        const datos = await respuesta.json();
        setErrorMensaje(datos.mensaje || "No se pudo cargar el vehículo");
      }
    } catch (error) {
      console.error(error);
      setErrorMensaje("Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  }

  const nextImg = (e) => {
    e.stopPropagation();
    setIndexFoto((prev) =>
      prev === vehiculo.imagenes.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setIndexFoto((prev) =>
      prev === 0 ? vehiculo.imagenes.length - 1 : prev - 1,
    );
  };

  if (cargando) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-surface pt-[72px] gap-4">
        <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant animate-spin">
            progress_activity
          </span>
        </div>
        <p className="text-sm text-on-surface-variant">Cargando vehículo...</p>
      </div>
    );
  }

  if (errorMensaje) {
    return (
      <main className="pt-[120px] pb-16 container-app text-center">
        <div className="card p-10 max-w-md mx-auto flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-error text-[40px]">
            error
          </span>
          <h1 className="font-heading text-lg font-bold text-on-surface">
            {errorMensaje}
          </h1>
          <p className="text-sm text-on-surface-variant">
            El vehículo que intentás ver no está disponible o la ruta es
            incorrecta.
          </p>
          <Link to="/" className="btn-primary no-underline mt-2">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  const specs = [
    { icon: "category", label: "Categoría", value: vehiculo?.categoria },
    { icon: "calendar_month", label: "Año", value: vehiculo?.anio },
    {
      icon: "speed",
      label: "Kilometraje",
      value: `${vehiculo?.km?.toLocaleString("es-AR")} km`,
    },
  ];

  return (
    <main className="pt-[88px] pb-16 container-app">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center flex-wrap gap-1.5 text-sm text-on-surface-variant"
      >
        <Link
          to="/#vehiculos"
          className="hover:text-on-surface no-underline transition-colors"
        >
          Inventario
        </Link>
        <span className="material-symbols-outlined text-[16px]">
          chevron_right
        </span>
        <span>{vehiculo.categoria || "Vehículos"}</span>
        <span className="material-symbols-outlined text-[16px]">
          chevron_right
        </span>
        <span className="text-on-surface font-medium capitalize">
          {vehiculo.marca} {vehiculo.modelo}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="card overflow-hidden">
            <div
              className="relative w-full aspect-[4/3] md:aspect-video bg-surface-container cursor-zoom-in group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              onClick={() => setShowModal(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setShowModal(true)}
              aria-label="Ampliar imagen"
            >
              {vehiculo.imagenes?.length > 0 ? (
                <img
                  src={optimizarImagenCloudinary(
                    vehiculo.imagenes[indexFoto],
                    1000,
                  )}
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                  loading="lazy"
                  width="1000"
                  height="562"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src="https://via.placeholder.com/800x600?text=Sin+Imagen"
                  alt="Sin imagen"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-4 left-4 badge-success backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
                Disponible
              </span>
            </div>

            {vehiculo.imagenes?.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-4 border-t border-outline-variant">
                {vehiculo.imagenes.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setIndexFoto(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                    aria-current={indexFoto === index ? "true" : undefined}
                    className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 p-0 bg-transparent ${
                      indexFoto === index
                        ? "border-secondary ring-2 ring-secondary/20"
                        : "border-transparent opacity-60 hover:opacity-100 hover:border-outline-variant"
                    }`}
                  >
                    <img
                      src={optimizarImagenCloudinary(img, 150)}
                      alt={`Miniatura ${index + 1}`}
                      loading="lazy"
                      width="150"
                      height="150"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <section className="card p-6 md:p-8">
            <h2 className="font-heading text-lg font-semibold text-on-surface mb-5">
              Especificaciones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-2 p-4 rounded-xl bg-surface-container-low border border-outline-variant"
                >
                  <span className="material-symbols-outlined text-secondary text-[22px]">
                    {spec.icon}
                  </span>
                  <span className="text-label !text-[10px]">{spec.label}</span>
                  <span className="text-sm font-semibold text-on-surface">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="card p-6 md:p-8">
            <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">
              Descripción
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
              {vehiculo.descripcion}
            </p>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-[88px] flex flex-col gap-4">
            <div className="card p-6 flex flex-col gap-5">
              <div className="min-w-0">
                <p className="text-label mb-1">{vehiculo.categoria}</p>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-on-surface capitalize leading-tight mb-3 truncate">
                  {vehiculo.marca} {vehiculo.modelo}
                </h1>
                <p
                  className="font-heading text-3xl md:text-4xl font-bold text-on-surface tracking-tight truncate"
                  title={`$${vehiculo.precio?.toLocaleString("es-AR")}`}
                >
                  ${vehiculo.precio?.toLocaleString("es-AR")}
                </p>
                <p className="text-label !normal-case !tracking-normal mt-1">
                  Precio al contado
                </p>
              </div>

              <div className="flex flex-wrap gap-2 py-4 border-y border-outline-variant">
                <span className="badge-neutral">
                  <span className="material-symbols-outlined text-[14px]">
                    calendar_today
                  </span>
                  {vehiculo.anio}
                </span>
                <span className="badge-neutral">
                  <span className="material-symbols-outlined text-[14px]">
                    speed
                  </span>
                  {vehiculo.km?.toLocaleString("es-AR")} km
                </span>
              </div>

              <a
                href={`https://wa.me/5493816289462?text=Hola!%20Me%20interesa%20el%20${vehiculo.marca}%20${vehiculo.modelo}%20${vehiculo.anio}%20que%20vi%20en%20el%20catálogo`}
                target="_blank"
                rel="noreferrer"
                className="btn w-full no-underline !py-3.5 text-sm font-medium text-white border-0 shadow-md hover:shadow-lg bg-success-green hover:brightness-95 transition-all"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors z-50 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
          <img
            src={optimizarImagenCloudinary(vehiculo.imagenes[indexFoto], 1600)}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            width="1600"
            height="900"
            className="max-w-[90vw] max-h-[85vh] object-contain select-none rounded-lg z-40 relative"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};

export default DetalleVehiculo;
