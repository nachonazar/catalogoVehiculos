import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={6} lg={3} className="d-flex align-items-center justify-content-center">
            <NavLink to="/">
              <img
              src={logo}
                alt="Logo Catalogo de Vehiculos"
                className="img-fluid"
                width={150}
              />
            </NavLink>
          </Col>
          <Col xs={12} md={6} lg={3} className="d-flex flex-column align-items-center">
            <h5 className="fw-bold mb-2 text-center">Secciones</h5>
            <Nav className="flex-column text-center">
              <Nav.Link href="#contacto" className="text-white-50 p-0 mb-1">Contacto</Nav.Link>
            </Nav>
          </Col>
          <Col xs={12} md={6} lg={3} className="d-flex flex-column align-items-center">
            <h5 className="fw-bold mb-2 text-center">Ignacio Nazar</h5>
            <p className="text-white-50 mb-2 text-center">Seguime en mis redes:</p>
            <div className="d-flex justify-content-center align-items-center gap-3">
              <a href="#" className="text-white fs-4"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white fs-4"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white fs-4"><i className="bi bi-facebook"></i></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;