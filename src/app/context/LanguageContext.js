"use client";

import { createContext, useState, useContext, useEffect } from "react";
import en from "../idiomas/en";
import es from "../idiomas/es";

// Creación del contexto y proveedor de idioma
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Establecer 'es' como idioma predeterminado si no hay valor en localStorage
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") || "es";
    }
    return "es"; // Valor por defecto para la renderización en el servidor
  });

  const translations = language === "en" ? en : es;

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang); // Guardar la preferencia solo en el cliente
    }
  };

  // Sincronizar el idioma inicial al cargar en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook para usar el contexto
export const useLanguage = () => useContext(LanguageContext);
