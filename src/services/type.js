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

export const getTypes = async () => {
  try {
    const result = await getDocs(collection(db, field.type));
    const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getType = async (id = "") => {
  try {
    const type = (await getDoc(doc(db, field.type, id))).data();
    queryClient.refetchQueries(["get-types"]);
    return { type };
  } catch (e) {
    console.log(e);
  }
};

export const createType = async ({ nama_jenis = "" }) => {
  try {
    await addDoc(collection(db, field.type), {
      nama_jenis,
    });
    queryClient.refetchQueries(["get-types"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateType = async (id = "", { nama_jenis = "" }) => {
  try {
    await updateDoc(doc(db, field.type, id), {
      nama_jenis,
    });
    queryClient.refetchQueries(["get-types"]);
  } catch (e) {
    console.log(e);
  }
};
