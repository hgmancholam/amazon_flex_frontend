import React, { createContext, useContext, useState } from "react";
import { getDictionary } from "../app/dictionaries/dictionaries";
import dictEs from "./dictionaries/es.json";
// import { useAppSelector } from "./redux/store";

// import {
//   login,
//   logout,
//   updateDictionary,
//   initFromSession,
// } from "./redux/features/auth-slice";
// import { useDispatch } from "react-redux";
// Crea el contexto

const userInitialState = {
  logueado: false,
  id: null,
  nombre: null,
  correo: null,
  password: null,
  telefono: null,
  idioma: "es",
  isadmin: false,
};

const ContextoApp = createContext();

export const ContextoAppProvider = ({ children }) => {
  // const dispatch = useDispatch();
  const [dict, setDict] = useState(dictEs);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [afActiveTab, setAfActiveTab] = useState(0);
  const [usuario, setUsuario] = useState(userInitialState);
  const [desiredWarehouses, setDesiredWarehouses] = useState([]);
  const [flexSettings, setFlexSettings] = useState(null);

  const defineIdioma = async (x = "es") => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(x);
      setDict(dictionary);
      // dispatch(updateDictionary(dictionary));
    };

    if (dict !== null && dict.locale == x) {
      return;
    }

    var prevDict = null;
    if (typeof window !== "undefined" && window.sessionStorage) {
      try {
        prevDict = JSON.parse(sessionStorage.getItem("locale"));
      } catch (error) {
        prevDict = null;
      }
    }
    if (prevDict !== null && prevDict.locale == x) {
      setDict(prevDict);
      // dispatch(updateDictionary(prevDict));
    } else {
      await fetchDictionary();
    }
  };

  const getLocale = () => {
    if (!usuario || !usuario.idioma) {
      return "es";
    } else {
      return usuario.idioma;
    }
  };

  const actualizarUsuario = (x) => {
    // console.log(x);
    if (x !== null) {
      setUsuario(x);
      if (x.suscripciones && x.suscripciones.length > 0) {
        const suscripcion = x.suscripciones.find((x) => (x.robot = "flex"));
        if (
          suscripcion &&
          suscripcion.settings &&
          suscripcion.settings.desiredwarehouses
        ) {
          setFlexSettings(suscripcion.settings);
          setDesiredWarehouses(suscripcion.settings.desiredwarehouses);
        }
      }
    } else {
      setUsuario(userInitialState);
    }
  };

  const actualizarLocale = (x) => {
    defineIdioma(x);
    if (usuario && usuario.idioma && usuario.id) {
      if (x !== usuario.idioma) {
        usuario.idioma = x;
        actualizaPreferenciaIdioma(usuario.id, x);
      }
    }
  };

  const toggleSidebarOpen = (x = -1) => {
    if (x < 0) {
      setSidebarOpen((prevSidebarOpen) => !prevSidebarOpen);
    } else {
      setSidebarOpen(x > 0 ? true : false);
    }
  };

  async function actualizaPreferenciaIdioma(idusuario, idioma) {
    const param = {
      idusuario: idusuario,
      idioma: idioma,
    };
    const paramString = JSON.stringify(param);

    await fetch("/api/setlanguage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Establecer el tipo de contenido
      },
      body: paramString,
    });
  }
  const flexActivo = () => {
    try {
      if (!usuario || !usuario.logueado) {
        return false;
      } else if (usuario.suscripciones && usuario.suscripciones.length > 0) {
        const suscripcionFlex = usuario.suscripciones.find(
          (s) => s.robot == "flex"
        );
        if (suscripcionFlex) {
          return suscripcionFlex.activo || false;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <ContextoApp.Provider
      value={{
        getLocale,
        actualizarLocale,
        dict,
        sidebarOpen,
        toggleSidebarOpen,
        afActiveTab,
        setAfActiveTab,
        usuario,
        actualizarUsuario,
        flexActivo,
        setDesiredWarehouses,
        desiredWarehouses,
        flexSettings,
        setFlexSettings,
      }}
    >
      {dict && children}
    </ContextoApp.Provider>
  );
};
export const useContextoApp = () => useContext(ContextoApp);
