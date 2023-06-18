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

export const getFittings = async () => {
  try {
    const result = await getDocs(collection(db, field.fitting));
    const data = result.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return { data };
  } catch (e) {
    console.log(e);
  }
};

export const getFitting = async (id = "") => {
  try {
    const fitting = (await getDoc(doc(db, field.fitting, id))).data();
    return { fitting };
  } catch (e) {
    console.log(e);
  }
};

export const createFitting = async ({
  lingkar_leher,
  lingkar_badan,
  lingkar_badan_atas,
  lingkar_pinggang,
  lingkar_perut,
  lingkar_pinggul,
  jarak_dada,
  tinggi_dada,
  panjang_dada,
  panjang_punggung,
  panjang_sisi,
  lebar_bahu,
  lebar_dada,
  lebar_punggung,
  tinggi_perut,
  tinggi_pinggul,
  lengan_pendek,
  lebar_lengan,
  lengan_panjang,
  lebar_pergelangan_lengan,
  panjang_siku,
  panjang_rok,
  lebar_kerung_lengan,
}) => {
  try {
    await addDoc(collection(db, field.fitting), {
      lingkar_leher,
      lingkar_badan,
      lingkar_badan_atas,
      lingkar_pinggang,
      lingkar_perut,
      lingkar_pinggul,
      jarak_dada,
      tinggi_dada,
      panjang_dada,
      panjang_punggung,
      panjang_sisi,
      lebar_bahu,
      lebar_dada,
      lebar_punggung,
      tinggi_perut,
      tinggi_pinggul,
      lengan_pendek,
      lebar_lengan,
      lengan_panjang,
      lebar_pergelangan_lengan,
      panjang_siku,
      panjang_rok,
      lebar_kerung_lengan,
    });
    queryClient.refetchQueries(["get-fittings"]);
  } catch (e) {
    console.log(e);
  }
};

export const updateFitting = async (
  id = "",
  {
    lingkar_leher = "",
    lingkar_badan = "",
    lingkar_badan_atas = "",
    lingkar_pinggang = "",
    lingkar_perut = "",
    lingkar_pinggul = "",
    jarak_dada = "",
    tinggi_dada = "",
    panjang_dada = "",
    panjang_punggung = "",
    panjang_sisi = "",
    lebar_bahu = "",
    lebar_dada = "",
    lebar_punggung = "",
    tinggi_perut = "",
    tinggi_pinggul = "",
    lengan_pendek = "",
    lebar_lengan = "",
    lengan_panjang = "",
    lebar_pergelangan_lengan = "",
    panjang_siku = "",
    panjang_rok = "",
    lebar_kerung_lengan = "",
  }
) => {
  try {
    await updateDoc(doc(db, field.fitting, id), {
      lingkar_leher,
      lingkar_badan,
      lingkar_badan_atas,
      lingkar_pinggang,
      lingkar_perut,
      lingkar_pinggul,
      jarak_dada,
      tinggi_dada,
      panjang_dada,
      panjang_punggung,
      panjang_sisi,
      lebar_bahu,
      lebar_dada,
      lebar_punggung,
      tinggi_perut,
      tinggi_pinggul,
      lengan_pendek,
      lebar_lengan,
      lengan_panjang,
      lebar_pergelangan_lengan,
      panjang_siku,
      panjang_rok,
      lebar_kerung_lengan,
    });
    queryClient.refetchQueries(["get-fittings"]);
  } catch (e) {
    console.log(e);
  }
};
