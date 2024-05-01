// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBrq8D7nLxv0ryV7g7iagunsO2wlLGRAxQ",
  authDomain: "blockchain-nmims-nv.firebaseapp.com",
  projectId: "blockchain-nmims-nv",
  storageBucket: "blockchain-nmims-nv.appspot.com",
  messagingSenderId: "1092061010290",
  appId: "1:1092061010290:web:fc76256838e3c753bce5eb",
  measurementId: "G-B7099E06D0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };