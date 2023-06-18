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

export const getDetailInvoiceItems = async () => {
  try {
    const result = await getDocs(collection(db, field.detailInvoiceItem));
    const data = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getDetailInvoiceItem = async (id = "") => {
  try {
    const detailInvoiceItem = (
      await getDoc(doc(db, field.detailInvoiceItem, id))
    ).data();
    return { detailInvoiceItem };
  } catch (e) {
    console.log(e);
  }
};

export const createDetailInvoiceItem = async ({
  id_invoice,
  id_collection,
  id_fitting,
  nama_item,
  harga,
  gambar_sketsa,
}) => {
  try {
    await addDoc(collection(db, field.detailInvoiceItem), {
      id_invoice,
      id_collection,
      id_fitting,
      nama_item,
      harga,
      gambar_sketsa,
    });
    queryClient.refetchQueries(["get-detail-invoice-items"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateDetailInvoiceItem = async (
  id = "",
  {
    id_invoice = "",
    id_collection = "",
    id_fitting = "",
    nama_item = "",
    harga = "",
    gambar_sketsa = "",
  }
) => {
  try {
    await updateDoc(doc(db, field.detailInvoiceItem, id), {
      id_invoice,
      id_collection,
      id_fitting,
      nama_item,
      harga,
      gambar_sketsa,
    });
    queryClient.refetchQueries(["get-detail-invoice-items"]);
  } catch (e) {
    console.log(e);
  }
};
