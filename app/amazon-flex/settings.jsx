"use client";

import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import { useContextoApp } from "../contexto-app";
import { useRouter } from "next/navigation";
export default function SettingsAmazonFlex(props) {
  const { dict, logueado, setLogueado, toggleSidebarOpen } = useContextoApp();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
    // Agrega más campos según tus necesidades
  });
  const router = useRouter();
  useEffect(() => {
    toggleSidebarOpen(0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await simulaAutenticacion();

      if (response.ok) {
        console.log("Form submitted successfully!");
        setLogueado(true);
        router.push("/");
      } else {
        console.error("Failed to submit form");
        setLogueado(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLogueado(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen max-h-screen items-center justify-between p-5  md:p-20">
      <form
        className="flex w-full max-w-md flex-col gap-4 self-center"
        onSubmit={handleSubmit}
      >
        <div>
          <h1>Modifique su configuracion de Amazon Flez</h1>
          <div className="mb-2 block">
            <Label
              htmlFor="email1"
              value={dict.login.youremail}
            />
          </div>
          <TextInput
            id="email1"
            placeholder="name@domain.com"
            required
            type="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password1"
              value={dict.login.password}
            />
          </div>
          <TextInput
            id="password1"
            required
            type="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
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
