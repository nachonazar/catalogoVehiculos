import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const Menu = ({ usuarioAdmin, setUsuarioAdmin }) => {
  const navegacion = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const logout = () => {
    setUsuarioAdmin({});
    setIsMobileOpen(false);
    navegacion("/");
  };

  // Función auxiliar para ir a inicio y forzar el scroll hacia arriba
  const irArriba = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 w-full z-50 shadow-[0px_10px_30px_rgba(27,38,59,0.05)] bg-white dark:bg-inverse-surface">
      <div className="flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto md:px-8 px-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={irArriba}
          className="cursor-pointer transition-transform active:scale-95 flex items-center no-underline"
        >
          <img
            src={logo}
            alt="Logo Catálogo de Vehículos"
            className="w-auto h-12 object-contain"
          />
        </Link>

        {/* Menú Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            onClick={irArriba}
            className="text-on-surface-variant hover:text-secondary font-label-sm text-label-sm uppercase tracking-wider transition-all no-underline"
          >
            Inicio
          </NavLink>

          {/* Enlace de Contacto */}
          <a
            href="#contacto"
            className="text-on-surface-variant hover:text-secondary font-label-sm text-label-sm uppercase tracking-wider transition-all no-underline cursor-pointer"
          >
            Contacto
          </a>

          {usuarioAdmin.token && (
            <NavLink
              to="/administrador"
              className="text-on-surface-variant hover:text-secondary font-label-sm text-label-sm uppercase tracking-wider transition-all no-underline"
            >
              Administrador
            </NavLink>
          )}
        </nav>

        {/* Botones de acción / Hamburger */}
        <div className="flex items-center space-x-4">
          {usuarioAdmin.token ? (
            <button
              onClick={logout}
              className="hidden md:flex items-center justify-center bg-error text-on-error rounded-lg px-6 py-2.5 font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-colors cursor-pointer transition-transform active:scale-95"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:flex items-center justify-center bg-secondary text-on-secondary rounded-lg px-6 py-2.5 font-label-sm text-label-sm uppercase tracking-wider hover:bg-secondary/90 transition-colors cursor-pointer transition-transform active:scale-95 no-underline"
            >
              Login
            </Link>
          )}

          {/* Botón menú móvil */}
          <button
            className="md:hidden text-primary flex items-center bg-transparent border-0"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileOpen && (
        <div className="md:hidden bg-surface dark:bg-inverse-surface border-t border-outline-variant px-4 py-4 flex flex-col space-y-4 shadow-lg">
          <NavLink
            to="/"
            onClick={() => {
              setIsMobileOpen(false);
              irArriba();
            }}
            className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider no-underline"
          >
            Inicio
          </NavLink>

          {/* Enlace de Contacto en Móvil */}
          <a
            href="#contacto"
            onClick={() => setIsMobileOpen(false)}
            className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider no-underline"
          >
            Contacto
          </a>

          {usuarioAdmin.token && (
            <NavLink
              to="/administrador"
              onClick={() => setIsMobileOpen(false)}
              className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider no-underline"
            >
              Administrador
            </NavLink>
          )}

          {usuarioAdmin.token ? (
            <button
              onClick={logout}
              className="text-left text-error font-label-sm text-label-sm uppercase tracking-wider bg-transparent border-0 p-0"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileOpen(false)}
              className="text-left text-secondary font-label-sm text-label-sm uppercase tracking-wider no-underline"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Menu;
