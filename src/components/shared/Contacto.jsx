import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const Contacto = () => {
  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState(null); // "ok" | "error"

  const onSubmit = async (form) => {
    setEnviando(true);
    setEstado(null);
    try {
      await emailjs.send(
        "service_gzxuuhj",
        "template_y6j272a",
        form,
        "0yFSwzX2IV2ZWEgMJ",
      );
      setEstado("ok");
      reset(); // Limpia el formulario automáticamente si se envía bien
    } catch (error) {
      console.error(error);
      setEstado("error");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section
      id="contacto"
      className="scroll-mt-28 bg-surface-container py-stack-lg px-gutter my-10"
    >
      <div className="max-w-container-max mx-auto">
        {/* Título */}
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-2">
            Contacto
          </h2>
          <p className="font-body-lg text-on-surface-variant">
            Estamos aquí para ayudarte a encontrar tu próximo vehículo.
          </p>
        </div>

        {/* Tarjetas de info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0px_5px_15px_rgba(27,38,59,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-surface-container-highest">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-on-primary-container">
                call
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Teléfono
            </h3>
            <p className="font-body-md text-on-surface-variant">
              +54 9 3814 44-7015
            </p>
            <p className="font-label-sm text-label-sm text-outline mt-2 uppercase">
              Lunes a Sábados
            </p>
          </div>

          <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0px_5px_15px_rgba(27,38,59,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-surface-container-highest">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-on-primary-container">
                mail
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Email
            </h3>
            <p className="font-body-md text-on-surface-variant">
              javiernazar64@gmail.com
            </p>
            <p className="font-label-sm text-label-sm text-outline mt-2 uppercase">
              Respuesta Rápida
            </p>
          </div>

          <div className="bg-surface-container-lowest p-stack-md rounded-xl shadow-[0px_5px_15px_rgba(27,38,59,0.03)] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center border border-surface-container-highest">
            <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-on-primary-container">
                location_on
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Ubicación
            </h3>
            <p className="font-body-md text-on-surface-variant">
              Av. Ejército del Norte 45
            </p>
            <p className="font-label-sm text-label-sm text-outline mt-2 uppercase">
              Tucumán, Argentina
            </p>
          </div>
        </div>

        {/* Formulario + Mapa */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-stack-lg">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-surface-container-lowest rounded-xl p-6 border border-surface-container-highest shadow-[0px_5px_15px_rgba(27,38,59,0.03)] flex flex-col gap-4"
          >
            <h3 className="font-headline-md text-headline-md text-primary mb-2">
              Envianos un mensaje
            </h3>

            {/* Input: Nombre */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                className={`w-full h-12 px-4 rounded-lg border bg-surface text-on-surface outline-none focus:ring-1 transition-colors ${errors.from_name ? "border-error focus:ring-error" : "border-outline-variant focus:border-secondary focus:ring-secondary"}`}
                {...register("from_name", {
                  required: "El nombre es un dato obligatorio",
                  minLength: {
                    value: 3,
                    message: "Debe tener al menos 3 caracteres",
                  },
                  maxLength: { value: 60, message: "Máximo 60 caracteres" },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                    message: "Solo letras y espacios",
                  },
                })}
              />
              {errors.from_name && (
                <span className="text-error font-label-sm text-xs mt-1">
                  {errors.from_name.message}
                </span>
              )}
            </div>

            {/* Input: Email */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                className={`w-full h-12 px-4 rounded-lg border bg-surface text-on-surface outline-none focus:ring-1 transition-colors ${errors.from_email ? "border-error focus:ring-error" : "border-outline-variant focus:border-secondary focus:ring-secondary"}`}
                {...register("from_email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ingresá un email válido",
                  },
                })}
              />
              {errors.from_email && (
                <span className="text-error font-label-sm text-xs mt-1">
                  {errors.from_email.message}
                </span>
              )}
            </div>

            {/* Input: Teléfono */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Teléfono
              </label>
              <input
                type="tel"
                placeholder="Ej: +54 9 381 123-4567"
                className={`w-full h-12 px-4 rounded-lg border bg-surface text-on-surface outline-none focus:ring-1 transition-colors ${errors.phone ? "border-error focus:ring-error" : "border-outline-variant focus:border-secondary focus:ring-secondary"}`}
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                  minLength: {
                    value: 8,
                    message: "Debe tener al menos 8 caracteres",
                  },
                  maxLength: { value: 20, message: "Máximo 20 caracteres" },
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Solo números, espacios y símbolos + - ()",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-error font-label-sm text-xs mt-1">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Textarea: Mensaje */}
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Mensaje
              </label>
              <textarea
                rows={4}
                placeholder="¿En qué vehículo estás interesado?"
                className={`w-full px-4 py-3 rounded-lg border bg-surface text-on-surface outline-none focus:ring-1 transition-colors resize-none ${errors.message ? "border-error focus:ring-error" : "border-outline-variant focus:border-secondary focus:ring-secondary"}`}
                {...register("message", {
                  required: "El mensaje es obligatorio",
                  minLength: {
                    value: 10,
                    message: "Debe tener al menos 10 caracteres",
                  },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              {errors.message && (
                <span className="text-error font-label-sm text-xs mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Feedback de envío */}
            {estado === "ok" && (
              <p className="text-success-green font-label-sm text-sm bg-success-green/10 p-3 rounded-lg border border-success-green/20">
                ✅ Mensaje enviado correctamente. Te contactaremos pronto.
              </p>
            )}
            {estado === "error" && (
              <p className="text-error font-label-sm text-sm bg-error/10 p-3 rounded-lg border border-error/20">
                ❌ Ocurrió un error. Intentá de nuevo o contactanos por
                WhatsApp.
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full h-12 mt-2 bg-primary text-white rounded-lg font-label-sm text-label-sm uppercase tracking-wider hover:bg-primary-container transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {enviando ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>

          {/* Mapa */}
          <div className="w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg border border-surface-container-highest">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.4802989513896!2d-65.2342316253447!3d-26.82467178952945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c5ddae62d37%3A0x6678f7eb778713dc!2sLazarte%20Automoviles!5e0!3m2!1ses!2sar!4v1780874070504!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Ubicación"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
