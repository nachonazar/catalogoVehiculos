import React from "react";

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
      </div>
    </section>
  );
};

export default Contacto;
