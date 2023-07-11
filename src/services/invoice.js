import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { field } from "../common/constant";
import { queryClient } from "./query-client";
import dayjs from "dayjs";

export const getInvoices = async () => {
  try {
    const result = await getDocs(collection(db, field.invoice));
    const data = result.docs.map((doc) => ({
      ...doc.data(),
      tanggal_acara: dayjs(doc.data().tanggal_acara.toDate()),
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

export const getInvoicesByIdCustomer = async (idCustomer) => {
  try {
    const collectionRef = collection(db, field.invoice);
    const q = query(collectionRef, where("id_customer", "==", idCustomer));
    const docRefs = await getDocs(q);

    const invoices = [];

    docRefs.forEach((invoice) => {
      invoices.push({
        id: invoice.id,
        ...invoice.data(),
        tanggal_acara: dayjs(invoice.data().tanggal_acara.toDate()),
      });
    });

    return { invoices };
  } catch (e) {
    console.log(e);
  }
};

export const getInvoicesBelumLunas = async () => {
  try {
    const collectionRef = collection(db, field.invoice);
    const q = query(collectionRef, where("status_pelunasan", "==", "Belum Lunas"));
    const docRefs = await getDocs(q);

    const invoices = [];

    docRefs.forEach((invoice) => {
      invoices.push({
        id: invoice.id,
        ...invoice.data(),
        tanggal_acara: dayjs(invoice.data().tanggal_acara.toDate()),
      });
    });

    return { invoices };
  } catch (e) {
    console.log(e);
  }
};

export const getInvoicesByStatusSelesai = async () => {
  try {
    const collectionRef = collection(db, field.invoice);
    const q = query(collectionRef, where("status_pelunasan", "==", "Selesai"));
    const docRefs = await getDocs(q);

    const invoices = [];

    docRefs.forEach((invoice) => {
      invoices.push({
        id: invoice.id,
        ...invoice.data(),
        waktu_ubah: dayjs(invoice.data().waktu_ubah.toDate()),
      });
    });

    return { invoices };
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
  waktu_lunas,
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
      waktu_lunas,
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
    waktu_lunas = ""
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
      waktu_lunas,
    });
    queryClient.refetchQueries(["get-invoices"]);
  } catch (e) {
    console.log(e);
  }
};
