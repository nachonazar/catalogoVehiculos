import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  FormText,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const Formulario = ({
  crearVehiculo,
  buscarVehiculo,
  titulo,
  editarVehiculo,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { id } = useParams();
  const [imagenes, setImagenes] = useState([""]);

  useEffect(() => {
    if (titulo === "Editar Vehiculo") {
      const vehiculoBuscado = buscarVehiculo(id);

      setValue("marca", vehiculoBuscado.marca);
      setValue("modelo", vehiculoBuscado.modelo);
      setValue("anio", vehiculoBuscado.anio);
      setValue("categoria", vehiculoBuscado.categoria);
      setValue("precio", vehiculoBuscado.precio);
      setValue("km", vehiculoBuscado.km);
      setValue("disponible", vehiculoBuscado.disponible);
      setValue("descripcion", vehiculoBuscado.descripcion);

      // 🔥 cargar imágenes
      setImagenes(vehiculoBuscado.imagenes || [""]);
    }
  }, []);

  const navegacion = useNavigate();

  const onSubmit = (vehiculo) => {
    const vehiculoCompleto = {
      ...vehiculo,
      imagenes: imagenes.filter((img) => img !== ""),
    };

    if (titulo === "Crear Vehiculo") {
      if (crearVehiculo(vehiculoCompleto)) {
        Swal.fire({
          title: "Vehiculo creado",
          text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} fue creado correctamente`,
          icon: "success",
        }).then(() => {
          reset();
          setImagenes([""]);
          navegacion("/administrador");
        });
      }
    } else {
      if (editarVehiculo(id, vehiculoCompleto)) {
        Swal.fire({
          title: "Vehiculo editado",
          text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} fue editado correctamente`,
          icon: "success",
        }).then(() => {
          navegacion("/administrador");
        });
      }
    }
  };

  return (
    <Modal show={true} onHide={() => navegacion("/administrador")}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Marca*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Toyota"
                  {...register("marca", {
                    required: "La marca del vehiculo es un dato obligatorio",
                    minLength: {
                      value: 2,
                      message:
                        "La marca del vehiculo debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "La marca del vehiculo debe tener como maximo 100 caracteres",
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
            <Col>
              <Form.Group>
                <Form.Label>Modelo*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Corolla"
                  {...register("modelo", {
                    required: "El modelo del vehiculo es un dato obligatorio",
                    minLength: {
                      value: 2,
                      message:
                        "El modelo del vehiculo debe tener al menos 2 caracteres",
                    },
                    maxLength: {
                      value: 100,
                      message:
                        "El modelo del vehiculo debe tener como maximo 100 caracteres",
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
                <Form.Label>Año*</Form.Label>
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
                <Form.Label>Categoria*</Form.Label>
                <Form.Select
                  {...register("categoria", {
                    required: "Debe seleccionar una categoria",
                  })}
                >
                  <option value="">Seleccione una opcion</option>
                  <option value="Sedán">Sedán</option>
                  <option value="SUV">SUV</option>
                  <option value="Camioneta">Camioneta</option>
                  <option value="Deportivo">Deportivo</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.categoria?.message}
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
                <Form.Label>Kilometraje*</Form.Label>
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

          {/* 🔥 NUEVO BLOQUE DE IMÁGENES */}
          <FormGroup className="mb-3">
            <FormLabel>Imágenes URL*</FormLabel>

            {imagenes.map((img, index) => (
              <div key={index} className="d-flex mb-2">
                <FormControl
                  type="text"
                  value={img}
                  onChange={(e) => {
                    const nuevas = [...imagenes];
                    nuevas[index] = e.target.value;
                    setImagenes(nuevas);
                  }}
                  placeholder="https://imagen.jpg"
                />
                <Button
                  variant="danger"
                  className="ms-2"
                  onClick={() =>
                    setImagenes(imagenes.filter((_, i) => i !== index))
                  }
                >
                  X
                </Button>
              </div>
            ))}

            <Button onClick={() => setImagenes([...imagenes, ""])}>
              + Agregar imagen
            </Button>
          </FormGroup>

          {titulo === "Editar Vehiculo" && (
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label={watch("disponible") ? "Disponible" : "Vendido"}
                {...register("disponible")}
              />
            </Form.Group>
          )}

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
            <Form.Text className="text-danger">
              {errors.descripcion?.message}
            </Form.Text>
          </Form.Group>

          <Row>
            <Col>
              <Button type="submit" className="w-100">
                Guardar
              </Button>
            </Col>
            <Col>
              <Button
                variant="secondary"
                className="w-100"
                onClick={() => navegacion("/administrador")}
              >
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
