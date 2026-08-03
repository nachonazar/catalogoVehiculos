import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-72px)] w-full overflow-hidden bg-surface pt-[88px] pb-16 px-4">
      <div className="absolute inset-0 z-0">
        <img
          alt="Ruta vacía"
          className="w-full h-full object-cover opacity-30"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPxLcQLwr1RSezSDVnu76GVmJKrSZMq21CedUZUAOooSVbG528X9-HRZxyBwtjRDm3ikkmEVf38TkBjqZEBQqKgVX1XSLp726iGV_tWu4zMlUyoZaV89fy_a7rzZx0t_4_KOxM4TWy2SJOPs2F71xGUWlijhCfAe2RPgeYgOJgxWg5FtHY1P1VEqTenA73vi5WjFBp1WaC6NoVTfsX8tzWEt0m_Ln1EGpUQF-1DR7AadXWMdATBgXkmnPX-WEksnQj-zxNMYpnkn4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/90 to-surface" />
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto text-center animate-slide-up">
        <div className="card p-10 md:p-14 flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant">route</span>
          </div>

          <div>
            <p className="font-heading text-7xl md:text-8xl font-bold text-on-surface leading-none tracking-tighter">
              404
            </p>
            <h1 className="font-heading text-xl md:text-2xl font-semibold text-on-surface mt-4">
              Ruta no encontrada
            </h1>
            <p className="text-sm text-on-surface-variant mt-3 leading-relaxed max-w-sm mx-auto">
              La página que buscás no existe o fue movida. Volvé al inicio para explorar el catálogo.
            </p>
          </div>

          <Link to="/" className="btn-primary no-underline group">
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
              arrow_back
            </span>
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error404;
