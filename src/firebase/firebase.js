import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCJgjas8XFJJkzahM8Mqnu4iWKZ_WeCGcI",
  authDomain: "nordstone-project-81f9d.firebaseapp.com",
  projectId: "nordstone-project-81f9d",
  storageBucket: "nordstone-project-81f9d.appspot.com",
  messagingSenderId: "138770302861",
  appId: "1:138770302861:web:d235dac7b7a6fc990f5fc4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
