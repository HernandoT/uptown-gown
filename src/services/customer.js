import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { field } from "../common/constant";
import { queryClient } from "./query-client";

export const signUp = async ({ email = "", password = "" }) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response.user);
  } catch (e) {
    console.log(e);
  }
};

export const signIn = async ({ email = "", password }) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response.user);
  } catch (e) {
    console.log(e);
  }
};

export const getCustomers = async () => {
  try {
    const result = await getDocs(collection(db, field.customer));
    const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getCustomer = async (id = "") => {
  try {
    const user = (await getDoc(doc(db, field.customer, id))).data();
    return { user };
  } catch (e) {
    console.log(e);
  }
};

export const createCustomer = async ({
  email = "",
  password = "",
  nama = "",
  nomor_telepon = "",
}) => {
  try {
    await addDoc(collection(db, field.customer), {
      email,
      password,
      nama,
      nomor_telepon,
    });
    queryClient.refetchQueries(["get-customers"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateCustomer = async (
  id = "",
  { email = "", password = "", nama = "", nomor_telepon = "" }
) => {
  try {
    await updateDoc(doc(db, field.customer, id), {
      email,
      password,
      nama,
      nomor_telepon,
    });
    queryClient.refetchQueries(["get-customers"]);
    queryClient.refetchQueries(["get-customer"]);
  } catch (e) {
    console.log(e);
  }
};
