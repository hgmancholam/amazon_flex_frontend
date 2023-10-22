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
  const {
    sidebarOpen,
    dict,
    actualizarLocale,
    flexActivo,
    usuario,
    actualizarUsuario,
  } = useContextoApp();
  const router = useRouter();
  const salir = () => {
    actualizarUsuario(null);
    router.push("/login");
  };

  const handleClickIdioma = (x) => {
    actualizarLocale(x);
  };

  return (
    <div>
      {usuario.logueado && (
        <Sidebar
          className={`fixed z-50 w-full md:w-[230px]  sidebar ${
            sidebarOpen ? "open" : "closed"
          }`}
          aria-label="Sidebar with content separator example"
        >
          <Image
            className="hidden md:block cursor-pointer"
            src={Easyflex}
            alt=" logo"
            onClick={() => router.push("/")}
          />
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {flexActivo() && (
                <Sidebar.Item
                  onClick={() => router.push("/amazon-flex")}
                  className="cursor-pointer"
                  icon={HiChartPie}
                >
                  <p>Amazon Flex {flexActivo()}</p>
                </Sidebar.Item>
              )}{" "}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiViewBoards}
                onClick={() => router.push("/")}
                className="cursor-pointer"
              >
                <p>{dict.sidebar.invitaciones}</p>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiInbox}
                onClick={() => router.push("/")}
                className="cursor-pointer"
              >
                <p>{dict.sidebar.pagos}</p>
              </Sidebar.Item>
              <Sidebar.Item
                icon={BiBuoy}
                onClick={() => router.push("/")}
                className="cursor-pointer"
              >
                <p>{dict.sidebar.contactenos}</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                icon={HiViewBoards}
                onClick={() => router.push("/")}
                className="cursor-pointer"
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
                className="cursor-pointer"
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
