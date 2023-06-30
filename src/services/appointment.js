import { db } from "./firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { field } from "../common/constant";
import { queryClient } from "./query-client";
import dayjs from "dayjs";

export const getAppointments = async () => {
  try {
    const result = await getDocs(collection(db, field.appointment));
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

export const getAppointment = async (id = "") => {
  try {
    const appointment = (await getDoc(doc(db, field.appointment, id))).data();
    return { appointment };
  } catch (e) {
    console.log(e);
  }
};

export const createAppointment = async ({
  id_customer = "",
  tanggal = Timestamp.now(),
  waktu = "",
  keterangan = "",
  status = 1,
}) => {
  try {
    await addDoc(collection(db, field.appointment), {
      id_customer,
      tanggal,
      waktu,
      keterangan,
      status,
    });
    queryClient.refetchQueries(["get-appointments"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateAppointment = async (
  id = "",
  { id_customer = "", tanggal = "", waktu = "", keterangan = "", status = "" }
) => {
  try {
    await updateDoc(doc(db, field.appointment, id), {
      id_customer,
      tanggal,
      waktu,
      keterangan,
      status,
    });
    queryClient.refetchQueries(["get-appointments"]);
  } catch (e) {
    console.log(e);
  }
};
