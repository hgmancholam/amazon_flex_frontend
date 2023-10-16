"use client";
import Link from "next/link";
import Image from "next/image";
import FlexLogo from "./assets/images/flex.svg";
import { useContextoApp } from "./contexto-app";

export default function Home() {
  const { dict } = useContextoApp();

  return (
    <main className="flex flex-col  min-h-screen max-h-screen items-center justify-start p-3  md:p-20">
      <p className="self-center text-center text-bold text-xl md:text-xl lg:text-2xl pb-10">
        {dict.login.welcome}
      </p>

      <Link
        href="/amazon-flex"
        className="group rounded-lg border border-gray-300 bg-gray-100 px-5 py-5 transition-colors hover:border-gray-500 hover:bg-gray-200 flex flex-col items-center text-center"
      >
        <Image
          className="mx-auto my-auto"
          src={FlexLogo}
          width={100}
          height={100}
          alt="flex"
        />
        <span
          className={`self-center text-center mb-3 text-[20px] md:text-[calc(2.2vw)] lg:text-[calc(2.1vw)] font-semibold`}
        >
          Amazon Flex
        </span>
      </Link>
    </main>
  );
}
