"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import { useContextoApp } from "../contexto-app";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { dict, logueado, setLogueado, setAfActiveTab } = useContextoApp();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    remember: "",
    // Agrega más campos según tus necesidades
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await verifyLogin(formData.email, formData.password);
      if (response.ok) {
        0;
        console.log("Form submitted successfully!");
        setLogueado(true);
        sessionStorage.setItem("logueado", "true");
        router.push("/");
      } else {
        console.error("Failed to submit form");
        sessionStorage.setItem("logueado", "false");
        setLogueado(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      sessionStorage.setItem("logueado", "false");
      setLogueado(false);
    }
  };

  return (
    <main className="flex flex-col  min-h-screen max-h-screen items-center justify-between p-10  md:p-20">
      <form
        className="flex w-full max-w-md flex-col gap-4 self-center"
        onSubmit={handleSubmit}
      >
        <div>
          <h1>{dict.login.welcomelogin}</h1>
          <div className="mb-2 block">
            <Label
              htmlFor="email"
              value={dict.login.youremail}
            />
          </div>
          <TextInput
            id="email"
            name="email"
            placeholder="name@domain.com"
            required
            type="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password"
              value={dict.login.password}
            />
          </div>
          <TextInput
            id="password"
            name="password"
            required
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            name="remember"
            onChange={handleChange}
          />
          <Label htmlFor="remember">{dict.login.rememberme}</Label>
        </div>
        <Button type="submit">{dict.login.login}</Button>
      </form>
    </main>
  );
}

async function simulaAutenticacion(props) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const respuesta = {
        data: {
          nombre: "Giovanny Manchola",
          email: "h@g.com",
          idioma: "Español",
        },
        ok: true,
      };
      resolve(respuesta);
    }, 5);
  });
}
async function verifyLogin(usuario, password) {
  const login = {
    usuario: usuario,
    password: password,
  };
  const loginString = JSON.stringify(login);
  console.log("cliente ", loginString);
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Establecer el tipo de contenido
    },
    body: loginString,
  });

  return response.json();
}
