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
    setLocale,
    dict,
    sidebarOpen,
    toggleSidebarOpen,
    logueado,
    setLogueado,
  } = useContextoApp();
  const router = useRouter();

  useEffect(() => {
    try {
      const l = localStorage.getItem("locale");
      if (!l) {
        localStorage.setItem("locale", "es");
        setLocale("es");
      }
      const x = localStorage.getItem("locale");
    } catch (error) {
      setLocale("es");
    }

    try {
      localStorage.setItem("theme", "light");
    } catch (error) {
      console.error(error);
    }
  }, []); // Asegúrate de ejecutar el efecto cuando el locale cambie

  const handleSidebarClick = () => {
    toggleSidebarOpen();
  };

  const handleClickIdioma = (x) => {
    try {
      localStorage.setItem("locale", x);
    } catch (error) {
      console.error(error);
    }
    actualizarLocale(x);
  };
  const salir = () => {
    setLogueado(false);
    router.push("/login");
  };

  useEffect(() => {
    // Verificar si no estás autenticado y no estás ya en la página de inicio de sesión
    if (!logueado && router.pathname !== "/login") {
      router.push("/login");
    } else if (logueado && router.pathname === "/login") {
      router.push("/");
    }
  }, [logueado]);

  return (
    <Navbar
      fluid
      rounded
      className="bg-gradient-to-t from-gray-200  to-white"
    >
      {logueado && (
        <div className="flex justify-end p-0">
          <button
            className="inline-flex items-center rounded-lg p-1 text-2xl text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 "
            onClick={() => handleSidebarClick()}
          >
            {sidebarOpen ? <BsGrid3X3GapFill /> : <BsList />}
          </button>
        </div>
      )}

      <Navbar.Brand href="#">
        <Image
          className="mr-3 h-10 md:h-9"
          src={Easyflex}
          alt="Logo"
          width={200}
        />
      </Navbar.Brand>
      {logueado && (
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
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => handleClickIdioma("en")}>
              English
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleClickIdioma("es")}>
              Español
            </Dropdown.Item>
            <Dropdown.Item onClick={() => salir()}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      )}
      <Navbar.Collapse>
        {logueado && (
          <>
            <Navbar.Link
              href="#"
              active
            >
              {dict.header.home}
            </Navbar.Link>
            <Navbar.Link href="#">{dict.header.about}</Navbar.Link>
            <Navbar.Link href="#">{dict.header.services}</Navbar.Link>
            <Navbar.Link href="#">{dict.header.pricing}</Navbar.Link>
            <Navbar.Link href="#">{dict.header.contact}</Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
