"use client";
import { useRouter } from "next/navigation";
import { Sidebar } from "flowbite-react";
import Image from "next/image";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiViewBoards,
} from "react-icons/hi";
import { BiBuoy } from "react-icons/bi";
import { FaLanguage } from "react-icons/fa";

import Easyflex from "../../assets/images/easyflex.svg";
import { useContextoApp } from "../../contexto-app";
export default function SidebarSite() {
  const { sidebarOpen, dict, logueado, setLogueado, actualizarLocale } =
    useContextoApp();
  const router = useRouter();
  const salir = () => {
    setLogueado(false);
    sessionStorage.removeItem("logueado");
    router.push("/login");
  };

  const handleClickIdioma = (x) => {
    try {
      localStorage.setItem("locale", x);
    } catch (error) {
      console.error(error);
    }
    actualizarLocale(x);
  };

  return (
    <div>
      {logueado && (
        <Sidebar
          className={`fixed z-50 w-full md:w-[230px]  sidebar ${
            sidebarOpen ? "open" : "closed"
          }`}
          aria-label="Sidebar with content separator example"
        >
          <Image
            className="hidden md:block"
            href="#"
            src={Easyflex}
            alt=" logo"
          />

          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/amazon-flex"
                icon={HiChartPie}
              >
                <p>Amazon Flex</p>
              </Sidebar.Item>{" "}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
              >
                <p>{dict.sidebar.invitaciones}</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiInbox}
              >
                <p>{dict.sidebar.pagos}</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={BiBuoy}
              >
                <p>{dict.sidebar.contactenos}</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
              >
                <p>{dict.sidebar.documentacion}</p>
              </Sidebar.Item>
              <Sidebar.Item
                className="cursor-pointer"
                onClick={() => handleClickIdioma("en")}
                icon={FaLanguage}
              >
                <p>English</p>
              </Sidebar.Item>
              <Sidebar.Item
                className="cursor-pointer"
                onClick={() => handleClickIdioma("es")}
                icon={FaLanguage}
              >
                <p>Español</p>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiArrowSmRight}
                onClick={() => salir()}
              >
                <p>{dict.sidebar.salir}</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </div>
  );
}
