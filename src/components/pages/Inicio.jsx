import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import CardVehiculo from "./vehiculo/CardVehiculo";
import Contacto from "../shared/Contacto";
import { leerVehiculosPaginados } from "../../../helpers/queries.js";
import "./Inicio.css";

const Inicio = () => {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [categoriaElegida, setCategoriaElegida] = useState("");

  useEffect(() => {
    obtenerVehiculos();
  }, [page]);

  const obtenerVehiculos = async () => {
    const respuesta = await leerVehiculosPaginados(page, limit);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setVehiculos(datos.vehiculos);
      setTotalPages(datos.totalPages);
    } else {
      console.info("Ocurrio un error al buscar los vehiculos");
    }
  };

  const vehiculosFiltrados = vehiculos
    .filter((v) => v.disponible)
    .filter((v) => categoriaElegida ? v.categoria === categoriaElegida : true)
    .filter((v) =>
      (v.marca || "").toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      (v.modelo || "").toLowerCase().includes(terminoBusqueda.toLowerCase())
    );

  return (
    <div style={{ backgroundColor: "var(--color-surface)" }}>

      {/* HERO */}
      <section className="inicio-hero">
        <div className="inicio-hero-overlay" />
        <div className="inicio-hero-gradient" />
        <div className="inicio-hero-content">
          <h1 className="inicio-hero-title">Encontrá tu próximo vehículo</h1>
          <p className="inicio-hero-subtitle">
            El catálogo más completo de vehículos seleccionados para vos.
          </p>
          <a href="#vehiculos" className="inicio-hero-btn">
            Ver Inventario
          </a>
        </div>
      </section>

      {/* FILTROS FLOTANTES */}
      <section className="inicio-filtros-wrapper">
        <div className="inicio-filtros">
          <div className="inicio-filtros-search">
            <i className="bi bi-search inicio-filtros-icon" />
            <input
              type="text"
              placeholder="Buscar modelo o marca..."
              className="inicio-filtros-input"
              value={terminoBusqueda}
              onChange={(e) => { setTerminoBusqueda(e.target.value); setPage(1); }}
            />
          </div>
          <select
            className="inicio-filtros-select"
            value={categoriaElegida}
            onChange={(e) => { setCategoriaElegida(e.target.value); setPage(1); }}
          >
            <option value="">Todas las categorías</option>
            <option value="Sedán">Sedán</option>
            <option value="SUV">SUV</option>
            <option value="Camioneta">Camioneta</option>
            <option value="Deportivo">Deportivo</option>
          </select>
        </div>
      </section>

      {/* GRID DE VEHICULOS */}
      <main className="inicio-main" id="vehiculos">
        <h2 className="inicio-section-title">Vehículos Disponibles</h2>
        <p className="inicio-section-subtitle">Explora nuestro catálogo de vehículos</p>
        <Row>
          {vehiculosFiltrados.length > 0 ? (
            vehiculosFiltrados.map((vehiculo) => (
              <CardVehiculo key={vehiculo._id} vehiculo={vehiculo} />
            ))
          ) : (
            <p className="text-muted">No se encontraron vehículos para mostrar</p>
          )}
        </Row>

        {/* PAGINACION */}
        <div className="inicio-paginacion">
          <Button
            className="inicio-paginacion-btn"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            &laquo;
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              className={`inicio-paginacion-btn ${page === i + 1 ? "active" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            className="inicio-paginacion-btn"
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            &raquo;
          </Button>
        </div>
      </main>

      <Contacto />
    </div>
  );
};

export default Inicio;