"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useContextoApp } from "../contexto-app";
import mensaje from "../components/shared/message-ok";
export default function LoginPage() {
  const { dict, actualizarUsuario } = useContextoApp();
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
      const res = await verifyLogin(formData.email, formData.password);

      if (res.ok) {
        const nombreCompleto = (
          res.data.nombre.toUpperCase() +
          " " +
          res.data.apellido.toUpperCase() +
          ""
        ).trim();
        const datauser = {
          logueado: true,
          id: res.data.id,
          nombre: nombreCompleto,
          correo: res.data.correo,
          password: null,
          telefono: res.data.telefono,
          idioma: res.data.idioma,
          suscripciones: res.data.suscripciones,
          isadmin: false,
        };
        actualizarUsuario(datauser);
        router.push("/");
      } else {
        throw new Error("Credenciales incorrectas!");
      }
    } catch (error) {
      mensaje("bad", "Credenciales incorrectas");
      console.error("Error submitting form:", error);
      actualizarUsuario(null);
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

async function verifyLogin(usuario, password) {
  const login = {
    usuario: usuario,
    password: password,
  };
  const loginString = JSON.stringify(login);
  // console.log("cliente ", loginString);
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Establecer el tipo de contenido
    },
    body: loginString,
  });

  return response.json();
}
