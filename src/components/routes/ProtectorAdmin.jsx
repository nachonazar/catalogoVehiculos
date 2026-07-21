import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectorAdmin = ({ isAdmin }) => {
  // si no soy adm
  if (!isAdmin.token) {
    return <Navigate to={"/"} />;
  }

  // si soy administrador muestro las rutas
  return <Outlet />;
};

export default ProtectorAdmin;
