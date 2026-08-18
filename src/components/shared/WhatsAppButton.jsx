import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const NUMERO_WHATSAPP = "5493814447015";
const MENSAJE_PREDETERMINADO = encodeURIComponent(
  "¡Hola! Vi el catálogo de Automotores Tucumán y quiero hacer una consulta.",
);

const WhatsAppButton = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const boton = (
    <a
      href={`https://wa.me/${NUMERO_WHATSAPP}?text=${MENSAJE_PREDETERMINADO}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      title="Chatear por WhatsApp"
      className={`fixed bottom-24 right-5 md:bottom-6 md:right-6 z-[999] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full bg-white flex items-center justify-center shadow-float transition-all duration-300 hover:scale-110 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
      <svg
        viewBox="0 0 32 32"
        className="relative w-[60%] h-[60%]"
        fill="#25D366"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.362.687 4.564 1.872 6.417L4 29l7.77-1.84A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.7c-1.98 0-3.86-.55-5.47-1.5l-.39-.23-4.61 1.09 1.11-4.49-.25-.4A9.63 9.63 0 0 1 6.3 15c0-5.35 4.35-9.7 9.7-9.7s9.7 4.35 9.7 9.7-4.35 9.7-9.7 9.7zm5.34-7.27c-.29-.15-1.73-.85-2-.95-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.43-.86-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.51h-.56c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.44s1.05 2.83 1.2 3.02c.15.19 2.06 3.15 5 4.42.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.73-.71 1.98-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34z" />
      </svg>
    </a>
  );

  return createPortal(boton, document.body);
};

export default WhatsAppButton;
