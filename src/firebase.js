// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBBS7zkftu4_8GArvlotHo7AXzoTRiEsx8",
  authDomain: "brhome-22.firebaseapp.com",
  databaseURL: "https://brhome-22-default-rtdb.firebaseio.com",
  projectId: "brhome-22",
  storageBucket: "brhome-22.firebasestorage.app",
  messagingSenderId: "1069234144848",
  appId: "1:1069234144848:web:10c4a9b990bcb2f3eef355",
  measurementId: "G-N8PBN6LMZD"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);