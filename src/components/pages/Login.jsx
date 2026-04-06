import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import login from "../../assets/login.png";

const Login = () => {
  return (
    <section className="container my-3">
      <h1 className="text-center">Login</h1>
      <Row xs={1} md={2}>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingresa un email" />
              <Form.Text className="text-danger">
                Este es un mensaje de error
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
              <Form.Text className="text-danger">
                Este es un mensaje de error
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Col>
        <Col>
          <img src={login} alt="autos" className="img-fluid" />
        </Col>
      </Row>
    </section>
  );
};

export default Login;
