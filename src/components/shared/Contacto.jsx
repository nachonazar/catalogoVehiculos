import React from "react";
import "../pages/vehiculo/Contacto.css";

const Contacto = () => {
  return (
    <section id="contacto" className="bg-dark text-white pt-5 pb-5 my-5">
      <h1 className="text-center my-5 fs-3 fw-semibold">Contacto</h1>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center">
            <i className="bi bi-telephone fs-1 mb-4 text-danger"></i>
            <h5 className="text-white fw-bold mb-2 fs-5 text-center">
              Teléfono
            </h5>
            <ul className="list-unstyled text-center">
              <li className="mb-1">+54 9 3814 44-7015</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center">
            <i className="bi bi-envelope fs-1 mb-4 text-danger"></i>
            <h5 className="text-white fw-bold mb-2 fs-5 text-center">Email</h5>
            <ul className="list-unstyled text-center">
              <li className="mb-1">javiernazar64@gmail.com</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 col-lg-4 d-flex flex-column align-items-center">
            <i className="bi bi-geo-alt fs-1 mb-4 text-danger"></i>
            <h5 className="text-white fw-bold mb-2 fs-5 text-center">
              Dirección
            </h5>
            <ul className="list-unstyled text-center">
              <li className="mb-1">Av. Ejército del Norte 45</li>
              <li className="mb-1">Tucumán, Argentina</li>
            </ul>
          </div>
        </div>
        <div className="mt-5 rounded overflow-hidden maps">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.4802989513896!2d-65.2342316253447!3d-26.82467178952945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c5ddae62d37%3A0x6678f7eb778713dc!2sLazarte%20Automoviles!5e0!3m2!1ses!2sar!4v1780874070504!5m2!1ses!2sar"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
