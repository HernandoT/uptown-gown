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

export const getAdmins = async () => {
  try {
    const result = await getDocs(collection(db, field.admin));
    const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getAdmin = async (id = "") => {
  try {
    const admin = (await getDoc(doc(db, field.admin, id))).data();
    return { admin };
  } catch (e) {
    console.log(e);
  }
};

export const createAdmin = async ({ username = "", password = "" }) => {
  try {
    await addDoc(collection(db, field.admin), {
      username,
      password,
    });
    queryClient.refetchQueries(["get-admins"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateAdmin = async (
  id = "",
  { username = "", password = "" }
) => {
  try {
    await updateDoc(doc(db, field.admin, id), {
      username,
      password,
    });
    queryClient.refetchQueries(["get-admins"]);
  } catch (e) {
    console.log(e);
  }
};
