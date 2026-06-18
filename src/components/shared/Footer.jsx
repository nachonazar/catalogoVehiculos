import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full py-stack-lg bg-[#051125] mt-stack-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-gutter max-w-container-max mx-auto md:px-8 px-4">
        
        {/* Columna 1: Logo */}
        <div className="col-span-1 flex flex-col items-center md:items-start justify-center text-center md:text-left mb-6 md:mb-0">
          <NavLink to="/">
            <img
              src={logo}
              alt="Logo Catalogo de Vehiculos"
              className="w-[150px] h-auto mb-stack-sm object-contain"
            />
          </NavLink>
          <p className="font-body-md text-body-md text-on-primary-container mt-4">
            Tu destino premium para vehículos de alta calidad y rendimiento excepcional.
          </p>
        </div>

        {/* Columna 2: Secciones */}
        <div className="col-span-1 flex flex-col items-center justify-start mb-6 md:mb-0">
          <h5 className="font-headline-md text-headline-md text-on-primary mb-stack-sm">Secciones</h5>
          <div className="flex flex-col text-center gap-2">
            <a 
              href="#contacto" 
              className="font-label-sm text-label-sm text-on-primary-container hover:text-on-primary no-underline transition-all cursor-pointer uppercase tracking-wider"
            >
              Contacto
            </a>
            <a 
              href="#vehiculos" 
              className="font-label-sm text-label-sm text-on-primary-container hover:text-on-primary no-underline transition-all cursor-pointer uppercase tracking-wider"
            >
              Inventario
            </a>
          </div>
        </div>

        {/* Columna 3: Redes / Autor */}
        <div className="col-span-1 flex flex-col items-center md:items-end justify-start">
          <h5 className="font-headline-md text-headline-md text-on-primary mb-2">Ignacio Nazar</h5>
          <p className="font-body-md text-body-md text-on-primary-container mb-4 text-center md:text-right">
            Seguime en mis redes:
          </p>
          <div className="flex justify-center md:justify-end items-center gap-4">
            <a href="#" className="text-on-primary-container hover:text-on-primary text-2xl transition-colors">
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://wa.me/5493816289462?text=Hola!%20Me%20interesa%20un%20vehículo%20del%20catálogo"
              target="_blank"
              rel="noreferrer"
              className="text-on-primary-container hover:text-on-primary text-2xl transition-colors"
            >
              <i className="bi bi-whatsapp"></i>
            </a>
            <a
              href="https://m.me/Ignacio Nazar"
              target="_blank"
              rel="noreferrer"
              className="text-on-primary-container hover:text-on-primary text-2xl transition-colors"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="max-w-container-max mx-auto px-gutter md:px-8 px-4 mt-stack-lg pt-6 border-t border-on-primary-container/20">
        <p className="font-label-sm text-label-sm text-on-primary-container text-center">
          © {new Date().getFullYear()} Luxe Auto Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;