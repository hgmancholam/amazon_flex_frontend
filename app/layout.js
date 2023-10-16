import "./globals.css";
import { Inter } from "next/font/google";
import MainLayout from "./main-component";

export const metadata = {
  title: "BpdFlex",
  description: "BpdFlex",
  applicationName: "BpdFlex",
  viewport:
    "width=device-width, initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,shrink-to-fit=1",
  keywords: [],
  openGraph: {
    type: "website",
    url: "https://bpdflex.com",
    title: "BpdFlex",
    description: "BpdFlex",
    siteName: "BpdFlex",
    images: [
      {
        url: "https://bpdflex.com/logo_square.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-0 m-0 !max-w-[100%] !overflow-x-hidden">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
