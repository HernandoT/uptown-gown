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

export const getCategories = async () => {
  try {
    const result = await getDocs(collection(db, field.category));
    const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getCategory = async (id = "") => {
  try {
    const category = (await getDoc(doc(db, field.category, id))).data();
    return { category };
  } catch (e) {
    console.log(e);
  }
};

export const createCategory = async ({ nama_kategori = "" }) => {
  try {
    await addDoc(collection(db, field.category), {
      nama_kategori,
    });
    queryClient.refetchQueries(["get-categories"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateCategory = async (id = "", { nama_kategori = "" }) => {
  try {
    await updateDoc(doc(db, field.category, id), {
      nama_kategori,
    });
    queryClient.refetchQueries(["get-categories"]);
  } catch (e) {
    console.log(e);
  }
};
