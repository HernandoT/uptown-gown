import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { field } from "../common/constant";
import { db } from "./firebase";
import { queryClient } from "./query-client";

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
    queryClient.refetchQueries(["get-colors"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateColor = async (
  id = "",
  { nama_warna = "", kode_hex = "" }
) => {
  try {
    await updateDoc(doc(db, field.color, id), {
      nama_warna,
      kode_hex,
    });
    queryClient.refetchQueries(["get-colors"]);
  } catch (e) {
    console.log(e);
  }
};
