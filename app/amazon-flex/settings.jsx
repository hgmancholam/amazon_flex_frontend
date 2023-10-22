"use client";
import { Button, Label, TextInput, ToggleSwitch } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import { useContextoApp } from "../contexto-app";
import mensaje from "../components/shared/message-ok";
import { useRouter } from "next/navigation";
import SelectorModo from "./selector-modo";
import { Card } from "flowbite-react";
import {
  FcChargeBattery,
  FcCurrencyExchange,
  FcNeutralTrading,
} from "react-icons/fc";

const settingsInitialState = {
  botstate: "off",
  botmode: "neutral",
  username: "",
  password: "",
  minblockrate: 50,
  minpayrateperhour: 2,
  arrivalbuffer: 5,
  desiredwarehouses: [],
  desiredweekdays: {
    mon: { state: true, start: "00:00", end: "23:59" },
    tue: { state: true, start: "00:00", end: "23:59" },
    wed: { state: true, start: "00:00", end: "23:59" },
    thu: { state: true, start: "00:00", end: "23:59" },
    fri: { state: true, start: "00:00", end: "23:59" },
    sat: { state: true, start: "00:00", end: "23:59" },
    sun: { state: true, start: "00:00", end: "23:59" },
  },
};
export default function SettingsAmazonFlex() {
  const {
    dict,
    toggleSidebarOpen,
    setAfActiveTab,
    desiredWarehouses,
    usuario,
    flexSettings,
    setFlexSettings,
  } = useContextoApp();

  settingsInitialState.desiredwarehouses = desiredWarehouses;

  const [formData, setFormData] = useState(
    flexSettings || settingsInitialState
  );
  const router = useRouter();
  const [robotEncendido, setRobotEncendido] = useState(
    formData.botstate === "on" || false
  );
  const [modoBot, setModoBot] = useState(formData.botmode || "neutral");
  const [swMon, setSwMon] = useState(formData.desiredweekdays.mon.state);
  const [swTue, setSwTue] = useState(formData.desiredweekdays.tue.state);
  const [swWed, setSwWed] = useState(formData.desiredweekdays.wed.state);
  const [swThu, setSwThu] = useState(formData.desiredweekdays.thu.state);
  const [swFri, setSwFri] = useState(formData.desiredweekdays.fri.state);
  const [swSat, setSwSat] = useState(formData.desiredweekdays.sat.state);
  const [swSun, setSwSun] = useState(formData.desiredweekdays.sun.state);
  // console.log(formData);
  useEffect(() => {
    toggleSidebarOpen(0);
  }, []);

  useEffect(() => {
    setFormData({ ...formData, ["desiredwarehouses"]: desiredWarehouses });
  }, [desiredWarehouses]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (day, field, value) => {
    setFormData({
      ...formData,
      desiredweekdays: {
        ...formData.desiredweekdays,
        [day]: {
          ...formData.desiredweekdays[day],
          [field]: value,
        },
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = formData;
      setFlexSettings(dataToSend);
      const idusuario = usuario.id;
      const idsuscripcion = usuario.suscripciones.find(
        (x) => (x.robot = "flex")
      ).id;

      if (idusuario && idsuscripcion) {
        dataToSend.idusuario = idusuario;
        dataToSend.idsuscripcion = idsuscripcion;
        const response = await saveSettings(dataToSend);

        if (response) {
          // console.log("Form submitted successfully!");
          mensaje("ok", dict.afsettings.savedok);
          router.push("/");
        } else {
          console.error("Failed to submit form");
          mensaje("bad", dict.afsettings.savedbad);
        }
      } else {
        throw new Error("No hay usaurio o suscripcion");
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
    <main className="flex flex-col min-h-screen w-[100%] max-h-screen items-center justify-between p-[5px] md:p-[20px] md:pt-[5px] gap-4">
      <form
        className="flex w-full max-w-md flex-col gap-4 self-center"
        onSubmit={handleSubmit}
      >
        <Card className="flex flex-col gap-3 self-center w-[100%] max-w-[100%] m-[10px]">
          <p>{dict.afsettings.startstop}</p>
          <ToggleSwitch
            checked={robotEncendido}
            label={
              robotEncendido ? dict.afsettings.boton : dict.afsettings.botoff
            }
            onChange={(x) => {
              setRobotEncendido(x);
              setFormData({ ...formData, ["botstate"]: x ? "on" : "off" });
            }}
          />
        </Card>
        <Card className="flex flex-col gap-3 self-center w-[100%] max-w-[100%] m-[10px]">
          <p>
            {dict.afsettings.botmode +
              "  (" +
              dict.afsettings.actually +
              " " +
              modoBot +
              ")"}
          </p>
          <div className="flex flex-row justify-between">
            <SelectorModo
              imagen={FcCurrencyExchange}
              nombre={dict.afsettings.modoMoney}
              activo={modoBot === "money"}
              onClick={() => {
                setModoBot("money");
                setFormData({ ...formData, ["botmode"]: "money" });
              }}
            />
            <SelectorModo
              imagen={FcNeutralTrading}
              nombre={dict.afsettings.modoNeutral}
              activo={modoBot === "neutral"}
              onClick={() => {
                setModoBot("neutral");
                setFormData({ ...formData, ["botmode"]: "neutral" });
              }}
            />
            <SelectorModo
              imagen={FcChargeBattery}
              nombre={dict.afsettings.modoPasivo}
              activo={modoBot === "pasivo"}
              onClick={() => {
                setModoBot("pasivo");
                setFormData({ ...formData, ["botmode"]: "pasivo" });
              }}
            />
          </div>
        </Card>
        <div>
          <h1>{dict.afsettings.texttouser}</h1>
          <div className="mb-2 block">
            <Label
              htmlFor="username"
              value={dict.afsettings.mail}
            />
          </div>
          <TextInput
            id="username"
            name="username"
            placeholder="name@domain.com"
            required
            type="email"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password"
              value={dict.afsettings.password}
            />
          </div>
          <TextInput
            id="password"
            name="password"
            required
            type="password"
            value={formData.password}
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
            name="minblockrate"
            required
            type="number"
            value={formData.minblockrate}
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
            name="minpayrateperhour"
            required
            type="number"
            value={formData.minpayrateperhour}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="arrivalbuffer"
              value={dict.afsettings.arrivalbuffer + " (min)"}
            />
          </div>
          <TextInput
            id="arrivalbuffer"
            name="arrivalbuffer"
            value={formData.arrivalbuffer}
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
                  onChange={(e) => {
                    setSwMon(e);
                    handleTimeChange("mon", "state", e);
                  }}
                />
              </td>
              <td>
                <TextInput
                  id="monstarttime"
                  required
                  type="time"
                  disabled={!swMon}
                  value={formData.desiredweekdays.mon.start || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("mon", "start", e.target.value)
                  }
                />
              </td>
              <td>
                <TextInput
                  id="monendtime"
                  required
                  type="time"
                  disabled={!swMon}
                  value={formData.desiredweekdays.mon.end || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("mon", "end", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swTue}
                  label={dict.afsettings.martes}
                  onChange={(e) => {
                    setSwTue(e);
                    handleTimeChange("tue", "state", e);
                  }}
                />
              </td>
              <td>
                <TextInput
                  id="tuestarttime"
                  required
                  type="time"
                  disabled={!swTue}
                  value={formData.desiredweekdays.tue.start || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("tue", "start", e.target.value)
                  }
                />
              </td>
              <td>
                <TextInput
                  id="tueendtime"
                  required
                  type="time"
                  disabled={!swTue}
                  value={formData.desiredweekdays.tue.end || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("tue", "end", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swWed}
                  label={dict.afsettings.miercoles}
                  onChange={(e) => {
                    setSwWed(e);
                    handleTimeChange("wed", "state", e);
                  }}
                />
              </td>
              <td>
                <TextInput
                  id="wedstarttime"
                  required
                  type="time"
                  disabled={!swWed}
                  value={formData.desiredweekdays.wed.start || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("wed", "start", e.target.value)
                  }
                />
              </td>
              <td>
                <TextInput
                  id="wedendtime"
                  required
                  type="time"
                  disabled={!swWed}
                  value={formData.desiredweekdays.wed.end || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("wed", "end", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swThu}
                  label={dict.afsettings.jueves}
                  onChange={(e) => {
                    setSwThu(e);
                    handleTimeChange("thu", "state", e);
                  }}
                />
              </td>
              <td>
                <TextInput
                  id="thustarttime"
                  required
                  type="time"
                  disabled={!swThu}
                  value={formData.desiredweekdays.thu.start || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("thu", "start", e.target.value)
                  }
                />
              </td>
              <td>
                <TextInput
                  id="thuendtime"
                  required
                  type="time"
                  disabled={!swThu}
                  value={formData.desiredweekdays.thu.end || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("thu", "end", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swFri}
                  label={dict.afsettings.viernes}
                  onChange={(e) => {
                    setSwFri(e);
                    handleTimeChange("fri", "state", e);
                  }}
                />
              </td>
              <td>
                <TextInput
                  id="fristarttime"
                  required
                  type="time"
                  disabled={!swFri}
                  value={formData.desiredweekdays.fri.start || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("fri", "start", e.target.value)
                  }
                />
              </td>
              <td>
                <TextInput
                  id="friendtime"
                  required
                  type="time"
                  disabled={!swFri}
                  value={formData.desiredweekdays.fri.end || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("fri", "end", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swSat}
                  label={dict.afsettings.sabado}
                  onChange={(e) => {
                    setSwSat(e);
                    handleTimeChange("sat", "state", e);
                  }}
                />
              </td>
              <td>
                <TextInput
                  id="satstarttime"
                  required
                  type="time"
                  disabled={!swSat}
                  value={formData.desiredweekdays.sat.start || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("sat", "start", e.target.value)
                  }
                />
              </td>
              <td>
                <TextInput
                  id="satendtime"
                  required
                  type="time"
                  disabled={!swSat}
                  value={formData.desiredweekdays.sat.end || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("sat", "end", e.target.value)
                  }
                />
              </td>
            </tr>
            <tr>
              <td>
                <ToggleSwitch
                  checked={swSun}
                  label={dict.afsettings.domingo}
                  onChange={(e) => {
                    setSwSun(e);
                    handleTimeChange("sun", "state", e);
                  }}
                />
              </td>
              <td>
                <TextInput
                  id="sunstarttime"
                  required
                  type="time"
                  disabled={!swSun}
                  value={formData.desiredweekdays.sun.start || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("sun", "start", e.target.value)
                  }
                />
              </td>
              <td>
                <TextInput
                  id="sunendtime"
                  required
                  type="time"
                  disabled={!swSun}
                  value={formData.desiredweekdays.sun.end || "00:00"}
                  onChange={(e) =>
                    handleTimeChange("sun", "end", e.target.value)
                  }
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

async function saveSettings(settings) {
  const paramString = JSON.stringify(settings);
  // console.log(settings);
  try {
    const res = await fetch("/api/save-settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Establecer el tipo de contenido
      },
      body: paramString,
    });
    if (!res) {
      throw new Error("No hubo respuesta");
    } else {
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.error("Error al guardar datos:", err);
    return false;
  }
}
