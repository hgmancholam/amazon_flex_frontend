"use client";
import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import { useContextoApp } from "../contexto-app";
import mensaje from "../components/shared/message-ok";
import { useRouter } from "next/navigation";
export default function SettingsAmazonFlex(props) {
  const { dict, toggleSidebarOpen, setAfActiveTab } = useContextoApp();
  const [formData, setFormData] = useState({
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
  const router = useRouter();
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
        mensaje("ok", dict.afsettings.savedok);
        router.push("/");
      } else {
        console.error("Failed to submit form");
        mensaje("bad", dict.afsettings.savedbad);
      }
    } catch (error) {
      mensaje("bad", dict.afsettings.savedbad);
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
          <h1>{dict.afsettings.texttouser}</h1>
          <div className="mb-2 block">
            <Label
              htmlFor="email1"
              value={dict.afsettings.mail}
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
              value={dict.afsettings.password}
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
              value={dict.afsettings.costminbyblock}
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
              value={dict.afsettings.costminbyhour}
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
              value={dict.afsettings.arrivalbuffer}
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
            {dict.afsettings.desiredwarehouses}{" "}
          </Button>
        </div>
        <div>
          <div className="mb-2 block">
            <Label value={dict.afsettings.desiredweekdays} />
          </div>
          <table>
            <tr>
              <th>{dict.afsettings.dia}</th>
              <th>{dict.afsettings.inicio}</th>
              <th>{dict.afsettings.fin}</th>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swMon}
                  label={dict.afsettings.lunes}
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
                  label={dict.afsettings.martes}
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
                  label={dict.afsettings.miercoles}
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
                  label={dict.afsettings.jueves}
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
                  label={dict.afsettings.viernes}
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
                  label={dict.afsettings.sabado}
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
                  label={dict.afsettings.domingo}
                  onChange={setSwSun}
                />
              </td>
              <td>
                <TextInput
                  id="sunstarttime"
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
        <Button type="submit">{dict.afsettings.save}</Button>
      </form>
    </main>
  );
}

async function simulaAutenticacion(props) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const respuesta = {
        data: {
          nombre: "Pancho Villa",
          email: "h@g.com",
          idioma: "Español",
        },
        ok: true,
      };
      resolve(respuesta);
    }, 5);
  });
}
