import React, { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [enviando, setEnviando] = useState(false);
  const [estado, setEstado] = useState(null);

  const onSubmit = async (form) => {
    setEnviando(true);
    setEstado(null);
    try {
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form,
        import.meta.env.VITE_PUBLIC_KEY,
      );
      setEstado("ok");
      reset();
    } catch (error) {
      console.error(error);
      setEstado("error");
    } finally {
      setEnviando(false);
    }
  };

  const infoCards = [
    {
      icon: "call",
      title: "Teléfono",
      value: "+54 9 3814 44-7015",
      sub: "Lunes a Sábados",
    },
    {
      icon: "mail",
      title: "Email",
      value: "javiernazar64@gmail.com",
      sub: "Respuesta rápida",
    },
    {
      icon: "location_on",
      title: "Ubicación",
      value: "Av. Ejército del Norte 45",
      sub: "Tucumán, Argentina",
    },
  ];

  return (
    <section id="contacto" className="scroll-mt-24 bg-surface-container-low section-padding">
      <div className="container-app">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-label mb-2">Contacto</p>
          <h2 className="font-heading text-headline-lg text-on-surface mb-3">
            Estamos para ayudarte
          </h2>
          <p className="text-body-md text-on-surface-variant max-w-lg mx-auto">
            Encontrá tu próximo vehículo con asesoramiento personalizado.
          </p>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="card p-6 flex flex-col items-center text-center hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-secondary text-[22px]">
                  {card.icon}
                </span>
              </div>
              <h3 className="font-heading text-base font-semibold text-on-surface mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-on-surface-variant">{card.value}</p>
              <p className="text-label mt-2 !text-[10px]">{card.sub}</p>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <form onSubmit={handleSubmit(onSubmit)} className="card p-6 md:p-8 flex flex-col gap-5">
            <div>
              <h3 className="font-heading text-lg font-semibold text-on-surface mb-1">
                Enviá un mensaje
              </h3>
              <p className="text-sm text-on-surface-variant">
                Te respondemos a la brevedad.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="from_name" className="text-label !normal-case !tracking-normal">
                Nombre
              </label>
              <input
                id="from_name"
                type="text"
                placeholder="Tu nombre completo"
                className={`input-base ${errors.from_name ? "input-error" : ""}`}
                {...register("from_name", {
                  required: "El nombre es un dato obligatorio",
                  minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                  maxLength: { value: 60, message: "Máximo 60 caracteres" },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
                    message: "Solo letras y espacios",
                  },
                })}
              />
              {errors.from_name && (
                <span className="text-error text-xs mt-0.5">{errors.from_name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="from_email" className="text-label !normal-case !tracking-normal">
                Email
              </label>
              <input
                id="from_email"
                type="email"
                placeholder="tu@email.com"
                className={`input-base ${errors.from_email ? "input-error" : ""}`}
                {...register("from_email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Ingresá un email válido",
                  },
                })}
              />
              {errors.from_email && (
                <span className="text-error text-xs mt-0.5">{errors.from_email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-label !normal-case !tracking-normal">
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Ej: +54 9 381 123-4567"
                className={`input-base ${errors.phone ? "input-error" : ""}`}
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                  minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
                  maxLength: { value: 20, message: "Máximo 20 caracteres" },
                  pattern: {
                    value: /^[0-9+\-\s()]+$/,
                    message: "Solo números, espacios y símbolos + - ()",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-error text-xs mt-0.5">{errors.phone.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-label !normal-case !tracking-normal">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="¿En qué vehículo estás interesado?"
                className={`textarea-base ${errors.message ? "input-error" : ""}`}
                {...register("message", {
                  required: "El mensaje es obligatorio",
                  minLength: { value: 10, message: "Debe tener al menos 10 caracteres" },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              {errors.message && (
                <span className="text-error text-xs mt-0.5">{errors.message.message}</span>
              )}
            </div>

            {estado === "ok" && (
              <div className="alert-success" role="status">
                <span className="material-symbols-outlined text-[20px] shrink-0">check_circle</span>
                <span>Mensaje enviado correctamente. Te contactaremos pronto.</span>
              </div>
            )}
            {estado === "error" && (
              <div className="alert-error" role="alert">
                <span className="material-symbols-outlined text-[20px] shrink-0">error</span>
                <span>Ocurrió un error. Intentá de nuevo o contactanos por WhatsApp.</span>
              </div>
            )}

            <button type="submit" disabled={enviando} className="btn-primary w-full !mt-1">
              {enviando ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensaje
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </>
              )}
            </button>
          </form>

          <div className="card overflow-hidden min-h-[400px] lg:min-h-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.4802989513896!2d-65.2342316253447!3d-26.82467178952945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c5ddae62d37%3A0x6678f7eb778713dc!2sLazarte%20Automoviles!5e0!3m2!1ses!2sar!4v1780874070504!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Ubicación"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
