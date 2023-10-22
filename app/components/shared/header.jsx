"use client";

import { useRouter } from "next/navigation";
import { Dropdown, Navbar, Avatar } from "flowbite-react";
import React from "react";
import Image from "next/image";
import { useEffect } from "react";
import Easyflex from "../../assets/images/easyflex.svg";
import { useContextoApp } from "../../contexto-app";
import { BsGrid3X3GapFill, BsList } from "react-icons/bs";

export default function HeaderSite() {
  const {
    actualizarLocale,
    dict,
    sidebarOpen,
    toggleSidebarOpen,
    usuario,
    actualizarUsuario,
  } = useContextoApp();
  const router = useRouter();

  useEffect(() => {
    try {
      localStorage.setItem("theme", "light");
    } catch (error) {}
  }, []); // Asegúrate de ejecutar el efecto cuando el locale cambie

  const handleSidebarClick = () => {
    toggleSidebarOpen();
  };

  const handleClickIdioma = (x) => {
    actualizarLocale(x);
  };

  const salir = () => {
    actualizarUsuario(null);
    router.push("/login");
  };

  useEffect(() => {
    let logX = false;
    logX = usuario.logueado || false;
    // Verificar si no estás autenticado y no estás ya en la página de inicio de sesión
    if ((!logX && router.pathname !== "/login") || !usuario.id) {
      router.push("/login");
    } else if (logX && router.pathname === "/login") {
      router.push("/");
    }
  }, [usuario]);

  return (
    <Navbar
      fluid
      rounded
      className="bg-gradient-to-t from-gray-200  to-white"
    >
      {usuario.logueado && (
        <div className="flex justify-end p-0">
          <button
            className="inline-flex items-center rounded-lg p-1 text-2xl text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 "
            onClick={() => handleSidebarClick()}
          >
            {sidebarOpen ? <BsGrid3X3GapFill /> : <BsList />}
          </button>
        </div>
      )}

      <Navbar.Brand
        onClick={() => router.push("/")}
        className="cursor-pointer"
      >
        <Image
          className="mr-3 h-10 md:h-9"
          src={Easyflex}
          alt="Logo"
          width={200}
        />
      </Navbar.Brand>
      {usuario.logueado && (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">
                {usuario ? usuario.nombre : "Xxxxx"}
              </span>
              <span className="block truncate text-sm font-medium">
                {usuario ? usuario.correo : "xxx@wwww.ww"}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => handleClickIdioma("en")}>
              English
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClickIdioma("es")}>
              Español
            </Dropdown.Item>
            <Dropdown.Item onClick={() => salir()}>
              {dict.sidebar.salir}
            </Dropdown.Item>
          </Dropdown>
        </div>
      )}
      <Navbar.Collapse>
        {usuario.logueado && (
          <>
            <Navbar.Link
              onClick={() => router.push("/")}
              className="cursor-pointer"
              active
            >
              {dict.header.home}
            </Navbar.Link>
            <Navbar.Link
              onClick={() => router.push("/")}
              className="cursor-pointer"
            >
              {dict.header.about}
            </Navbar.Link>
            <Navbar.Link
              onClick={() => router.push("/")}
              className="cursor-pointer"
            >
              {dict.header.services}
            </Navbar.Link>
            <Navbar.Link
              onClick={() => router.push("/")}
              className="cursor-pointer"
            >
              {dict.header.pricing}
            </Navbar.Link>
            <Navbar.Link
              onClick={() => router.push("/")}
              className="cursor-pointer"
            >
              {dict.header.contact}
            </Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
