// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaTGztNVT97KtgOQ71S4CLmLZmGJD9qjM",
  authDomain: "portfolio-a2eb5.firebaseapp.com",
  projectId: "portfolio-a2eb5",
  storageBucket: "portfolio-a2eb5.firebasestorage.app",
  messagingSenderId: "519993923139",
  appId: "1:519993923139:web:1996d47449cf35772be6f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);