import React from "react";
import error from "../../assets/error.png";

const Error404 = () => {
  return (
    <section className="text-center">
      <img className="img-fluid" src={error} alt="error 404" />
      <div>
        <button className="btn btn-success">Volver al inicio</button>
      </div>
    </section>
  );
};

export default Error404;
