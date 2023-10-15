"use client";
import HeaderSite from "./components/shared/header";
import SidebarSite from "./components/shared/sidebar";
import { ContextoAppProvider } from "./contexto-app";

export default function MainLayout({ children }) {
  return (
    <ContextoAppProvider>
      <HeaderSite />
      <SidebarSite />
      {children}
    </ContextoAppProvider>
  );
}
