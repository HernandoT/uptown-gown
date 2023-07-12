import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
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

export const getAvailableCollections = async () => {
  try {
    const collection_ref = collection(db, field.collection);
    const q = query(collection_ref, where("status", "==", "Available"));
    const doc_refs = await getDocs(q);

    const data = [];

    doc_refs.forEach((collection) => {
      data.push({
        id: collection.id,
        ...collection.data(),
      });
    });

    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getCollectionsWithOrderedDate = async () => {
  try {
    const collection_ref = collection(db, field.collection);
    const q = query(collection_ref, orderBy("created_at", "desc"));
    const doc_refs = await getDocs(q);

    const data = [];

    doc_refs.forEach((collection) => {
      data.push({
        id: collection.id,
        ...collection.data(),
      });
    });

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
  id_ukuran,
  harga,
  deskripsi,
  status,
  gambar,
  popular_collection,
  created_at,
}) => {
  try {
    await addDoc(collection(db, field.collection), {
      nama,
      id_warna,
      id_kategori,
      id_jenis,
      id_ukuran,
      harga,
      deskripsi,
      status,
      gambar,
      popular_collection,
      created_at,
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
    harga = "",
    id_warna = "",
    id_kategori = "",
    id_jenis = "",
    id_ukuran = "",
    deskripsi = "",
    status = "",
    gambar = "",
    popular_collection = "",
    created_at = "",
  }
) => {
  try {
    await updateDoc(doc(db, field.collection, id), {
      nama,
      harga,
      id_warna,
      id_kategori,
      id_jenis,
      id_ukuran,
      deskripsi,
      status,
      gambar,
      popular_collection,
      created_at,
    });
    queryClient.refetchQueries(["get-collections"]);
  } catch (e) {
    console.log(e);
  }
};

export const updatePopularCollection = async (
  id = "",
  { popular_collection = 0 }
) => {
  try {
    const collection = (await getDoc(doc(db, field.collection, id))).data();

    await updateDoc(doc(db, field.collection, id), {
      ...collection,
      popular_collection,
    });
    queryClient.refetchQueries(["get-collections"]);
  } catch (e) {
    console.log(e);
  }
};
