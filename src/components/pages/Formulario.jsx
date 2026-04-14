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
                  {...register("marca", { required: true })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Modelo*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: Corolla"
                  {...register("modelo", { required: true })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Año*</Form.Label>
                <Form.Control
                  type="number"
                  {...register("anio", { required: true })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Categoria*</Form.Label>
                <Form.Select {...register("categoria", { required: true })}>
                  <option value="">Seleccione</option>
                  <option value="Sedán">Sedán</option>
                  <option value="SUV">SUV</option>
                  <option value="Camioneta">Camioneta</option>
                  <option value="Deportivo">Deportivo</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Precio*</Form.Label>
                <Form.Control
                  type="number"
                  {...register("precio", { required: true })}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Kilometraje*</Form.Label>
                <Form.Control
                  type="number"
                  {...register("km", { required: true })}
                />
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
            <Form.Control as="textarea" rows={3} {...register("descripcion")} />
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