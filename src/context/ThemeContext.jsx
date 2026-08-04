import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "claro";
  });

  useEffect(() => {
    // Eliminamos la inyección de clase en document.documentElement
    // para evitar que el modo oscuro se filtre a las vistas públicas.
    localStorage.setItem("tema", tema);
  }, [tema]);

  const cambiarTema = (nuevoTema) => setTema(nuevoTema);

  return (
    <ThemeContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
