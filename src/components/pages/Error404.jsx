import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    // Agregamos pt-28 para que el Menú fijo no tape el contenido y min-h-[calc(100vh-80px)] para calcular el espacio del footer
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] w-full overflow-hidden bg-neutral-bg pt-28 pb-10">
      {/* Imagen de Fondo Cinemática */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Ruta vacía"
          className="w-full h-full object-cover opacity-80 mix-blend-multiply filter contrast-125"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPxLcQLwr1RSezSDVnu76GVmJKrSZMq21CedUZUAOooSVbG528X9-HRZxyBwtjRDm3ikkmEVf38TkBjqZEBQqKgVX1XSLp726iGV_tWu4zMlUyoZaV89fy_a7rzZx0t_4_KOxM4TWy2SJOPs2F71xGUWlijhCfAe2RPgeYgOJgxWg5FtHY1P1VEqTenA73vi5WjFBp1WaC6NoVTfsX8tzWEt0m_Ln1EGpUQF-1DR7AadXWMdATBgXkmnPX-WEksnQj-zxNMYpnkn4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-bg via-neutral-bg/60 to-transparent z-10"></div>
      </div>

      {/* Contenedor del Error (Efecto Cristal) */}
      <div className="relative z-20 w-full max-w-container-max mx-auto px-gutter flex flex-col items-center justify-center text-center">
        <div className="bg-white/80 backdrop-blur-md border border-white/30 p-stack-lg md:p-16 rounded-xl shadow-[0px_10px_30px_rgba(27,38,59,0.05)] max-w-2xl w-full flex flex-col items-center gap-stack-lg transform transition-transform duration-500 hover:scale-[1.01]">
          {/* Icono */}
          <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center shadow-inner mb-2">
            <span className="material-symbols-outlined text-[48px] text-primary">
              route
            </span>
          </div>

          {/* Textos */}
          <div className="flex flex-col gap-stack-sm items-center">
            <h1 className="font-display-lg text-[72px] md:text-display-lg text-primary m-0 leading-none">
              404
            </h1>
            <h2 className="font-headline-lg text-[28px] md:text-headline-lg text-primary mt-2">
              Ruta no encontrada
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto mt-4">
              Parece que tomaste un camino equivocado. La página que buscas no
              existe o fue movida. Volvamos a la ruta correcta.
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
            <Link
              to="/"
              className="bg-primary hover:bg-primary-container text-on-primary font-body-md px-8 py-3 rounded-lg shadow-sm transition-all duration-300 flex items-center justify-center gap-2 group w-full sm:w-auto font-medium no-underline"
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404;
