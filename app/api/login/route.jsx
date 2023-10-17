import { NextRequest, NextResponse } from "next/server";

import {
  query,
  where,
  getDocs,
  collection,
  limit,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../../../lib/firebase.jsx";

export async function POST(req) {
  try {
    const { usuario, password } = await req.json();

    const res = await queryUsuario(usuario, password);
    // console.log(res);
    if (!res) {
      // console.log(res);
      throw new Error("Error requesting user");
    } else {
      return NextResponse.json({
        status: 200,
        ok: true,
        error: false,
        message: "User logged",
        data: res,
      });
    }
  } catch (err) {
    console.error("Error inesperado:", err.message);
    return NextResponse.json({
      status: 500,
      ok: false,
      error: true,
      message: "Se ha presentado un error inesperado",
    });
  }
}
async function queryUsuario(username, password) {
  try {
    const q = query(
      collection(firestore, "usuarios"),
      where("correo", "==", username),
      where("contrasena", "==", password),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    let usuario = {};

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log("** ", doc.id, " => ", doc.data());
        usuario = doc.data();
        usuario.id = doc.id;
      });
    } else {
      throw new Error("No se encontro el usuario");
    }
    return usuario;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw new Error("Error al obtener datos");
  }
}
