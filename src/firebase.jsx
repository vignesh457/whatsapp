import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOz1NuL1hXnhp1zmd0LQ0AWy8i6dDM6W8",
  authDomain: "whatsapp-vignesh.firebaseapp.com",
  projectId: "whatsapp-vignesh",
  storageBucket: "whatsapp-vignesh.appspot.com",
  messagingSenderId: "1095192472068",
  appId: "1:1095192472068:web:b430b7e91478b56a4ea351",
  measurementId: "G-YERVDGFP4Y"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);