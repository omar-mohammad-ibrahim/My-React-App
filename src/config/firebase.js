import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCueNxlG3PYp4GY1KIZlRlRdtQHJzitqo8",
  authDomain: "nexustrade-app.firebaseapp.com",
  projectId: "nexustrade-app",
  storageBucket: "nexustrade-app.firebasestorage.app",
  messagingSenderId: "916339493329",
  appId: "1:916339493329:web:507a72212fa488f294b8f0",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
