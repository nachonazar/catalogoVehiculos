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
import {
  crearVehiculo,
  leerVehiculoPorId,
  editarVehiculosPorId,
} from "../../../helpers/queries.js";
import "./vehiculo/Formulario.css";

const Formulario = ({ titulo }) => {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { id } = useParams();
  const [imagenActual, setImagenActual] = useState([]);
  const [preview, setPreview] = useState([]);
  const [archivos, setArchivos] = useState([]);
  useEffect(() => {
    obtenerVehiculo();
  }, []);

  const obtenerVehiculo = async () => {
    if (titulo === "Editar Vehiculo") {
      const respuesta = await leerVehiculoPorId(id);
      if (respuesta.status === 200) {
        const vehiculoBuscado = await respuesta.json();
        setValue("marca", vehiculoBuscado.marca);
        setValue("modelo", vehiculoBuscado.modelo);
        setValue("anio", vehiculoBuscado.anio);
        setValue("categoria", vehiculoBuscado.categoria);
        setValue("precio", vehiculoBuscado.precio);
        setValue("km", vehiculoBuscado.km);
        setValue("disponible", vehiculoBuscado.disponible);
        setValue("descripcion", vehiculoBuscado.descripcion);
        setImagenActual(vehiculoBuscado.imagenes);
      }
    }
  };

  const navegacion = useNavigate();

  const onSubmit = async (vehiculo) => {
    console.log("archivos:", archivos);
    console.log("imagenActual:", imagenActual);
    console.log(
      "vehiculoCompleto.imagenes:",
      titulo === "Crear Vehiculo"
        ? archivos
        : { nuevas: archivos, existentes: imagenActual },
    );
    const vehiculoCompleto = {
      ...vehiculo,
      imagenes:
        titulo === "Crear Vehiculo"
          ? archivos
          : { nuevas: archivos, existentes: imagenActual },
      disponible: titulo === "Crear Vehiculo" ? true : vehiculo.disponible,
    };
    if (titulo === "Crear Vehiculo") {
      const respuesta = await crearVehiculo(vehiculoCompleto);
      if (respuesta.status === 201) {
        Swal.fire({
          title: "Vehiculo creado",
          text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} fue creado correctamente`,
          icon: "success",
        }).then(() => {
          reset();
          setPreview([]);
          setImagenActual([]);
          setArchivos([]);
          navegacion("/administrador");
        });
      } else {
        const datosErroneos = await respuesta.json();
        Swal.fire({
          title: "Ocurrio un error",
          text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} no pudo ser creado. ${datosErroneos.mensaje}`,
          icon: "error",
        });
      }
    } else {
      const respuesta = await editarVehiculosPorId(vehiculoCompleto, id);
      if (respuesta.status === 200) {
        Swal.fire({
          title: "Vehiculo editado",
          text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} fue editado correctamente`,
          icon: "success",
        }).then(() => {
          navegacion("/administrador");
        });
      } else {
        const datosErroneos = await respuesta.json();
        Swal.fire({
          title: "Ocurrio un error",
          text: `El vehiculo ${vehiculo.marca} ${vehiculo.modelo} no pudo ser editado. ${datosErroneos[0]?.mensaje}`,
          icon: "error",
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
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s\-\.()]+$/,
                      message:
                        "La marca solo puede contener letras, espacios, guiones, puntos y paréntesis",
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
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s\-\.()/]+$/,
                      message:
                        "El modelo solo puede contener letras, números, espacios, guiones, puntos y paréntesis",
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
                      value: new Date().getFullYear() + 1,
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
                    min: {
                      value: 500000,
                      message: "El precio mínimo es $500.000",
                    },
                    max: {
                      value: 500000000,
                      message: "El precio máximo es $500.000.000",
                    },
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
                    min: {
                      value: 0,
                      message: "El kilometraje no puede ser negativo",
                    },
                    max: {
                      value: 500000,
                      message: "El kilometraje máximo es 500.000",
                    },
                  })}
                />
                <FormText className="text-danger">
                  {errors.km?.message}
                </FormText>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>Imagenes*</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              {...register("imagenes", {
                required:
                  titulo === "Crear Vehiculo" && archivos.length === 0
                    ? "La imagen es obligatoria"
                    : false,
                validate: {
                  fileSize: (files) =>
                    !files[0] ||
                    Array.from(files).every((f) => f.size <= 2 * 1024 * 1024) ||
                    "Alguna imagen supera los 2MB.",
                  imagenRequerida: () => {
                    if (
                      titulo === "Editar Vehiculo" &&
                      archivos.length === 0 &&
                      imagenActual.length === 0
                    ) {
                      return "Debe tener al menos una imagen";
                    }
                    return true;
                  },
                },
              })}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length > 0) {
                  setArchivos((prev) => [...prev, ...files]);
                  setPreview((prev) => [
                    ...prev,
                    ...files.map((file) => URL.createObjectURL(file)),
                  ]);
                }
              }}
            />
            {[...imagenActual, ...preview].map((src, index) => (
              <div
                key={index}
                className="mb-2 position-relative d-inline-block mt-3 me-2"
              >
                <img
                  className="rounded-3 img-preview"
                  src={src}
                  alt="Imagenes"
                />
                <Button
                  variant="light"
                  size="sm"
                  className="p-0 d-flex align-items-center justify-content-center shadow btn-img-preview"
                  onClick={() => {
                    const esExistente = index < imagenActual.length;
                    if (esExistente) {
                      setImagenActual((prev) =>
                        prev.filter((_, i) => i !== index),
                      );
                    } else {
                      const previewIndex = index - imagenActual.length;
                      setPreview((prev) =>
                        prev.filter((_, i) => i !== previewIndex),
                      );
                      setArchivos((prev) =>
                        prev.filter((_, i) => i !== previewIndex),
                      );
                    }
                  }}
                >
                  <i className="bi bi-x fs-5 text-danger"></i>
                </Button>
              </div>
            ))}
            <Form.Text className="text-danger">
              {errors.imagenes?.message}
            </Form.Text>
          </Form.Group>

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
                required: "La descripcion es un dato obligatorio",
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
