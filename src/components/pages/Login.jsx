import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom"; // Asegúrate de usar react-router-dom
import { login } from "../../../helpers/queries.js";
import Swal from "sweetalert2";
import imgLogin from "../../assets/login.png"; // Tu imagen original

const Login = ({ setUsuarioAdmin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();
  // Estado para el ojito de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const iniciarSesion = async (usuario) => {
    const respuesta = await login(usuario);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      // Actualizar el state usuarioAdmin
      setUsuarioAdmin({ nombreAdmin: datos.nombreAdmin, token: datos.token });

      Swal.fire({
        title: "Inicio de sesión correcto",
        text: `Bienvenido ${datos.nombreAdmin}`,
        icon: "success",
        confirmButtonColor: "#051125", // Color primary de Stich
      });
      navegacion("/administrador");
    } else {
      Swal.fire({
        title: "Error al iniciar sesión",
        text: "Credenciales incorrectas",
        icon: "error",
        confirmButtonColor: "#ba1a1a", // Color error de Stich
      });
    }
  };

  return (
    // min-h-screen y pt-20 para que no se superponga con tu menú de navegación fijo
    <main className="flex w-full min-h-screen pt-20 bg-surface">
      {/* Mitad Izquierda: Formulario */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-4 sm:px-gutter bg-surface-container-lowest relative z-10 py-10">
        <div className="w-full max-w-md">
          <div className="mb-4 text-center lg:text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary font-label-sm text-label-sm uppercase tracking-wider transition-colors no-underline group"
            >
              <span className="material-symbols-outlined text-[18px] transform group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              Volver al inicio
            </Link>
          </div>

          {/* Encabezado */}
          <div className="mb-stack-lg text-center lg:text-left">
            <h1 className="font-display-lg text-[40px] md:text-display-lg text-primary tracking-tighter">
              LUXE AUTO
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Bienvenido de nuevo. Ingresa tus credenciales para continuar.
            </p>
          </div>

          {/* Formulario conectado con React Hook Form */}
          <form
            onSubmit={handleSubmit(iniciarSesion)}
            className="space-y-stack-md"
          >
            {/* Campo Email */}
            <div>
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">
                    mail
                  </span>
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="Ingresa tu email"
                  className={`block w-full pl-10 pr-3 py-3 border rounded-lg text-on-surface placeholder-on-surface-variant bg-surface-container-lowest focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200 ${
                    errors.email
                      ? "border-error focus:ring-error focus:border-error"
                      : "border-outline-variant focus:ring-secondary focus:border-secondary"
                  }`}
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
              {/* Mensaje de error de React Hook Form */}
              {errors.email && (
                <p className="text-error font-label-sm text-xs mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="sr-only" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-on-surface-variant pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">
                    lock
                  </span>
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className={`block w-full pl-10 pr-10 py-3 border rounded-lg text-on-surface placeholder-on-surface-variant bg-surface-container-lowest focus:outline-none focus:ring-1 sm:text-sm transition-colors duration-200 ${
                    errors.password
                      ? "border-error focus:ring-error focus:border-error"
                      : "border-outline-variant focus:ring-secondary focus:border-secondary"
                  }`}
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
                {/* Botón para alternar visibilidad de contraseña */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-on-surface-variant hover:text-primary focus:outline-none transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
              {/* Mensaje de error de React Hook Form */}
              {errors.password && (
                <p className="text-error font-label-sm text-xs mt-1 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botón de Enviar */}
            <div className="mt-stack-lg pt-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-on-primary bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-headline-md text-[16px] transition-all duration-200 shadow-sm hover:shadow-[0px_5px_15px_rgba(5,17,37,0.15)] active:scale-[0.98]"
              >
                Iniciar Sesión
                <span className="absolute right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </span>
              </button>
            </div>
          </form>

          {/* Separador (Opcional - Mantenido del diseño visual de Stich) */}
          <div className="mt-stack-lg relative hidden lg:block">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                Panel de Administración
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mitad Derecha: Imagen decorativa */}
      <div className="hidden lg:block lg:w-1/2 relative bg-primary overflow-hidden shadow-[-10px_0px_30px_rgba(27,38,59,0.1)]">
        <div className="absolute inset-0 w-full h-full">
          {/* Utilizando tu imagen original de assets */}
          <img
            src={imgLogin}
            alt="Autos Luxury"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Filtro de degradado oscuro para que el texto resalte sobre tu imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"></div>

        {/* Texto sobre la imagen */}
        <div className="absolute bottom-12 left-12 right-12 text-on-primary">
          <p className="font-headline-lg text-headline-lg mb-2">
            Diseñado para la Excelencia.
          </p>
          <p className="font-body-md text-body-md opacity-80 max-w-lg">
            Administra tu inventario, gestiona los vehículos y ofrece una
            experiencia premium a tus clientes.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
