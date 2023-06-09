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

export const getCollections = async () => {
  try {
    const result = await getDocs(collection(db, field.collection));
    const data = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getCollection = async (id = "") => {
  try {
    const collection = (await getDoc(doc(db, field.collection, id))).data();
    return { collection };
  } catch (e) {
    console.log(e);
  }
};

export const createCollection = async ({
  nama,
  id_warna,
  id_kategori,
  id_jenis,
  deskripsi,
  status,
  gambar,
  popular_collection,
}) => {
  try {
    await addDoc(collection(db, field.collection), {
      nama,
      id_warna,
      id_kategori,
      id_jenis,
      deskripsi,
      status,
      gambar,
      popular_collection,
    });
    queryClient.refetchQueries(["get-collections"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateCollection = async (
  id = "",
  {
    nama = "",
    id_warna = "",
    id_kategori = "",
    id_jenis = "",
    deskripsi = "",
    status = "",
    gambar = "",
    popular_collection = "",
  }
) => {
  try {
    await updateDoc(doc(db, field.collection, id), {
      nama,
      id_warna,
      id_kategori,
      id_jenis,
      deskripsi,
      status,
      gambar,
      popular_collection,
    });
    queryClient.refetchQueries(["get-collections"]);
  } catch (e) {
    console.log(e);
  }
};
