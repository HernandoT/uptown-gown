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

export const getInvoices = async () => {
  try {
    const result = await getDocs(collection(db, field.invoice));
    const data = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getInvoice = async (id = "") => {
  try {
    const invoice = (await getDoc(doc(db, field.invoice, id))).data();
    return { invoice };
  } catch (e) {
    console.log(e);
  }
};

export const createInvoice = async ({
  id_customer,
  id_jenis_invoice,
  tanggal_acara,
  biaya_tambahan,
  harga_total,
  panjar,
  deposit,
  status_pelunasan,
  keterangan,
  waktu_buat,
  waktu_ubah,
}) => {
  try {
    const docRef = await addDoc(collection(db, field.invoice), {
      id_customer,
      id_jenis_invoice,
      tanggal_acara,
      biaya_tambahan,
      harga_total,
      panjar,
      deposit,
      status_pelunasan,
      keterangan,
      waktu_buat,
      waktu_ubah,
    });
    queryClient.refetchQueries(["get-invoices"]);
    return docRef.id;
  } catch (e) {
    console.log(e);
  }
};

export const updateInvoice = async (
  id = "",
  {
    id_customer = "",
    id_jenis_invoice = "",
    tanggal_acara = "",
    biaya_tambahan = "",
    harga_total = "",
    panjar = "",
    deposit = "",
    status_pelunasan = "",
    keterangan = "",
    waktu_buat = "",
    waktu_ubah = "",
  }
) => {
  try {
    await updateDoc(doc(db, field.invoice, id), {
      id_customer,
      id_jenis_invoice,
      tanggal_acara,
      biaya_tambahan,
      harga_total,
      panjar,
      deposit,
      status_pelunasan,
      keterangan,
      waktu_buat,
      waktu_ubah,
    });
    queryClient.refetchQueries(["get-invoices"]);
  } catch (e) {
    console.log(e);
  }
};
