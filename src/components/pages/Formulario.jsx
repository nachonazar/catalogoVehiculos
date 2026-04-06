import React from 'react';
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const Formulario = () => {
    return (
        <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Vehículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Marca *</Form.Label>
                <Form.Control type="text" placeholder="Ej: Toyota" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Modelo *</Form.Label>
                <Form.Control type="text" placeholder="Ej: Corolla" />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Año *</Form.Label>
                <Form.Control type="number" defaultValue={2026} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Tipo *</Form.Label>
                <Form.Select>
                  <option>Sedán</option>
                  <option>SUV</option>
                  <option>Camioneta</option>
                  <option>Deportivo</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Precio *</Form.Label>
                <Form.Control type="number" defaultValue={0} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Kilometraje</Form.Label>
                <Form.Control type="number" defaultValue={0} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Describe las características del vehículo..."
            />
          </Form.Group>

          <Form.Check
            className="mb-3"
            type="checkbox"
            label="Vehículo disponible"
            defaultChecked
          />

          <Row>
            <Col md={6}>
              <Button variant="primary" className="w-100">Agregar</Button>
            </Col>
            <Col md={6}>
              <Button variant="secondary" className="w-100">Cancelar</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
    );
};

export default Formulario;