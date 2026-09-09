import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

// 1. قراءة مفاتيح البيئة عبر Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 2. تهيئة التطبيق بنمط Singleton لمنع التكرار
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// 3. تصدير الخدمات لقاعدة البيانات والمصادقة والتخزين
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// 4. مزودو المصادقة الاجتماعية
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const facebookProvider = new FacebookAuthProvider();

export default app;
