import React, { useEffect, useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { useParams, Link } from "react-router-dom"; // Cambiado a react-router-dom
import { leerVehiculoPorId } from "../../../helpers/queries";

// Mantienes tu CSS para el Modal a pantalla completa
import "./vehiculo/Modal.css"; 

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

  const handleSelect = (selectedIndex) => {
    setIndexFoto(selectedIndex);
  };

  // Pantalla de carga mientras trae el vehículo
  if (!vehiculo) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface">
        <p className="font-headline-md text-primary text-xl animate-pulse">Cargando vehículo...</p>
      </div>
    );
  }

  return (
    <main className="pt-28 pb-10 max-w-container-max mx-auto px-4 md:px-gutter">
      
      {/* Breadcrumbs (Navegación) */}
      <nav aria-label="Breadcrumb" className="mb-stack-md flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
        <Link to="/" className="hover:text-primary no-underline transition-colors">Inicio</Link>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="hover:text-primary transition-colors cursor-pointer">{vehiculo.categoria || "Vehículos"}</span>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-primary font-bold">{vehiculo.marca} {vehiculo.modelo}</span>
      </nav>

      {/* Grid Principal (Layout Bento) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        
        {/* Columna Izquierda: Galería y Detalles (8 columnas) */}
        <div className="lg:col-span-8 flex flex-col gap-stack-lg">
          
          {/* Galería de Imágenes */}
          <div className="bg-surface-lowest rounded-2xl overflow-hidden shadow-[0px_10px_30px_rgba(27,38,59,0.05)] border border-surface-variant">
            {/* Imagen Principal (Hereda tu lógica de abrir Modal) */}
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
              {/* Etiqueta "Disponible" */}
              <div className="absolute top-4 left-4 bg-success-green/90 backdrop-blur-md text-on-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm shadow-lg">
                Disponible
              </div>
            </div>

            {/* Miniaturas (Controlan el índice del estado indexFoto) */}
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

          {/* Especificaciones Técnicas Adaptadas a tus Datos */}
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

          {/* Descripción del Vehículo */}
          <section className="bg-surface-lowest rounded-2xl p-gutter shadow-[0px_10px_30px_rgba(27,38,59,0.05)] border border-surface-variant mb-6 lg:mb-0">
            <h2 className="font-headline-md text-headline-md text-primary mb-stack-md">Descripción General</h2>
            <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-line">
              {vehiculo.descripcion}
            </p>
          </section>

        </div>

        {/* Columna Derecha: Sidebar Fija (4 columnas) */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-[100px] flex flex-col gap-stack-lg">
            
            {/* Tarjeta de Precio y Acción Principal */}
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

              {/* Chips Informativos */}
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

              {/* Botón WhatsApp (Tu Lógica Original) */}
              <div className="flex flex-col gap-3 mt-2">
                <a
                  href={`https://wa.me/5493816289462?text=Hola!%20Me%20interesa%20el%20${vehiculo.marca}%20${vehiculo.modelo}%20${vehiculo.anio}%20que%20vi%20en%20el%20catálogo`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full no-underline bg-success-green text-on-primary h-14 rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                >
                  <i className="bi bi-whatsapp text-xl"></i>
                  Consultar por WhatsApp
                </a>
              </div>
            </div>

            {/* Tarjeta de Información del Concesionario/Vendedor */}
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

      {/* --- MODAL PANTALLA COMPLETA (MANTENIDO DE TU CÓDIGO ORIGINAL) --- */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        fullscreen={true}
        centered
        contentClassName="bg-transparent border-0 m-0 p-0"
      >
        <button
          type="button"
          className="btn-close btn-close-white position-absolute top-0 end-0 m-4 fs-4"
          style={{ zIndex: 1050 }}
          onClick={() => setShowModal(false)}
          aria-label="Close"
        ></button>

        <div
          className="position-absolute top-0 start-0 m-4 text-light font-body-md fs-5 drop-shadow-md"
          style={{ zIndex: 1050 }}
        >
          {indexFoto + 1} / {vehiculo.imagenes?.length}
        </div>

        <Modal.Body
          className="p-0 vh-100 w-100 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Carousel
            activeIndex={indexFoto}
            onSelect={handleSelect}
            interval={null}
            className="w-100 h-100"
          >
            {vehiculo.imagenes?.map((img, index) => (
              <Carousel.Item key={index} className="h-100 text-center">
                <img
                  src={img}
                  alt={`Zoom-${index}`}
                  className="img-fluid modal-imagen-ml"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default DetalleVehiculo;