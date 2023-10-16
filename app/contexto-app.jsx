import React, { createContext, useContext, useState } from "react";
import { getDictionary } from "../app/dictionaries/dictionaries";
// Crea el contexto
const ContextoApp = createContext();
export const ContextoAppProvider = ({ children }) => {
  const [locale, setLocale] = useState("es");
  const [dict, setDict] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [logueado, setLogueado] = useState(true);
  const [afActiveTab, setAfActiveTab] = useState(0);
  const getLocale = () => {
    if (!locale) {
      setLocale("es");
      return "es";
    } else {
      return locale;
    }
  };

  const actualizarLocale = (x) => {
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
    const x = locale;
    if (!x) {
      setLocale("es");
      actualizarLocale("es");
    }
    defineIdioma(x);
  }

  const toggleSidebarOpen = (x = -1) => {
    if (x < 0) {
      setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    } else {
      setSidebarOpen(x > 0 ? true : false);
    }
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
        afActiveTab,
        setAfActiveTab,
      }}
    >
      {dict && children}
    </ContextoApp.Provider>
  );
};
export const useContextoApp = () => useContext(ContextoApp);
