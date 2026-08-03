import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "claro";
  });

  useEffect(() => {
    const raiz = document.documentElement;
    if (tema === "oscuro") {
      raiz.classList.add("dark");
    } else {
      raiz.classList.remove("dark");
    }
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