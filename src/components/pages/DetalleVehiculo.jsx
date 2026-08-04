import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { leerVehiculoPorId } from "../../../helpers/queries";

const DetalleVehiculo = () => {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [indexFoto, setIndexFoto] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    obtenerVehiculo();
  }, []);

  // Controlar el Lightbox (bloquear scroll y escuchar tecla Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  async function obtenerVehiculo() {
    const respuesta = await leerVehiculoPorId(id);
    if (respuesta.status === 200) {
      const vehiculoBuscado = await respuesta.json();
      setVehiculo(vehiculoBuscado);
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

  const specs = [
    { icon: "category", label: "Categoría", value: vehiculo?.categoria },
    { icon: "calendar_month", label: "Año", value: vehiculo?.anio },
    {
      icon: "speed",
      label: "Kilometraje",
      value: `${vehiculo?.km?.toLocaleString("es-AR")} km`,
    },
  ];

  if (!vehiculo) {
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

  return (
    <main className="pt-[88px] pb-16 container-app">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center flex-wrap gap-1.5 text-sm text-on-surface-variant"
      >
        <Link
          to="/"
          className="hover:text-on-surface no-underline transition-colors"
        >
          Inicio
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
        {/* Left column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Gallery */}
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  src={vehiculo.imagenes[indexFoto]}
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                />
              ) : (
                <img
                  className="w-full h-full object-cover"
                  src="https://via.placeholder.com/800x600?text=Sin+Imagen"
                  alt="Sin imagen"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute top-4 left-4 badge-success backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
                Disponible
              </span>
              <div className="absolute bottom-4 right-4 w-10 h-10 rounded-xl bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white text-[20px]">
                  zoom_in
                </span>
              </div>
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
                      className="w-full h-full object-cover"
                      src={img}
                      alt={`Miniatura ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Specs */}
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

          {/* Description */}
          <section className="card p-6 md:p-8">
            <h2 className="font-heading text-lg font-semibold text-on-surface mb-4">
              Descripción
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
              {vehiculo.descripcion}
            </p>
          </section>
        </div>

        {/* Right column — sticky sidebar */}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                Consultar por WhatsApp
              </a>
            </div>

            <div className="card p-6 hidden md:block">
              <h3 className="font-heading text-base font-semibold text-on-surface mb-4 pb-3 border-b border-outline-variant">
                Vendedor
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      person
                    </span>
                  </div>
                  <p className="text-sm font-medium text-on-surface">
                    Ignacio Nazar
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      location_on
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Tucumán, Argentina
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[18px]">
                      schedule
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    <span className="font-medium text-success-green">
                      Disponible
                    </span>{" "}
                    · Lun a Sáb
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
        >
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          <div className="absolute top-5 left-5 px-3 py-1.5 rounded-lg bg-white/10 text-white/90 text-sm font-medium z-50">
            {indexFoto + 1} / {vehiculo.imagenes?.length}
          </div>

          {vehiculo.imagenes?.length > 1 && (
            <button
              type="button"
              aria-label="Imagen anterior"
              className="absolute left-4 md:left-8 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
              onClick={prevImg}
            >
              <span className="material-symbols-outlined text-[28px]">
                chevron_left
              </span>
            </button>
          )}

          <img
            src={vehiculo.imagenes[indexFoto]}
            alt={`${vehiculo.marca} ${vehiculo.modelo} — imagen ${indexFoto + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain select-none rounded-lg z-40 relative"
            onClick={(e) => e.stopPropagation()}
          />

          {vehiculo.imagenes?.length > 1 && (
            <button
              type="button"
              aria-label="Imagen siguiente"
              className="absolute right-4 md:right-8 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors z-50 cursor-pointer"
              onClick={nextImg}
            >
              <span className="material-symbols-outlined text-[28px]">
                chevron_right
              </span>
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default DetalleVehiculo;
