import "./globals.css";
import { Inter } from "next/font/google";
import HeaderSite from "./components/shared/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EasyFlex",
  description: "Easyflex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderSite />
        {children}
      </body>
    </html>
  );
}
