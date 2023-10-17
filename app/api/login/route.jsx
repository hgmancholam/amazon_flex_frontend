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
      throw new Error("Error adding from base");
    } else {
      return NextResponse.json({
        status: 200,
        ok: true,
        success: true,
        message: "Document added succesfuly",
      });
    }
  } catch (err) {
    console.error("Error inesperado:", err.message);
    return NextResponse.json({
      status: 500,
      ok: false,
      success: false,
      message: "Se ha presentado un error inesperado",
    });
  }
}

async function queryUsuario(usuario, password) {
  try {
    //con parametros
    const q = query(
      collection(firestore, "usuarios"),
      where("correo", "==", usuario),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log("** ", doc.id, " => ", doc.data());
    });
    return "ok";
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}
