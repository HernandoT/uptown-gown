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
import dayjs from "dayjs";

export const getExpenses = async () => {
  try {
    const result = await getDocs(collection(db, field.expense));
    const data = result.docs.map((doc) => ({ ...doc.data(), tanggal: dayjs(doc.data().tanggal.toDate()).format("DD/MM/YYYY"), id: doc.id }));
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
  nominal = 0,
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
