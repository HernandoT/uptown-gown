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
  
  export const getInvoiceTypes = async () => {
    try {
      const result = await getDocs(collection(db, field.invoiceType));
      const data = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return { data };
    } catch (e) {
      console.log(e);
    }
  };
  
  export const getInvoiceType = async (id = "") => {
    try {
      const invoiceType = (await getDoc(doc(db, field.invoiceType, id))).data();
      return { invoiceType };
    } catch (e) {
      console.log(e);
    }
  };
  
  export const createInvoiceType = async ({ nama_jenis_invoice = "" }) => {
    try {
      await addDoc(collection(db, field.invoiceType), {
        nama_jenis_invoice,
      });
      queryClient.refetchQueries(["get-invoice-types"]);
    } catch (e) {
      console.log(e);
    }
  };
  
  export const updateInvoiceType = async (id = "", { nama_jenis_invoice = "" }) => {
    try {
      await updateDoc(doc(db, field.invoiceType, id), {
        nama_jenis_invoice,
      });
      queryClient.refetchQueries(["get-invoice-types"]);
    } catch (e) {
      console.log(e);
    }
  };
  