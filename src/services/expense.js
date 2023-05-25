import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp
} from "firebase/firestore";
import { field } from "../common/constant";
import { queryClient } from "./query-client";

export const getExpenses = async () => {
  try {
    const result = await getDocs(collection(db, field.expense));
    const data = result.docs.map((doc) => ({ ...doc.data(), tanggal: doc.data().tanggal.toDate().toDateString(), id: doc.id }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getExpense = async (id = "") => {
  try {
    const expense = (await getDoc(doc(db, field.expense, id))).data();
    return { expense };
  } catch (e) {
    console.log(e);
  }
};

export const createExpense = async ({
  tanggal = Timestamp.now(),
  nominal = "",
  keterangan = "",
}) => {
  try {
    await addDoc(collection(db, field.expense), {
      tanggal,
      nominal,
      keterangan,
    });
    queryClient.refetchQueries(["get-expenses"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateExpense = async (
  id = "",
  { tanggal = "", nominal = "", keterangan = "" }
) => {
  try {
    await updateDoc(doc(db, field.expense, id), {
      tanggal,
      nominal,
      keterangan,
    });
    queryClient.refetchQueries(["get-expenses"]);
  } catch (e) {
    console.log(e);
  }
};
