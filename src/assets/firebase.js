// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGrVDRBTRsoFZuhovdv4t2Jb2IPgMN5D8",
  authDomain: "tamuhackx-cd6f5.firebaseapp.com",
  projectId: "tamuhackx-cd6f5",
  storageBucket: "tamuhackx-cd6f5.appspot.com",
  messagingSenderId: "111470229082",
  appId: "1:111470229082:web:7b147957ab4d4785cf4a63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);