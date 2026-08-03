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

  const irArriba = () => {
    window.scrollTo(0, 0);
  };

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <header className="fixed top-0 w-full z-50 glass">
      <div className="container-app flex justify-between items-center h-16 md:h-[72px]">
        {/* Logo */}
        <Link
          to="/"
          onClick={irArriba}
          className="flex items-center no-underline shrink-0 transition-opacity hover:opacity-80"
        >
          <img
            src={logo}
            alt="Logo Catálogo de Vehículos"
            className="h-9 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" end onClick={irArriba} className={linkClass}>
            Inicio
          </NavLink>
          <a href="#contacto" className="nav-link">
            Contacto
          </a>
          {usuarioAdmin.token && (
            <NavLink to="/administrador" className={linkClass}>
              Administrador
            </NavLink>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {usuarioAdmin.token ? (
            <button onClick={logout} className="btn-danger hidden md:inline-flex !py-2.5 !px-5 !text-xs">
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login" className="btn-primary hidden md:inline-flex !py-2.5 !px-5 !text-xs no-underline">
              Ingresar
            </Link>
          )}

          <button
            type="button"
            aria-label={isMobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileOpen}
            className="btn-icon md:hidden !w-10 !h-10"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-outline-variant/60 bg-surface-container-lowest/95 backdrop-blur-xl px-4 py-4 flex flex-col gap-1 animate-fade-in">
          <NavLink
            to="/"
            end
            onClick={() => { setIsMobileOpen(false); irArriba(); }}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-sm font-medium no-underline transition-colors ${
                isActive ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:bg-surface-container-low"
              }`
            }
          >
            Inicio
          </NavLink>
          <a
            href="#contacto"
            onClick={() => setIsMobileOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-low no-underline transition-colors"
          >
            Contacto
          </a>
          {usuarioAdmin.token && (
            <NavLink
              to="/administrador"
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium no-underline transition-colors ${
                  isActive ? "bg-surface-container text-on-surface" : "text-on-surface-variant hover:bg-surface-container-low"
                }`
              }
            >
              Administrador
            </NavLink>
          )}
          <div className="pt-2 mt-2 border-t border-outline-variant/60">
            {usuarioAdmin.token ? (
              <button
                onClick={logout}
                className="w-full btn-danger !text-xs"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                className="w-full btn-primary !text-xs no-underline"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Menu;
