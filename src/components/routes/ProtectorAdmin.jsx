import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectorAdmin = ({ isAdmin }) => {
  if (!isAdmin.token) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};

export default ProtectorAdmin;
