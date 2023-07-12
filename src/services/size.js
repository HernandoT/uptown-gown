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

export const getSizes = async () => {
  try {
    const result = await getDocs(collection(db, field.size));
    const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getSize = async (id = "") => {
  try {
    const size = (await getDoc(doc(db, field.size, id))).data();
    return { size };
  } catch (e) {
    console.log(e);
  }
};

export const createSize = async ({ nama_ukuran = "" }) => {
  try {
    await addDoc(collection(db, field.size), {
      nama_ukuran,
    });
    queryClient.refetchQueries(["get-sizes"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateSize = async (id = "", { nama_ukuran = "" }) => {
  try {
    await updateDoc(doc(db, field.size, id), {
      nama_ukuran,
    });
    queryClient.refetchQueries(["get-sizes"]);
  } catch (e) {
    console.log(e);
  }
};
