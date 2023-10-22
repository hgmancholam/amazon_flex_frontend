import { NextResponse } from "next/server";

import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/firebase.jsx";

export async function POST(req) {
  try {
    const params = await req.json();

    // const {
    //   botstate,
    //   botmode,
    //   username,
    //   password,
    //   minblockrate,
    //   minpayrateperhour,
    //   arrivalbuffer,
    //   desiredwarehouses,
    //   desiredweekdays,
    //   idusuario,
    //   idsuscripcion,
    // } = params;

    const res = await saveflexSettings(params);

    if (res) {
      return NextResponse.json({
        status: 200,
        ok: true,
        error: false,
        message: "Settings saved",
      });
    } else {
      throw new Error("Error saving settings");
    }
  } catch (err) {
    console.error("Error inesperado:", err.message);
    return NextResponse.json({
      status: 500,
      ok: false,
      error: true,
      message: "ERROR saving settings",
    });
  }
}

async function saveflexSettings(params) {
  try {
    const { idusuario, idsuscripcion, ...filteredJson } = params;

    const suscripcionRef = doc(
      firestore,
      "usuarios",
      idusuario,
      "suscripciones",
      idsuscripcion
    );

    await updateDoc(suscripcionRef, { settings: filteredJson });

    return true;
  } catch (error) {
    console.error("Error al actualizar settings:", error);
    return false;
  }
}
