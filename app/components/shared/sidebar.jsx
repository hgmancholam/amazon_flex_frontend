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
import Easyflex from "../../assets/images/easyflex.svg";
import { useContextoApp } from "../../contexto-app";
export default function SidebarSite() {
  const { sidebarOpen, dict, logueado, setLogueado } = useContextoApp();
  const router = useRouter();
  const salir = () => {
    setLogueado(false);
    router.push("/login");
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
                <p>Invitaciones</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiInbox}
              >
                <p>Pagos</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={BiBuoy}
              >
                <p>Contactenos</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="#"
                icon={HiViewBoards}
              >
                <p>Documentation</p>
              </Sidebar.Item>
              <Sidebar.Item
                href="#"
                icon={HiArrowSmRight}
                onClick={() => salir()}
              >
                <p>Salir</p>
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </div>
  );
}
