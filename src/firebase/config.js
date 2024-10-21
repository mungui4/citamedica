// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnHAVGrKhLrBAtCGWFIL_Sb5CO9hvXADk",
  authDomain: "citas-registro.firebaseapp.com",
  projectId: "citas-registro",
  storageBucket: "citas-registro.appspot.com",
  messagingSenderId: "28135073300",
  appId: "1:28135073300:web:402f6f24c057ab3aa76901"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);