import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../../helpers/queries.js";
import Swal from "sweetalert2";
import imgLogin from "../../assets/login.png";
import logo from "../../assets/logo-transparente.png";

const Login = ({ setUsuarioAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const iniciarSesion = async (usuario) => {
    const respuesta = await login(usuario);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setUsuarioAdmin({ nombreAdmin: datos.nombreAdmin, token: datos.token });

      Swal.fire({
        title: "Inicio de sesión correcto",
        text: `Bienvenido ${datos.nombreAdmin}`,
        icon: "success",
        confirmButtonColor: "#09090b",
      });
      navegacion("/administrador");
    } else {
      Swal.fire({
        title: "Error al iniciar sesión",
        text: "Credenciales incorrectas",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <main className="flex w-full min-h-screen pt-[72px] bg-surface">
      {/* Form side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-gutter py-12 lg:py-16">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors no-underline mb-8 group"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
              arrow_back
            </span>
            Volver al inicio
          </Link>

          <div className="mb-8">
            <img
              src={logo}
              alt="Logo Catalogo de Vehiculos"
              className="h-10 w-auto object-contain mb-6"
            />
            <h1 className="font-heading text-2xl font-bold text-on-surface mb-2">
              Iniciar sesión
            </h1>
            <p className="text-sm text-on-surface-variant">
              Ingresá tus credenciales para acceder al panel de administración.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(iniciarSesion)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-label !normal-case !tracking-normal"
              >
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant pointer-events-none">
                  <span className="material-symbols-outlined text-[18px]">
                    mail
                  </span>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className={`input-base !pl-11 ${errors.email ? "input-error" : ""}`}
                  {...register("email", {
                    required: "El email es un dato obligatorio",
                    pattern: {
                      value:
                        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                      message:
                        "El email debe tener un formato válido (ej: juan@gmail.com)",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-error text-xs">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-label !normal-case !tracking-normal"
              >
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-on-surface-variant pointer-events-none">
                  <span className="material-symbols-outlined text-[18px]">
                    lock
                  </span>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  className={`input-base !pl-11 !pr-11 ${errors.password ? "input-error" : ""}`}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/,
                      message:
                        "Debe tener 8-16 caracteres, mayúsculas, minúsculas, un número y un símbolo especial.",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-on-surface-variant hover:text-on-surface transition-colors bg-transparent border-0 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-xs">{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full !mt-2 group">
              Iniciar sesión
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-outline-variant hidden lg:block">
            <p className="text-xs text-on-surface-variant text-center">
              Acceso restringido al panel de administración
            </p>
          </div>
        </div>
      </div>

      {/* Visual side */}
      <div className="hidden lg:block lg:w-1/2 relative bg-primary overflow-hidden">
        <img
          src={imgLogin}
          alt="Autos Luxury"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-primary/20" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-medium mb-4">
            Panel de administración
          </p>
          <p className="font-heading text-3xl font-bold text-white mb-3 leading-tight">
            Diseñado para la excelencia
          </p>
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            Administra tu inventario, gestiona los vehículos y ofrece una
            experiencia premium a tus clientes.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
