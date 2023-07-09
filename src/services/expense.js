import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  Timestamp,
  query,
  where,
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

export const getExpensesByIdInvoice = async (idInvoice) => {
  try {
    const collectionRef = collection(db, field.expense);
    const q = query(collectionRef, where("id_invoice", "==", idInvoice));
    const docRefs = await getDocs(q);

    const expenses = [];

    docRefs.forEach((expense) => {
      expenses.push({
        id: expense.id,
        ...expense.data(),
        tanggal: dayjs(expense.data().tanggal.toDate()),
      });
    });

    return { expenses };
  } catch (e) {
    console.log(e);
  }
};

export const createExpense = async ({
  tanggal = Timestamp.now(),
  nominal = 0,
  keterangan = "",
  id_invoice = "",
  bukti = "",
}) => {
  try {
    await addDoc(collection(db, field.expense), {
      tanggal,
      nominal,
      keterangan,
      id_invoice,
      bukti
    });
    queryClient.refetchQueries(["get-expenses"]);
    queryClient.refetchQueries(["get-expenses-by-id-invoice"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateExpense = async (
  id = "",
  { tanggal = "", nominal = "", keterangan = "", id_invoice = "", bukti = "" }
) => {
  try {
    await updateDoc(doc(db, field.expense, id), {
      tanggal,
      nominal,
      keterangan,
      id_invoice,
      bukti,
    });
    queryClient.refetchQueries(["get-expenses"]);
    queryClient.refetchQueries(["get-expenses-by-id-invoice"]);
  } catch (e) {
    console.log(e);
  }
};
