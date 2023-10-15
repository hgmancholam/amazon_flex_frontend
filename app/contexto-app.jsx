import React, { createContext, useContext, useState } from "react";
import { getDictionary } from "../app/dictionaries/dictionaries";
// Crea el contexto
const ContextoApp = createContext();
export const ContextoAppProvider = ({ children }) => {
  const [locale, setLocale] = useState("es");
  const [dict, setDict] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logueado, setLogueado] = useState(true);
  const getLocale = () => {
    const l = localStorage.getItem("locale");
    if (!l) {
      localStorage.setItem("locale", "es");
      setLocale("es");
    }
    const x = localStorage.getItem("locale");
    return x;
  };

  const actualizarLocale = (x) => {
    localStorage.setItem("locale", x);
    setLocale(x);
    defineIdioma(x);
  };

  const defineIdioma = (x = "es") => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(x);
      setDict(dictionary);
    };

    fetchDictionary();
  };
  if (!dict) {
    const x = localStorage.getItem("locale");
    if (!x) {
      setLocale("es");
      actualizarLocale("es");
    }
    defineIdioma(x);
  }

  const toggleSidebarOpen = () => {
    console.log("llega");
    setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    console.log("termina");
  };

  return (
    <ContextoApp.Provider
      value={{
        getLocale,
        actualizarLocale,
        locale,
        dict,
        sidebarOpen,
        toggleSidebarOpen,
        logueado,
        setLogueado,
      }}
    >
      {dict && children}
    </ContextoApp.Provider>
  );
};
export const useContextoApp = () => useContext(ContextoApp);
