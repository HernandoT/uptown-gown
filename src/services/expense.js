import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { field } from "../common/constant";
import { queryClient } from "./query-client";
import dayjs from "dayjs";

export const getExpenses = async () => {
  try {
    const result = await getDocs(collection(db, field.expense));
    const data = result.docs.map((doc) => ({
      ...doc.data(),
      tanggal: dayjs(doc.data().tanggal.toDate()),
      id: doc.id,
    }));
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
  id_invoice = ""
}) => {
  try {
    await addDoc(collection(db, field.expense), {
      tanggal,
      nominal,
      keterangan,
      id_invoice
    });
    queryClient.refetchQueries(["get-expenses"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateExpense = async (
  id = "",
  { tanggal = "", nominal = "", keterangan = "", id_invoice = "" }
) => {
  try {
    await updateDoc(doc(db, field.expense, id), {
      tanggal,
      nominal,
      keterangan,
      id_invoice,
    });
    queryClient.refetchQueries(["get-expenses"]);
  } catch (e) {
    console.log(e);
  }
};
