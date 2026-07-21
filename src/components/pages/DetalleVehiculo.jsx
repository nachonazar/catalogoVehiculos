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

  async function obtenerVehiculo() {
    const respuesta = await leerVehiculoPorId(id);
    if (respuesta.status === 200) {
      const vehiculoBuscado = await respuesta.json();
      setVehiculo(vehiculoBuscado);
    }
  }

  const nextImg = (e) => {
    e.stopPropagation();
    setIndexFoto((prev) => (prev === vehiculo.imagenes.length - 1 ? 0 : prev + 1));
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setIndexFoto((prev) => (prev === 0 ? vehiculo.imagenes.length - 1 : prev - 1));
  };

  if (!vehiculo) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface">
        <p className="font-headline-md text-primary text-xl animate-pulse">Cargando vehículo...</p>
      </div>
    );
  }

  return (
    <main className="pt-28 pb-10 max-w-container-max mx-auto px-4 md:px-gutter">
      
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-stack-md flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
        <Link to="/" className="hover:text-primary no-underline transition-colors">Inicio</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="hover:text-primary transition-colors cursor-pointer">{vehiculo.categoria || "Vehículos"}</span>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">{vehiculo.marca} {vehiculo.modelo}</span>
      </nav>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Columna Izquierda */}
        <div className="lg:col-span-8 flex flex-col gap-stack-lg">
          
          <div className="bg-surface-lowest rounded-2xl overflow-hidden shadow-[0px_10px_30px_rgba(27,38,59,0.05)] border border-surface-variant">
            <div 
              className="relative w-full aspect-[4/3] md:aspect-video bg-surface-container-highest cursor-zoom-in group"
              onClick={() => setShowModal(true)}
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
                  alt="sin imagen" 
                />
              )}
              <div className="absolute top-4 left-4 bg-success-green/90 backdrop-blur-md text-on-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm shadow-lg">
                Disponible
              </div>
            </div>

            {vehiculo.imagenes?.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 md:gap-4 p-4 bg-surface-lowest">
                {vehiculo.imagenes.map((img, index) => (
                  <div 
                    key={index}
                    onClick={() => setIndexFoto(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                      indexFoto === index 
                        ? 'border-secondary opacity-100 scale-95' 
                        : 'border-surface-variant hover:border-primary opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img className="w-full h-full object-cover" src={img} alt={`Miniatura ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <section className="bg-surface-lowest rounded-2xl p-gutter shadow-[0px_10px_30px_rgba(27,38,59,0.05)] border border-surface-variant">
            <h2 className="font-headline-md text-headline-md text-primary mb-stack-md">Especificaciones</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-gutter">
              <div className="flex flex-col gap-stack-sm p-4 bg-surface rounded-lg border border-surface-variant">
                <span className="material-symbols-outlined text-secondary text-2xl">category</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Categoría</span>
                <span className="font-body-md text-body-md text-on-surface font-semibold">{vehiculo.categoria}</span>
              </div>
              <div className="flex flex-col gap-stack-sm p-4 bg-surface rounded-lg border border-surface-variant">
                <span className="material-symbols-outlined text-secondary text-2xl">calendar_month</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Año</span>
                <span className="font-body-md text-body-md text-on-surface font-semibold">{vehiculo.anio}</span>
              </div>
              <div className="flex flex-col gap-stack-sm p-4 bg-surface rounded-lg border border-surface-variant">
                <span className="material-symbols-outlined text-secondary text-2xl">speed</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Kilometraje</span>
                <span className="font-body-md text-body-md text-on-surface font-semibold">{vehiculo.km?.toLocaleString("es-AR")} km</span>
              </div>
            </div>
          </section>

          <section className="bg-surface-lowest rounded-2xl p-gutter shadow-[0px_10px_30px_rgba(27,38,59,0.05)] border border-surface-variant mb-6 lg:mb-0">
            <h2 className="font-headline-md text-headline-md text-primary mb-stack-md">Descripción General</h2>
            <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-line">
              {vehiculo.descripcion}
            </p>
          </section>
        </div>

        {/* Columna Derecha */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-[100px] flex flex-col gap-stack-lg">
            
            <div className="bg-surface-lowest rounded-2xl p-gutter shadow-[0px_10px_30px_rgba(27,38,59,0.05)] border border-surface-variant flex flex-col gap-stack-md">
              <div>
                <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg  mb-2 capitalize">
                  {vehiculo.marca} {vehiculo.modelo}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-lg text-display-lg">
                    ${vehiculo.precio?.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 py-4 border-y border-surface-variant">
                <div className="flex items-center gap-1 bg-surface px-3 py-1.5 rounded border border-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">calendar_today</span>
                  <span className="font-label-sm text-label-sm text-on-surface">{vehiculo.anio}</span>
                </div>
                <div className="flex items-center gap-1 bg-surface px-3 py-1.5 rounded border border-surface-variant">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">speed</span>
                  <span className="font-label-sm text-label-sm text-on-surface">{vehiculo.km?.toLocaleString("es-AR")} km</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <a
                  href={`https://wa.me/5493816289462?text=Hola!%20Me%20interesa%20el%20${vehiculo.marca}%20${vehiculo.modelo}%20${vehiculo.anio}%20que%20vi%20en%20el%20catálogo`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full no-underline bg-success-green text-on-primary h-14 rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                  Consultar por WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-surface-lowest rounded-2xl p-gutter shadow-[0px_10px_30px_rgba(27,38,59,0.05)] border border-surface-variant hidden md:block">
              <h3 className="font-headline-md text-[20px] text-primary mb-4 border-b border-surface-variant pb-2">Información del Vendedor</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">person</span>
                  <p className="font-body-md text-body-md text-on-surface font-semibold">Ignacio Nazar</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <p className="font-body-md text-body-md text-on-surface">Tucumán, Argentina</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">schedule</span>
                  <div>
                    <p className="font-body-md text-[14px] text-on-surface"><span className="font-semibold text-success-green">Disponible</span> • Lunes a Sábados</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* MODAL NATIVO TAILWIND */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          {/* Botón Cerrar */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setShowModal(false)}
          >
            <span className="material-symbols-outlined text-4xl">close</span>
          </button>

          {/* Contador */}
          <div className="absolute top-6 left-6 text-white/90 font-body-md text-lg">
            {indexFoto + 1} / {vehiculo.imagenes?.length}
          </div>

          {/* Botón Anterior */}
          {vehiculo.imagenes?.length > 1 && (
            <button 
              className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors"
              onClick={prevImg}
            >
              <span className="material-symbols-outlined text-5xl md:text-7xl">chevron_left</span>
            </button>
          )}

          {/* Imagen Actual */}
          <img
            src={vehiculo.imagenes[indexFoto]}
            alt={`Zoom-${indexFoto}`}
            className="max-w-[90vw] max-h-[85vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()} 
          />

          {/* Botón Siguiente */}
          {vehiculo.imagenes?.length > 1 && (
            <button 
              className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors"
              onClick={nextImg}
            >
              <span className="material-symbols-outlined text-5xl md:text-7xl">chevron_right</span>
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default DetalleVehiculo;