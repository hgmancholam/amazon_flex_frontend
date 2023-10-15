import "./globals.css";
import { Inter } from "next/font/google";
import MainLayout from "./main-component";

export const metadata = {
  title: "EasyFlex",
  description: "Easyflex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
