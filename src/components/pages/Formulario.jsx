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
const URL_PATTERN =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/#\w?=&.-]*)*\/?$/;

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
  const [errorImagenes, setErrorImagenes] = useState("");
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
      setImagenes(vehiculoBuscado.imagenes || [""]);
    }
  }, []);

  const navegacion = useNavigate();

  const onSubmit = (vehiculo) => {
    const imagenesValidas = imagenes.filter((img) => img.trim() !== "");
    if (imagenesValidas.length === 0) {
      setErrorImagenes("Debe incluir al menos una URL de imagen");
      return;
    }

    const todasUrlsValidas = imagenesValidas.every((img) =>
      URL_PATTERN.test(img),
    );
    if (!todasUrlsValidas) {
      setErrorImagenes("Una o más URLs tienen un formato inválido");
      return;
    }
    setErrorImagenes("");

    const vehiculoCompleto = {
      ...vehiculo,
      imagenes: imagenesValidas,
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
          <FormGroup className="mb-3">
            <FormLabel>Imágenes URL*</FormLabel>

            {imagenes.map((img, index) => (
              <div key={index} className="mb-2">
                <div className="d-flex">
                  <FormControl
                    type="text"
                    value={img}
                    isInvalid={img !== "" && !URL_PATTERN.test(img)}
                    onChange={(e) => {
                      const nuevas = [...imagenes];
                      nuevas[index] = e.target.value;
                      setImagenes(nuevas);
                      setErrorImagenes("");
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
                {img !== "" && !URL_PATTERN.test(img) && (
                  <FormText className="text-danger">
                    Formato de URL no válido
                  </FormText>
                )}
              </div>
            ))}

            <Button onClick={() => setImagenes([...imagenes, ""])}>
              + Agregar imagen
            </Button>

            {errorImagenes && (
              <div className="text-danger mt-1">
                <small>{errorImagenes}</small>
              </div>
            )}
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
