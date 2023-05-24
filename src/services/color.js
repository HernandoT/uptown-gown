import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { field } from "../common/constant";
import { db } from "./firebase";

export const getColors = async () => {
  try {
    const result = await getDocs(collection(db, field.color));
    const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getColor = async (id = "") => {
  try {
    const color = (await getDoc(doc(db, field.color, id))).data();
    return { color };
  } catch (e) {
    console.log(e);
  }
};

export const createColor = async ({ nama_warna = "", kode_hex = "" }) => {
  try {
    await addDoc(collection(db, field.color), {
      nama_warna,
      kode_hex,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateColor = async (
  id = "",
  { nama_warna = "", kode_hex = "" }
) => {
  try {
    await updateDoc(await getDoc(doc(db, field.color, id)), {
      nama_warna,
      kode_hex,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteColor = async (id = "") => {
  try {
    await deleteDoc(await getDoc(doc(db, field.color, id)));
  } catch (e) {
    console.log(e);
  }
};
