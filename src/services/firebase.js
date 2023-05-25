import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsFtIwTCIJlr91uE6xBuuZ12X5Sff7Nvs",
  authDomain: "uptown-gown-a7b88.firebaseapp.com",
  projectId: "uptown-gown-a7b88",
  storageBucket: "uptown-gown-a7b88.appspot.com",
  messagingSenderId: "159867173141",
  appId: "1:159867173141:web:f0ef183dee034b38f9d11c",
  measurementId: "G-WSXWPXSVTL",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

export const auth = getAuth(app);

export const deleteEntity = async ({ id = "", entity = "" }) => {
  try {
    await deleteDoc(doc(db, entity, id));
  } catch (e) {
    console.log(e);
  }
};
