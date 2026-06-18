import React from "react";
// Ya no necesitas importar Contacto.css porque Tailwind maneja todo el diseño

const Contacto = () => {
  return (
    <section id="contacto" className="scroll-mt-28 bg-surface-container py-stack-lg px-gutter my-10">
      <div className="max-w-container-max mx-auto">
        
        {/* Título y Subtítulo */}
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Contacto</h2>
          <p className="font-body-lg text-on-surface-variant">
            Estamos aquí para ayudarte a encontrar tu próximo vehículo.
          </p>
        </div>
        
        {/* Grilla de Tarjetas de Contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          
          {/* Tarjeta de Teléfono */}
          <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0px_5px_15px_rgba(27,38,59,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-surface-container-highest">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-on-primary-container">call</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Teléfono</h3>
            <p className="font-body-md text-on-surface-variant">+54 9 3814 44-7015</p>
            <p className="font-label-sm text-label-sm text-outline mt-2 uppercase">Lunes a Sábados</p>
          </div>

          {/* Tarjeta de Email */}
          <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0px_5px_15px_rgba(27,38,59,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-surface-container-highest">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-on-primary-container">mail</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Email</h3>
            <p className="font-body-md text-on-surface-variant">javiernazar64@gmail.com</p>
            <p className="font-label-sm text-label-sm text-outline mt-2 uppercase">Respuesta Rápida</p>
          </div>

          {/* Tarjeta de Dirección */}
          <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0px_5px_15px_rgba(27,38,59,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-surface-container-highest">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-on-primary-container">location_on</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Ubicación</h3>
            <p className="font-body-md text-on-surface-variant">Av. Ejército del Norte 45</p>
            <p className="font-label-sm text-label-sm text-outline mt-2 uppercase">Tucumán, Argentina</p>
          </div>

        </div>

        {/* Contenedor del Mapa (Mantiene tu iframe original) */}
        <div className="w-full h-80 rounded-xl overflow-hidden shadow-lg border border-surface-container-highest">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.4802989513896!2d-65.2342316253447!3d-26.82467178952945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c5ddae62d37%3A0x6678f7eb778713dc!2sLazarte%20Automoviles!5e0!3m2!1ses!2sar!4v1780874070504!5m2!1ses!2sar"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Ubicación"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Contacto;