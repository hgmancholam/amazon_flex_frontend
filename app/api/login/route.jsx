import { NextRequest, NextResponse } from "next/server";

import {
  query,
  where,
  getDocs,
  setDoc,
  Timestamp,
  collection,
  doc,
  updateDoc,
  addDoc,
  limit,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../../../lib/firebase.jsx";
import axios from "axios";
export async function POST(req) {
  const clientIp = await getClientIp();
  try {
    const { usuario, password } = await req.json();

    const res = await queryUsuario(usuario, password);
    // console.log(res);
    if (!res) {
      // console.log(res);
      throw new Error("Error requesting user");
    } else {
      setLastLogin(res.id, clientIp);

      const suscripciones = await querySubscriptionsbyUserId(res.id);
      if (suscripciones) {
        res.suscripciones = suscripciones;
      } else {
        res.suscripciones = [];
      }
      // console.log(res);
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
const getClientIp = async () => {
  const res = await axios.get("https://api.ipify.org/?format=json");
  // console.log(res.data);
  return res.data.ip;
};

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

async function querySubscriptionsbyUserId(iduser) {
  try {
    const suscripcionesRef = collection(
      firestore,
      "usuarios",
      iduser,
      "suscripciones"
    );
    const q = query(suscripcionesRef);
    const querySnapshot = await getDocs(q);
    let subs = [];

    if (querySnapshot.docs.length > 0) {
      for (const doc of querySnapshot.docs) {
        let sub = doc.data();
        sub.id = doc.id;
        sub.idusuario = iduser;
        const pagos = await queryPagosBySuscriptionId(sub.idusuario, sub.id);
        sub.pagos = pagos || [];
        const descuentos = await queryDescuentosBySuscriptionId(
          sub.idusuario,
          sub.id
        );
        sub.descuentos = descuentos || [];
        subs.push(sub);
      }
    }

    return subs;
  } catch (error) {
    console.error("Error al traer suscripciones:", error);
    return [];
  }
}

async function queryPagosBySuscriptionId(iduser, suscriptionId) {
  try {
    const pagosRef = collection(
      firestore,
      "usuarios",
      iduser,
      "suscripciones",
      suscriptionId,
      "pagos"
    );
    let arrayPagos = [];

    const q = query(pagosRef);
    const querySnapshot = await getDocs(q);
    let pagos = [];
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        let i = doc.data();
        i.idsuscripcion = suscriptionId;
        i.isusuario = iduser;
        arrayPagos.push(i);
      });
    }
    return arrayPagos;
  } catch (error) {
    console.error("Error al traer pagos:", error);
    return [];
  }
}

async function queryDescuentosBySuscriptionId(iduser, suscriptionId) {
  try {
    const descuentosRef = collection(
      firestore,
      "usuarios",
      iduser,
      "suscripciones",
      suscriptionId,
      "descuentos"
    );
    let arrayDescuentos = [];

    const q = query(descuentosRef);
    const querySnapshot = await getDocs(q);
    let descuentos = [];
    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        let i = doc.data();
        i.idsuscripcion = suscriptionId;
        i.isusuario = iduser;
        arrayDescuentos.push(i);
      });
    }
    return arrayDescuentos;
  } catch (error) {
    console.error("Error al traer descuentos:", error);
    return [];
  }
}

async function setLastLogin(idUsuario, clientIp) {
  try {
    //const newCityRef = doc(collection(db, "cities"));
    // Referencia a la colección de usuarios
    const lastloginRef = collection(
      firestore,
      "usuarios",
      idUsuario,
      "lastlogin"
    );
    const dataLastlogin = {
      fecha: await Timestamp.now(),
      ip: clientIp,
      // Otros datos que quieras agregar
    };
    // console.log(dataLastlogin);
    // Agregar el documento a la colección "lastlogin" asociada al usuario
    const docRef = await addDoc(lastloginRef, dataLastlogin);

    // console.log("Documento agregado con ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error al agregar el documento:", error);
    return false;
  }
}
