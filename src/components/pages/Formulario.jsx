import React from "react";
import { Modal, Form, Button, Row, Col, FormText } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Modal show={true}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Vehículo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Marca*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Toyota"
                  {...register("marca", {
                    required: "La marca es un dato obligatorio",
                    minLength: {
                      value: 2,
                      message:
                        "La marca del vehiculo debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "La marca del vehiculo debe tener como maximo 50 caracteres",
                    },
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                      message:
                        "La marca del vehiculo debe contener solo letras",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.marca?.message}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Modelo*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Corolla"
                  {...register("modelo", {
                    required: "El modelo es un dato obligatorio",
                    minLength: {
                      value: 2,
                      message:
                        "El modelo del vehiculo debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "El modelo del vehiculo debe tener como maximo 50 caracteres",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.modelo?.message}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Año *</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej: 2025"
                  {...register("anio", {
                    required: "El año es un dato obligatorio",
                    valueAsNumber: true,
                    min: {
                      value: 1900,
                      message: "Año inválido",
                    },
                    max: {
                      value: new Date().getFullYear(),
                      message: "No puede ser futuro",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.anio?.message}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Tipo *</Form.Label>
                <Form.Select
                  {...register("tipo", {
                    required: "Debe seleccionar el tipo de vehiculo",
                  })}
                >
                  <option value="">Seleccione una opcion</option>
                  <option value="Sedán">Sedán</option>
                  <option value="SUV">SUV</option>
                  <option value="Camioneta">Camioneta</option>
                  <option value="Deportivo">Deportivo</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.tipo?.message}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Precio*</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej: 25000"
                  {...register("precio", {
                    required: "El precio es un valor obligatorio",
                  })}
                />
                <FormText className="text-danger">
                  {errors.precio?.message}
                </FormText>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Kilometraje</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Ej: 45000"
                  {...register("km", {
                    required: "El kilometraje es un dato obligatorio",
                  })}
                />
                <FormText className="text-danger">
                  {errors.km?.message}
                </FormText>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Ej: Vehículo en excelente estado, único dueño y nunca chocado. Service al día en concesionaria oficial. Aire acondicionado, alarma, vidrios eléctricos y Bluetooth. Documentación completa al día."
              {...register("descripcion", {
                minLength: {
                  value: 10,
                  message: "La descrición debe tener al menos 10 caracteres",
                },
                maxLength: {
                  value: 500,
                  message:
                    "La descrición debe tener como máximo 500 caracteres",
                },
              })}
            />
          </Form.Group>
          <Row>
            <Col>
              <Button variant="primary" type="submit" className="w-100">
                Agregar
              </Button>
            </Col>
            <Col>
              <Button variant="secondary" className="w-100">
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Formulario;
