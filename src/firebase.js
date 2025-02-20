// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZU2AkgciiFof6U8Tj6FoUex23u8HOoDU",
  authDomain: "taxilo-8150a.firebaseapp.com",
  projectId: "taxilo-8150a",
  storageBucket: "taxilo-8150a.firebasestorage.app",
  messagingSenderId: "505430777195",
  appId: "1:505430777195:web:e9d9159797db8df95fc02e",
  measurementId: "G-GNGJZCNE8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };