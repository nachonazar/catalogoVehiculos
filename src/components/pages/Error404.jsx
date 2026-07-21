import React from "react";
import { Link } from "react-router-dom";
import error from "../../assets/error.png";

const Error404 = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center bg-surface px-4">
      <img className="w-full max-w-md object-cover mb-8" src={error} alt="error 404" />
      <div>
        <Link 
          to="/" 
          className="bg-success-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-success-green/90 transition-colors shadow-md no-underline"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
};

export default Error404;