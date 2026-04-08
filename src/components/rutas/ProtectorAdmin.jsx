import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectorAdmin = ({isAdmin}) => {
    //si no soy administrador
    if(!isAdmin){
        return <Navigate to={"/"}></Navigate>
    }
    //si soy administrador muestro las rutas
    return <Outlet></Outlet>
};

export default ProtectorAdmin;
