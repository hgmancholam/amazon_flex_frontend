import { NextResponse } from "next/server";

import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/firebase.jsx";

export async function POST(req) {
  try {
    const { idusuario, idioma } = await req.json();
    await setLanguagePrefered(idusuario, idioma);
    return NextResponse.json({
      status: 200,
      ok: true,
      error: false,
      message: "Languageupdated",
    });
  } catch (err) {
    return NextResponse.json({
      status: 500,
      ok: false,
      error: true,
      message: "ERROR Languageupdated",
    });
  }
}

async function setLanguagePrefered(idusuario, idioma) {
  try {
    //const newCityRef = doc(collection(db, "cities"));
    // Referencia a la colección de usuarios
    const userRef = doc(firestore, "usuarios", idusuario);
    await updateDoc(userRef, {
      idioma: idioma,
    });

    return true;
  } catch (error) {
    console.error("Error al actualizar idioma:", error);
    return false;
  }
}
