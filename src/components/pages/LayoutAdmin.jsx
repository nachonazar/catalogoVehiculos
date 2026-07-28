import React from "react";

import { Link, useLocation } from "react-router-dom";

const LayoutAdmin = ({ titulo, headerExtra, children }) => {
  const location = useLocation();

  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};

  const esRutaActiva = (ruta) => location.pathname === ruta;

  const logout = () => {
    sessionStorage.removeItem("userKey");

    window.location.href = "/";
  };

  const claseLinkMenu = (activo) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg no-underline transition-colors duration-200 ${
      activo
        ? "bg-secondary-container text-on-secondary-container shadow-sm"
        : "text-on-primary/70 hover:text-on-primary hover:bg-primary-container group"
    }`;

  return (
    <div className="bg-neutral-bg text-on-surface font-body-md min-h-screen flex">
      {/* PANEL LATERAL IZQUIERDO */}

      <nav className="hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#051125] shadow-lg z-50 p-4 text-on-primary font-body-md transition-all duration-300">
        <div className="mb-8 px-4 py-2">
          <Link
            to="/"
            className="font-headline-md text-headline-md font-bold text-on-primary tracking-tight hover:text-secondary-fixed transition-colors no-underline"
          >
            LUXE AUTO
          </Link>

          <p className="text-on-primary/70 text-sm mt-1">
            Panel de Administración
          </p>
        </div>

        <ul className="flex flex-col gap-2 flex-grow list-none p-0">
          <li>
            <Link
              to="/administrador"
              className={claseLinkMenu(esRutaActiva("/administrador"))}
            >
              <span
                className="material-symbols-outlined group-hover:scale-110 transition-transform"
                style={
                  esRutaActiva("/administrador")
                    ? { fontVariationSettings: "'FILL' 1" }
                    : {}
                }
              >
                directions_car
              </span>

              <span
                className={
                  esRutaActiva("/administrador") ? "font-semibold" : ""
                }
              >
                Inventario
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/administrador/estadisticas"
              className={claseLinkMenu(
                esRutaActiva("/administrador/estadisticas"),
              )}
            >
              <span
                className="material-symbols-outlined group-hover:scale-110 transition-transform"
                style={
                  esRutaActiva("/administrador/estadisticas")
                    ? { fontVariationSettings: "'FILL' 1" }
                    : {}
                }
              >
                dashboard
              </span>

              <span
                className={
                  esRutaActiva("/administrador/estadisticas")
                    ? "font-semibold"
                    : ""
                }
              >
                Estadísticas
              </span>
            </Link>
          </li>
        </ul>

        <div className="mt-auto border-t border-primary-container pt-4">
          <Link
            to="/administrador/crear"
            className="w-full mb-4 bg-secondary text-white py-2 px-4 rounded-lg font-semibold shadow-sm hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2 no-underline"
          >
            <span className="material-symbols-outlined text-sm">add</span> Nuevo
            Vehículo
          </Link>

          <ul className="flex flex-col gap-1 list-none p-0">
            <li>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-on-primary/70 hover:text-on-primary hover:text-error-container transition-colors bg-transparent border-0 text-left"
              >
                <span className="material-symbols-outlined text-[20px]">
                  logout
                </span>

                <span>Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ÁREA PRINCIPAL */}

      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* BARRA SUPERIOR */}

        <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-surface shadow-sm z-40 flex justify-between items-center px-4 md:px-gutter transition-all">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-md text-[20px] text-primary font-semibold tracking-tight">
              {titulo}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {headerExtra}

            <div className="flex items-center gap-4 border-l border-surface-variant pl-6">
              <span className="hidden sm:block font-label-sm text-on-surface-variant capitalize">
                Hola, {usuarioLogueado?.nombreAdmin || "Admin"}
              </span>

              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center overflow-hidden border border-surface-variant">
                <span className="material-symbols-outlined text-sm">
                  person
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENIDO DE CADA PÁGINA */}

        <main className="flex-1 mt-16 p-4 md:p-gutter w-full max-w-container-max mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
