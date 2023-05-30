import { db } from "./firebase";
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

export const getExpenses = async () => {
  try {
    const result = await getDocs(collection(db, field.expense));
    const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getExpense = async (id = "") => {
  try {
    const user = (await getDoc(doc(db, field.expense, id))).data();
    return { user };
  } catch (e) {
    console.log(e);
  }
};

export const createExpense = async ({
  id_customer = "",
  tanggal = "",
  keterangan = "",
}) => {
  try {
    await addDoc(collection(db, field.expense), {
      id_customer,
      tanggal,
      keterangan,
    });
    queryClient.refetchQueries(["get-expenses"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateExpense = async (
  id = "",
  { id_customer = "", tanggal = "", keterangan = "" }
) => {
  try {
    await updateDoc(doc(db, field.expense, id), {
        id_customer,
        tanggal,
        keterangan,
    });
    queryClient.refetchQueries(["get-expenses"]);
  } catch (e) {
    console.log(e);
  }
};
