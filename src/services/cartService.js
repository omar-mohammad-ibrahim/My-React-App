import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

// 1. حفظ السلة في Firebase Firestore
export const syncCartToFirebase = async (userId, cartItems) => {
  try {
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, {
      items: cartItems,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("فشل حفظ السلة في Firebase:", error.message);
  }
};

// 2. جلب السلة من Firebase عند تسجيل الدخول
export const fetchCartFromFirebase = async (userId) => {
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    if (cartSnap.exists()) {
      return cartSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error("فشل جلب السلة:", error.message);
    return [];
  }
};
