import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo-transparente.png";
import { useTheme } from "../../context/ThemeContext";

const LayoutAdmin = ({ titulo, headerExtra, children }) => {
  const location = useLocation();
  const { tema, cambiarTema } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const usuarioLogueado = JSON.parse(sessionStorage.getItem("userKey")) || {};

  const esRutaActiva = (ruta) => {
    if (ruta === "/administrador") {
      return location.pathname === "/administrador";
    }
    return location.pathname.startsWith(ruta);
  };

  const logout = () => {
    sessionStorage.removeItem("userKey");
    window.location.href = "/";
  };

  const navItems = [
    {
      to: "/administrador",
      icon: "directions_car",
      label: "Inventario",
      exact: true,
    },
    {
      to: "/administrador/estadisticas",
      icon: "bar_chart",
      label: "Estadísticas",
    },
  ];

  return (
    /* Aplicamos la clase "dark" directamente al wrapper para aislar el tema */
    <div className={`bg-neutral-bg text-on-surface font-body-md min-h-screen flex panel-admin ${tema === "oscuro" ? "dark" : ""}`}>
      
      {/* Overlay fondo oscuro móvil */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar — desktop y móvil */}
      <nav className={`
        fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col bg-[#09090b] border-r border-white/5
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-5 border-b border-white/5 flex items-start justify-between">
          <div>
            <Link to="/" className="block no-underline" onClick={() => setMobileMenuOpen(false)}>
              <img
                src={logo}
                alt="Logo Catalogo de Vehiculos"
                className="w-[130px] h-auto invert opacity-90 hover:opacity-100 transition-opacity object-contain mix-blend-screen"
              />
            </Link>
            <p className="text-zinc-500 text-xs mt-3 font-medium">
              Panel de administración
            </p>
          </div>
          {/* Botón cerrar en móvil */}
          <button 
            className="lg:hidden text-zinc-500 hover:text-white flex items-center justify-center p-1 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <ul className="flex flex-col gap-1 p-3 flex-grow list-none m-0 overflow-y-auto">
          {navItems.map((item) => {
            const activo = item.exact
              ? location.pathname === item.to
              : esRutaActiva(item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`sidebar-link ${activo ? "sidebar-link-active" : "sidebar-link-inactive"}`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={activo ? { fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="p-3 border-t border-white/5">
          <Link
            to="/administrador/crear"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full btn-secondary !text-xs !py-2.5 no-underline mb-2"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Nuevo vehículo
          </Link>
          <button
            type="button"
            onClick={logout}
            className="sidebar-link sidebar-link-inactive w-full bg-transparent border-0 cursor-pointer text-left !text-zinc-500 hover:!text-red-400"
          >
            <span className="material-symbols-outlined text-[20px]">
              logout
            </span>
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* Main area */}
      <div className="flex-1 lg:ml-[260px] flex flex-col min-h-screen w-full">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant flex justify-between items-center px-4 md:px-6">
          <div className="flex items-center gap-3">
            {/* Hamburger para móvil */}
            <button
              className="lg:hidden flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer bg-transparent border-0"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <h2 className="font-heading text-base font-semibold text-on-surface tracking-tight truncate">
              {titulo}
            </h2>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {headerExtra}

            {/* Theme toggle */}
            <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant">
              <button
                type="button"
                aria-pressed={tema === "claro"}
                onClick={() => cambiarTema("claro")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border-0 ${
                  tema === "claro"
                    ? "bg-surface-container-lowest text-on-surface shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface bg-transparent"
                }`}
              >
                Claro
              </button>
              <button
                type="button"
                aria-pressed={tema === "oscuro"}
                onClick={() => cambiarTema("oscuro")}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border-0 ${
                  tema === "oscuro"
                    ? "bg-primary text-white shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface bg-transparent"
                }`}
              >
                Oscuro
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-outline-variant">
              <span className="text-xs text-on-surface-variant capitalize">
                {usuarioLogueado?.nombreAdmin || "Admin"}
              </span>
              <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center border border-outline-variant">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  person
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 w-full max-w-container-max mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;