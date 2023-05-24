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

export const createCategory = async ({ nama_category = "" }) => {
  try {
    await addDoc(collection(db, field.category), {
      nama_category,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateCategory = async (id = "", { nama_category = "" }) => {
  try {
    await updateDoc(await getDoc(doc(db, field.category, id)), {
      nama_category,
    });
  } catch (e) {
    console.log(e);
  }
};
