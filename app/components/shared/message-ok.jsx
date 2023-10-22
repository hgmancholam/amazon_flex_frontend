import React from "react";
import { Toast } from "flowbite-react";
import { HiCheck, HiX, HiInformationCircle } from "react-icons/hi";
import { createRoot } from "react-dom/client";

function ToastMessage({ mensaje, exito }) {
  return (
    <div className={"fixed t-0 l-0 flex flex-col z-50 "}>
      {exito === "ok" && (
        <Toast className="bg-green-200 ">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-bold">{mensaje}</div>
        </Toast>
      )}
      {exito === "bad" && (
        <Toast className="bg-red-200">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-bold">{mensaje}</div>
        </Toast>
      )}{" "}
      {exito !== "bad" && exito !== "ok" && (
        <Toast className="bg-blue-200 ">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
            <HiInformationCircle className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-bold">{mensaje}</div>
        </Toast>
      )}
    </div>
  );
}

export default function mensaje(
  feedback = "info",
  mensaje = "Operacion exitosa"
) {
  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container";
  document.body.appendChild(toastContainer);

  const removeToastContainer = () => {
    document.body.removeChild(toastContainer);
  };

  const root = createRoot(toastContainer);

  root.render(
    <ToastMessage
      mensaje={mensaje}
      exito={feedback}
    />
  );

  // Limpiar el contenedor después de un tiempo
  setTimeout(() => {
    root.unmount();
    removeToastContainer();
  }, 1000); // Ajusta el tiempo según tus necesidades
}
