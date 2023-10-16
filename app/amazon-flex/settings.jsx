"use client";

import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Radio,
  RangeSlider,
  Select,
  Textarea,
  TextInput,
  ToggleSwitch,
} from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import { useContextoApp } from "../contexto-app";
import mensaje from "../components/shared/message-ok";
export default function SettingsAmazonFlex(props) {
  const {
    dict,
    logueado,
    setLogueado,
    toggleSidebarOpen,
    setAfActiveTab,
    afActiveTab,
  } = useContextoApp();
  const [formdata, setformdata] = useState({
    username: "",
    password: "",
    minblockrate: 50,
    minpayrateperhour: 2,
    arrivalbuffer: 5,
    desiredwarehouses: [],
    desiredstarttime: "00:00",
    desiredendtime: "23:59",
    desiredweekdays: [],
    retrylimit: 30,
    refreshinterval: 10,
    twilioacctsid: "",
    twilioauthtoken: "",
    twiliofromnumber: "",
    twiliotonumber: "",
    refreshtoken: "",
    accesstoken: "",
  });

  const [swMon, setSwMon] = useState(true);
  const [swTue, setSwTue] = useState(true);
  const [swWed, setSwWed] = useState(true);
  const [swThu, setSwThu] = useState(true);
  const [swFri, setSwFri] = useState(true);
  const [swSat, setSwSat] = useState(true);
  const [swSun, setSwSun] = useState(true);

  useEffect(() => {
    toggleSidebarOpen(0);
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await simulaAutenticacion();

      if (response.ok) {
        console.log("Form submitted successfully!");
        mensaje("ok", "Configuracion guardada correctamente");

        router.push("/");
      } else {
        console.error("Failed to submit form");
        mensaje("bad", "Intente nuevamente");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleUbicaciones = () => {
    setAfActiveTab(1);
  };
  return (
    <main className="flex flex-col min-h-screen max-h-screen items-center justify-between p-5  md:p-20">
      <form
        className="flex w-full max-w-md flex-col gap-4 self-center"
        onSubmit={handleSubmit}
      >
        <div>
          <h1>Modifique su configuracion de Amazon Flex</h1>
          <div className="mb-2 block">
            <Label
              htmlFor="email1"
              value="Correo"
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
              value="Contraseña"
            />
          </div>
          <TextInput
            id="password1"
            required
            type="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="minblockrate"
              value="Costo minimo por bloque"
            />
          </div>
          <TextInput
            id="minblockrate"
            required
            type="number"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="minpayrateperhour"
              value="Costo minimo por Hora"
            />
          </div>
          <TextInput
            id="minpayrateperhour"
            required
            type="number"
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="arrivalbuffer"
              value="Tiempo de antelación"
            />
          </div>
          <TextInput
            id="arrivalbuffer"
            required
            type="number"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button
            type="button"
            onClick={() => handleUbicaciones()}
          >
            Seleccionar ubicaciones
          </Button>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Dias laborales" />
          </div>
          <table>
            <tr>
              <th>Dia</th>
              <th>Inicio</th>
              <th>Fin</th>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swMon}
                  label="Lunes"
                  onChange={setSwMon}
                />
              </td>
              <td>
                <TextInput
                  id="monstarttime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swMon}
                />
              </td>
              <td>
                <TextInput
                  id="monendtime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swMon}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swTue}
                  label="Martes"
                  onChange={setSwTue}
                />
              </td>
              <td>
                <TextInput
                  id="tuestarttime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swTue}
                />
              </td>
              <td>
                <TextInput
                  id="tueendtime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swTue}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swWed}
                  label="Miercoles"
                  onChange={setSwWed}
                />
              </td>
              <td>
                <TextInput
                  id="wedstarttime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swWed}
                />
              </td>
              <td>
                <TextInput
                  id="wedendtime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swWed}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swThu}
                  label="Jueves"
                  onChange={setSwThu}
                />
              </td>
              <td>
                <TextInput
                  id="thustarttime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swThu}
                />
              </td>
              <td>
                <TextInput
                  id="thuendtime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swThu}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swFri}
                  label="Viernes"
                  onChange={setSwFri}
                />
              </td>
              <td>
                <TextInput
                  id="fristarttime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swFri}
                />
              </td>
              <td>
                <TextInput
                  id="friendtime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swFri}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swSat}
                  label="Sabado"
                  onChange={setSwSat}
                />
              </td>
              <td>
                <TextInput
                  id="satstarttime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swSat}
                />
              </td>
              <td>
                <TextInput
                  id="satendtime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swSat}
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swSun}
                  label="Domingo"
                  onChange={setSwSun}
                />
              </td>
              <td>
                <TextInput
                  id="monstarttime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swSun}
                />
              </td>
              <td>
                <TextInput
                  id="monendtime"
                  required
                  type="time"
                  onChange={handleChange}
                  disabled={!swSun}
                />
              </td>
            </tr>
          </table>{" "}
        </div>
        <Button type="submit">Guardar</Button>
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
